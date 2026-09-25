import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: { name: string; role: 'donor' | 'recipient' }) => void;
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'recipient' as 'donor' | 'recipient',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const name = isSignUp
        ? `${formData.firstName} ${formData.lastName}`
        : formData.email.split('@')[0];
      onLogin({ name, role: formData.role });
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4" style={{ background: 'var(--grey-50)' }}>
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-xl)' }}>
        
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex flex-col justify-between p-10 relative" style={{ background: 'linear-gradient(135deg, var(--green-700) 0%, #145743 100%)' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-60 h-60 rounded-full" style={{ background: 'white', filter: 'blur(60px)' }} />
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full" style={{ background: 'white', filter: 'blur(80px)' }} />
          </div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">FoodFlow</span>
            </div>
            <h2 className="text-3xl font-bold text-white leading-tight mb-4">
              Join the movement against food waste.
            </h2>
            <p className="text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Connect with your community to share surplus food safely. Every meal saved is a step toward zero waste.
            </p>
          </div>

          <div className="relative space-y-4 mt-8">
            {[
              { icon: '🍽️', text: 'Real-time expiry tracking keeps food safe' },
              { icon: '🔒', text: 'Secure pickup codes prevent fraud' },
              { icon: '⚡', text: 'Instant notifications for urgent listings' },
              { icon: '🤝', text: 'Verified donors and recipients you can trust' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="relative">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              © 2025 FoodFlow. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="p-8 sm:p-10">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--green-700)' }}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold" style={{ color: 'var(--green-700)' }}>FoodFlow</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-sm" style={{ color: 'var(--grey-500)' }}>
              {isSignUp
                ? 'Join FoodFlow to start donating or receiving food.'
                : 'Sign in to access your dashboard and listings.'}
            </p>
          </div>

          {/* Role Toggle */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'recipient' })}
              className="p-3 rounded-xl text-center transition-all"
              style={{
                background: formData.role === 'recipient' ? 'var(--green-50)' : 'var(--grey-50)',
                border: `2px solid ${formData.role === 'recipient' ? 'var(--green-500)' : 'var(--grey-200)'}`,
              }}
            >
              <span className="text-2xl mb-1 block">🙋</span>
              <span className="text-sm font-semibold" style={{ color: formData.role === 'recipient' ? 'var(--green-700)' : 'var(--grey-700)' }}>
                I need food
              </span>
              <span className="text-xs block" style={{ color: 'var(--grey-500)' }}>Recipient</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'donor' })}
              className="p-3 rounded-xl text-center transition-all"
              style={{
                background: formData.role === 'donor' ? 'var(--green-50)' : 'var(--grey-50)',
                border: `2px solid ${formData.role === 'donor' ? 'var(--green-500)' : 'var(--grey-200)'}`,
              }}
            >
              <span className="text-2xl mb-1 block">🍱</span>
              <span className="text-sm font-semibold" style={{ color: formData.role === 'donor' ? 'var(--green-700)' : 'var(--grey-700)' }}>
                I have food
              </span>
              <span className="text-xs block" style={{ color: 'var(--grey-500)' }}>Donor</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sign Up Fields */}
            {isSignUp && (
              <div className="grid grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="form-label">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--grey-400)' }} />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="form-input pl-10"
                      placeholder="Rahim"
                    />
                  </div>
                  {errors.firstName && <p className="text-xs mt-1" style={{ color: 'var(--red-600)' }}>{errors.firstName}</p>}
                </div>
                <div>
                  <label className="form-label">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--grey-400)' }} />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="form-input pl-10"
                      placeholder="Ahmed"
                    />
                  </div>
                  {errors.lastName && <p className="text-xs mt-1" style={{ color: 'var(--red-600)' }}>{errors.lastName}</p>}
                </div>
              </div>
            )}

            {isSignUp && (
              <div className="animate-fade-in">
                <label className="form-label">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--grey-400)' }} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input pl-10"
                    placeholder="+880 1712 345678"
                  />
                </div>
                {errors.phone && <p className="text-xs mt-1" style={{ color: 'var(--red-600)' }}>{errors.phone}</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="form-label">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--grey-400)' }} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input pl-10"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-xs mt-1" style={{ color: 'var(--red-600)' }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--grey-400)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="form-input pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--grey-400)' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs mt-1" style={{ color: 'var(--red-600)' }}>{errors.password}</p>}
            </div>

            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <div className="animate-fade-in">
                <label className="form-label">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--grey-400)' }} />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="form-input pl-10"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: 'var(--red-600)' }}>{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Forgot Password */}
            {!isSignUp && (
              <div className="flex justify-end">
                <button type="button" className="text-sm font-medium" style={{ color: 'var(--green-700)' }}>
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full btn-lg"
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {isSignUp ? 'Creating account...' : 'Signing in...'}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: 'var(--grey-200)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--grey-400)' }}>OR</span>
            <div className="flex-1 h-px" style={{ background: 'var(--grey-200)' }} />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="btn btn-secondary btn-sm" style={{ border: '1px solid var(--grey-200)' }}>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="btn btn-secondary btn-sm" style={{ border: '1px solid var(--grey-200)' }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Toggle Sign In / Sign Up */}
          <p className="text-center text-sm mt-6" style={{ color: 'var(--grey-500)' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setErrors({}); }}
              className="font-semibold"
              style={{ color: 'var(--green-700)' }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
