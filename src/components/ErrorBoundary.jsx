import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center font-sans">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl max-w-md w-full p-8 space-y-4">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-xl font-bold text-gray-900">เกิดข้อผิดพลาดบางอย่าง</h1>
            <p className="text-xs text-gray-500 leading-relaxed">
              ขออภัยในความไม่สะดวก ระบบพบข้อผิดพลาดที่ไม่คาดคิด กรุณารีเฟรชหน้าเว็บหรือลองใหม่อีกครั้ง
            </p>
            {this.state.error?.message && (
              <pre className="text-[11px] bg-gray-100 p-3 rounded-xl text-left overflow-auto text-rose-800 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReload}
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <RefreshCw size={14} />
              <span>โหลดหน้าเว็บใหม่</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
