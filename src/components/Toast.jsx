import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Floating Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold backdrop-blur-md border transition-all animate-in slide-in-from-top-3 fade-in duration-200 ${
              toast.type === 'error'
                ? 'bg-rose-50/95 text-rose-900 border-rose-200'
                : toast.type === 'info'
                ? 'bg-sky-50/95 text-sky-900 border-sky-200'
                : 'bg-emerald-50/95 text-emerald-950 border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'error' && <AlertCircle size={18} className="text-rose-600 shrink-0" />}
              {toast.type === 'info' && <Info size={18} className="text-sky-600 shrink-0" />}
              {toast.type === 'success' && <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />}
              <span className="line-clamp-2 leading-tight">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-700 p-0.5 rounded-lg transition"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
