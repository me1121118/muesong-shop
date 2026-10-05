import React from 'react';
import { X, Check } from 'lucide-react';

export function PurchaseConfirmModal({ isOpen, onClose, onConfirm, product }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 text-center border border-gray-200 animate-in fade-in zoom-in-95 duration-150 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-4">
          ต้องการซื้อหรือไม่
        </h3>

        {/* Product Preview Card */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 mb-6 flex gap-4 text-left">
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 object-contain rounded-xl bg-white p-2 border border-gray-100 shrink-0"
          />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-gray-900 line-clamp-2">
              {product.name}
            </h4>
            <div className="text-[11px] text-gray-400">
              รหัสสินค้า : {product.id}
            </div>
            {product.specs && (
              <div className="text-[10px] text-gray-500 line-clamp-2">
                CPU: {product.specs.cpu} | RAM: {product.specs.ram} | ROM: {product.specs.rom}
              </div>
            )}
            <div className="text-base font-black text-[#15803d] pt-1">
              ฿{product.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Buttons: Cancel & Go to Payment */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="bg-[#ef4444] hover:bg-[#dc2626] text-white py-3 px-4 rounded-xl font-bold text-sm transition"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 px-4 rounded-xl font-bold text-sm transition"
          >
            ไปที่ช่องทางชำระ
          </button>
        </div>
      </div>
    </div>
  );
}

export function ActionConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  subtitle,
  itemPreview,
  confirmText = 'ยืนยัน',
  confirmColor = 'green'
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-500 mb-4">{subtitle}</p>
        )}

        {itemPreview && (
          <div className="my-4 p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-left">
            {itemPreview}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-[#ef4444] hover:bg-[#dc2626] text-white py-2.5 px-4 rounded-xl font-bold text-xs transition"
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className={`${
              confirmColor === 'red'
                ? 'bg-[#ef4444] hover:bg-[#dc2626]'
                : 'bg-[#22c55e] hover:bg-[#16a34a]'
            } text-white py-2.5 px-4 rounded-xl font-bold text-xs transition`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export function SuccessModal({ isOpen, onClose, message = 'สำเร็จ' }) {
  React.useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, 1800);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xs w-full p-8 text-center border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
        <div className="w-20 h-20 bg-[#22c55e] rounded-full mx-auto flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 mb-4 animate-bounce">
          <Check size={44} strokeWidth={3} />
        </div>
        <h3 className="text-lg font-black text-gray-900 mb-4">
          {message}
        </h3>
        <button
          onClick={onClose}
          className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-2.5 rounded-xl font-bold text-xs transition cursor-pointer"
        >
          ตกลง
        </button>
      </div>
    </div>
  );
}
