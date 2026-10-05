import React, { useState } from 'react';
import { ArrowLeft, QrCode, CreditCard, Landmark, CheckCircle2, Upload, FileImage, ShieldCheck } from 'lucide-react';

export default function CheckoutView({
  checkoutItems,
  onBackToCart,
  onPaymentSuccess
}) {
  const [formData, setFormData] = useState({
    fullName: 'สมชาย มั่นใจดี',
    phone: '0812345678',
    address: '123/45 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110'
  });

  const [paymentMethod, setPaymentMethod] = useState('QR');
  const [slipImage, setSlipImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = checkoutItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlipImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    onPaymentSuccess({
      ...formData,
      paymentMethod,
      totalAmount,
      items: checkoutItems,
      slipImage: slipImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400'
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <button
        onClick={onBackToCart}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-700 font-semibold mb-6 transition"
      >
        <ArrowLeft size={18} />
        <span>กลับไปที่ตะกร้า</span>
      </button>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: ที่อยู่ในการจัดส่ง */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 lg:p-8 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-gray-900 border-b pb-3">
            ที่อยู่ในการจัดส่ง
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">
                ชื่อ-นามสกุล
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                placeholder="กรอกชื่อและนามสกุล"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                placeholder="08X-XXX-XXXX"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">
                ที่อยู่จัดส่ง
              </label>
              <textarea
                rows={4}
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                placeholder="บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์"
              />
            </div>
          </div>

          {/* Items Summary in Checkout */}
          <div className="pt-3 border-t border-gray-100">
            <h3 className="text-xs font-bold text-gray-800 mb-2">รายการสินค้าที่สั่งซื้อ ({checkoutItems.length} ชิ้น)</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {checkoutItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl text-xs">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-contain bg-white rounded-lg p-1 border" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-[11px] text-gray-500">1 ชิ้น</p>
                  </div>
                  <div className="font-black text-emerald-700">฿{item.price.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: วิธีการชำระเงิน & QR Slip Upload */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 lg:p-8 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900 border-b pb-3 mb-5">
              เลือกวิธีการชำระเงิน
            </h2>

            <div className="space-y-3 mb-5">
              {[
                { id: 'QR', label: 'QR PromptPay (พร้อมเพย์)', icon: QrCode, desc: 'สแกนจ่ายผ่านแอปธนาคารทุกธนาคาร' },
                { id: 'PayPal', label: 'PayPal', icon: Landmark, desc: 'ชำระผ่านบัญชี PayPal ระหว่างประเทศ' },
                { id: 'CreditCard', label: 'บัตรเครดิต / เดบิต', icon: CreditCard, desc: 'Visa, Mastercard, JCB' }
              ].map((method) => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'border-[#22c55e] bg-emerald-50/50 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#22c55e] text-white' : 'bg-gray-100 text-gray-600'}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-gray-900">{method.label}</div>
                        <div className="text-[11px] text-gray-500">{method.desc}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 size={18} className="text-[#22c55e]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* PromptPay QR Display & Slip Upload Section */}
            {paymentMethod === 'QR' && (
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 mb-5 text-center">
                <div className="inline-block bg-white p-3 rounded-2xl border border-emerald-100 shadow-xs mb-3">
                  {/* Generated PromptPay QR Pattern */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=PROMPTPAY-0899999999-AMOUNT-${totalAmount}`}
                    alt="PromptPay QR Code"
                    className="w-36 h-36 mx-auto object-contain"
                  />
                  <div className="text-[10px] text-gray-500 mt-1 font-mono">PromptPay: 089-999-9999</div>
                  <div className="text-xs font-black text-emerald-800">ยอดชำระ: ฿{totalAmount.toLocaleString()}</div>
                </div>

                <div className="text-xs text-gray-600 mb-3">
                  สแกนจ่ายผ่านแอปธนาคาร แล้วแนบสลิปโอนเงินด้านล่างเพื่อยืนยันออเดอร์
                </div>

                {/* Slip Upload Input */}
                <div className="bg-white rounded-xl border border-dashed border-emerald-300 p-3">
                  <input
                    type="file"
                    id="slip-upload"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="slip-upload"
                    className="flex flex-col items-center justify-center cursor-pointer gap-1.5"
                  >
                    {slipImage ? (
                      <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                        <FileImage size={18} />
                        <span>แนบสลิปเรียบร้อยแล้ว (คลิกเพื่อเปลี่ยนรูป)</span>
                      </div>
                    ) : (
                      <>
                        <Upload size={18} className="text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-700">อัปโหลดสลิปโอนเงิน (Slip)</span>
                        <span className="text-[10px] text-gray-400">รองรับไฟล์ JPG, PNG</span>
                      </>
                    )}
                  </label>
                  {slipImage && (
                    <div className="mt-2 text-center">
                      <img src={slipImage} alt="Slip preview" className="w-20 h-20 object-cover mx-auto rounded-lg border shadow-xs" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Total Amount Summary */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6 flex justify-between items-center">
              <div>
                <div className="text-xs text-gray-500">ยอดชำระสุทธิ</div>
                <div className="text-2xl font-black text-[#15803d]">
                  ฿{totalAmount.toLocaleString()}
                </div>
              </div>
              <span className="text-[11px] bg-emerald-100/70 text-emerald-800 px-2.5 py-1 rounded-full font-semibold">
                ฟรีค่าจัดส่ง
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#22c55e] hover:bg-[#16a34a] disabled:bg-gray-300 text-white py-4 rounded-2xl font-black text-sm transition shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            {isSubmitting ? 'กำลังบันทึกคำสั่งซื้อ...' : 'ยืนยันการชำระ'}
          </button>
        </div>
      </form>
    </div>
  );
}
