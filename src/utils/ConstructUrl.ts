import { API_URL } from '../Constants.js';

export function constructUrl(
  authorName: string,
  limit: number,
  format: string
): URL {
  const url = new URL(API_URL);
  url.searchParams.set('q', authorName);
  url.searchParams.set('limit', limit.toString());
  // The format you are interested in should be a header
  url.searchParams.set('format', format);

  return url;
}
