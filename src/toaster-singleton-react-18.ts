import ReactDOMClient from 'react-dom/client';
import {ToasterSingleton} from './components/Toaster/ToasterSingleton';

ToasterSingleton.injectReactDOMClient(ReactDOMClient);

// in SSR case
export const toaster =
    typeof window === 'object' ? new ToasterSingleton() : ({} as ToasterSingleton);
