export function generateQueryParams(query: Record<string, any>): string {
  return Object.keys(query)
    .filter((key) => !!query[key])
    .map((key) => `${key}=${encodeURIComponent(query[key])}`)
    .join('&');
}
