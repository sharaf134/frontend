
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { AuthService } from '@/api/services/auth.service';

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // جديد
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //جديد
    setLoading(true);
    setError(null);
    try {
      const data = { email, password };
      const res = await AuthService.login(data);
      console.log('login response:', res);
      localStorage.setItem('token', res.token);
      setShowSuccess(true);
       setTimeout(() => {
        //هون بتحط nvaigation الخاص فيك
      // navigate('/dashboard');
    }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة اخرى')
    } finally {
      setLoading(false);
    }


  };

  return (
    <div className="w-full max-w-md animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">تسجيل الدخول</h1>
        <p className="text-gray-400">مرحباً بك في منصة Sharaf AI المتطورة</p>
      </div>
        {/* جديد */}
      <form onSubmit={handleSubmit} className="space-y-6">
       {/* جديد */}
       {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick = {()=>setShowSuccess(false)}>

          <div className="bg-[#1c2533] p-6 rounded-xl shadow-lg text-white w-80 text-center animate-in scale-in duration-300">
            <h3 className="text-lg font-bold mb-2">تم تسجيل الدخول بنجاح!</h3>
            <p className="text-gray-400">سيتم تحويلك إلى لوحة التحكم...</p>
          </div>
        </div>
      )}
    
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            البريد الإلكتروني <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@sharaf-ai.com"
              className="w-full bg-[#1c2533] border border-gray-700 rounded-xl py-3 px-10 text-right text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
            <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            كلمة المرور <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#1c2533] border border-gray-700 rounded-xl py-3 px-10 text-right text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
            <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-300">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-600" />
            تذكرني
          </label>
          <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors">
            نسيت كلمة المرور؟
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20"
          disabled={loading}
        >
          {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}

        </button>
      </form>
     

      <div className="mt-8 text-center text-gray-400">
        لا تملك حساباً بعد؟{' '}
        <button
          onClick={onSwitchToSignup}
          className="text-blue-500 hover:text-blue-400 font-semibold"
        >
          إنشاء حساب جديد
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
