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
- **2025-01-20**: Successfully Fixed Vercel Deployment Issues
  - **Build Directory Issue Resolved**: Fixed `vercel.json` to point to correct output directory `dist/public`
  - **API Connection Strategy Updated**: Migrated all Vercel serverless functions from direct PostgreSQL to Supabase REST API
  - **Dependencies Fixed**: Added `@vercel/node` dependency for proper serverless function support
  - **Type Errors Resolved**: Fixed `.toFixed()` error in search.ts by converting string to number
  - **All APIs Converted to REST**: Created unified supabase-client.ts for all API calls
  - **Production Optimization**: All serverless functions now use authenticated REST API calls to Supabase
- **2025-01-20**: Successfully Completed Hybrid Database Strategy & Migration
  - **Hybrid Database Configuration**:
    - Development environment: PostgreSQL (Replit native) - fully functional
    - Production environment: Supabase (Vercel compatible) - data migrated successfully
    - Smart environment detection for automatic database selection
    - Created unified database abstraction layer in `server/supabase.ts`
  - **Data Migration Completed**:
    - **Successfully migrated all data to Supabase via REST API**
    - Used SUPABASE_SERVICE_ROLE_KEY for authenticated API access
    - Overcame Replit PostgreSQL connectivity limitations with REST approach
    - All data verified and accessible in Supabase dashboard
  - **Production Optimization**:
    - Updated all Vercel serverless functions to use Supabase
    - Maintained development workflow with PostgreSQL
    - Environment-specific configuration management
    - Updated deployment guides for both platforms
  - **Database Content Successfully Migrated**:
    - 3 Courses: Fitoterapia Amazônica, Cosméticos Naturais, Aromaterapia Brasileira
    - 3 Products: Óleo de Copaíba, Máscara Purificante, Leave-in Capilar
    - 3 Publications: Scientific articles about Brazilian botanical compounds
    - 2 Admin users: admin@exemplo.com, sergio.vscf@gmail.com
    - All data preserved with complete structure and relationships
  - **Migration Success Confirmed**:
    - Supabase project: gswdmdygbytmqkacwngm.supabase.co
    - Data accessible via Table Editor in Supabase dashboard
    - REST API endpoints working correctly with service role authentication
    - Ready for immediate Vercel deployment
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