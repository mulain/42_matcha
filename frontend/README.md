# Matcha Frontend

A modern React + TypeScript frontend for the Matcha dating application.

## Tech Stack

- **React 18** - Main frontend framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .example.env .env
```

3. Update the API URL in `.env`:

```
VITE_API_URL=http://localhost:3000
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API service layer
│   ├── auth-service.ts
│   ├── user-service.ts
│   ├── interaction-service.ts
│   ├── chat-service.ts
│   ├── notification-service.ts
│   ├── health-service.ts
│   └── index.ts
├── store/              # Zustand stores
├── lib/                # Utilities and API client
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## Architecture

### Service Layer

The application uses a service-oriented architecture for API calls:

- **authService** - Authentication (login, register, logout, email verification)
- **userService** - User profiles, browsing, and search functionality
- **interactionService** - User interactions (like, unlike, block, report)
- **chatService** - Real-time messaging
- **notificationService** - Notifications management
- **healthService** - API health checks

### API Client

The `lib/api.ts` provides a generic HTTP client with:

- Automatic token management
- Error handling and authentication redirects
- File upload support
- Request/response interceptors

### State Management

- **Zustand** for client-side state (authentication, UI state)
- **TanStack Query** for server state management and caching

## Features

- **Landing Page** - Beautiful, responsive landing page with animations
- **Authentication** - Login/Register functionality (coming soon)
- **User Profiles** - Profile management and viewing
- **Browse Users** - Discover and search for potential matches
- **Real-time Chat** - Messaging between connected users
- **Notifications** - Real-time notifications for likes, messages, etc.

## API Integration

The frontend is designed to work with the Rust backend API. All API calls are
organized into service objects that use the generic `apiClient` in
`src/lib/api.ts`.

### Using Services

```typescript
import { authService, userService } from '../services'

// Authentication
const authResponse = await authService.login({ username, password })

// User operations
const profile = await userService.getProfile()
const users = await userService.browseUsers(filters)
```

## Styling

The application uses Tailwind CSS with custom design tokens:

- Primary colors: Red theme (`primary-600`, etc.)
- Secondary colors: Purple theme (`secondary-600`, etc.)
- Custom animations and transitions
- Responsive design for mobile and desktop

## Development Guidelines

- Follow the established naming conventions (PascalCase for components,
  camelCase for variables)
- Use TypeScript for all new code
- Implement proper error handling
- Write clean, readable code
- Test components before committing
- Use the service layer for all API calls

## Backend Integration

The frontend expects the backend to be running on `http://localhost:3000` by
default. Make sure the backend is running and the API endpoints are available.

## Next Steps

1. Implement authentication forms (login/register)
2. Create user profile management
3. Build the browse/search functionality
4. Implement real-time chat
5. Add notifications system
6. Set up WebSocket connections
7. Add image upload functionality
8. Implement location services
