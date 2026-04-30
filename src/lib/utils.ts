export function getOptimizedImage(url: string, width: number = 800) {
  if (url.includes("images.unsplash.com")) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}auto=format&fit=crop&q=80&w=${width}`;
  }

  return url;
}
