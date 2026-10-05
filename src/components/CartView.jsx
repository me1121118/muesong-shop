import React, { useState } from 'react';
import { Trash2, Plus, Minus, ReceiptText, ArrowLeft, ShieldCheck, Tag } from 'lucide-react';

export default function CartView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onBackToCatalog
}) {
  const [selectedItems, setSelectedItems] = useState(
    cartItems.map(item => item.id)
  );

  const toggleSelect = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  const activeItems = cartItems.filter(item => selectedItems.includes(item.id));
  const subtotal = activeItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <button
        onClick={onBackToCatalog}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 font-semibold mb-6 transition"
      >
        <ArrowLeft size={18} />
        <span>เลือกสินค้าต่อ</span>
      </button>

      <h1 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span>ตะกร้าสินค้า</span>
        <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          ({cartItems.length} รายการ)
        </span>
      </h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto">
          <p className="text-gray-400 text-sm mb-4">ยังไม่มีสินค้าในตะกร้า</p>
          <button
            onClick={onBackToCatalog}
            className="bg-[#22c55e] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#16a34a] transition"
          >
            เลือกชมสินค้ามือสอง
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Cart Items List */}
          <div className="lg:col-span-2 space-y-3">
            {/* Select All Bar */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItems.length === cartItems.length && cartItems.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded text-[#22c55e] focus:ring-[#22c55e] w-4 h-4 cursor-pointer"
                />
                <span>เลือกสินค้าทั้งหมด ({selectedItems.length}/{cartItems.length})</span>
              </label>

              {selectedItems.length > 0 && (
                <button
                  onClick={() => selectedItems.forEach(id => onRemoveItem(id))}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold"
                >
                  ลบรายการที่เลือก
                </button>
              )}
            </div>

            {/* Item Rows */}
            {cartItems.map((item) => {
              const isChecked = selectedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4 transition hover:shadow-xs"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSelect(item.id)}
                    className="rounded text-[#22c55e] focus:ring-[#22c55e] w-4 h-4 cursor-pointer"
                  />

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-xl bg-gray-50 p-2 border border-gray-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        {item.condition || 'มือสอง'}
                      </span>
                      <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                        สินค้าชิ้นเดียว
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-gray-900 truncate mt-1">
                      {item.name}
                    </h3>
                    <div className="text-xs font-black text-[#ef4444] mt-1">
                      ฿{item.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Quantity Indicator (Fixed to 1 for unique secondhand item) */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 text-xs">
                      <span className="px-3 py-1 font-bold text-gray-700">
                        1 ชิ้น
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg transition"
                      title="ลบออกจากตะกร้า"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Order Summary Ticket matching Figma */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm relative overflow-hidden">
              <h3 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100 mb-4 text-center">
                สรุปรายการสั่งซื้อ
              </h3>

              <div className="space-y-3 text-xs text-gray-600 mb-6">
                <div className="flex justify-between items-center">
                  <span>คำสั่งซื้อสินค้า ({activeItems.length} ชิ้น)</span>
                  <span className="font-black text-[#ef4444]">
                    ฿{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ค่าจัดส่ง</span>
                  <span className="text-emerald-600 font-bold">ฟรี</span>
                </div>

                <div className="border-t border-dashed border-gray-300 pt-3 flex justify-between items-baseline">
                  <span className="font-bold text-gray-900 text-sm">ยอดรวมทั้งหมด</span>
                  <span className="text-2xl font-black text-[#22c55e]">
                    ฿{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  disabled={activeItems.length === 0}
                  onClick={() => onProceedToCheckout(activeItems)}
                  className="w-full bg-[#22c55e] hover:bg-[#16a34a] disabled:bg-gray-200 disabled:text-gray-400 text-white py-3.5 rounded-2xl font-bold text-xs transition shadow-sm cursor-pointer"
                >
                  ดำเนินการต่อ
                </button>

                <button
                  onClick={() => alert('ใบเสนอราคา / รายละเอียดสินค้าสำหรับออเดอร์นี้')}
                  className="w-full border border-gray-200 hover:bg-gray-50 text-gray-600 py-2.5 rounded-2xl font-semibold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <ReceiptText size={15} />
                  <span>ขอใบเสร็จสินค้า</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
