import { describe, expect, it } from "vitest";

import { getOptimizedImage } from "../utils";

describe("getOptimizedImage utility", () => {
  it("should append Unsplash parameters to a clean URL", () => {
    const url = "https://images.unsplash.com/photo-123";
    const result = getOptimizedImage(url, 400);

    expect(result).toBe(
      "https://images.unsplash.com/photo-123?auto=format&fit=crop&q=80&w=400",
    );
  });

  it("should use '&' as a separator if the URL already has query parameters", () => {
    const url = "https://images.unsplash.com/photo-123?utm_source=test";
    const result = getOptimizedImage(url, 400);

    expect(result).toBe(
      "https://images.unsplash.com/photo-123?utm_source=test&auto=format&fit=crop&q=80&w=400",
    );
  });

  it("should use higher quality (q=90) for small images under 100px", () => {
    const url = "https://images.unsplash.com/photo-123";
    const result = getOptimizedImage(url, 64);

    expect(result).toContain("q=90");
    expect(result).toContain("w=64");
  });

  it("should use standard quality (q=80) for larger images", () => {
    const url = "https://images.unsplash.com/photo-123";
    const result = getOptimizedImage(url, 800);

    expect(result).toContain("q=80");
    expect(result).toContain("w=800");
  });

  it("should return the original URL if it is not an Unsplash image", () => {
    const url = "https://my-own-server.com/car.jpg";
    const result = getOptimizedImage(url, 400);

    expect(result).toBe(url);
  });
});
