import React from 'react';
import { FoodListing } from '../types';
import { useCountdown } from '../hooks/useCountdown';
import { Clock, MapPin, User, Shield, ShieldAlert, AlertTriangle, XCircle } from 'lucide-react';

interface ListingCardProps {
  listing: FoodListing;
  onClaim?: (listing: FoodListing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onClaim }) => {
  const { urgency, formatted, isExpired } = useCountdown(listing.expiresAt);

  const cardClass = `listing-card listing-card--${urgency}`;
  const isBlocked = listing.status === 'blocked';
  const showClaimButton = !isExpired && !isBlocked && listing.status === 'available';

  const getBadge = () => {
    if (isBlocked) return <span className="badge-blocked">⛔ BLOCKED</span>;
    if (isExpired) return <span className="badge-expired">EXPIRED</span>;
    if (urgency === 'urgent') return <span className="badge-urgent">⚠️ URGENT</span>;
    if (urgency === 'warning') return <span className="badge-warning">⏳ WARNING</span>;
    return <span className="badge-available">✓ AVAILABLE</span>;
  };

  const getUrgencyIcon = () => {
    if (urgency === 'safe') return <Shield className="w-4 h-4" style={{ color: 'var(--green-500)' }} />;
    if (urgency === 'warning') return <ShieldAlert className="w-4 h-4" style={{ color: 'var(--amber-600)' }} />;
    if (urgency === 'urgent') return <AlertTriangle className="w-4 h-4" style={{ color: 'var(--red-600)' }} />;
    return <XCircle className="w-4 h-4" style={{ color: 'var(--grey-500)' }} />;
  };

  return (
    <div className={cardClass} data-expires={listing.expiresAt.toISOString()}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="listing-name text-lg font-bold" style={{ color: 'var(--ink)' }}>
            {listing.foodName}
          </h3>
          <div className="flex items-center gap-2 mt-1" style={{ color: 'var(--grey-500)', fontSize: '0.8rem' }}>
            <User className="w-3.5 h-3.5" />
            <span>{listing.donor.user.firstName} {listing.donor.user.lastName}</span>
            {listing.donor.isVerified && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium" style={{ background: 'var(--green-50)', color: 'var(--green-700)' }}>
                ✓ Verified
              </span>
            )}
          </div>
        </div>
        {getBadge()}
      </div>

      {/* Description */}
      <p className="listing-description text-sm mb-4" style={{ color: 'var(--grey-700)' }}>
        {listing.description}
      </p>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--grey-700)' }}>
          <span className="font-semibold">{listing.quantity} {listing.unit}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--grey-500)' }}>
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{listing.location.area}, {listing.location.city}</span>
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center justify-between p-3 rounded-lg" style={{
        background: urgency === 'urgent' ? 'var(--red-100)' : urgency === 'warning' ? 'var(--amber-100)' : 'var(--green-50)'
      }}>
        <div className="flex items-center gap-2">
          {getUrgencyIcon()}
          <span className="text-xs font-medium uppercase tracking-wide" style={{
            color: urgency === 'urgent' ? 'var(--red-600)' : urgency === 'warning' ? 'var(--amber-600)' : 'var(--green-700)'
          }}>
            {urgency === 'expired' ? 'Expired' : urgency === 'urgent' ? 'Expires in' : urgency === 'warning' ? 'Expires in' : 'Time remaining'}
          </span>
        </div>
        <div className={`countdown-timer timer--${urgency}`} style={{ fontSize: '1.1rem' }}>
          {isExpired ? 'EXPIRED' : formatted}
        </div>
      </div>

      {/* Claim Button - hidden for expired/blocked */}
      {showClaimButton && onClaim && (
        <button
          className="btn btn-primary w-full mt-4"
          onClick={() => onClaim(listing)}
        >
          {urgency === 'urgent' ? '🚨 Claim Now — Expiring Soon!' : 'Claim This Food'}
        </button>
      )}

      {/* Expired notice */}
      {isExpired && (
        <div className="mt-4 text-center text-sm font-medium" style={{ color: 'var(--grey-500)' }}>
          This listing has expired and is no longer available for claiming.
        </div>
      )}

      {/* Blocked notice */}
      {isBlocked && (
        <div className="mt-4 text-center text-sm font-medium" style={{ color: 'var(--red-600)' }}>
          ⛔ This listing has been blocked due to safety policy violation.
        </div>
      )}
    </div>
  );
};
