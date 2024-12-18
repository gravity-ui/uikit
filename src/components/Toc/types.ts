import type {Href, RouterOptions} from '../types';

export interface TocItem {
    value?: string;
    content?: React.ReactNode;
    href?: Href;
    items?: TocItem[];
    routerOptions?: RouterOptions;
}
