# Vercel Deployment Guide

## Prerequisites
- Vercel account
- Git repository with your code
- Node.js 18+ installed locally

## Deployment Steps

### 1. Install Vercel CLI (Optional)
```bash
npm i -g vercel
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect the configuration from `vercel.json`
5. Click "Deploy"

#### Option B: Using Vercel CLI
```bash
vercel
```

### 3. Configuration Details

The `vercel.json` file is configured to:
- Build the React app using Vite
- Serve static files from `dist/public`
- Handle API routes through `/api/index.ts`
- Enable SPA routing (all routes serve `index.html`)

### 4. Environment Variables (if needed)
If you need environment variables:
1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add any required environment variables

### 5. Custom Domain (Optional)
1. Go to your Vercel project dashboard
2. Navigate to Settings > Domains
3. Add your custom domain

## Troubleshooting

### Issue: Page shows server code instead of React app
**Solution**: This was fixed by updating the `vercel.json` configuration to properly handle SPA routing.

### Issue: API routes not working
**Solution**: Ensure the `api/index.ts` file is properly configured and the Vercel configuration includes the API build.

### Issue: Build fails
**Solution**: 
1. Check that all dependencies are in `package.json`
2. Ensure the build script runs successfully locally
3. Check Vercel build logs for specific errors

### Issue: Assets not loading
**Solution**: The configuration includes proper caching headers for assets.

## File Structure for Vercel
```
├── api/
│   └── index.ts          # API routes
├── client/
│   └── src/              # React source code
├── shared/
│   └── schema.ts         # Shared schemas
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies and scripts
└── vite.config.ts        # Vite configuration
```

## Build Process
1. Vercel runs `npm run build`
2. Vite builds the React app to `dist/public`
3. Static files are served from `dist/public`
4. API routes are handled by `api/index.ts`
5. All other routes serve `index.html` for SPA routing
