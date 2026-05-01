export function getOptimizedImage(url: string, width: number = 800) {
  if (url.includes("images.unsplash.com")) {
    const separator = url.includes("?") ? "&" : "?";
    const quality = width < 100 ? 90 : 80;
    return `${url}${separator}auto=format&fit=crop&q=${quality}&w=${width}`;
  }

  return url;
}
