import React, { useState } from 'react';
import { X, UserCircle2 } from 'lucide-react';
import { REGISTERED_ACCOUNTS } from '../data/mockData';

export default function AuthModals({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!isOpen) return null;

  // Single unified login check: automatically detects admin vs user
  const handleLogin = (e) => {
    e.preventDefault();
    const cleanInput = (email || '').trim().toLowerCase();

    // Check predefined registered accounts
    const matchedAccount = REGISTERED_ACCOUNTS.find(
      acc => acc.email.toLowerCase() === cleanInput || acc.username.toLowerCase() === cleanInput
    );

    let resolvedRole = 'user';
    let resolvedName = 'ลูกค้าทั่วไป';

    if (matchedAccount) {
      resolvedRole = matchedAccount.role;
      resolvedName = matchedAccount.name;
    } else if (cleanInput.includes('admin')) {
      // Any email with "admin" is identified as admin
      resolvedRole = 'admin';
      resolvedName = 'ผู้ดูแลระบบ (Admin)';
    } else {
      resolvedRole = 'user';
      resolvedName = cleanInput.split('@')[0] || 'ลูกค้าทั่วไป';
    }

    onLoginSuccess({
      email: cleanInput || 'user@example.com',
      name: resolvedName,
      role: resolvedRole
    });
    onClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const cleanInput = (email || '').trim().toLowerCase();
    const isNewAdmin = cleanInput.includes('admin');

    onLoginSuccess({
      email: cleanInput,
      name: fullName || 'ลูกค้าใหม่',
      role: isNewAdmin ? 'admin' : 'user'
    });
    onClose();
  };

  const handleGuest = () => {
    onLoginSuccess({
      email: 'guest@muesong.com',
      name: 'ผู้เยี่ยมชม (Guest)',
      role: 'user'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 relative border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full"
        >
          <X size={20} />
        </button>

        {mode === 'login' ? (
          <div>
            {/* Header matching Figma Frame 3 */}
            <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
              ยินดีต้อนรับ
            </h2>

            {/* Single Unified Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  อีเมล
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@muesong.com หรือ user@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                />
              </div>

              {/* Login Button (เขียวสด matching Figma) */}
              <button
                type="submit"
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 rounded-xl font-bold text-xs transition shadow-sm"
              >
                เข้าสู่ระบบ
              </button>

              {/* Register Button (เขียวเข้ม matching Figma) */}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="w-full bg-[#15803d] hover:bg-[#166534] text-white py-3 rounded-xl font-bold text-xs transition"
              >
                สมัครสมาชิก
              </button>
            </form>

            {/* Hint Box for Testing */}
            <div className="mt-4 p-2.5 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-500 text-center space-y-1">
              <div>
                🛡️ <strong>แอดมิน:</strong> กรอก <code className="text-emerald-700 font-mono bg-emerald-50 px-1 py-0.5 rounded">admin@muesong.com</code>
              </div>
              <div>
                👤 <strong>ลูกค้า:</strong> กรอกอีเมลทั่วไป เช่น <code className="text-gray-700 font-mono bg-gray-100 px-1 py-0.5 rounded">user@example.com</code>
              </div>
            </div>

            {/* Social Logins matching Figma Frame 3 */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  onLoginSuccess({ name: 'Google User', email: 'user@gmail.com', role: 'user' });
                  onClose();
                }}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-red-500 hover:bg-gray-50 shadow-xs font-bold text-xs"
                title="เข้าสู่ระบบด้วย Google"
              >
                G
              </button>
              <button
                onClick={() => {
                  onLoginSuccess({ name: 'Facebook User', email: 'user@facebook.com', role: 'user' });
                  onClose();
                }}
                className="w-9 h-9 rounded-full bg-[#1877f2] text-white flex items-center justify-center hover:opacity-90 shadow-xs font-bold text-xs"
                title="เข้าสู่ระบบด้วย Facebook"
              >
                f
              </button>
              <button
                onClick={() => {
                  onLoginSuccess({ name: 'X User', email: 'user@x.com', role: 'user' });
                  onClose();
                }}
                className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 shadow-xs font-bold text-xs"
                title="เข้าสู่ระบบด้วย X"
              >
                𝕏
              </button>
              <button
                onClick={handleGuest}
                className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 shadow-xs"
                title="ใช้งานแบบบุคคลทั่วไป"
              >
                <UserCircle2 size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Register Form matching Figma Frame 4 */}
            <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
              สมัครสมาชิก
            </h2>

            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  อีเมล
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  ชื่อ-สกุล
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ชื่อและนามสกุล"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#22c55e]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#15803d] hover:bg-[#166534] text-white py-3 rounded-xl font-bold text-xs transition"
              >
                สมัครสมาชิก
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-center text-xs text-gray-500 hover:text-gray-800 pt-2 block"
              >
                มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
