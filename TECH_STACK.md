# Matcha - Tech Stack Architecture

## Overview
This document outlines the complete technology stack for our 42 matcha project.
Bear in mind that this stack reflects the restrictions imposed by the subject, e.g. no validation libraries and no ORM.

## Frontend Stack

### Core Framework
- **React 18** - Main frontend framework with hooks and modern patterns
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server

### State Management & Data Fetching
- **TanStack Query (React Query)** - Server state management and caching
- **Zustand** - Lightweight client state management
- **React Hook Form** - Form handling with validation

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components
- **Lucide React** - Beautiful, customizable icons
- **Framer Motion** - Smooth animations and transitions

### Real-time Communication
- **Socket.io Client** - Real-time chat and notifications
- **React Hot Toast** - Toast notifications

### Additional Libraries
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Dropzone** - File upload handling
- **React Image Crop** - Image editing capabilities
- **Date-fns** - Date manipulation utilities

## Backend Stack

### Core Framework
- **Rust** - High-performance, memory-safe backend language
- **Axum** - Modern, fast web framework for Rust
- **Tokio** - Asynchronous runtime

### Database & ORM
- **PostgreSQL** - Primary relational database
- **SQLx** - Async SQL toolkit (no ORM, manual queries as required)
- **Redis** - Caching and session storage

### Authentication & Security
- **Argon2** - Password hashing
- **JWT** - Token-based authentication
- **uuid** - Unique identifier generation

### Real-time Communication
- **Socket.io** - WebSocket implementation for real-time features
- **Axum WebSocket** - Native WebSocket support

### File Handling
- **Multer (equivalent)** - File upload handling
- **Image processing libraries** - Image validation and manipulation
- **Cloud storage integration** - For scalable file storage

### Validation & Serialization
- **Serde** - Serialization/deserialization
- **Custom validation functions** - Manual input validation
- **Regex** - Pattern matching for validation

### Additional Libraries
- **Tracing** - Structured logging
- **Config** - Configuration management
- **Dotenv** - Environment variable management
- **Chrono** - Date and time handling
- **Geo** - Geolocation calculations

## Development Tools

### Code Quality
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Rust Clippy** - Rust linting
- **Rust Fmt** - Rust code formatting

### Testing
- **Jest** - Frontend testing framework
- **React Testing Library** - Component testing
- **Cargo Test** - Rust unit and integration tests
- **Playwright** - End-to-end testing

### Development Environment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Git** - Version control
- **GitHub Actions** - CI/CD pipeline
- **cargo-watch** - Hot reload for Rust development

## Infrastructure & Deployment

### Database
- **PostgreSQL 15+** - Primary database
- **Redis 7+** - Caching and sessions
- **PgAdmin** - Database administration (development)

### File Storage
- **Local storage** - Development
- **AWS S3 / Cloudflare R2** - Production file storage
- **CDN** - Static asset delivery

### Monitoring & Logging
- **Sentry** - Error tracking
- **Prometheus** - Metrics collection
- **Grafana** - Monitoring dashboards

## Security Stack

### Authentication & Authorization
- **JWT tokens** - Stateless authentication
- **Refresh tokens** - Secure token rotation
- **Rate limiting** - API protection
- **CORS** - Cross-origin resource sharing

### Data Protection
- **HTTPS/TLS** - Encrypted communication
- **Input sanitization** - XSS prevention
- **SQL injection prevention** - Parameterized queries
- **File upload validation** - Malicious file prevention

### Environment Security
- **Environment variables** - Secure configuration
- **Secrets management** - Production credentials
- **Security headers** - Additional protection layers

## Performance Optimizations

### Frontend
- **Code splitting** - Lazy loading
- **Image optimization** - WebP format, lazy loading
- **Bundle optimization** - Tree shaking, minification
- **CDN** - Static asset delivery

### Backend
- **Connection pooling** - Database optimization
- **Caching strategies** - Redis implementation
- **Async processing** - Non-blocking operations
- **Load balancing** - Horizontal scaling

## Development Workflow

### Local Development
1. **Docker Compose** - Start all services
2. **Hot reloading** - Frontend (Vite) and backend (cargo-watch)
3. **Database migrations** - Automated schema updates
4. **Seed data** - Development data population

### Testing Strategy
1. **Unit tests** - Individual component/function testing
2. **Integration tests** - API endpoint testing
3. **E2E tests** - Complete user journey testing
4. **Performance tests** - Load and stress testing

### Deployment Pipeline
1. **Code review** - Pull request validation
2. **Automated testing** - CI/CD pipeline
3. **Security scanning** - Vulnerability assessment
4. **Staging deployment** - Pre-production testing
5. **Production deployment** - Blue-green deployment

## Compliance & Requirements

### Project Requirements Met
- ✅ **No ORM** - Using SQLx for manual queries
- ✅ **No validators** - Manual validation functions (no external validation libraries)
- ✅ **No user account manager** - Custom authentication
- ✅ **Real-time features** - WebSocket implementation
- ✅ **File upload security** - Comprehensive validation
- ✅ **Mobile-friendly** - Responsive design with Tailwind
- ✅ **Browser compatibility** - Modern browser support

### Performance Targets
- **Real-time delay**: < 10 seconds (target: < 2 seconds)
- **Page load time**: < 3 seconds
- **Database queries**: < 100ms average
- **Image upload**: < 5 seconds for 5MB files

## Next Steps

1. **Environment Setup** - Initialize development environment
2. **Project Structure** - Create folder organization
3. **Database Schema** - Design and implement tables
4. **API Design** - Define REST endpoints
5. **Component Library** - Build reusable UI components
6. **Authentication Flow** - Implement user registration/login
7. **Real-time Features** - WebSocket implementation
8. **Testing Suite** - Comprehensive test coverage 