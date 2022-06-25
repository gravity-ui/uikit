import {ToasterSingleton} from './ToasterSingleton';
import {Toast} from './Toast/Toast';

// in SSR case
const toaster = typeof window === 'object' ? new ToasterSingleton() : null;
const removeToaster = () => toaster?.destroy();

export * from './types';
export {ToasterSingleton as Toaster, Toast, toaster, removeToaster};

export {useToaster} from './hooks/useToaster';
export {ToasterComponent} from './ToasterComponent/ToasterComponent';
export {ToasterProvider} from './ToasterProvider';
