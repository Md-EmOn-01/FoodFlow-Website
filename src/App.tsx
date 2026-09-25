import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { DonatePage } from './pages/DonatePage';
import { AboutPage } from './pages/AboutPage';
import { mockListings, mockNotifications } from './data';
import { Notification, FoodListing, UrgencyLevel } from './types';
import { ExpiryService, SafetyService, ListingFilterService } from './services';
import { Leaf } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [listings, setListings] = useState<FoodListing[]>([]);

  // Initialize listings with computed properties
  useEffect(() => {
    const computedListings = mockListings.map(listing => ({
      ...listing,
      urgencyLevel: ExpiryService.classifyUrgency(listing.expiresAt),
      remainingTime: ExpiryService.getRemainingTime(listing.expiresAt),
      isSafe: listing.isSafe,
    }));
    setListings(computedListings);
  }, []);

  // Periodic expiry sweep (simulates management command)
  useEffect(() => {
    const interval = setInterval(() => {
      setListings(prev => prev.map(listing => {
        const newUrgency = ExpiryService.classifyUrgency(listing.expiresAt);
        const newRemaining = ExpiryService.getRemainingTime(listing.expiresAt);
        const isExpired = newRemaining <= 0;
        
        return {
          ...listing,
          urgencyLevel: newUrgency,
          remainingTime: newRemaining,
          status: isExpired && listing.status === 'available' ? 'expired' as const : listing.status,
          isSafe: isExpired ? false : listing.isSafe,
        };
      }));
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleMarkRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'listings':
        return <ListingsPage listings={listings} />;
      case 'donate':
        return <DonatePage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--grey-50)' }}>
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        notifications={notifications}
        onMarkRead={handleMarkRead}
      />
      <main className="flex-1">
        {renderPage()}
      </main>
      <footer className="py-8 mt-auto" style={{ background: 'var(--surface)', borderTop: '1px solid var(--grey-200)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--green-700)' }}>
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold" style={{ color: 'var(--green-700)' }}>FoodFlow</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--grey-500)' }}>
              © 2025 FoodFlow — Expiry-Aware Food Donation Platform. Built with ❤️ for zero waste.
            </p>
            <div className="flex gap-4 text-sm" style={{ color: 'var(--grey-500)' }}>
              <button onClick={() => handleNavigate('about')} className="hover:underline">About</button>
              <button onClick={() => handleNavigate('listings')} className="hover:underline">Browse</button>
              <button onClick={() => handleNavigate('donate')} className="hover:underline">Donate</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
