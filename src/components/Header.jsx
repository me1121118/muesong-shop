import React from 'react';
import { Search, Package, ShoppingCart, LogIn, LogOut, LayoutGrid, Shield, User } from 'lucide-react';

export default function Header({
  searchTerm,
  setSearchTerm,
  onOpenMegaMenu,
  cartCount,
  onOpenCart,
  onOpenAuth,
  onLogout,
  user,
  currentView,
  setCurrentView
}) {
  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-[#22c55e] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView(isAdmin ? 'admin-products' : 'catalog')}
            className="flex items-center gap-1.5 text-left focus:outline-none group"
          >
            <span className="text-2xl font-black italic tracking-tight font-sans drop-shadow-sm">
              มือสอง<span className="font-extrabold not-italic">Shop</span>
            </span>
            {isAdmin && (
              <span className="text-lg font-bold not-italic tracking-normal ml-1 drop-shadow-sm text-gray-900 bg-white/30 px-2 py-0.5 rounded-lg">
                Admin
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-2">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหาสินค้า, แบรนด์..."
              className="w-full bg-white/95 text-gray-800 text-sm rounded-full pl-4 pr-24 py-2 border-0 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-700 placeholder-gray-400"
            />
            <button
              onClick={() => setCurrentView(isAdmin ? 'admin-products' : 'catalog')}
              className="absolute right-1.5 bg-[#15803d] hover:bg-[#166534] text-white px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Search size={14} />
              <span>ค้นหา</span>
            </button>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Tracking / Parcel Icon */}
          <button
            onClick={() => setCurrentView(isAdmin ? 'admin-orders' : 'catalog')}
            title="พัสดุและคำสั่งซื้อ"
            className="p-2 hover:bg-white/15 rounded-full transition-colors relative"
          >
            <Package size={20} />
          </button>

          {/* Cart Icon (Customer Only) */}
          {!isAdmin && (
            <button
              onClick={onOpenCart}
              title="ตะกร้าสินค้า"
              className="p-2 hover:bg-white/15 rounded-full transition-colors relative"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Authentication & User Status */}
          {user ? (
            <div className="flex items-center gap-2 ml-1">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                isAdmin ? 'bg-amber-400 text-gray-900 shadow-sm' : 'bg-black/20 text-white'
              }`}>
                {isAdmin ? <Shield size={14} /> : <User size={14} />}
                <span className="max-w-[120px] truncate">{user.name}</span>
              </div>

              {/* ออกจากระบบ Button matching Figma Navbar 'ออกจากระบบ' */}
              <button
                onClick={onLogout}
                className="bg-[#15803d] hover:bg-[#166534] text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-sm flex items-center gap-1"
                title="ออกจากระบบ"
              >
                <LogOut size={13} />
                <span>ออกจากระบบ</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="bg-white text-[#15803d] hover:bg-gray-100 px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ml-1"
            >
              <LogIn size={14} />
              <span>เข้าสู่ระบบ</span>
            </button>
          )}
        </div>
      </div>

      {/* Subheader Navigation Bar */}
      <div className="bg-[#e5e7eb] text-gray-800 border-b border-gray-300 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onOpenMegaMenu}
            className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <LayoutGrid size={15} />
            <span>หมวดหมู่</span>
          </button>

          {/* Navigation Links based on role */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('admin-products')}
                  className={`px-3 py-1.5 rounded-lg text-xs transition font-bold ${
                    currentView === 'admin-products'
                      ? 'bg-[#22c55e] text-white shadow-xs'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  รายการสินค้า
                </button>
                <button
                  onClick={() => setCurrentView('admin-orders')}
                  className={`px-3 py-1.5 rounded-lg text-xs transition font-bold ${
                    currentView === 'admin-orders'
                      ? 'bg-[#22c55e] text-white shadow-xs'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  คำสั่งซื้อ
                </button>
                <button
                  onClick={() => setCurrentView('admin-users')}
                  className={`px-3 py-1.5 rounded-lg text-xs transition font-bold ${
                    currentView === 'admin-users'
                      ? 'bg-[#22c55e] text-white shadow-xs'
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  ผู้ใช้งาน
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">
                  {currentView === 'catalog' && 'หน้าหลัก > รายการสินค้า'}
                  {currentView === 'product-detail' && 'หน้าหลัก > รายละเอียดสินค้า'}
                  {currentView === 'cart' && 'หน้าหลัก > ตะกร้าสินค้า'}
                  {currentView === 'checkout' && 'หน้าหลัก > ชำระเงิน'}
                </span>
                {!user && (
                  <button
                    onClick={onOpenAuth}
                    className="ml-3 text-[11px] text-emerald-700 hover:underline font-semibold"
                  >
                    (เข้าสู่ระบบเพื่อจัดการร้านหรือสั่งซื้อ)
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
