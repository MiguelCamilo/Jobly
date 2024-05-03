import { isJobSlugRoute } from '@/lib/utils';

/**
 * Adds dynamic routes to the application.
 * If the provided URL is a job slug route, it adds the URL to the `backButtonEnabledRoutes` array.
 * 
 * @param url - The URL to be checked and added to the `backButtonEnabledRoutes` array.
 */
export function addDynamicRoutes(url: string) {
    if (isJobSlugRoute(url)) {
      backButtonEnabledRoutes.push(url);
    }
  }

export const backButtonEnabledRoutes = [
    "/about"
];
