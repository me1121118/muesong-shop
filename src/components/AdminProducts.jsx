import React, { useState } from 'react';
import { Plus, Trash2, Edit, Upload, Image as ImageIcon, X, Sparkles, CheckCircle } from 'lucide-react';

export default function AdminProducts({
  products,
  onDeleteProduct,
  onAddProduct,
  onUpdateProduct
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form state for Adding Product
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    category: 'โทรศัพท์ & แท็บเล็ต',
    subcategory: 'โทรศัพท์',
    price: '',
    originalPrice: '',
    image: '',
    condition: 'สินค้า ใหม่-เก่า',
    conditionDetail: 'สภาพดี 95% อุปกรณ์ครบกล่อง',
    specs: { cpu: '', ram: '', rom: '', battery: '', warranty: '3 เดือน' }
  });

  // Handle Image File Upload (Base64)
  const handleImageUpload = (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditingProduct(prev => ({ ...prev, image: reader.result }));
        } else {
          setNewProduct(prev => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    onAddProduct({
      ...newProduct,
      id: `A0${Math.floor(100000 + Math.random() * 900000)}`,
      price: Number(newProduct.price),
      originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : Number(newProduct.price) + 2000,
      image: newProduct.image || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600'
    });

    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      brand: '',
      category: 'โทรศัพท์ & แท็บเล็ต',
      subcategory: 'โทรศัพท์',
      price: '',
      originalPrice: '',
      image: '',
      condition: 'สินค้า ใหม่-เก่า',
      conditionDetail: 'สภาพดี 95% อุปกรณ์ครบกล่อง',
      specs: { cpu: '', ram: '', rom: '', battery: '', warranty: '3 เดือน' }
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct.name || !editingProduct.price) return;

    if (onUpdateProduct) {
      onUpdateProduct({
        ...editingProduct,
        price: Number(editingProduct.price),
        originalPrice: Number(editingProduct.originalPrice || editingProduct.price)
      });
    }
    setEditingProduct(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>รายการสินค้า (Inventory)</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {products.length} ชิ้น
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">จัดการคลังสินค้ามือสอง เพิ่ม ลบ และแก้ไขข้อมูลพร้อมรูปภาพ</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus size={16} />
          <span>เพิ่มสินค้า</span>
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        {products.map((prod) => (
          <div
            key={prod.id || prod._id}
            className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 transition hover:shadow-sm"
          >
            {/* Image & Basic Details */}
            <div className="flex items-center gap-5 w-full md:w-auto">
              <img
                src={prod.image || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600'}
                alt={prod.name}
                className="w-20 h-20 object-contain rounded-2xl bg-gray-50 p-2 border border-gray-100 shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-100">
                  {prod.condition || 'มือสอง'}
                </span>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
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

            {/* Price & Action Buttons */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
              <div className="text-right">
                <div className="text-base font-black text-[#15803d]">
                  ฿{prod.price?.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDeleteProduct(prod)}
                  className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>ลบ</span>
                </button>
                <button
                  onClick={() => setEditingProduct({ ...prod })}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Edit size={13} />
                  <span>แก้ไข</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL: เพิ่มสินค้า (Add Product) ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-gray-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="text-base font-bold text-gray-900">
                เพิ่มสินค้าใหม่
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              {/* Image Upload Area */}
              <div>
                <label className="block text-gray-700 font-bold mb-1.5">
                  รูปภาพสินค้า (อัปโหลดจากเครื่อง หรือ วางลิงก์รูป)
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center bg-gray-50/50 hover:bg-gray-50 transition">
                  {newProduct.image ? (
                    <div className="relative inline-block">
                      <img
                        src={newProduct.image}
                        alt="Preview"
                        className="w-32 h-32 object-contain mx-auto rounded-xl bg-white border p-1"
                      />
                      <button
                        type="button"
                        onClick={() => setNewProduct({ ...newProduct, image: '' })}
                        className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-sm hover:bg-rose-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id="add-product-img"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, false)}
                        className="hidden"
                      />
                      <label
                        htmlFor="add-product-img"
                        className="flex flex-col items-center justify-center cursor-pointer gap-2 py-2"
                      >
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
                          <Upload size={22} />
                        </div>
                        <span className="font-bold text-emerald-700 text-xs">คลิกเพื่อเลือกไฟล์รูปภาพจากเครื่อง</span>
                        <span className="text-[11px] text-gray-400">รองรับไฟล์ JPG, PNG, WebP</span>
                      </label>
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <input
                    type="url"
                    placeholder="หรือวางลิงก์รูปภาพ (Image URL) ที่นี่..."
                    value={newProduct.image.startsWith('data:') ? '' : newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  />
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  ชื่อสินค้า *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น iPhone 15 Pro Max 256GB สีไทเทเนียมธรรมชาติ"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                />
              </div>

              {/* Brand & Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    แบรนด์
                  </label>
                  <input
                    type="text"
                    placeholder="Apple, Samsung, Sony..."
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    ราคาขาย (บาท) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="29000"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  />
                </div>
              </div>

              {/* Category & Condition */}
              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    สภาพสินค้า
                  </label>
                  <input
                    type="text"
                    placeholder="สินค้า ใหม่-เก่า / สภาพ 98%"
                    value={newProduct.condition}
                    onChange={(e) => setNewProduct({ ...newProduct, condition: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  />
                </div>
              </div>

              {/* Specs (Bullet points) */}
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 space-y-2">
                <span className="text-[11px] font-bold text-gray-700 block">ข้อมูลสเปกเครื่อง (ย่อ)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="CPU (เช่น A17 Pro)"
                    value={newProduct.specs.cpu}
                    onChange={(e) => setNewProduct({ ...newProduct, specs: { ...newProduct.specs, cpu: e.target.value } })}
                    className="bg-white border rounded-lg px-2.5 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="RAM (เช่น 8GB)"
                    value={newProduct.specs.ram}
                    onChange={(e) => setNewProduct({ ...newProduct, specs: { ...newProduct.specs, ram: e.target.value } })}
                    className="bg-white border rounded-lg px-2.5 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="ความจุ ROM (เช่น 256GB)"
                    value={newProduct.specs.rom}
                    onChange={(e) => setNewProduct({ ...newProduct, specs: { ...newProduct.specs, rom: e.target.value } })}
                    className="bg-white border rounded-lg px-2.5 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    placeholder="แบตเตอรี่ (เช่น 100% สุขภาพแบต)"
                    value={newProduct.specs.battery}
                    onChange={(e) => setNewProduct({ ...newProduct, specs: { ...newProduct.specs, battery: e.target.value } })}
                    className="bg-white border rounded-lg px-2.5 py-1.5 text-xs"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-[#ef4444] hover:bg-[#dc2626] text-white py-2.5 rounded-xl font-bold transition cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white py-2.5 rounded-xl font-bold transition cursor-pointer"
                >
                  เพิ่มสินค้า
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: แก้ไขสินค้า (Edit Product) ================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-gray-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Edit size={16} className="text-[#22c55e]" />
                <span>แก้ไขข้อมูลสินค้า : {editingProduct.id}</span>
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              {/* Edit Image Upload Area */}
              <div>
                <label className="block text-gray-700 font-bold mb-1.5">
                  เปลี่ยนรูปภาพสินค้า
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center bg-gray-50/50">
                  {editingProduct.image ? (
                    <div className="relative inline-block">
                      <img
                        src={editingProduct.image}
                        alt="Editing preview"
                        className="w-32 h-32 object-contain mx-auto rounded-xl bg-white border p-1"
                      />
                      <button
                        type="button"
                        onClick={() => setEditingProduct({ ...editingProduct, image: '' })}
                        className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-sm hover:bg-rose-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        id="edit-product-img"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, true)}
                        className="hidden"
                      />
                      <label
                        htmlFor="edit-product-img"
                        className="flex flex-col items-center justify-center cursor-pointer gap-2 py-2"
                      >
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center">
                          <Upload size={22} />
                        </div>
                        <span className="font-bold text-emerald-700 text-xs">อัปโหลดรูปภาพใหม่</span>
                      </label>
                    </div>
                  )}
                </div>

                <div className="mt-2">
                  <input
                    type="url"
                    placeholder="หรือวางลิงก์รูปภาพใหม่ที่นี่..."
                    value={editingProduct.image.startsWith('data:') ? '' : editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  />
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  ชื่อสินค้า *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                />
              </div>

              {/* Brand & Price */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    แบรนด์
                  </label>
                  <input
                    type="text"
                    value={editingProduct.brand || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    ราคาขาย (บาท) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                  />
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  สภาพสินค้า
                </label>
                <input
                  type="text"
                  value={editingProduct.condition || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, condition: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-[#ef4444] hover:bg-[#dc2626] text-white py-2.5 rounded-xl font-bold transition cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white py-2.5 rounded-xl font-bold transition cursor-pointer"
                >
                  บันทึกการแก้ไข
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
