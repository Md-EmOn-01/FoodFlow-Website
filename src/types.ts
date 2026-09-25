// Core types matching the Django models spec

export type UserRole = 'donor' | 'recipient';
export type DonorType = 'restaurant' | 'grocery' | 'individual' | 'event';
export type RecipientType = 'shelter' | 'individual' | 'ngo' | 'community';

export interface Location {
  id: string;
  address: string;
  area: string;
  city: string;
  postalCode: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
}

export interface Donor {
  id: string;
  user: User;
  isVerified: boolean;
  donorType: DonorType;
  location: Location;
}

export interface Recipient {
  id: string;
  user: User;
  isVerified: boolean;
  recipientType: RecipientType;
  location: Location;
}

export type ListingStatus = 'available' | 'claimed' | 'completed' | 'expired' | 'blocked';
export type UrgencyLevel = 'safe' | 'warning' | 'urgent' | 'expired';

export interface FoodListing {
  id: string;
  donor: Donor;
  location: Location;
  foodName: string;
  description: string;
  quantity: number;
  unit: string;
  expiresAt: Date;
  status: ListingStatus;
  createdAt: Date;
  // Computed properties
  urgencyLevel: UrgencyLevel;
  remainingTime: number; // milliseconds
  isSafe: boolean;
}

export type ClaimStatus = 'pending' | 'completed' | 'cancelled' | 'expired';

export interface Claim {
  id: string;
  listing: FoodListing;
  recipient: Recipient;
  claimedQuantity: number;
  pickupDeadline: Date;
  pickupCode: string; // 8-char hex
  status: ClaimStatus;
  createdAt: Date;
}

export type NotificationType = 'expiry_warning' | 'new_listing' | 'claim_update' | 'pickup_reminder';

export interface Notification {
  id: string;
  recipient: Recipient;
  listing?: FoodListing;
  notificationType: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}
