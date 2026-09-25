import { FoodListing, Notification, Location, Donor, Recipient, User } from './types';

// Locations
const locations: Location[] = [
  { id: 'loc-1', address: '42 Green Street', area: 'Downtown', city: 'Dhaka', postalCode: '1205' },
  { id: 'loc-2', address: '15 Banani Road', area: 'Banani', city: 'Dhaka', postalCode: '1213' },
  { id: 'loc-3', address: '88 Gulshan Avenue', area: 'Gulshan', city: 'Dhaka', postalCode: '1212' },
  { id: 'loc-4', address: '7 Dhanmondi Circle', area: 'Dhanmondi', city: 'Dhaka', postalCode: '1209' },
  { id: 'loc-5', address: '23 Uttara Sector 4', area: 'Uttara', city: 'Dhaka', postalCode: '1230' },
];

// Users
const users: User[] = [
  { id: 'u1', email: 'rahim@restaurant.com', firstName: 'Rahim', lastName: 'Ahmed', phone: '+880171234567', role: 'donor' },
  { id: 'u2', email: 'fatima@grocery.com', firstName: 'Fatima', lastName: 'Khan', phone: '+880171234568', role: 'donor' },
  { id: 'u3', email: 'karim@events.com', firstName: 'Karim', lastName: 'Hossain', phone: '+880171234569', role: 'donor' },
  { id: 'u4', email: 'nadia@shelter.org', firstName: 'Nadia', lastName: 'Rahman', phone: '+880171234570', role: 'recipient' },
  { id: 'u5', email: 'jamal@ngo.org', firstName: 'Jamal', lastName: 'Uddin', phone: '+880171234571', role: 'recipient' },
];

// Donors
const donors: Donor[] = [
  { id: 'd1', user: users[0], isVerified: true, donorType: 'restaurant', location: locations[0] },
  { id: 'd2', user: users[1], isVerified: true, donorType: 'grocery', location: locations[1] },
  { id: 'd3', user: users[2], isVerified: false, donorType: 'event', location: locations[2] },
];

// Recipients
const recipients: Recipient[] = [
  { id: 'r1', user: users[3], isVerified: true, recipientType: 'shelter', location: locations[3] },
  { id: 'r2', user: users[4], isVerified: true, recipientType: 'ngo', location: locations[4] },
];

// Helper to create dates relative to now
const hoursFromNow = (hours: number): Date => new Date(Date.now() + hours * 60 * 60 * 1000);
const minutesFromNow = (minutes: number): Date => new Date(Date.now() + minutes * 60 * 1000);

// Food Listings with various urgency states
export const mockListings: FoodListing[] = [
  {
    id: 'fl-1',
    donor: donors[0],
    location: locations[0],
    foodName: 'Fresh Vegetable Biryani',
    description: 'Hyderabadi-style biryani with mixed vegetables, prepared today. Serves 20 people.',
    quantity: 10,
    unit: 'kg',
    expiresAt: hoursFromNow(8), // SAFE - 8 hours left
    status: 'available',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    urgencyLevel: 'safe',
    remainingTime: hoursFromNow(8).getTime() - Date.now(),
    isSafe: true,
  },
  {
    id: 'fl-2',
    donor: donors[1],
    location: locations[1],
    foodName: 'Assorted Fresh Fruits',
    description: 'Mangoes, bananas, and apples. Slightly bruised but perfectly edible. Great for smoothies.',
    quantity: 25,
    unit: 'kg',
    expiresAt: hoursFromNow(4), // WARNING - 4 hours left
    status: 'available',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    urgencyLevel: 'warning',
    remainingTime: hoursFromNow(4).getTime() - Date.now(),
    isSafe: true,
  },
  {
    id: 'fl-3',
    donor: donors[0],
    location: locations[0],
    foodName: 'Chicken Curry (Cooked)',
    description: 'Home-style chicken curry, freshly cooked. 15 servings approximately.',
    quantity: 5,
    unit: 'kg',
    expiresAt: minutesFromNow(90), // URGENT - 1.5 hours left
    status: 'available',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    urgencyLevel: 'urgent',
    remainingTime: minutesFromNow(90).getTime() - Date.now(),
    isSafe: true,
  },
  {
    id: 'fl-4',
    donor: donors[2],
    location: locations[2],
    foodName: 'Wedding Catering - Rice & Dal',
    description: 'Surplus from wedding event. Steamed rice and lentil dal. Approximately 50 servings.',
    quantity: 30,
    unit: 'kg',
    expiresAt: minutesFromNow(45), // URGENT - 45 min left
    status: 'available',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    urgencyLevel: 'urgent',
    remainingTime: minutesFromNow(45).getTime() - Date.now(),
    isSafe: true,
  },
  {
    id: 'fl-5',
    donor: donors[1],
    location: locations[1],
    foodName: 'Packaged Bread Loaves',
    description: 'Bakery bread, sealed packets. Best before today evening.',
    quantity: 40,
    unit: 'pieces',
    expiresAt: hoursFromNow(12), // SAFE - 12 hours left
    status: 'available',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    urgencyLevel: 'safe',
    remainingTime: hoursFromNow(12).getTime() - Date.now(),
    isSafe: true,
  },
  {
    id: 'fl-6',
    donor: donors[0],
    location: locations[3],
    foodName: 'Samosas & Snacks',
    description: 'Freshly fried vegetable samosas, 100 pieces. Perfect for distribution.',
    quantity: 100,
    unit: 'pieces',
    expiresAt: hoursFromNow(3), // WARNING - 3 hours left
    status: 'available',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    urgencyLevel: 'warning',
    remainingTime: hoursFromNow(3).getTime() - Date.now(),
    isSafe: true,
  },
  {
    id: 'fl-7',
    donor: donors[2],
    location: locations[4],
    foodName: 'Dairy Milk Packets',
    description: 'Sealed milk packets, 500ml each. Stored properly in cool conditions.',
    quantity: 60,
    unit: 'packets',
    expiresAt: hoursFromNow(18), // SAFE - 18 hours left
    status: 'available',
    createdAt: new Date(Date.now() - 0.5 * 60 * 60 * 1000),
    urgencyLevel: 'safe',
    remainingTime: hoursFromNow(18).getTime() - Date.now(),
    isSafe: true,
  },
  {
    id: 'fl-8',
    donor: donors[1],
    location: locations[0],
    foodName: 'Mixed Salad Bowls',
    description: 'Pre-made salad bowls with lettuce, tomatoes, cucumbers. 20 servings.',
    quantity: 20,
    unit: 'bowls',
    expiresAt: minutesFromNow(-30), // EXPIRED - 30 min ago
    status: 'expired',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    urgencyLevel: 'expired',
    remainingTime: 0,
    isSafe: false,
  },
  {
    id: 'fl-9',
    donor: donors[0],
    location: locations[2],
    foodName: 'Raw Meat Portions',
    description: 'Fresh cuts of beef and chicken. Needs immediate cooking.',
    quantity: 8,
    unit: 'kg',
    expiresAt: hoursFromNow(5),
    status: 'blocked',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    urgencyLevel: 'warning',
    remainingTime: hoursFromNow(5).getTime() - Date.now(),
    isSafe: false,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    recipient: recipients[0],
    listing: mockListings[2],
    notificationType: 'expiry_warning',
    title: 'Food Expiring Soon!',
    message: 'Chicken Curry (Cooked) will expire in less than 2 hours. Claim it now!',
    isRead: false,
    createdAt: minutesFromNow(-15),
  },
  {
    id: 'n2',
    recipient: recipients[0],
    listing: mockListings[0],
    notificationType: 'new_listing',
    title: 'New Food Available',
    message: 'Fresh Vegetable Biryani has been listed by Rahim Ahmed near Downtown.',
    isRead: false,
    createdAt: minutesFromNow(-45),
  },
  {
    id: 'n3',
    recipient: recipients[0],
    listing: mockListings[3],
    notificationType: 'pickup_reminder',
    title: 'Pickup Reminder',
    message: 'Your claim for Wedding Catering pickup is due in 1 hour. Code: a3f7b2c1',
    isRead: true,
    createdAt: minutesFromNow(-120),
  },
  {
    id: 'n4',
    recipient: recipients[0],
    notificationType: 'claim_update',
    title: 'Claim Completed',
    message: 'Thank you! Your claim for Assorted Fresh Fruits has been completed.',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

export const mockDonors = donors;
export const mockRecipients = recipients;
export const mockLocations = locations;
