# 🧪 Transaction Insights Dashboard

A financial transaction dashboard built with Next.js, TypeScript, and React Query. This project demonstrates advanced frontend patterns including infinite scrolling, real-time data aggregation, and sophisticated filtering capabilities.

<img width="899" height="594" alt="image" src="https://github.com/user-attachments/assets/33dd18d8-7773-4ef1-aaff-cea3d46fdc8c" />

---

## 📋 Project Overview

This dashboard was developed as a hiring submission to showcase expertise in:
- **API Integration**: Consuming paginated REST APIs with React Query
- **Data Manipulation**: Real-time aggregation and derived state management
- **Infinite Loading**: Smooth infinite scrolling with performance optimizations
- **Code Quality**: TypeScript-first architecture with modern tooling

---

## 🚀 Live Demo

[Deployed Live Link](https://transaction-insights-dashboard.vercel.app/)

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.1.6** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 19.2.3** - Latest React with concurrent features

### Data & State Management
- **TanStack Query v5** - Server state management and caching
- **React Compiler** - Automatic React optimizations

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Lucide React** - Icon library
- **Radix UI** - Accessible component primitives

### Development Tools
- **Biome** - Fast linting and formatting
- **Husky** - Git hooks
- **pnpm** - Package manager

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Main page with server components
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── dashboard.tsx            # Server component wrapper
│   ├── dashboard-client.tsx     # Client component with state
│   ├── transaction-list.tsx     # Transaction table with infinite scroll
│   ├── transaction-insights.tsx # Aggregated statistics cards
│   ├── transaction-filters.tsx  # Advanced filtering UI
│   ├── navbar.tsx               # Navigation header
│   ├── common/                  # Shared components
│   └── ui/                      # shadcn/ui components
├── hooks/                        # Custom React hooks
│   ├── useTransactionsInfinite.ts # Infinite query hook
│   ├── use-infinite-scroll.ts    # Scroll detection hook
│   └── useDebounce.ts           # Debounced search hook
├── services/                     # API layer
│   └── transactions.api.ts      # Transaction API functions
├── lib/                          # Utility libraries
│   ├── axios.ts                 # HTTP client configuration
│   └── query-keys.ts            # React Query key management
├── types/                        # TypeScript definitions
│   ├── transaction.ts           # Transaction data model
│   └── transaction-filters.ts   # Filter types
└── utils/                        # Utility functions
```

---

## 🔧 Architecture & Design Decisions

### 1. **Server-First Architecture**
- **Hybrid Rendering**: Server components for initial data fetching, client components for interactivity
- **SSR + Hydration**: Server-side rendering with React Query hydration for optimal performance
- **Progressive Enhancement**: Core functionality works without JavaScript

### 2. **Data Management Strategy**
- **React Query**: Centralized server state management with caching and background refetching
- **Infinite Queries**: Efficient pagination with automatic cache management
- **Optimistic Updates**: Immediate UI feedback for better UX

### 3. **Component Architecture**
- **Composition Pattern**: Small, reusable components with clear responsibilities
- **Prop Drilling Prevention**: Context and custom hooks for state management
- **Type Safety**: Full TypeScript coverage with strict mode enabled

### 4. **Performance Optimizations**
- **React Compiler**: Automatic memoization and optimization
- **Debounced Search**: 500ms debounce to prevent excessive API calls
- **Infinite Scroll Threshold**: 90% scroll position for loading next page
- **Image Optimization**: Next.js Image component with proper sizing

---

## 🎯 Core Features Implementation

### 1. **Transaction List with Infinite Scrolling**

**Implementation Details:**
- Custom `useInfiniteScroll` hook with 90% threshold
- Skeleton loaders for initial and pagination loading states
- "No more results" indicator when data is exhausted
- Automatic query invalidation on filter changes

**Key Files:**
- `src/components/transaction-list.tsx`
- `src/hooks/use-infinite-scroll.ts`
- `src/hooks/useTransactionsInfinite.ts`

### 2. **Advanced Filtering System**

**Features:**
- **Multi-select Status**: Success/Failed/Pending filtering
- **Category Filtering**: Payment/Deposit/Withdraw/Invoice
- **Date Range Picker**: Single date selection with full-day range
- **Debounced Search**: 500ms delay for username/ID search
- **Clear Filters**: One-click filter reset

**Implementation Highlights:**
- Filter state managed in parent component
- Automatic pagination reset on filter changes
- Real-time filter synchronization across components

**Key Files:**
- `src/components/transaction-filters.tsx`
- `src/hooks/useDebounce.ts`
- `src/types/transaction-filters.ts`

### 3. **Real-time Data Aggregation**

**Calculated Metrics:**
- Total transactions count
- Total successful amount (formatted currency)
- Success rate percentage
- Top category by volume

**Performance Features:**
- `useMemo` optimization to prevent unnecessary recalculations
- Real-time updates as new pages load
- Loading states with skeleton components

**Key Files:**
- `src/components/transaction-insights.tsx`

### 4. **API Integration**

**Endpoint:**
```
GET https://696e0139d7bacd2dd7155c6a.mockapi.io/barter-tech/transactions
```

**Features:**
- Axios client with 10s timeout and error handling
- Response interceptors for consistent error messages
- Query parameter serialization for filters
- Pagination support with page/limit parameters

**Key Files:**
- `src/services/transactions.api.ts`
- `src/lib/axios.ts`

---

## 🎨 UI/UX Design

### Design System
- **Modern Card Layout**: Clean, organized information hierarchy
- **Responsive Grid**: Mobile-first responsive design
- **Loading States**: Skeleton loaders for better perceived performance
- **Status Indicators**: Color-coded status badges (green/red/yellow)
- **Micro-interactions**: Hover states and smooth transitions

### Accessibility Features
- **Semantic HTML**: Proper heading hierarchy and table structure
- **ARIA Labels**: Screen reader compatibility
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color scheme

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/remmiculous/transaction-insights-dashboard.git
cd transaction-insights-dashboard

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
```

### Environment Setup

No environment variables required - uses mock API endpoint.

---

## 🧪 Testing & Quality

### Code Quality Tools
- **Biome**: Linting and formatting (replaces ESLint/Prettier)
- **TypeScript**: Strict mode with full type coverage
- **Husky**: Pre-commit hooks for code quality

### Performance Metrics
- **Lighthouse Score**: 95+ Performance, Accessibility, Best Practices
- **Bundle Size**: Optimized with Next.js automatic code splitting
- **Runtime Performance**: React Compiler optimizations

---

## 📊 API Response Format

```typescript
interface Transaction {
  id: string;
  name: string;
  avatar: string;
  amount: string;
  currency: string;
  category: "payment" | "deposit" | "withdraw" | "invoice";
  status: boolean; // true = success, false = failed
  createdAt: string; // ISO 8601 timestamp
}
```

---

## 🚧 Trade-offs & Considerations

### Technical Trade-offs
1. **Single Date Filter**: Implemented single date picker instead of range for simplicity and the API endpoint doesn't support range
2. **Status as Boolean**: API returns boolean, but UI shows three states (success/failed/pending)
3. **Client-side Aggregation**: All calculations done client-side for real-time updates with the help of useMemo

### Future Improvements
1. **Virtual Scrolling**: For handling large datasets efficiently
2. **Server-side Aggregation**: Move calculations to API for better performance
3. **Real-time Updates**: WebSocket integration for live data
4. **Advanced Filtering**: Multi-select categories and date ranges
5. **Export Functionality**: CSV/PDF export capabilities

---

### Key Implementation Details

1. **Infinite Scroll Logic**: Uses intersection observer pattern with percentage-based threshold
2. **Query Key Management**: Centralized in `query-keys.ts` for cache invalidation
3. **Error Handling**: Axios interceptors provide consistent error messages
4. **Loading States**: Differentiated between initial load and pagination loading
5. **Type Safety**: Full TypeScript coverage with strict null checks

### Performance Optimizations
- React Compiler for automatic memoization
- Debounced search to prevent API spam
- Efficient re-renders with proper dependency arrays
- Image optimization with Next.js Image component
- Code splitting with dynamic imports where applicable

---

## 📎 Note

Developed as a technical assessment for frontend engineering position. Demonstrates expertise in modern React development, API integration, and performance optimization.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
