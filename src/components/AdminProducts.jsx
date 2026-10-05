import React, { useState } from 'react';
import { Plus, Trash2, Edit, ImagePlus, ShieldAlert } from 'lucide-react';

export default function AdminProducts({
  products,
  onDeleteProduct,
  onAddProduct
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    category: 'โทรศัพท์ & แท็บเล็ต',
    subcategory: 'โทรศัพท์',
    price: '',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    condition: 'สินค้า ใหม่-เก่า'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    onAddProduct({
      ...newProduct,
      id: `A0${Math.floor(100000 + Math.random() * 900000)}`,
      price: Number(newProduct.price)
    });
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      brand: '',
      category: 'โทรศัพท์ & แท็บเล็ต',
      subcategory: 'โทรศัพท์',
      price: '',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
      condition: 'สินค้า ใหม่-เก่า'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header with เพิ่มสินค้า Button matching Figma */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>รายการสินค้า (Inventory)</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {products.length} ชิ้น
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">จัดการคลังสินค้ามือสอง เพิ่มและแก้ไขรายการ</p>
        </div>

        {/* Green เพิ่มสินค้า Button matching Figma Screenshot 210332 */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#15803d] hover:bg-[#166534] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
        >
          <Plus size={16} />
          <span>เพิ่มสินค้า</span>
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Image & Basic Details */}
            <div className="flex items-center gap-5 w-full md:w-auto">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-20 h-20 object-contain rounded-2xl bg-gray-50 p-2 border border-gray-100 shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  {prod.condition}
                </span>
                <h3 className="text-sm font-bold text-gray-900">
                  {prod.name}
                </h3>
                <div className="text-xs text-gray-500">
                  รหัสสินค้า : <span className="font-mono">{prod.id}</span>
                </div>
              </div>
            </div>

            {/* Specs Summary */}
            <div className="flex-1 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 text-xs text-gray-600 space-y-1">
              {prod.specs ? (
                <>
                  <div>&bull; CPU: {prod.specs.cpu || '-'} &bull; Ram: {prod.specs.ram || '-'}</div>
                  <div>&bull; Rom: {prod.specs.rom || '-'} &bull; Battery: {prod.specs.battery || '-'}</div>
                </>
              ) : (
                <div className="text-gray-400">หมวดหมู่: {prod.category}</div>
              )}
            </div>

            {/* Price & Action Buttons matching Figma (ลบ & แก้ไข) */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
              <div className="text-right">
                <div className="text-base font-black text-[#15803d]">
                  ฿{prod.price.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDeleteProduct(prod)}
                  className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Trash2 size={13} />
                  <span>ลบ</span>
                </button>
                <button
                  onClick={() => alert(`แก้ไขรายการ ${prod.name}`)}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Edit size={13} />
                  <span>แก้ไข</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal matching Figma 'ต้องการเพิ่มสินค้านี้หรือไม่' */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 text-center mb-4">
              ต้องการเพิ่มสินค้านี้หรือไม่
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  ชื่อสินค้า
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Samsung Galaxy S24 Ultra 256GB"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    แบรนด์
                  </label>
                  <input
                    type="text"
                    placeholder="Samsung"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    ราคา (บาท)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="25000"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  หมวดหมู่
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                >
                  <option value="โทรศัพท์ & แท็บเล็ต">โทรศัพท์ & แท็บเล็ต</option>
                  <option value="คอมพิวเตอร์ & โน้ตบุ๊ก">คอมพิวเตอร์ & โน้ตบุ๊ก</option>
                  <option value="เกม & Gaming">เกม & Gaming</option>
                  <option value="เครื่องเสียง & หูฟัง">เครื่องเสียง & หูฟัง</option>
                  <option value="กล้อง, อุปกรณ์ถ่ายภาพ">กล้อง, อุปกรณ์ถ่ายภาพ</option>
                  <option value="ภาพและความบันเทิง / เครื่องใช้ไฟฟ้า">ภาพและความบันเทิง / เครื่องใช้ไฟฟ้า</option>
                  <option value="Smart Watch & Wearable">Smart Watch & Wearable</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-[#ef4444] hover:bg-[#dc2626] text-white py-2.5 rounded-xl font-bold transition"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white py-2.5 rounded-xl font-bold transition"
                >
                  เพิ่ม
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
