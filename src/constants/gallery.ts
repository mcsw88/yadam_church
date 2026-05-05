export const GALLERY_YEARS = [2026, 2025, 2024] as const;

export type GalleryYear = (typeof GALLERY_YEARS)[number];
