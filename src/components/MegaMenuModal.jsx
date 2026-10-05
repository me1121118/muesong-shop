import React, { useState } from 'react';
import { X, ChevronRight, Smartphone, Laptop, Gamepad2, Headphones, Camera, Tv, Watch } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categories';

const ICON_MAP = {
  Smartphone,
  Laptop,
  Gamepad2,
  Headphones,
  Camera,
  Tv,
  Watch
};

export default function MegaMenuModal({ isOpen, onClose, onSelectCategory }) {
  const [selectedCatId, setSelectedCatId] = useState(CATEGORIES_DATA[0].id);

  if (!isOpen) return null;

  const currentCategory = CATEGORIES_DATA.find(c => c.id === selectedCatId) || CATEGORIES_DATA[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#22c55e] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">หมวดหมู่สินค้า</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">เลือกค้นหาตามความต้องการ</span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-1.5 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body: 2 Columns like in Figma Frame 2 / Frame 13 */}
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-[420px]">
          {/* Left Column: Categories List */}
          <div className="md:col-span-1 bg-gray-50 border-r border-gray-200 p-3 space-y-1">
            <div className="text-xs font-semibold text-gray-500 uppercase px-3 py-1">หมวดหมู่หลัก</div>
            {CATEGORIES_DATA.map((cat) => {
              const IconComp = ICON_MAP[cat.icon] || Smartphone;
              const isSelected = cat.id === selectedCatId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition font-medium ${
                    isSelected
                      ? 'bg-[#22c55e] text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-200/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp size={18} />
                    <span className="text-xs">{cat.name}</span>
                  </div>
                  <ChevronRight size={14} className={isSelected ? 'text-white' : 'text-gray-400'} />
                </button>
              );
            })}
          </div>

          {/* Right Area: Subcategories & Items */}
          <div className="md:col-span-2 p-6 bg-white overflow-y-auto max-h-[460px]">
            <div className="border-b pb-3 mb-4 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <span>{currentCategory.name}</span>
              </h3>
              <button
                onClick={() => {
                  onSelectCategory(currentCategory.name, null);
                  onClose();
                }}
                className="text-xs text-[#16a34a] hover:underline font-semibold"
              >
                ดูทั้งหมดในหมวดนี้ &rarr;
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {currentCategory.subcategories.map((sub, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-800 border-b border-gray-200 pb-1">
                    {sub.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {sub.items.map((item, i) => (
                      <li key={i}>
                        <button
                          onClick={() => {
                            onSelectCategory(currentCategory.name, item);
                            onClose();
                          }}
                          className="text-xs text-gray-600 hover:text-[#16a34a] hover:font-semibold transition text-left block w-full py-0.5"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
