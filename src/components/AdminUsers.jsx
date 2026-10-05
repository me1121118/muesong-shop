import React from 'react';
import { Trash2, Edit } from 'lucide-react';

export default function AdminUsers({
  users,
  onDeleteUser
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>ผู้ใช้งาน (Users)</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {users.length} คน
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">จัดการรายชื่อผู้ใช้งานและประวัติคำสั่งซื้อในระบบ</p>
        </div>
      </div>

      <div className="space-y-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Pixel Avatar & Core Info matching Figma Screenshot 210344 */}
            <div className="flex items-center gap-5 w-full md:w-auto">
              {/* Exact pixel avatar frame */}
              <div className="w-20 h-20 bg-white border-2 border-sky-400 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden relative shadow-sm">
                <div className="w-12 h-12 bg-amber-200 rounded-md flex flex-col items-center justify-center relative">
                  {/* Pixel eyes and hair */}
                  <div className="w-10 h-3 bg-gray-700 rounded-xs -mt-5"></div>
                  <div className="flex gap-2 mt-1">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-xs"></div>
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-xs"></div>
                  </div>
                  <div className="w-12 h-4 bg-sky-600 rounded-xs mt-3"></div>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-gray-400">ชื่อผู้ใช้ :</span>{' '}
                  <strong className="text-gray-900 text-sm">{u.name}</strong>
                  {u.role === 'admin' && (
                    <span className="ml-2 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      ผู้ดูแลระบบ
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-gray-400">รหัสผู้ใช้ :</span>{' '}
                  <span className="font-mono text-gray-700">{u.id}</span>
                </div>
                <div>
                  <span className="text-gray-400">เบอร์โทรศัพท์ :</span>{' '}
                  <span className="font-medium text-gray-800">{u.phone}</span>
                </div>
              </div>
            </div>

            {/* Address & History */}
            <div className="flex-1 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 space-y-2 text-xs">
              <div>
                <span className="text-gray-400 font-semibold block">&bull; ที่อยู่</span>
                <p className="text-gray-600 text-[11px] line-clamp-2">{u.address}</p>
              </div>
              <div>
                <span className="text-gray-400 font-semibold block">&bull; ประวัติคำสั่งซื้อ</span>
                <span className="font-mono text-emerald-600 font-bold text-[11px]">
                  {u.orderHistoryCode || 'ORD-2026-0001'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0">
              <button
                onClick={() => onDeleteUser(u)}
                className="bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <Trash2 size={13} />
                <span>ลบ</span>
              </button>
              <button
                onClick={() => alert(`แก้ไขข้อมูล: ${u.name}`)}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <Edit size={13} />
                <span>แก้ไข</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
