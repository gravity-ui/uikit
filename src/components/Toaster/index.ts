import {ToasterSingleton} from './ToasterSingleton';
import {Toast} from './Toast/Toast';

// in SSR case
const toaster = typeof window === 'object' ? new ToasterSingleton() : null;
const removeToaster = toaster ? () => toaster.destroy() : null;

export * from './types';
export {ToasterSingleton as Toaster, Toast, toaster, removeToaster};
