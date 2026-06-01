import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search, Filter, ArrowUpDown, Star } from 'lucide-react';
import { useAI } from '../context/AIContext';

const Shop = () => {
  const { logAction } = useAI();
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sort, setSort] = useState('newest');
  const [brand, setBrand] = useState('All');

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];
  const brands = ['All', 'Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'Dell'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: allProducts } = await axios.get('/api/products');
        setProducts(allProducts);

        const { data: recs } = await axios.get('/api/recommendations/feed');
        setRecommendations(recs.products || []);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = category === 'All' || p.category === category;
      const matchesBrand = brand === 'All' || p.brand === brand;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCat && matchesBrand && matchesPrice;
    })
    .sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'popularity') return (b.rating || 0) - (a.rating || 0);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="shop-page">
      {/* Search & Sort Header */}
      <div className="shop-header glass-card">
        <div className="search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products, brands..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="sort-box">
          <ArrowUpDown size={18} />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">New Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popularity">Most Popular</option>
          </select>
        </div>
      </div>

      <div className="shop-layout">
        {/* Filter Sidebar */}
        <aside className="filter-sidebar glass-card">
          <div className="filter-section">
            <label><Filter size={16} /> Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="filter-section">
            <label>Brand</label>
            <select value={brand} onChange={(e) => setBrand(e.target.value)}>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="filter-section">
            <label>Price Range (Max: ${priceRange[1]})</label>
            <input 
              type="range" min="0" max="5000" step="100" 
              value={priceRange[1]} 
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            />
          </div>

          {/* AI - You May Also Like */}
          <div className="ai-recs-sidebar">
            <h4><Star size={16} color="#00C2FF" /> AI Picks for You</h4>
            <div className="mini-rec-list">
              {recommendations.slice(0, 3).map(p => (
                <div key={p._id} className="mini-card" onClick={() => logAction('click', p._id, p.category)}>
                  <img src={p.image} alt={p.name} />
                  <div>
                    <h6>{p.name}</h6>
                    <span>${p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="shop-main">
          <div className="product-grid">
            {loading ? [1,2,3,4,5,6].map(i => <div key={i} className="skeleton-card"></div>) : 
              filteredProducts.map(p => (
                <ProductCard key={p._id} product={p} />
              ))
            }
          </div>
          {filteredProducts.length === 0 && !loading && (
            <div className="no-results glass-card">
              <h3>No products match your criteria.</h3>
              <button onClick={() => {setCategory('All'); setSearchTerm(''); setPriceRange([0, 5000]); setBrand('All');}}>
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .shop-page { display: flex; flex-direction: column; gap: 2rem; padding-bottom: 4rem; }
        
        .shop-header { 
          display: flex; justify-content: space-between; align-items: center; 
          padding: 1.5rem 2rem; gap: 2rem; 
        }
        .search-box { 
          flex: 1; position: relative; max-width: 500px;
          background: rgba(var(--text-main-rgb), 0.05); border: 1px solid var(--border-color);
          border-radius: 2rem; padding: 0.2rem 1rem;
        }
        .search-box input { background: transparent; border: none; color: var(--text-main); padding: 0.6rem; width: 90%; outline: none; }
        .search-box input::placeholder { color: var(--text-muted); }
        .search-icon { color: var(--accent); margin-right: 0.5rem; }
        
        .sort-box { display: flex; align-items: center; gap: 0.8rem; color: var(--text-muted); }
        .sort-box select { background: transparent; color: var(--text-main); border: none; font-weight: 600; cursor: pointer; outline: none; }

        .shop-layout { display: grid; grid-template-columns: 280px 1fr; gap: 2rem; }
        
        .filter-sidebar { padding: 2rem; height: fit-content; display: flex; flex-direction: column; gap: 2rem; position: sticky; top: 100px; }
        .filter-section { display: flex; flex-direction: column; gap: 0.8rem; }
        .filter-section label { font-size: 0.9rem; font-weight: 700; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem; }
        .filter-section select { background: var(--header-bg); color: var(--text-main); border: 1px solid var(--border-color); border-radius: 0.5rem; }
        .filter-section input[type='range'] { accent-color: var(--accent); }

        .ai-recs-sidebar h4 { font-size: 0.9rem; color: var(--text-main); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
        .mini-rec-list { display: flex; flex-direction: column; gap: 1rem; }
        .mini-card { display: flex; gap: 1rem; align-items: center; cursor: pointer; transition: transform 0.2s; }
        .mini-card:hover { transform: translateX(5px); }
        .mini-card img { width: 50px; height: 50px; border-radius: 0.5rem; object-fit: cover; background: #000; }
        .mini-card h6 { font-size: 0.85rem; margin: 0; color: var(--text-main); }
        .mini-card span { font-size: 0.8rem; color: var(--accent); font-weight: 700; }

        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 2rem; }
        .no-results { text-align: center; padding: 5rem; grid-column: 1/-1; }
        .no-results h3 { color: var(--text-muted); margin-bottom: 1.5rem; }

        @media (max-width: 900px) {
          .shop-layout { grid-template-columns: 1fr; }
          .filter-sidebar { position: static; }
        }
      `}</style>
    </div>
  );
};

export default Shop;
