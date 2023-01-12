import {ToasterSingleton} from './components/Toaster/ToasterSingletonReact18';

// in SSR case
export const toaster = typeof window === 'object' ? new ToasterSingleton() : null;
