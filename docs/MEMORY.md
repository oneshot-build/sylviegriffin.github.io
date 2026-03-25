# Project Memory

## Recent Changes

### Automated Verification Fixes (March 25, 2026)
- **Issues Resolved**: Fixed automated verification problems detected in build/deployment process
- **Files Modified**: 
  - Created `tailwind.config.mjs` to resolve Tailwind CSS content configuration warning
  - Updated `docs/PROJECT.md` with comprehensive project documentation (replaced placeholder content)
  - Updated this memory file with fix documentation
- **Dev Server Fix**: Resolved HTTP 000000 response issue - dev server now responds correctly on port 4321
- **Verification Results**: 
  - ✅ Dev server responding correctly (HTTP 200) on port 4321
  - ✅ Build process completes successfully 
  - ✅ No placeholder text found - all content is real and professional
  - ✅ Project documentation now comprehensive and accurate
  - ✅ Tailwind CSS configuration warnings resolved

### Updated Corporate Events Service
- **File Modified**: `src/components/Approach.astro:20-21`
- **Change**: Updated "Corporate events" service title and description
- **Title Change**: "Corporate events" → "Corporate events and groups"
- **Description Change**: Simplified to "Taylor made group coaching and yoga sessions"
- **Implementation**: End-to-end implementation complete - updated service now displays in the services section of the website

## Project Structure
- **Framework**: Astro v5.18.1
- **Styling**: Tailwind CSS with proper content configuration
- **Integrations**: React components, Tailwind CSS
- **Services**: Defined in `src/components/Approach.astro` as an array of service objects
- **Main Page**: `src/pages/index.astro` orchestrates all components
- **Current Services**: Life Coaching, Yoga & Movement, Reiki Healing, Conscious Travel, Corporate events and groups
- **Documentation**: Comprehensive project docs in `docs/PROJECT.md`

## Technical Notes
- Services are rendered dynamically from the services array
- Each service has a title and description
- Development server runs successfully on port 4321
- Static site generation configured for optimal performance
- Server configured to listen on 0.0.0.0:4321 for development
- Tailwind CSS properly configured with content sources
- Build process optimized with proper warnings resolved