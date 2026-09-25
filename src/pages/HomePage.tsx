import React from 'react';
import { Leaf, Heart, Clock, Shield, ArrowRight, Users, MapPin } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--green-700) 0%, #145743 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full" style={{ background: 'white', filter: 'blur(80px)' }} />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full" style={{ background: 'white', filter: 'blur(100px)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">Expiry-Aware Food Donation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              No Food Wasted.<br />
              <span style={{ color: 'var(--green-100)' }}>Every Meal Matters.</span>
            </h1>
            <p className="text-lg sm:text-xl mb-8" style={{ color: 'rgba(255,255,255,0.85)' }}>
              FoodFlow connects donors with recipients in real-time, ensuring surplus food reaches those who need it — before it expires. Smart expiry tracking keeps everyone safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onNavigate('listings')} className="btn btn-lg" style={{ background: 'white', color: 'var(--green-700)' }}>
                Browse Available Food <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => onNavigate('donate')} className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '2px solid rgba(255,255,255,0.3)' }}>
                Donate Food
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12" style={{ background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '2,450+', label: 'Meals Donated', icon: Heart },
              { value: '180+', label: 'Active Donors', icon: Users },
              { value: '15', label: 'Cities Covered', icon: MapPin },
              { value: '98%', label: 'Safe Deliveries', icon: Shield },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4">
                <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--green-700)' }} />
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--ink)' }}>{stat.value}</div>
                <div className="text-sm" style={{ color: 'var(--grey-500)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--ink)' }}>How FoodFlow Works</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--grey-500)' }}>
              Our expiry-aware system ensures food safety at every step.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📦',
                title: 'List Surplus Food',
                description: 'Donors post available food with expiry times. Our safety system automatically checks for blocked items like raw meat or alcohol.',
                color: 'var(--green-50)',
              },
              {
                icon: '⏰',
                title: 'Smart Expiry Tracking',
                description: 'Real-time countdowns classify food as Safe (green), Warning (amber), or Urgent (red). Expired food is automatically hidden from recipients.',
                color: 'var(--amber-50)',
              },
              {
                icon: '🤝',
                title: 'Safe Pickup',
                description: 'Recipients claim food and receive a unique pickup code. Atomic transactions prevent double-claiming. Complete the pickup within 4 hours.',
                color: 'var(--blue-100)',
              },
            ].map((step, i) => (
              <div key={i} className="p-6 rounded-2xl" style={{ background: step.color }}>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--ink)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--grey-700)' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Demo */}
      <section className="py-16" style={{ background: 'var(--surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--ink)' }}>Expiry-Aware Safety System</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--grey-500)' }}>
              Every listing is classified by urgency. Never rely on color alone — text, borders, and layout all communicate status.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { level: 'SAFE', desc: '> 6 hours remaining', border: 'var(--green-500)', bg: 'var(--green-50)', badge: 'badge-available', text: 'var(--green-700)' },
              { level: 'WARNING', desc: '2–6 hours remaining', border: 'var(--amber-500)', bg: 'var(--amber-50)', badge: 'badge-warning', text: 'var(--amber-600)' },
              { level: 'URGENT', desc: '< 2 hours remaining', border: 'var(--red-500)', bg: 'var(--red-50)', badge: 'badge-urgent', text: 'var(--red-600)' },
              { level: 'EXPIRED', desc: 'Past expiry time', border: 'var(--grey-300)', bg: 'var(--grey-100)', badge: 'badge-expired', text: 'var(--grey-500)' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl" style={{ borderLeft: `4px solid ${item.border}`, background: item.bg }}>
                <span className={item.badge}>{item.level}</span>
                <p className="mt-3 text-sm font-medium" style={{ color: item.text }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--ink)' }}>Ready to Make a Difference?</h2>
          <p className="text-lg mb-8" style={{ color: 'var(--grey-500)' }}>
            Join FoodFlow today. Whether you have surplus food or need a meal, we're here to connect you safely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('listings')} className="btn btn-primary btn-lg">
              <Clock className="w-5 h-5" /> Browse Listings
            </button>
            <button onClick={() => onNavigate('donate')} className="btn btn-secondary btn-lg">
              <Heart className="w-5 h-5" /> Start Donating
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
