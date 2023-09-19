export interface TocItem {
    value?: string;
    content?: React.ReactNode;
    href?: string;
    items?: TocItem[];
}
