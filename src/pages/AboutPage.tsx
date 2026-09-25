import React from 'react';
import { Shield, Clock, Users, Heart, Code, Database } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--ink)' }}>About FoodFlow</h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--grey-500)' }}>
          An expiry-aware food donation platform built with safety, transparency, and efficiency at its core.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-12">
        <div className="p-8 rounded-2xl" style={{ background: 'var(--green-50)', border: '1px solid var(--green-100)' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--green-700)' }}>Our Mission</h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--grey-700)' }}>
            Every day, tons of perfectly good food goes to waste while millions go hungry. FoodFlow bridges this gap with an intelligent, expiry-aware platform that ensures food reaches those who need it — safely and on time.
          </p>
        </div>
      </section>

      {/* Architecture */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)' }}>Technical Architecture</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Database, title: '9 Core Models', desc: 'User, Donor, Recipient, Location, FoodListing, ExpiryTracker, FoodSafetyCheck, Claim, Notification' },
            { icon: Shield, title: 'Safety Service', desc: 'Auto-validates listings against blocked keywords. Sets is_safe=False and blocks unsafe items.' },
            { icon: Clock, title: 'Expiry Service', desc: 'Dynamic remaining time calculation. Classifies urgency: Safe (>6h), Warning (2-6h), Urgent (<2h), Expired.' },
            { icon: Users, title: 'Claim Service', desc: 'Atomic transactions prevent double-claiming. Generates secure 8-char hex pickup codes.' },
            { icon: Code, title: 'Service Layer', desc: 'Business logic separated from views. OOP principles with static methods and class-based services.' },
            { icon: Heart, title: 'Auto-Hide Logic', desc: 'Expired food NEVER visible to recipients. Enforced at query level and via management commands.' },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-xl" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
              <item.icon className="w-6 h-6 mb-3" style={{ color: 'var(--green-700)' }} />
              <h3 className="font-bold mb-2" style={{ color: 'var(--ink)' }}>{item.title}</h3>
              <p className="text-sm" style={{ color: 'var(--grey-500)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Design Principles */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)' }}>Design Principles</h2>
        <div className="space-y-4">
          {[
            { title: 'Never Color Alone', desc: 'Every urgency state uses text labels, borders, AND layout cues. Screen readers get full context.' },
            { title: 'Tabular Numerals', desc: 'Countdown timers use font-variant-numeric: tabular-nums to prevent digit jitter during live updates.' },
            { title: 'Progressive Disclosure', desc: 'Urgent items pinned to top. Expired items greyed out with pointer-events: none. Claim buttons removed for expired food.' },
            { title: 'Mobile-First', desc: 'Single-column cards on mobile. Thumb-reach buttons (min 48px). Stacked forms for easy one-handed use.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--green-50)' }}>
                <span className="text-sm font-bold" style={{ color: 'var(--green-700)' }}>{i + 1}</span>
              </div>
              <div>
                <h3 className="font-bold" style={{ color: 'var(--ink)' }}>{item.title}</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--grey-500)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)' }}>Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: 'React', version: '18.2' },
            { name: 'TypeScript', version: '5.x' },
            { name: 'Tailwind CSS', version: '4.x' },
            { name: 'Vite', version: '6.x' },
          ].map((tech, i) => (
            <div key={i} className="p-4 rounded-xl text-center" style={{ background: 'var(--grey-50)', border: '1px solid var(--grey-200)' }}>
              <div className="font-bold" style={{ color: 'var(--ink)' }}>{tech.name}</div>
              <div className="text-xs" style={{ color: 'var(--grey-500)' }}>v{tech.version}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
