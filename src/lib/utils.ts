import { twMerge } from "tailwind-merge"
import { type ClassValue, clsx } from "clsx"

import { formatDistanceToNowStrict } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function relativeDate(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true })
}

export function createSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, ""); // replaces multiple spaces and dashes with one space
}

/**
 * Checks if the given URL is a job slug route.
 * A job slug route is a URL that matches the pattern `/jobs/slug`.
 * 
 * @param url - The URL to check.
 * @returns boolean `true` if the URL is a job slug route, boolean `false` otherwise.
 */
export function isJobSlugRoute(url: string) {
  const regex = /^\/jobs\/[^\/]+$/; // regular expression to match /jobs/slug
  return regex.test(url);
}
