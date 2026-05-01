/**
 * Strict kebab-case slugifier for SEO-safe URLs.
 * - Lowercase only
 * - Hyphens instead of spaces
 * - Removes all special characters
 * - Prevents double hyphens
 * - Trims leading/trailing hyphens
 */
export function slugify(text) {
    if (!text) return '';

    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')        // Remove all non-word chars except -
        .replace(/--+/g, '-')           // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}
