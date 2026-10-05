import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Zap, ShieldCheck, Truck, Trash2, Edit } from 'lucide-react';

export default function ProductDetail({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  isAdmin = false,
  onDeleteProduct
}) {
  const [selectedImg, setSelectedImg] = useState(product?.image);

  if (!product) return null;

  const isSold = product.status === 'sold';

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Bar: Back & Admin Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 font-semibold transition"
        >
          <ArrowLeft size={18} />
          <span>กลับหน้ารายการสินค้า</span>
        </button>

        {isAdmin && (
          <div className="flex items-center gap-2">
            {onDeleteProduct && (
              <button
                onClick={() => onDeleteProduct(product)}
                className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Trash2 size={13} />
                <span>ลบสินค้า</span>
              </button>
            )}
            <button
              onClick={() => alert(`แก้ไขข้อมูล: ${product.name}`)}
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Edit size={13} />
              <span>แก้ไขข้อมูล</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Product Section */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl h-96 flex items-center justify-center p-6 overflow-hidden relative">
            <img
              src={selectedImg || product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
            {isSold && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-rose-600 text-white font-bold text-sm px-4 py-1.5 rounded-full shadow-lg">
                  สินค้านี้ขายแล้ว (Sold Out)
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {product.additionalImages && product.additionalImages.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedImg(product.image)}
                className={`w-20 h-20 rounded-xl border-2 p-1 bg-gray-50 overflow-hidden ${
                  selectedImg === product.image ? 'border-[#22c55e]' : 'border-gray-200'
                }`}
              >
                <img src={product.image} alt="main" className="w-full h-full object-contain" />
              </button>
              {product.additionalImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(img)}
                  className={`w-20 h-20 rounded-xl border-2 p-1 bg-gray-50 overflow-hidden ${
                    selectedImg === img ? 'border-[#22c55e]' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {product.condition || 'สินค้ามือสอง'}
                </span>
                {isSold && (
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                    ขายแล้ว
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-black text-gray-900 mt-2">
                {product.name}
              </h1>
              <div className="text-xs text-gray-400 mt-1">
                รหัสสินค้า : <span className="font-mono text-gray-600">{product.id}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-gray-500 font-semibold block">ราคาพิเศษ</span>
                <span className="text-3xl font-black text-[#15803d]">
                  ฿{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through ml-3">
                    ฿{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-100/60 px-2 py-1 rounded-md">
                  ประหยัด ฿{(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>

            {/* Specifications (Bullet points matching Figma) */}
            {product.specs && (
              <div className="border border-gray-100 rounded-2xl p-4 bg-white shadow-xs space-y-2">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                  ข้อมูลสเปกเครื่อง (Specifications)
                </h4>
                <ul className="text-xs space-y-1.5 text-gray-700">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <li key={key} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">&bull;</span>
                      <span className="font-medium text-gray-500 capitalize">{key}:</span>
                      <span className="font-semibold text-gray-800">{val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warranty & Delivery Info */}
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-600 pt-2">
              <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                <span>การรับประกัน : <strong>{product.specs?.warranty || '3 เดือน'}</strong></span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                <Truck size={18} className="text-emerald-600 shrink-0" />
                <span>การจัดส่ง : <strong>{product.specs?.delivery || 'ส่งด่วนฟรี'}</strong></span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="pt-6 border-t border-gray-100 mt-6 grid grid-cols-2 gap-3">
            <button
              disabled={isSold}
              onClick={() => !isSold && onAddToCart(product)}
              className={`py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-sm ${
                isSold
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#22c55e] hover:bg-[#16a34a] text-white cursor-pointer'
              }`}
            >
              <ShoppingCart size={18} />
              <span>{isSold ? 'ขายแล้ว' : 'เพิ่มในตะกร้า'}</span>
            </button>
            <button
              disabled={isSold}
              onClick={() => !isSold && onBuyNow(product)}
              className={`py-3.5 px-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition shadow-md shadow-emerald-500/20 ${
                isSold
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#10b981] hover:bg-[#059669] text-white cursor-pointer'
              }`}
            >
              <Zap size={18} />
              <span>{isSold ? 'ขายแล้ว' : 'ซื้อ'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
