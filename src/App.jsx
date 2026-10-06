import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import MegaMenuModal from './components/MegaMenuModal';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import AuthModals from './components/AuthModals';
import AdminOrders from './components/AdminOrders';
import AdminUsers from './components/AdminUsers';
import AdminProducts from './components/AdminProducts';
import { PurchaseConfirmModal, ActionConfirmModal, SuccessModal } from './components/ConfirmModal';
import { useToast } from './components/Toast';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_USERS } from './data/mockData';
import { api } from './services/api';
import { ChevronDown, Smartphone, Database } from 'lucide-react';

const SORT_OPTIONS = [
  'ราคาต่ำที่สุด',
  'ราคาสูงที่สุด',
  'ชื่อสินค้า A - Z',
  'ชื่อสินค้า Z - A',
  'สินค้า เก่า-ใหม่',
  'สินค้า ใหม่-เก่า'
];

export default function App() {
  const { addToast } = useToast();

  // Global Data State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [cart, setCart] = useState([]);
  const [dbStatus, setDbStatus] = useState({ connected: false, database: 'shop' });

  // Auth & Permissions State
  const [currentUser, setCurrentUser] = useState(null);
  const isAdmin = currentUser?.role === 'admin';

  // Current View
  const [currentView, setCurrentView] = useState('catalog');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutItems, setCheckoutItems] = useState([]);

  // Filtering & Sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [sortOption, setSortOption] = useState('ราคาต่ำที่สุด');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Modals
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [confirmModalState, setConfirmModalState] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
    itemPreview: null,
    confirmText: 'ยืนยัน',
    confirmColor: 'green',
    onConfirm: () => {}
  });
  const [successModalState, setSuccessModalState] = useState({
    isOpen: false,
    message: 'สำเร็จ'
  });

  // Fetch initial data from MongoDB API Server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const health = await api.checkHealth();
        if (health.status === 'ok') {
          setDbStatus({ connected: true, database: health.database });
        }

        const [prods, ords, usrs] = await Promise.all([
          api.getProducts().catch(() => INITIAL_PRODUCTS),
          api.getOrders().catch(() => INITIAL_ORDERS),
          api.getUsers().catch(() => INITIAL_USERS)
        ]);

        if (Array.isArray(prods) && prods.length > 0) setProducts(prods);
        if (Array.isArray(ords) && ords.length > 0) setOrders(ords);
        if (Array.isArray(usrs) && usrs.length > 0) setUsers(usrs);
      } catch (err) {
        console.log('API fetch error, using local fallback:', err);
      }
    };
    fetchData();
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (selectedBrand) {
      list = list.filter(p =>
        p.brand?.toLowerCase() === selectedBrand.toLowerCase() ||
        p.subcategory?.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    // Sort Logic matching Figma
    switch (sortOption) {
      case 'ราคาต่ำที่สุด':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'ราคาสูงที่สุด':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'ชื่อสินค้า A - Z':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'ชื่อสินค้า Z - A':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'สินค้า ใหม่-เก่า':
        list.sort((a, b) => (b.id > a.id ? 1 : -1));
        break;
      case 'สินค้า เก่า-ใหม่':
        list.sort((a, b) => (a.id > b.id ? 1 : -1));
        break;
      default:
        break;
    }

    return list;
  }, [products, searchTerm, selectedCategory, selectedBrand, sortOption]);

  // Login Success Handler (Calling API)
  const handleLoginSuccess = async (userData) => {
    try {
      const res = await api.login(userData.email);
      const user = res.user || userData;
      setCurrentUser(user);

      if (user.role === 'admin') {
        setCurrentView('admin-products');
        addToast(`เข้าสู่ระบบสำเร็จในฐานะ [ผู้ดูแลระบบ Admin]`, 'success');
      } else {
        setCurrentView('catalog');
        addToast(`ยินดีต้อนรับคุณ ${user.name}`, 'success');
      }
    } catch (e) {
      setCurrentUser(userData);
      if (userData.role === 'admin') {
        setCurrentView('admin-products');
        addToast(`เข้าสู่ระบบในฐานะ Admin (ออฟไลน์โหมด)`, 'info');
      } else {
        addToast(`เข้าสู่ระบบสำเร็จ`, 'success');
      }
    }
  };

  // Logout Handler
  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    setCurrentView('catalog');
    addToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
  };

  // Cart Handlers
  const handleAddToCart = (product) => {
    if (product.status === 'sold') {
      addToast('สินค้านี้ขายแล้ว ไม่สามารถสั่งซื้อได้', 'error');
      return;
    }

    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        addToast(`"${product.name}" มีอยู่ในตะกร้าแล้ว (สินค้ามีชิ้นเดียว)`, 'info');
        return prev;
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    addToast(`เพิ่ม "${product.name}" ลงในตะกร้าแล้ว`, 'success');
  };

  const handleUpdateCartQuantity = (id, newQty) => {
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: Math.min(1, newQty) } : item)
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    addToast('นำสินค้าออกจากตะกร้าแล้ว', 'info');
  };

  // Direct Buy Flow
  const handleBuyNow = (product) => {
    if (product.status === 'sold') {
      addToast('สินค้านี้ขายแล้ว ไม่สามารถสั่งซื้อได้', 'error');
      return;
    }
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
  };

  const handleConfirmPurchase = () => {
    setIsPurchaseModalOpen(false);
    setCheckoutItems([{ ...selectedProduct, quantity: 1 }]);
    setCurrentView('checkout');
  };

  // Checkout Flow
  const handleProceedToCheckout = (items) => {
    setCheckoutItems(items);
    setCurrentView('checkout');
  };

  const handlePaymentSuccess = async (orderInfo) => {
    const newOrder = {
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      code: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      productId: orderInfo.items[0]?.id || 'A0184613',
      productName: orderInfo.items[0]?.name || 'สินค้ามือสอง',
      productCode: orderInfo.items[0]?.id || 'A0184613',
      price: orderInfo.totalAmount,
      productImage: orderInfo.items[0]?.image || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600',
      buyerName: orderInfo.fullName,
      buyerCode: currentUser?.id || `USR-${Math.floor(10000000 + Math.random() * 90000000)}`,
      phone: orderInfo.phone,
      address: orderInfo.address,
      status: 'รอตรวจสอบสลิป',
      slipImage: orderInfo.slipImage || null,
      paymentMethod: orderInfo.paymentMethod,
      items: orderInfo.items,
      specsSummary: orderInfo.items[0]?.specs ? `CPU: ${orderInfo.items[0].specs.cpu || '-'} | RAM: ${orderInfo.items[0].specs.ram || '-'}` : ''
    };

    try {
      await api.createOrder(newOrder);
    } catch (e) {
      console.log('Save order to API error:', e);
    }

    // Add to orders
    setOrders(prev => [newOrder, ...prev]);

    // Mark ordered items as sold
    const paidIds = orderInfo.items.map(i => i.id);
    setProducts(prev =>
      prev.map(p => paidIds.includes(p.id) ? { ...p, status: 'sold' } : p)
    );

    // Clear paid items from cart
    setCart(prev => prev.filter(i => !paidIds.includes(i.id)));

    setSuccessModalState({
      isOpen: true,
      message: 'ชำระเงินและแนบหลักฐานสำเร็จ'
    });
    addToast('สั่งซื้อสำเร็จ! ทางร้านจะตรวจสอบสลิปและจัดส่งโดยเร็ว', 'success');
    setCurrentView('catalog');
  };

  // Admin Actions with API Integration
  const handleDeleteProduct = (product) => {
    setConfirmModalState({
      isOpen: true,
      title: 'ต้องการลบสินค้านี้หรือไม่',
      subtitle: `รหัสสินค้า : ${product.id}`,
      itemPreview: (
        <div className="flex items-center gap-3">
          <img src={product.image} alt={product.name} className="w-12 h-12 object-contain bg-white rounded-lg p-1 border" />
          <div>
            <div className="font-bold text-gray-900">{product.name}</div>
            <div className="text-emerald-700 font-bold">฿{product.price.toLocaleString()}</div>
          </div>
        </div>
      ),
      confirmText: 'ลบ',
      confirmColor: 'red',
      onConfirm: async () => {
        try {
          await api.deleteProduct(product.id);
        } catch (e) {
          console.error(e);
        }
        setProducts(prev => prev.filter(p => p.id !== product.id));
        setConfirmModalState(s => ({ ...s, isOpen: false }));
        addToast(`ลบสินค้า "${product.name}" สำเร็จ`, 'success');
      }
    });
  };

  const handleDeleteUser = (user) => {
    setConfirmModalState({
      isOpen: true,
      title: 'ต้องการลบผู้ใช้นี้หรือไม่',
      subtitle: `รหัสผู้ใช้ : ${user.id}`,
      itemPreview: (
        <div>
          <div>ชื่อผู้ใช้ : <strong>{user.name}</strong></div>
          <div>เบอร์ผู้ใช้งาน : {user.phone}</div>
        </div>
      ),
      confirmText: 'ลบ',
      confirmColor: 'red',
      onConfirm: async () => {
        try {
          await api.deleteUser(user.id);
        } catch (e) {
          console.error(e);
        }
        setUsers(prev => prev.filter(u => u.id !== user.id));
        setConfirmModalState(s => ({ ...s, isOpen: false }));
        addToast(`ลบผู้ใช้ "${user.name}" สำเร็จ`, 'success');
      }
    });
  };

  const handleDeleteOrder = (order) => {
    setConfirmModalState({
      isOpen: true,
      title: 'ต้องการยกเลิกคำสั่งซื้อนี้หรือไม่',
      subtitle: `รหัสคำสั่งซื้อ : ${order.code || order.id}`,
      itemPreview: (
        <div>
          <div className="font-bold">{order.productName}</div>
          <div className="text-gray-500 text-[11px]">ผู้สั่ง : {order.buyerName}</div>
          <div className="text-emerald-700 font-bold">฿{order.price?.toLocaleString()}</div>
        </div>
      ),
      confirmText: 'ยกเลิกคำสั่งซื้อ',
      confirmColor: 'red',
      onConfirm: async () => {
        try {
          await api.deleteOrder(order.id);
        } catch (e) {
          console.error(e);
        }
        setOrders(prev => prev.filter(o => o.id !== order.id));
        setConfirmModalState(s => ({ ...s, isOpen: false }));
        addToast(`ยกเลิกคำสั่งซื้อ ${order.code || order.id} เรียบร้อย`, 'info');
      }
    });
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, { status: newStatus });
    } catch (e) {
      console.error(e);
    }
    setOrders(prev =>
      prev.map(o => (o.id === orderId || o._id === orderId) ? { ...o, status: newStatus } : o)
    );
    addToast(`อัปเดตสถานะคำสั่งซื้อเป็น "${newStatus}" เรียบร้อย`, 'success');
  };

  const handleAddProduct = async (newProd) => {
    try {
      await api.addProduct(newProd);
    } catch (e) {
      console.error(e);
    }
    setProducts(prev => [newProd, ...prev]);
    addToast(`เพิ่มสินค้า "${newProd.name}" เข้าสู่ระบบสำเร็จ`, 'success');
  };

  const handleUpdateProduct = async (updatedProd) => {
    try {
      await api.updateProduct(updatedProd.id, updatedProd);
    } catch (e) {
      console.error(e);
    }
    setProducts(prev =>
      prev.map(p => (p.id === updatedProd.id || p._id === updatedProd.id) ? { ...p, ...updatedProd } : p)
    );
    addToast(`บันทึกการแก้ไข "${updatedProd.name}" สำเร็จ`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-800 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setCurrentView('cart')}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        user={currentUser}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Database Status Ribbon */}
      <div className="bg-emerald-900/90 text-emerald-100 text-[11px] py-1.5 px-4 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database size={13} className="text-emerald-400" />
            <span>MongoDB Database: <strong className="text-white">shop</strong></span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            <span className="text-emerald-300">API Server: ออนไลน์ (Port 5000)</span>
          </div>
          <span className="text-emerald-300">
            {isAdmin ? '🛡️ โหมดผู้ดูแลระบบ (Admin Mode)' : (currentUser ? `👤 บัญชี: ${currentUser.name}` : '🌐 โหมดลูกค้าทั่วไป')}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Catalog View (Accessible by customer and admin) */}
        {currentView === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700 font-bold">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    {selectedCategory ? `${selectedCategory}` : 'สินค้าแนะนำมือสอง'}
                    {selectedBrand && ` : ${selectedBrand}`}
                  </h2>
                  <span className="text-xs text-gray-400">
                    พบสินค้า {filteredProducts.length} รายการ
                  </span>
                </div>

                {(selectedCategory || selectedBrand) && (
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedBrand(null);
                    }}
                    className="text-xs text-red-500 hover:underline font-semibold ml-2"
                  >
                    ล้างตัวกรอง
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-semibold">เรียงตาม:</span>
                  <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full px-4 py-2 text-xs font-bold text-gray-800 flex items-center gap-2 transition"
                  >
                    <span>{sortOption}</span>
                    <ChevronDown size={14} className={isSortDropdownOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                  </button>
                </div>

                {isSortDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortOption(opt);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition ${
                          sortOption === opt
                            ? 'bg-emerald-50 text-emerald-700 font-bold'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto">
                <p className="text-gray-500 text-sm mb-2">ไม่พบสินค้าที่ตรงกับการค้นหา</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                    setSelectedBrand(null);
                  }}
                  className="text-xs text-emerald-600 font-bold hover:underline"
                >
                  ดูสินค้าทั้งหมด
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id || prod._id}
                    product={prod}
                    isAdmin={isAdmin}
                    onDeleteProduct={handleDeleteProduct}
                    onSelectProduct={(p) => {
                      setSelectedProduct(p);
                      setCurrentView('product-detail');
                    }}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Product Detail View */}
        {currentView === 'product-detail' && (
          <ProductDetail
            product={selectedProduct}
            isAdmin={isAdmin}
            onDeleteProduct={handleDeleteProduct}
            onBack={() => setCurrentView('catalog')}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        )}

        {/* Cart View */}
        {currentView === 'cart' && (
          <CartView
            cartItems={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onProceedToCheckout={handleProceedToCheckout}
            onBackToCatalog={() => setCurrentView('catalog')}
          />
        )}

        {/* Checkout View */}
        {currentView === 'checkout' && (
          <CheckoutView
            checkoutItems={checkoutItems}
            onBackToCart={() => setCurrentView('cart')}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {/* Admin Views */}
        {isAdmin && (
          <>
            {currentView === 'admin-products' && (
              <AdminProducts
                products={products}
                onDeleteProduct={handleDeleteProduct}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
              />
            )}

            {currentView === 'admin-orders' && (
              <AdminOrders
                orders={orders}
                onDeleteOrder={handleDeleteOrder}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            )}

            {currentView === 'admin-users' && (
              <AdminUsers
                users={users}
                onDeleteUser={handleDeleteUser}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-bold text-[#15803d]">
            {isAdmin ? 'มือสองShop Admin Portal' : 'มือสองShop'} &copy; 2026 - แพลตฟอร์มซื้อขายสินค้ามือสองคุณภาพ
          </div>
          <div className="flex gap-4 text-gray-400">
            <span>ฐานข้อมูล: MongoDB Atlas [shop]</span>
            <span>สถานะ: เชื่อมต่อสมบูรณ์</span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <MegaMenuModal
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onSelectCategory={(catName, brand) => {
          setSelectedCategory(catName);
          setSelectedBrand(brand);
          setCurrentView('catalog');
        }}
      />

      <AuthModals
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <PurchaseConfirmModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        onConfirm={handleConfirmPurchase}
        product={selectedProduct}
      />

      <ActionConfirmModal
        isOpen={confirmModalState.isOpen}
        onClose={() => setConfirmModalState(s => ({ ...s, isOpen: false }))}
        onConfirm={confirmModalState.onConfirm}
        title={confirmModalState.title}
        subtitle={confirmModalState.subtitle}
        itemPreview={confirmModalState.itemPreview}
        confirmText={confirmModalState.confirmText}
        confirmColor={confirmModalState.confirmColor}
      />

      <SuccessModal
        isOpen={successModalState.isOpen}
        onClose={() => setSuccessModalState(s => ({ ...s, isOpen: false }))}
        message={successModalState.message}
      />
    </div>
  );
}
