# FoodFlow - Expiry-Aware Food Donation Platform

A modern web application that connects food donors with recipients, featuring real-time expiry tracking and safety validation.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download this project**

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
```

## 📁 Project Structure

```
foodflow/
├── index.html              # Entry HTML file
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── src/
    ├── main.tsx            # App entry point
    ├── App.tsx             # Main app component
    ├── index.css           # Global styles & design system
    ├── types.ts            # TypeScript type definitions
    ├── data.ts             # Mock data
    ├── components/
    │   ├── Navbar.tsx          # Navigation bar
    │   ├── ListingCard.tsx     # Food listing card
    │   ├── ClaimModal.tsx      # Claim food modal
    │   └── FoodFlowLogo.tsx    # Custom logo component
    ├── pages/
    │   ├── HomePage.tsx        # Landing page
    │   ├── ListingsPage.tsx    # Browse food listings
    │   ├── DonatePage.tsx      # Donate food form
    │   ├── LoginPage.tsx       # Login/Signup page
    │   └── AboutPage.tsx       # About page
    ├── services/
    │   └── index.ts            # Business logic services
    └── hooks/
        └── useCountdown.ts     # Countdown timer hook
```

## 🎨 Features

- **Real-time Expiry Tracking**: Live countdown timers for all food listings
- **Urgency Classification**: Safe (>6h), Warning (2-6h), Urgent (<2h), Expired
- **Safety Validation**: Auto-checks for blocked items (raw meat, alcohol, etc.)
- **Role-based Access**: Donor and Recipient roles
- **Responsive Design**: Mobile-first, works on all devices
- **Modern UI**: Clean, accessible design with custom design system

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons

## 📋 Pages

1. **Home** - Landing page with hero section
2. **Browse Food** - View all available food listings
3. **Donate Food** - Form to list food for donation
4. **Login/Signup** - Authentication page
5. **About** - Information about the platform

## 🎯 Key Business Logic

### Expiry Service
- Classifies food urgency based on remaining time
- Auto-hides expired food from recipients
- Real-time countdown updates every second

### Safety Service
- Validates listings against blocked keywords
- Prevents unsafe items from being listed
- Blocks items containing: raw meat, alcohol, unpasteurized, etc.

### Claim Service
- Generates unique 8-character pickup codes
- Validates claims (not expired, safe, quantity available)
- Prevents double-claiming

## 🎨 Design System

Custom CSS variables for consistent theming:
- Brand colors: Green (#1E6B54)
- Urgency colors: Amber (warning), Red (urgent)
- Typography: Inter font family
- Responsive grid layouts

## 📱 Responsive Breakpoints

- Mobile: < 640px (single column)
- Tablet: 640px - 991px (2 columns)
- Desktop: ≥ 992px (3 columns)

## 🔐 Authentication

Simple client-side authentication:
- Sign up with email/password
- Role selection (Donor/Recipient)
- Session management

## 📦 Build Output

Production build creates optimized files in `dist/` folder:
- Minified HTML, CSS, and JavaScript
- Code splitting for better performance
- Ready to deploy to any static hosting

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

## 📄 License

MIT License - Feel free to use for your projects!

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for zero food waste
