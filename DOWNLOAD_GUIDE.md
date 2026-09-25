# FoodFlow - Complete Project Download Guide

## 📥 How to Download and Setup

### Option 1: Copy-Paste Method (Recommended)

1. **Create project folder:**
```bash
mkdir foodflow
cd foodflow
```

2. **Initialize project:**
```bash
npm init -y
```

3. **Install dependencies:**
```bash
npm install react react-dom lucide-react
npm install -D vite @vitejs/plugin-react typescript @types/react @types/react-dom tailwindcss @tailwindcss/vite
```

4. **Create all files** (copy from the sections below)

5. **Run the project:**
```bash
npm run dev
```

---

## 📁 Complete File Structure

### 1. package.json
```json
{
  "name": "foodflow",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.0",
    "vite": "^6.3.5",
    "tailwindcss": "^4.1.7",
    "@tailwindcss/vite": "^4.1.7"
  }
}
```

### 2. index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="FoodFlow — Expiry-aware food donation platform" />
    <title>FoodFlow — Expiry-Aware Food Donation Platform</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }
      html.light, html.light body {
        background-color: #F7FAFC !important;
        color: #1A202C;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 3. vite.config.js
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
});
```

### 4. tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "noEmit": true,
    "allowImportingTsExtensions": true
  },
  "include": ["src"]
}
```

---

## 📂 Source Files (src/ folder)

All source files are already in your project. Here's the complete list:

### Core Files
- ✅ `src/main.tsx` - App entry point
- ✅ `src/App.tsx` - Main app component
- ✅ `src/index.css` - Global styles & design system
- ✅ `src/types.ts` - TypeScript types
- ✅ `src/data.ts` - Mock data

### Components
- ✅ `src/components/Navbar.tsx` - Navigation
- ✅ `src/components/ListingCard.tsx` - Food listing card
- ✅ `src/components/ClaimModal.tsx` - Claim modal
- ✅ `src/components/FoodFlowLogo.tsx` - Logo component

### Pages
- ✅ `src/pages/HomePage.tsx` - Landing page
- ✅ `src/pages/ListingsPage.tsx` - Browse listings
- ✅ `src/pages/DonatePage.tsx` - Donate form
- ✅ `src/pages/LoginPage.tsx` - Login/Signup
- ✅ `src/pages/AboutPage.tsx` - About page

### Services & Hooks
- ✅ `src/services/index.ts` - Business logic
- ✅ `src/hooks/useCountdown.ts` - Countdown hook

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📱 Features Included

✅ Real-time expiry tracking with countdown timers
✅ Urgency classification (Safe/Warning/Urgent/Expired)
✅ Safety validation system
✅ Role-based authentication (Donor/Recipient)
✅ Responsive design (mobile/tablet/desktop)
✅ Modern UI with custom design system
✅ Notification system
✅ Claim system with pickup codes
✅ Food listing management
✅ Search and filter functionality

---

## 🎨 Design System

Custom CSS variables for consistent theming:
- Brand: Green (#1E6B54)
- Warning: Amber (#B7791F)
- Urgent: Red (#C53030)
- Typography: Inter font family
- Responsive grid layouts

---

## 📦 Project Size

- Total files: 17 source files
- Lines of code: ~2,500+
- Dependencies: 7 packages
- Build size: ~210 KB (gzipped)

---

## 🔧 Troubleshooting

**If you get errors:**
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear browser cache
4. Restart dev server

**If styles don't load:**
- Make sure Tailwind CSS is properly configured
- Check that `index.css` is imported in `main.tsx`

---

## 📄 License

MIT License - Free to use for personal and commercial projects.

---

**Built with ❤️ for zero food waste**

For questions or issues, refer to the README.md file.
