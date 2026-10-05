import React, { useState } from 'react';
import { Clock, QrCode, Trash2, CheckCircle2, Truck, ExternalLink, Image as ImageIcon } from 'lucide-react';

export default function AdminOrders({
  orders,
  onDeleteOrder,
  onUpdateOrderStatus
}) {
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ชำระเงินแล้ว':
      case 'paid':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">ชำระเงินแล้ว</span>;
      case 'จัดส่งแล้ว':
      case 'shipped':
        return <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">จัดส่งแล้ว</span>;
      default:
        return <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">รอตรวจสอบสลิป</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>คำสั่งซื้อ (Orders)</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {orders.length} รายการ
            </span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">จัดการคำสั่งซื้อ ตรวจสอบสลิปการโอนเงิน และอัปเดตสถานะจัดส่ง</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 p-16 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Clock size={36} />
          </div>
          <h3 className="text-sm font-bold text-gray-700 mb-1">ยังไม่มีคำสั่งซื้อใหม่</h3>
          <p className="text-xs text-gray-400">เมื่อลูกค้าทำรายการสั่งซื้อ รายการจะมาปรากฏที่นี่</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id || order._id}
              className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              {/* Product Info */}
              <div className="md:col-span-5 flex gap-4">
                <img
                  src={order.productImage || order.items?.[0]?.image || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600'}
                  alt={order.productName || 'Order Product'}
                  className="w-24 h-24 object-contain rounded-2xl bg-gray-50 p-2 border border-gray-100 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
                    {order.productName || order.items?.[0]?.name || 'สินค้ามือสอง'}
                  </h3>
                  <div className="text-xs text-gray-500">
                    รหัสสินค้า : <span className="font-mono">{order.productCode || order.items?.[0]?.productId || 'A0184613'}</span>
                  </div>
                  {order.specsSummary && (
                    <div className="text-[11px] text-gray-400 line-clamp-1">
                      {order.specsSummary}
                    </div>
                  )}
                  <div className="text-base font-black text-[#15803d] pt-1">
                    ฿{order.price?.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Buyer & Address Info */}
              <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 space-y-1.5 text-xs text-gray-700">
                <div>
                  <span className="text-gray-400">ชื่อผู้สั่ง :</span>{' '}
                  <strong className="text-gray-900">{order.buyerName}</strong>
                </div>
                <div>
                  <span className="text-gray-400">รหัสคำสั่งซื้อ :</span>{' '}
                  <span className="font-mono text-gray-600">{order.code || order.id}</span>
                </div>
                <div>
                  <span className="text-gray-400">เบอร์โทร :</span>{' '}
                  <span className="font-medium">{order.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400">ที่อยู่จัดส่ง :</span>{' '}
                  <p className="text-[11px] text-gray-600 line-clamp-2">{order.address}</p>
                </div>
              </div>

              {/* Receipt Slip & Actions */}
              <div className="md:col-span-3 flex flex-col items-center md:items-end justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6">
                <button
                  onClick={() => setSelectedReceipt(order)}
                  className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer"
                >
                  <ImageIcon size={15} />
                  <span>ตรวจสลิป / หลักฐาน</span>
                </button>

                <div className="flex items-center gap-2 w-full">
                  <button
                    onClick={() => onDeleteOrder(order)}
                    className="flex-1 bg-[#ef4444] hover:bg-[#dc2626] text-white py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={13} />
                    <span>ยกเลิก</span>
                  </button>
                  <button
                    onClick={() => {
                      if (onUpdateOrderStatus) {
                        onUpdateOrderStatus(order.id, 'จัดส่งแล้ว');
                      } else {
                        alert(`อัปเดตสถานะเป็น "จัดส่งแล้ว" เรียบร้อย`);
                      }
                    }}
                    className="flex-1 bg-[#22c55e] hover:bg-[#16a34a] text-white py-2 px-3 rounded-xl text-xs font-bold transition text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 size={13} />
                    <span>อนุมัติ</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slip / Receipt Preview Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center border border-gray-200">
            <h3 className="font-bold text-gray-900 text-sm mb-3">
              หลักฐานการชำระเงิน (Payment Slip)
            </h3>

            {/* Display real slip image or fallback QR */}
            <div className="bg-gray-100 p-3 rounded-2xl flex items-center justify-center mb-4 max-h-72 overflow-hidden border">
              {selectedReceipt.slipImage ? (
                <img
                  src={selectedReceipt.slipImage}
                  alt="สลิปโอนเงิน"
                  className="max-h-64 object-contain rounded-xl"
                />
              ) : (
                <div className="p-6 text-center">
                  <QrCode size={100} className="text-gray-700 mx-auto mb-2" />
                  <p className="text-[11px] text-gray-500">QR Code ชำระเงินระบบพร้อมเพย์</p>
                </div>
              )}
            </div>

            <div className="text-xs text-gray-600 space-y-1 mb-4 text-left bg-gray-50 p-3 rounded-xl">
              <div><span className="text-gray-400">คำสั่งซื้อ:</span> <span className="font-mono font-bold">{selectedReceipt.code || selectedReceipt.id}</span></div>
              <div><span className="text-gray-400">ผู้โอน:</span> <strong>{selectedReceipt.buyerName}</strong></div>
              <div><span className="text-gray-400">ยอดเงิน:</span> <strong className="text-[#15803d]">฿{selectedReceipt.price?.toLocaleString()}</strong></div>
              <div><span className="text-gray-400">สถานะ:</span> {selectedReceipt.status || 'รอตรวจสอบสลิป'}</div>
            </div>

            <button
              onClick={() => setSelectedReceipt(null)}
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-2.5 rounded-xl font-bold text-xs cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
