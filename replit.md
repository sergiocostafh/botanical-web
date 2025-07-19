# Amanda D'Angelis Botanical Platform

## Project Overview
Educational and e-commerce platform for botanical research and bioactive compounds from Brazil. Features course management, product catalog, and scientific publications showcase with admin functionality.

## Architecture
- **Frontend**: React + TypeScript with Vite
- **Backend**: Express.js + TypeScript 
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter (migrated from react-router-dom)
- **Styling**: Tailwind CSS with custom botanical theme
- **State Management**: React Query + Context API

## Recent Changes
- **2025-01-19**: Completed full migration from Lovable to Replit
  - Migrated from Supabase to PostgreSQL with Drizzle ORM
  - Created backend API routes for courses, products, publications
  - Replaced react-router-dom with wouter routing library
  - Fixed all major component routing imports and hooks
  - Database schema successfully synced with `npm run db:push`
  - **Implemented Google OAuth Authentication System**:
    - Added secure admin authentication using Google OAuth 2.0
    - Primary admin: sergio.vscf@gmail.com with full admin privileges
    - Created admin permission management system with database-backed user control
    - Protected all admin routes with proper authentication middleware
    - Implemented user session management with PostgreSQL storage
    - Created fallback login system (admin/admin123) for development
    - Added user management interface in admin panel
  - **Security Enhancements**:
    - All admin operations require authenticated Google user with admin permissions
    - Session-based authentication with automatic token refresh
    - Admin user permissions stored securely in database
    - Proper error handling for unauthorized access attempts

## User Preferences
- Portuguese language for UI text and error messages
- Botanical/earthy color scheme with natural aesthetics
- Professional academic styling for scientific content

## Development Notes
- Custom botanical color palette defined in Tailwind config
- API endpoints follow REST conventions: `/api/courses`, `/api/products`, `/api/publications`
- Admin authentication uses localStorage token (simplified for demo)
- Cart functionality implemented with React Context
- Form validation using react-hook-form + Zod schemas

## Deployment
Ready for deployment on Replit with PostgreSQL database configured.