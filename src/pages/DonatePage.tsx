import React, { useState } from 'react';
import { SafetyService } from '../services';
import { CheckCircle, AlertCircle, MapPin, Package, Clock } from 'lucide-react';
import { FoodFlowLogo } from '../components/FoodFlowLogo';

export const DonatePage: React.FC = () => {
  const [formData, setFormData] = useState({
    foodName: '',
    description: '',
    quantity: '',
    unit: 'kg',
    hoursUntilExpiry: '6',
    address: '',
    area: '',
    city: 'Dhaka',
  });
  const [safetyResult, setSafetyResult] = useState<{ isSafe: boolean; reason?: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleCheckSafety = () => {
    if (formData.foodName) {
      const result = SafetyService.validateListing(formData.foodName, formData.description);
      setSafetyResult(result);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = SafetyService.validateListing(formData.foodName, formData.description);
    if (!result.isSafe) {
      setSafetyResult(result);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--green-50)' }}>
          <CheckCircle className="w-10 h-10" style={{ color: 'var(--green-700)' }} />
        </div>
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--ink)' }}>Listing Created!</h2>
        <p className="text-lg mb-2" style={{ color: 'var(--grey-700)' }}>
          Your <strong>{formData.foodName}</strong> has been listed successfully.
        </p>
        <p className="mb-8" style={{ color: 'var(--grey-500)' }}>
          Recipients in your area will be notified. The expiry tracker is now active.
        </p>
        <button onClick={() => { setSubmitted(false); setFormData({ foodName: '', description: '', quantity: '', unit: 'kg', hoursUntilExpiry: '6', address: '', area: '', city: 'Dhaka' }); }} className="btn btn-primary btn-lg">
          List Another Item
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--ink)' }}>Donate Food</h1>
        <p style={{ color: 'var(--grey-500)' }}>
          Share surplus food with those who need it. Our safety system will automatically validate your listing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Food Details */}
        <div className="p-6 rounded-2xl" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-md)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5" style={{ color: 'var(--green-700)' }} />
            <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>Food Details</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="form-label">Food Name *</label>
              <input
                type="text"
                required
                value={formData.foodName}
                onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
                className="form-input"
                placeholder="e.g., Vegetable Biryani"
              />
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-input"
                rows={3}
                placeholder="Describe the food, condition, and approximate servings..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Quantity *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="form-input"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="form-label">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="form-input"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="pieces">Pieces</option>
                  <option value="packets">Packets</option>
                  <option value="bowls">Bowls</option>
                  <option value="liters">Liters</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Expiry */}
        <div className="p-6 rounded-2xl" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-md)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" style={{ color: 'var(--green-700)' }} />
            <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>Expiry Time</h2>
          </div>

          <div>
            <label className="form-label">Hours until expiry *</label>
            <input
              type="number"
              required
              min={1}
              max={72}
              value={formData.hoursUntilExpiry}
              onChange={(e) => setFormData({ ...formData, hoursUntilExpiry: e.target.value })}
              className="form-input"
            />
            <p className="text-xs mt-2" style={{ color: 'var(--grey-500)' }}>
              Food will be automatically hidden from recipients after this time.
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="p-6 rounded-2xl" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-md)' }}>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5" style={{ color: 'var(--green-700)' }} />
            <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>Pickup Location</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="form-label">Address *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="form-input"
                placeholder="Street address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Area *</label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="form-input"
                  placeholder="e.g., Banani"
                />
              </div>
              <div>
                <label className="form-label">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Safety Check */}
        <div className="p-6 rounded-2xl" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-md)' }}>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5" style={{ color: 'var(--green-700)' }} />
            <h2 className="text-lg font-bold" style={{ color: 'var(--ink)' }}>Safety Validation</h2>
          </div>

          <p className="text-sm mb-4" style={{ color: 'var(--grey-500)' }}>
            Our system checks for items that cannot be donated (raw meat, alcohol, etc.). Click to validate your listing.
          </p>

          <button
            type="button"
            onClick={handleCheckSafety}
            className="btn btn-secondary btn-sm mb-4"
          >
            Run Safety Check
          </button>

          {safetyResult && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${safetyResult.isSafe ? '' : ''}`} style={{
              background: safetyResult.isSafe ? 'var(--green-50)' : 'var(--red-50)',
              border: `1px solid ${safetyResult.isSafe ? 'var(--green-400)' : 'var(--red-500)'}`,
            }}>
              {safetyResult.isSafe ? (
                <>
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--green-700)' }} />
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--green-700)' }}>✓ Safe to Donate</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--grey-700)' }}>This item passes all safety checks.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--red-600)' }} />
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--red-600)' }}>⛔ Safety Violation</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--grey-700)' }}>{safetyResult.reason}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button type="submit" className="btn btn-primary btn-lg flex-1">
            <FoodFlowLogo size="sm" variant="white" showText={false} /> Create Listing
          </button>
        </div>
      </form>
    </div>
  );
};
