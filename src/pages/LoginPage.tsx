import React, { useState } from 'react';
import { User, Mail, Lock, Phone, Heart, Package } from 'lucide-react';

import { FoodFlowLogo } from '../components/FoodFlowLogo';

interface LoginPageProps {
  onLogin: (user: { name: string; role: 'donor' | 'recipient' }) => void;
  onNavigate: (page: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigate }) => {
  const [isSignUp, setIsSignUp] = useState(false);

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
            <div className="mb-8">
              <FoodFlowLogo size="lg" variant="white" />
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
              { icon: '⏰', text: 'Real-time expiry tracking keeps food safe' },
              { icon: '🔐', text: 'Secure pickup codes prevent fraud' },
              { icon: '🔔', text: 'Instant notifications for urgent listings' },
              { icon: '✓', text: 'Verified donors and recipients you can trust' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <span className="text-base">{item.icon}</span>
                </div>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="relative">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              © 2026 FoodFlow. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="p-8 sm:p-10">
          {/* Logo */}
          <div className="mb-6">
            <FoodFlowLogo size="md" />
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
              className="p-4 rounded-xl text-center transition-all"
              style={{
                background: formData.role === 'recipient' ? 'var(--green-50)' : 'var(--grey-50)',
                border: `2px solid ${formData.role === 'recipient' ? 'var(--green-500)' : 'var(--grey-200)'}`,
              }}
            >
              <Heart className="w-6 h-6 mx-auto mb-2" style={{ color: formData.role === 'recipient' ? 'var(--green-700)' : 'var(--grey-400)' }} />
              <span className="text-sm font-semibold block" style={{ color: formData.role === 'recipient' ? 'var(--green-700)' : 'var(--grey-700)' }}>
                I need food
              </span>
              <span className="text-xs block mt-0.5" style={{ color: 'var(--grey-500)' }}>Recipient</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'donor' })}
              className="p-4 rounded-xl text-center transition-all"
              style={{
                background: formData.role === 'donor' ? 'var(--green-50)' : 'var(--grey-50)',
                border: `2px solid ${formData.role === 'donor' ? 'var(--green-500)' : 'var(--grey-200)'}`,
              }}
            >
              <Package className="w-6 h-6 mx-auto mb-2" style={{ color: formData.role === 'donor' ? 'var(--green-700)' : 'var(--grey-400)' }} />
              <span className="text-sm font-semibold block" style={{ color: formData.role === 'donor' ? 'var(--green-700)' : 'var(--grey-700)' }}>
                I have food
              </span>
              <span className="text-xs block mt-0.5" style={{ color: 'var(--grey-500)' }}>Donor</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sign Up Fields */}
            {isSignUp && (
              <div className="grid grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="form-label flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" style={{ color: 'var(--grey-500)' }} />
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="form-input"
                    placeholder="Rahim"
                  />
                  {errors.firstName && <p className="text-xs mt-1" style={{ color: 'var(--red-600)' }}>{errors.firstName}</p>}
                </div>
                <div>
                  <label className="form-label flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" style={{ color: 'var(--grey-500)' }} />
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="form-input"
                    placeholder="Ahmed"
                  />
                  {errors.lastName && <p className="text-xs mt-1" style={{ color: 'var(--red-600)' }}>{errors.lastName}</p>}
                </div>
              </div>
            )}

            {isSignUp && (
              <div className="animate-fade-in">
                <label className="form-label flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" style={{ color: 'var(--grey-500)' }} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                  placeholder="+880 1712 345678"
                />
                {errors.phone && <p className="text-xs mt-1" style={{ color: 'var(--red-600)' }}>{errors.phone}</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="form-label flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" style={{ color: 'var(--grey-500)' }} />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="form-input"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-xs mt-1" style={{ color: 'var(--red-600)' }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="form-label flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" style={{ color: 'var(--grey-500)' }} />
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-xs mt-1" style={{ color: 'var(--red-600)' }}>{errors.password}</p>}
            </div>

            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <div className="animate-fade-in">
                <label className="form-label flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" style={{ color: 'var(--grey-500)' }} />
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="form-input"
                  placeholder="••••••••"
                />
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
                isSignUp ? 'Create Account' : 'Sign In'
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
              Google
            </button>
            <button className="btn btn-secondary btn-sm" style={{ border: '1px solid var(--grey-200)' }}>
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
