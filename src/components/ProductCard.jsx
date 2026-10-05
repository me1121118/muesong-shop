import React from 'react';
import { ShoppingBag, ShieldCheck, Minus, CheckCircle } from 'lucide-react';

export default function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
  isAdmin = false,
  onDeleteProduct
}) {
  const isSold = product.status === 'sold';

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group relative ${isSold ? 'opacity-75' : ''}`}>
      {/* Admin Floating Minus / Delete Button matching Figma Screenshot 210309 */}
      {isAdmin && onDeleteProduct && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteProduct(product);
          }}
          title="ลบสินค้านี้"
          className="absolute top-3 right-3 z-20 w-7 h-7 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110 cursor-pointer"
        >
          <Minus size={16} strokeWidth={3} />
        </button>
      )}

      {/* Product Image Container */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative bg-gray-50 h-56 flex items-center justify-center p-4 cursor-pointer overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Condition Badge */}
        <span className="absolute top-3 left-3 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 z-10">
          <ShieldCheck size={12} />
          {product.condition}
        </span>

        {/* Sold Badge Overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <span className="bg-rose-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
              ขายแล้ว (Sold Out)
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
            {product.brand} &bull; {product.subcategory || product.category}
          </span>
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-sm font-bold text-gray-900 line-clamp-2 mt-1 hover:text-[#16a34a] cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            {product.conditionDetail || 'มือสองสภาพดี รับประกันสินค้าแท้'}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-black text-gray-900 tracking-tight">
              ฿{product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ฿{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            disabled={isSold}
            onClick={() => !isSold && onAddToCart(product)}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs ${
              isSold
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#22c55e] hover:bg-[#16a34a] text-white cursor-pointer'
            }`}
          >
            <ShoppingBag size={14} />
            <span>{isSold ? 'ขายแล้ว' : 'เพิ่มในตะกร้า'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
