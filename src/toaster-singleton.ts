import {Toaster} from './components/Toaster/Toaster';

// in SSR case
export const toaster = typeof window === 'object' ? new Toaster() : ({} as Toaster);
