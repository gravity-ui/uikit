export const supportsMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function';
export const getDarkMediaMatch = () => window.matchMedia('(prefers-color-scheme: dark)');
