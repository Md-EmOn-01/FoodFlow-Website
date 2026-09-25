import React, { useState } from 'react';
import { Bell, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { FoodFlowLogo } from './FoodFlowLogo';
import { Notification } from '../types';

interface AuthUser {
  name: string;
  role: 'donor' | 'recipient';
}

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  authUser: AuthUser | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, notifications, onMarkRead, authUser, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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
          <div className="cursor-pointer" onClick={() => onNavigate('home')}>
            <FoodFlowLogo size="md" />
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

            {/* Auth Section */}
            {authUser ? (
              /* Logged In - Profile Dropdown */
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                  style={{ background: 'var(--green-50)' }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--green-700)' }}>
                    <span className="text-white text-xs font-bold">{authUser.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--green-700)' }}>{authUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5" style={{ color: 'var(--green-700)' }} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-xl shadow-xl border animate-slide-down" style={{ background: 'var(--surface)', borderColor: 'var(--grey-200)', zIndex: 200 }}>
                    <div className="p-4 border-b" style={{ borderColor: 'var(--grey-200)' }}>
                      <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{authUser.name}</p>
                      <p className="text-xs capitalize mt-0.5 px-2 py-0.5 rounded-full inline-block" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                        {authUser.role}
                      </p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => { onNavigate('listings'); setProfileOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
                        style={{ color: 'var(--grey-700)' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--grey-50)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        My Listings
                      </button>
                      <button
                        onClick={() => { onNavigate('donate'); setProfileOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors"
                        style={{ color: 'var(--grey-700)' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--grey-50)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        Donate Food
                      </button>
                      <div className="my-1 h-px" style={{ background: 'var(--grey-200)' }} />
                      <button
                        onClick={() => { onLogout(); setProfileOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                        style={{ color: 'var(--red-600)' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--red-50)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}

                {/* Mobile auth button */}
                <button
                  onClick={() => { onLogout(); }}
                  className="sm:hidden p-2 rounded-lg"
                  style={{ color: 'var(--grey-700)' }}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              /* Not Logged In - Login Button */
              <button
                onClick={() => onNavigate('login')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                style={{ background: 'var(--green-700)', color: 'white' }}
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}

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
            <div className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--grey-200)' }}>
              {authUser ? (
                <button
                  onClick={() => { onLogout(); setMobileOpen(false); }}
                  className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium"
                  style={{ color: 'var(--red-600)' }}
                >
                  Sign Out ({authUser.name})
                </button>
              ) : (
                <button
                  onClick={() => { onNavigate('login'); setMobileOpen(false); }}
                  className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium"
                  style={{ color: 'var(--green-700)', background: 'var(--green-50)' }}
                >
                  Sign In / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
