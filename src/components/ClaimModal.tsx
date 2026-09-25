import React, { useState } from 'react';
import { FoodListing } from '../types';
import { ClaimService } from '../services';
import { X, CheckCircle, Package, Clock, Hash } from 'lucide-react';

interface ClaimModalProps {
  listing: FoodListing;
  onClose: () => void;
  onConfirm: (claim: { listingId: string; quantity: number; code: string }) => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({ listing, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [pickupCode, setPickupCode] = useState('');

  const validation = ClaimService.validateClaim(listing, quantity);

  const handleClaim = () => {
    if (!validation.valid) return;
    const code = ClaimService.generatePickupCode();
    setPickupCode(code);
    setConfirmed(true);
    onConfirm({ listingId: listing.id, quantity, code });
  };

  if (confirmed) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ background: 'rgba(0,0,0,0.5)' }}>
        <div className="w-full max-w-md rounded-2xl p-8 animate-fade-in" style={{ background: 'var(--surface)' }}>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--green-50)' }}>
              <CheckCircle className="w-8 h-8" style={{ color: 'var(--green-700)' }} />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Claim Successful!</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--grey-500)' }}>
              Show this pickup code to the donor when collecting your food.
            </p>

            <div className="p-4 rounded-xl mb-6" style={{ background: 'var(--green-50)', border: '2px dashed var(--green-500)' }}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <Hash className="w-4 h-4" style={{ color: 'var(--green-700)' }} />
                <span className="text-xs font-medium uppercase" style={{ color: 'var(--green-700)' }}>Pickup Code</span>
              </div>
              <p className="text-3xl font-bold tracking-wider countdown-timer" style={{ color: 'var(--green-700)' }}>
                {pickupCode.toUpperCase()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="p-3 rounded-lg" style={{ background: 'var(--grey-50)' }}>
                <div className="flex items-center gap-1.5 mb-1" style={{ color: 'var(--grey-500)' }}>
                  <Package className="w-3.5 h-3.5" />
                  <span>Quantity</span>
                </div>
                <span className="font-semibold">{quantity} {listing.unit}</span>
              </div>
              <div className="p-3 rounded-lg" style={{ background: 'var(--grey-50)' }}>
                <div className="flex items-center gap-1.5 mb-1" style={{ color: 'var(--grey-500)' }}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pickup by</span>
                </div>
                <span className="font-semibold">4 hours</span>
              </div>
            </div>

            <button onClick={onClose} className="btn btn-primary w-full">Done</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="w-full max-w-md rounded-2xl p-6 animate-fade-in" style={{ background: 'var(--surface)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: 'var(--ink)' }}>Claim Food</h2>
          <button onClick={onClose} className="p-2 rounded-lg" style={{ color: 'var(--grey-500)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-xl mb-4" style={{ background: 'var(--grey-50)' }}>
          <h3 className="font-semibold" style={{ color: 'var(--ink)' }}>{listing.foodName}</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--grey-500)' }}>
            {listing.quantity} {listing.unit} available • {listing.donor.user.firstName} {listing.donor.user.lastName}
          </p>
        </div>

        <div className="mb-4">
          <label className="form-label">Quantity to claim ({listing.unit})</label>
          <input
            type="number"
            min={1}
            max={listing.quantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="form-input"
          />
          {!validation.valid && (
            <p className="text-sm mt-2" style={{ color: 'var(--red-600)' }}>{validation.error}</p>
          )}
        </div>

        <div className="p-3 rounded-lg mb-6" style={{ background: 'var(--amber-50)', border: '1px solid var(--amber-100)' }}>
          <p className="text-xs" style={{ color: 'var(--amber-600)' }}>
            ⏰ Pickup must be completed within 4 hours of claiming. The pickup code will be shown after confirmation.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="btn btn-secondary flex-1">Cancel</button>
          <button
            onClick={handleClaim}
            disabled={!validation.valid}
            className="btn btn-primary flex-1"
            style={{ opacity: validation.valid ? 1 : 0.5 }}
          >
            Confirm Claim
          </button>
        </div>
      </div>
    </div>
  );
};
