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
- **2025-01-20**: Implemented Hybrid Database Strategy
  - **Hybrid Database Configuration**:
    - Development environment: PostgreSQL (Replit native)
    - Production environment: Supabase (Vercel compatible)
    - Smart environment detection for automatic database selection
    - Created unified database abstraction layer
  - **Data Migration System**:
    - Built migration script to sync PostgreSQL data to Supabase
    - Preserved all existing course, product, and publication data
    - Automated data verification and integrity checks
    - Script available at `scripts/migrate-to-supabase.ts`
  - **Production Optimization**:
    - Updated all Vercel serverless functions to use Supabase
    - Maintained development workflow with PostgreSQL
    - Environment-specific configuration management
    - Updated deployment guides for both platforms
  - **Database Content Preserved**:
    - 3 Courses: Fitoterapia Amazônica, Cosméticos Naturais, Aromaterapia Brasileira
    - 3 Products: Óleo de Copaíba, Máscara Purificante, Leave-in Capilar
    - 3 Publications: Scientific articles about Brazilian botanical compounds
    - Admin user system maintained with Google OAuth integration
- **2025-01-19**: Completed full migration from Lovable to Replit
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
  - **Smart Search Implementation**:
    - Created SmartSearch component with real-time autocomplete
    - Implemented search across courses, products, and publications
    - Added keyboard navigation (arrows, Enter, Esc)
    - Created dedicated admin search page with advanced features
    - Integrated search functionality in admin layout header
  - **Vercel Deployment Configuration**:
    - Created serverless functions in `/api/` directory
    - Configured `vercel.json` for proper build and routing
    - Added environment variable templates
    - Created comprehensive deployment guide
    - Compatible with both Replit and Vercel environments

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
Ready for deployment on both Replit and Vercel:
- **Replit**: Full-stack Express.js + React with PostgreSQL
- **Vercel**: Serverless functions + static site with external PostgreSQL
- Environment variables configured for both platforms
- Comprehensive deployment guides provided