// Business Logic Services - mirrors Django services.py pattern
import { FoodListing, UrgencyLevel, ListingStatus } from '../types';

// Urgency thresholds in milliseconds
const URGENT_THRESHOLD = 2 * 60 * 60 * 1000; // 2 hours
const WARNING_THRESHOLD = 6 * 60 * 60 * 1000; // 6 hours

/**
 * ExpiryService: Classifies urgency based on remaining time
 * >6h = SAFE, 2-6h = WARNING, <2h = URGENT, <=0 = EXPIRED
 */
export class ExpiryService {
  static getRemainingTime(expiresAt: Date): number {
    return expiresAt.getTime() - Date.now();
  }

  static classifyUrgency(expiresAt: Date): UrgencyLevel {
    const remaining = this.getRemainingTime(expiresAt);
    if (remaining <= 0) return 'expired';
    if (remaining < URGENT_THRESHOLD) return 'urgent';
    if (remaining < WARNING_THRESHOLD) return 'warning';
    return 'safe';
  }

  static isExpired(expiresAt: Date): boolean {
    return this.getRemainingTime(expiresAt) <= 0;
  }

  static formatCountdown(remainingMs: number): string {
    if (remainingMs <= 0) return 'EXPIRED';
    const hours = Math.floor(remainingMs / (1000 * 60 * 60));
    const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}

/**
 * SafetyService: Validates listings against blocked keywords
 */
export class SafetyService {
  static readonly BLOCKED_KEYWORDS = [
    'raw meat', 'alcohol', 'raw fish', 'unpasteurized',
    'homemade', 'leftover', 'opened', 'damaged packaging'
  ];

  static validateListing(foodName: string, description: string): { isSafe: boolean; reason?: string } {
    const combined = `${foodName} ${description}`.toLowerCase();
    for (const keyword of this.BLOCKED_KEYWORDS) {
      if (combined.includes(keyword)) {
        return { isSafe: false, reason: `Contains blocked keyword: "${keyword}"` };
      }
    }
    return { isSafe: true };
  }

  static getListingStatus(listing: FoodListing): ListingStatus {
    if (listing.status === 'blocked') return 'blocked';
    if (ExpiryService.isExpired(listing.expiresAt)) return 'expired';
    return listing.status;
  }
}

/**
 * ClaimService: Handles claim logic with validation
 * (In real Django: would use transaction.atomic() and select_for_update())
 */
export class ClaimService {
  static generatePickupCode(): string {
    // Equivalent to secrets.token_hex(4)
    const array = new Uint8Array(4);
    crypto.getRandomValues(array);
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  static validateClaim(listing: FoodListing, claimedQuantity: number): { valid: boolean; error?: string } {
    if (listing.status !== 'available') {
      return { valid: false, error: 'This listing is no longer available.' };
    }
    if (ExpiryService.isExpired(listing.expiresAt)) {
      return { valid: false, error: 'This food has expired and cannot be claimed.' };
    }
    if (!listing.isSafe) {
      return { valid: false, error: 'This food has been flagged as unsafe.' };
    }
    if (claimedQuantity <= 0) {
      return { valid: false, error: 'Claimed quantity must be positive.' };
    }
    if (claimedQuantity > listing.quantity) {
      return { valid: false, error: `Only ${listing.quantity} ${listing.unit} available.` };
    }
    return { valid: true };
  }

  static getPickupDeadline(): Date {
    // 4 hours from now
    return new Date(Date.now() + 4 * 60 * 60 * 1000);
  }
}

/**
 * Filter service: visible_to_recipients equivalent
 */
export class ListingFilterService {
  static visibleToRecipients(listings: FoodListing[]): FoodListing[] {
    return listings.filter(l => {
      if (l.status === 'expired' || l.status === 'blocked') return false;
      if (ExpiryService.isExpired(l.expiresAt)) return false;
      if (!l.isSafe) return false;
      return true;
    });
  }

  static sortByUrgency(listings: FoodListing[]): FoodListing[] {
    const urgencyOrder: Record<UrgencyLevel, number> = {
      urgent: 0,
      warning: 1,
      safe: 2,
      expired: 3
    };
    return [...listings].sort((a, b) => {
      return urgencyOrder[a.urgencyLevel] - urgencyOrder[b.urgencyLevel];
    });
  }
}
