import {Toaster} from './Toaster';
import {Toast} from './Toast/Toast';

// in SSR case
const toaster = typeof window === 'object' ? new Toaster() : null;

export {Toaster, Toast, toaster};
