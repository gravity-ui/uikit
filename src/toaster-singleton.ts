import {ToasterSingleton} from './components/Toaster/ToasterSingleton';

// in SSR case
export const toaster = typeof window === 'object' ? new ToasterSingleton() : null;
