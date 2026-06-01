import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AIProvider } from './context/AIContext';

import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import AdminLayout from './components/layouts/AdminLayout';
import CustomerLayout from './components/layouts/CustomerLayout';
import SalesStaffLayout from './components/layouts/SalesStaffLayout';
import SupplierLayout from './components/layouts/SupplierLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import OrderHistory from './pages/OrderHistory';
import Compare from './pages/Compare';
import SupplierPortal from './pages/SupplierPortal';
import SalesStaff from './pages/SalesStaff';
import Notifications from './pages/Notifications';

// Admin Pages
import Overview from './admin/dashboard/Overview';
import ProductList from './admin/products/ProductList';
import CategoryList from './admin/categories/CategoryList';
import OrderList from './admin/orders/OrderList';
import CustomerList from './admin/customers/CustomerList';
import InventoryManager from './admin/inventory/InventoryManager';
import AIRecommendations from './admin/recommendations/AIRecommendations';
import SalesAnalytics from './admin/analytics/SalesAnalytics';
import SupplierManager from './admin/suppliers/SupplierManager';
import PromotionManager from './admin/promotions/PromotionManager';
import ReviewManager from './admin/reviews/ReviewManager';
import DeliveryManager from './admin/delivery/DeliveryManager';
import PaymentManager from './admin/payments/PaymentManager';
import UserManager from './admin/users/UserManager';
import AddUser from './admin/users/AddUser';
import ReportGenerator from './admin/reports/ReportGenerator';
import StoreSettings from './admin/settings/StoreSettings';
import AdminProfile from './admin/profile/AdminProfile';
import StaffManager from './admin/staff/StaffManager';
import AddSupplier from './admin/suppliers/AddSupplier';

// Customer Pages
import CustomerDashboard from './pages/customer/CustomerDashboard';

// Staff Pages
import POSTerminal from './pages/sales/POSTerminal';
import OrderManager from './pages/sales/OrderManager';
import SupportCenter from './pages/sales/SupportCenter';
import InventorySupport from './pages/sales/InventorySupport';
import DeliveryCoordination from './pages/sales/DeliveryCoordination';
import SalesReporting from './pages/sales/SalesReporting';

// Supplier Pages
import ProductSupply from './pages/supplier/ProductSupply';
import InventoryCoordination from './pages/supplier/InventoryCoordination';
import OrderHandling from './pages/supplier/OrderHandling';
import DeliveryManagement from './pages/supplier/DeliveryManagement';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AIProvider>
            <Router>
              <Routes>
                {/* Admin Routes with Layout and Protection */}
                <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Overview />} />
                    
                    {/* User Management */}
                    <Route path="users/add" element={<AddUser />} />
                    <Route path="users" element={<UserManager />} />
                    <Route path="staff/attendance" element={<StaffManager />} />
                    <Route path="staff/salary" element={<StaffManager />} />
                    <Route path="reports/staff" element={<ReportGenerator />} />
                    <Route path="suppliers/add" element={<AddSupplier />} />
                    <Route path="suppliers" element={<SupplierManager />} />
                    <Route path="suppliers/requests" element={<SupplierManager />} />
                    <Route path="suppliers/tracking" element={<DeliveryManager />} />
                    <Route path="reports/suppliers" element={<ReportGenerator />} />
                    <Route path="loyalty" element={<CustomerList />} />
                    <Route path="settings/security" element={<StoreSettings />} />
                    
                    {/* Catalog */}
                    <Route path="products/add" element={<ProductList />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="categories" element={<CategoryList />} />
                    <Route path="brands" element={<CategoryList />} />
                    <Route path="reports/products" element={<ReportGenerator />} />
                    <Route path="reviews" element={<ReviewManager />} />
                    <Route path="reports/customers" element={<ReportGenerator />} />
                    
                    {/* Inventory */}
                    <Route path="inventory" element={<InventoryManager />} />
                    <Route path="warehouse" element={<InventoryManager />} />
                    <Route path="reports/inventory" element={<ReportGenerator />} />
                    
                    {/* Orders */}
                    <Route path="orders" element={<OrderList />} />
                    <Route path="orders/returns" element={<OrderList />} />
                    <Route path="reports/orders" element={<ReportGenerator />} />
                    
                    {/* Payments */}
                    <Route path="payments" element={<PaymentManager />} />
                    <Route path="payments/refunds" element={<PaymentManager />} />
                    <Route path="reports/revenue" element={<ReportGenerator />} />
                    <Route path="analytics/finance" element={<SalesAnalytics />} />
                    
                    {/* AI Center */}
                    <Route path="recommendations" element={<AIRecommendations />} />
                    <Route path="analytics/customers" element={<SalesAnalytics />} />
                    <Route path="reports/ai" element={<ReportGenerator />} />
                    
                    {/* Analytics */}
                    <Route path="analytics" element={<SalesAnalytics />} />
                    
                    {/* Promotions */}
                    <Route path="promotions" element={<PromotionManager />} />
                    <Route path="reports/promotions" element={<ReportGenerator />} />
                    
                    {/* Notifications */}
                    <Route path="notifications" element={<Notifications />} />
                    
                    {/* Reports */}
                    <Route path="reports/sales" element={<ReportGenerator />} />
                    <Route path="reports" element={<ReportGenerator />} />
                    
                    {/* System */}
                    <Route path="settings" element={<StoreSettings />} />
                    <Route path="profile" element={<AdminProfile />} />
                  </Route>
                </Route>

                {/* Customer Routes with Layout and Protection */}
                <Route element={<ProtectedRoute allowedRoles={['Customer', 'Admin']} />}>
                  <Route path="/customer" element={<CustomerLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<CustomerDashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="orders" element={<OrderHistory />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="recommendations" element={<Home />} /> {/* Temporary: use home for AI picks */}
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="settings" element={<Profile />} /> {/* Temporary: reuse profile */}
                    {/* Placeholder routes for future implementation */}
                    <Route path="payments" element={<Payment />} />
                    <Route path="reviews" element={<About />} /> 
                    <Route path="support" element={<About />} />
                  </Route>
                </Route>

                {/* Sales Staff Routes with Layout and Protection */}
                <Route element={<ProtectedRoute allowedRoles={['Sales Staff', 'Admin']} />}>
                  <Route path="/staff" element={<SalesStaffLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<SalesStaff />} />
                    <Route path="orders" element={<OrderManager />} />
                    <Route path="customers" element={<CustomerList />} /> {/* Reuse admin customer list */}
                    <Route path="inventory" element={<InventorySupport />} />
                    <Route path="products" element={<POSTerminal />} /> {/* POS terminal is the product interface for staff */}
                    <Route path="promotions" element={<PromotionManager />} /> {/* Reuse admin promotion manager */}
                    <Route path="reports" element={<SalesReporting />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="delivery" element={<DeliveryCoordination />} />
                    <Route path="support" element={<SupportCenter />} />
                  </Route>
                </Route>

                {/* Supplier Routes with Layout and Protection */}
                <Route element={<ProtectedRoute allowedRoles={['Supplier', 'Admin']} />}>
                  <Route path="/supplier" element={<SupplierLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<SupplierPortal />} />
                    <Route path="products" element={<ProductSupply />} />
                    <Route path="inventory" element={<InventoryCoordination />} />
                    <Route path="orders" element={<OrderHandling />} />
                    <Route path="logistics" element={<DeliveryManagement />} />
                    <Route path="information" element={<About />} /> {/* Placeholder */}
                    <Route path="reports" element={<SalesAnalytics />} /> {/* Reuse analytics */}
                    <Route path="support" element={<About />} /> {/* Placeholder */}
                    <Route path="profile" element={<Profile />} />
                  </Route>
                </Route>

                {/* Main Routes with Header/Footer */}
                <Route path="*" element={
                  <>
                    <Header />
                    <div className="app-container">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/orders" element={<OrderHistory />} />
                        <Route path="/compare" element={<Compare />} />
                        <Route path="/supplier" element={<SupplierPortal />} />
                        <Route path="/staff" element={<SalesStaff />} />
                        <Route path="/notifications" element={<Notifications />} />
                      </Routes>
                    </div>
                    <Chatbot />
                    <Footer />
                  </>
                } />
              </Routes>
            </Router>
          </AIProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

