import React, { useState, useMemo } from 'react';
import { FoodListing } from '../types';
import { ListingCard } from '../components/ListingCard';
import { ClaimModal } from '../components/ClaimModal';
import { ListingFilterService } from '../services';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

interface ListingsPageProps {
  listings: FoodListing[];
}

export const ListingsPage: React.FC<ListingsPageProps> = ({ listings }) => {
  const [search, setSearch] = useState('');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [showExpired, setShowExpired] = useState(false);
  const [claimTarget, setClaimTarget] = useState<FoodListing | null>(null);

  const filteredListings = useMemo(() => {
    let result = [...listings];

    // Search filter
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(l =>
        l.foodName.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.donor.user.firstName.toLowerCase().includes(q) ||
        l.location.area.toLowerCase().includes(q)
      );
    }

    // Urgency filter
    if (filterUrgency !== 'all') {
      result = result.filter(l => l.urgencyLevel === filterUrgency);
    }

    // Hide expired by default (visible_to_recipients logic)
    if (!showExpired) {
      result = result.filter(l => l.urgencyLevel !== 'expired' && l.status !== 'blocked');
    }

    // Sort by urgency (urgent first)
    return ListingFilterService.sortByUrgency(result);
  }, [listings, search, filterUrgency, showExpired]);

  const urgentCount = listings.filter(l => l.urgencyLevel === 'urgent' && l.status === 'available').length;
  const availableCount = listings.filter(l => l.status === 'available' && l.urgencyLevel !== 'expired').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Available Food</h1>
        <p style={{ color: 'var(--grey-500)' }}>
          {availableCount} items available • {urgentCount} expiring soon
        </p>
      </div>

      {/* Urgent Banner */}
      {urgentCount > 0 && (
        <div className="p-4 rounded-xl mb-6 flex items-center gap-3 animate-fade-in" style={{ background: 'var(--red-50)', border: '1px solid var(--red-100)' }}>
          <span className="text-2xl">🚨</span>
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--red-600)' }}>
              {urgentCount} item{urgentCount > 1 ? 's' : ''} expiring within 2 hours!
            </p>
            <p className="text-xs" style={{ color: 'var(--grey-700)' }}>These are pinned to the top. Claim now before they expire.</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--grey-400)' }} />
          <input
            type="text"
            placeholder="Search food, donor, or area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-10"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--grey-400)' }} />
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="form-input pl-10 pr-8 appearance-none cursor-pointer"
              style={{ minWidth: '150px' }}
            >
              <option value="all">All Status</option>
              <option value="safe">Safe (&gt;6h)</option>
              <option value="warning">Warning (2-6h)</option>
              <option value="urgent">Urgent (&lt;2h)</option>
            </select>
          </div>
          <label className="flex items-center gap-2 px-4 rounded-lg cursor-pointer" style={{ background: 'var(--grey-100)' }}>
            <input
              type="checkbox"
              checked={showExpired}
              onChange={(e) => setShowExpired(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--grey-700)' }}>
              <SlidersHorizontal className="w-3.5 h-3.5 inline mr-1" />
              Show Expired
            </span>
          </label>
        </div>
      </div>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--ink)' }}>No listings found</h3>
          <p style={{ color: 'var(--grey-500)' }}>Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <div className="listings-grid">
          {filteredListings.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onClaim={setClaimTarget}
            />
          ))}
        </div>
      )}

      {/* Claim Modal */}
      {claimTarget && (
        <ClaimModal
          listing={claimTarget}
          onClose={() => setClaimTarget(null)}
          onConfirm={() => {}}
        />
      )}
    </div>
  );
};
