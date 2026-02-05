
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, GraduationCap, Heart } from 'lucide-react';
import { AccountType } from '../types';
import { AuthService } from '@/api/services/auth.service';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedType, setSelectedType] = useState<AccountType>(AccountType.TRAINEE);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  //جديد 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //جديد
    setLoading(true);
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة ');
      setLoading(false);
      return;
    }
    try {
      const payload = {
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        role_id: selectedType === AccountType.TRAINEE ? 3 : 4
      };
      const res = await AuthService.signup(payload);
      console.log('Signup response', res);

      setShowSuccess(true);
      setTimeout(() => {
        //هون لازم توجهو لل login لان مافي token بعد تسجيل المستخدم الجديد
        //  navigate('/login');

      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء إنشاء الحساب.');
    } finally {
      setLoading(false);

    }

  };

  return (
    <div className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">حساب جديد</h1>
        <p className="text-gray-400">ابدأ رحلتك التعليمية مع الذكاء الاصطناعي</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Success Dialog */}
        {showSuccess && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setShowSuccess(false)}
          >
            <div
              className="bg-[#1c2533] p-6 rounded-xl shadow-lg text-white w-80 text-center animate-in scale-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-2">تم إنشاء الحساب بنجاح!</h3>
              <p className="text-gray-400">سيتم تحويلك إلى لوحة التحكم...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="bg-red-600/30 text-red-700 p-3 rounded-lg text-sm text-center mb-3 animate-in fade-in duration-300">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            الاسم الكامل <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="أدخل اسمك بالكامل"
              className="w-full bg-[#1c2533] border border-gray-700 rounded-xl py-3 px-10 text-right text-gray-200 focus:outline-none focus:border-blue-500 transition-all"
            />
            <User className="absolute left-3 top-3.5 text-gray-500" size={18} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            البريد الإلكتروني <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@sharaf-ai.com"
              className="w-full bg-[#1c2533] border border-gray-700 rounded-xl py-3 px-10 text-right text-gray-200 focus:outline-none focus:border-blue-500 transition-all"
            />
            <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              كلمة المرور <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-[#1c2533] border border-gray-700 rounded-xl py-3 px-10 text-right text-gray-200 focus:outline-none focus:border-blue-500 transition-all"
              />
              <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              تأكيد كلمة المرور <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="أعد إدخال كلمة المرور"
                className="w-full bg-[#1c2533] border border-gray-700 rounded-xl py-3 px-10 text-right text-gray-200 focus:outline-none focus:border-blue-500 transition-all"
              />
              <Lock className="absolute left-3 top-3.5 text-gray-500" size={18} />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">نوع الحساب</label>
          <div className="grid grid-cols-2 gap-4">
            {/* Trainee Option */}
            <button
              type="button"
              onClick={() => setSelectedType(AccountType.TRAINEE)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-2 ${selectedType === AccountType.TRAINEE
                  ? 'border-blue-600 bg-blue-600/10 text-white'
                  : 'border-gray-800 bg-[#1c2533] text-gray-400 hover:border-gray-600'
                }`}
            >
              <GraduationCap size={24} />
              <span className="font-medium">متدرب</span>
            </button>

            {/* Volunteer Option */}
            <button
              type="button"
              onClick={() => setSelectedType(AccountType.VOLUNTEER)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all gap-2 ${selectedType === AccountType.VOLUNTEER
                  ? 'border-blue-600 bg-blue-600/10 text-white'
                  : 'border-gray-800 bg-[#1c2533] text-gray-400 hover:border-gray-600'
                }`}
            >
              <Heart size={24} />
              <span className="font-medium">متطوع</span>
            </button>
          </div>
        </div>

        <div className="bg-black/20 p-3 rounded-lg text-xs text-gray-400 text-center">
          {selectedType === AccountType.TRAINEE
            ? 'سيكون لديك صلاحية الوصول إلى الدورات والمهام التعليمية.'
            : 'سيكون لديك صلاحية المساهمة في المشاريع ودعم المتدربين.'}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20"
          disabled={loading}
        >
          {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
        </button>
      </form>

      <div className="mt-6 text-center text-gray-400">
        هل لديك حساب بالفعل؟{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-blue-500 hover:text-blue-400 font-semibold"
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
