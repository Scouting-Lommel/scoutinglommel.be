# Performance & Troubleshooting

## Table of contents

- [Performance Architecture](#performance-architecture)
- [Caching Strategy](#caching-strategy)
- [Common Performance Issues](#common-performance-issues)
- [Debugging Slow Load Times](#debugging-slow-load-times)
- [Monitoring & Metrics](#monitoring--metrics)

## Performance Architecture

The application implements several performance optimizations:

### Data Fetching Optimization

- **Shared Data Context**: `DataContext` prevents duplicate API calls between layout and page components
- **Split GraphQL Queries**: Separate focused queries for navigation, footer, and SEO data instead of one large query
- **Parallel API Calls**: Navigation and footer data fetched simultaneously using `Promise.all()`

### Caching Strategy

- **CMS data**: no server-side caching — Strapi fetches are `no-store` so CMS edits appear on the next page load (see [Data Fetching & Caching](data-fetching-and-caching.md))
- **Client-side data**: events, activities, files and links are fetched in the browser to offload server CPU
- **Assets**: CDN caching via Vercel (automatic optimization and edge caching)

## Caching Strategy

### CMS Data

There is no ISR/Data Cache for Strapi content. Fetching is always `no-store`; the revalidate webhook is an acknowledgment endpoint only. See [Data Fetching & Caching](data-fetching-and-caching.md) for the full rationale and decision rules.

### Vercel CDN Configuration

Vercel automatically handles CDN caching and optimization:

- **Static assets**: Automatic caching with version-based invalidation
- **Images**: Built-in image optimization with automatic format selection
- **JavaScript/CSS**: Automatic compression and edge caching
- **Global distribution**: Edge network for optimal worldwide performance

## Common Performance Issues

### Slow Initial Load

**Symptoms**: 10+ second first page load
**Causes**:

- Heroku dyno cold start (free tier only - not applicable with Basic plan)
- Large uncached GraphQL queries
- Unoptimized images from Cloudinary
- Network connectivity issues

**Solutions**:

1. Check browser Network tab for slow resources
2. Verify Heroku dyno status (if you have access to the Heroku dashboard)
3. Optimize Cloudinary image delivery
4. Test from different networks/locations

### API Response Times

**Symptoms**: Server-side rendering takes 5+ seconds
**Causes**:

- Database query performance (Vimexx MySQL)
- Network latency between Heroku ↔ Vimexx
- Large GraphQL query responses

**Solutions**:

1. Monitor API response times in development
2. Use performance logging helper
3. Consider database query optimization
4. Review Strapi content structure

## Debugging Slow Load Times

### Browser DevTools Analysis

1. Open DevTools → Network tab
2. Disable cache and reload page
3. Sort by "Time" to identify slow resources
4. Check for:
   - API calls > 2 seconds
   - Large image downloads
   - Blocking JavaScript

### Performance Logging

Add to API functions for debugging:

```typescript
import { logPerformance } from '@/lib/api/performance-logger';

export const getLayoutData = async () => {
  const startTime = Date.now();
  // ... API calls
  logPerformance('getLayoutData', startTime);
};
```

### Environment-Specific Issues

- **Development**: API calls to production Strapi may be slower
- **Production**: First visit after deployment may be slower due to cache warming
- **Mobile**: 3G/4G networks can significantly impact load times

## Monitoring & Metrics

### Key Performance Indicators

- **TTFB (Time to First Byte)**: Should be < 500ms
- **LCP (Largest Contentful Paint)**: Should be < 2.5s
- **CLS (Cumulative Layout Shift)**: Should be < 0.1
- **API Response Time**: Individual queries should be < 1s

### Tools & Services

- **Vercel Analytics**: Built-in performance metrics and insights
- **Sentry**: Error tracking and performance monitoring
- **Browser DevTools**: Lighthouse performance audits
- **GTmetrix/PageSpeed Insights**: External performance analysis

### Performance Budget

- **Bundle Size**: Main bundle should be < 300KB gzipped
- **Image Sizes**: Hero images should be < 200KB after optimization
- **API Responses**: Individual GraphQL queries should be < 50KB
- **Total Page Size**: Initial page load should be < 1MB

## Infrastructure Notes

### Current Setup

- **Frontend**: Vercel (Global Edge Network)
- **Backend**: Heroku Basic plan (no sleep time)
- **Database**: Vimexx MySQL (Netherlands)
- **Images**: Cloudinary CDN

### Known Limitations

- **Database Location**: Vimexx server location may add latency for international users
- **Heroku Region**: Ensure Heroku app is in Europe region for optimal database connectivity
- **Image Optimization**: Cloudinary transformation URLs should include proper sizing parameters
