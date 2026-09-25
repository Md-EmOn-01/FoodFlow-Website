import React, { useState } from 'react';
import { Bell, Menu, X, Leaf, User } from 'lucide-react';
import { Notification } from '../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  notifications: Notification[];
  onMarkRead: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, notifications, onMarkRead }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'listings', label: 'Browse Food' },
    { id: 'donate', label: 'Donate Food' },
    { id: 'about', label: 'About' },
  ];

  return (
    <nav className="nav-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--green-700)' }}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold" style={{ color: 'var(--green-700)' }}>FoodFlow</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: currentPage === item.id ? 'var(--green-700)' : 'var(--grey-700)',
                  background: currentPage === item.id ? 'var(--green-50)' : 'transparent',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg transition-colors"
                style={{ color: 'var(--grey-700)' }}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && <span className="notification-dot" />}
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-xl shadow-xl border animate-slide-down" style={{ background: 'var(--surface)', borderColor: 'var(--grey-200)', zIndex: 200 }}>
                  <div className="p-4 border-b" style={{ borderColor: 'var(--grey-200)' }}>
                    <h3 className="font-bold text-sm" style={{ color: 'var(--ink)' }}>Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs" style={{ color: 'var(--grey-500)' }}>{unreadCount} unread</span>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm" style={{ color: 'var(--grey-500)' }}>No notifications</div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          className="p-4 border-b cursor-pointer transition-colors"
                          style={{
                            borderColor: 'var(--grey-100)',
                            background: notif.isRead ? 'var(--surface)' : 'var(--green-50)',
                          }}
                          onClick={() => onMarkRead(notif.id)}
                        >
                          <div className="flex items-start gap-2">
                            {!notif.isRead && (
                              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--green-500)' }} />
                            )}
                            <div>
                              <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{notif.title}</p>
                              <p className="text-xs mt-0.5" style={{ color: 'var(--grey-500)' }}>{notif.message}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User */}
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'var(--grey-100)' }}>
              <User className="w-4 h-4" style={{ color: 'var(--grey-700)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--grey-700)' }}>Guest</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ color: 'var(--grey-700)' }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-slide-down">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
                className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium"
                style={{
                  color: currentPage === item.id ? 'var(--green-700)' : 'var(--grey-700)',
                  background: currentPage === item.id ? 'var(--green-50)' : 'transparent',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
