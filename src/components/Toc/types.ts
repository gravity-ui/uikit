export interface TocItem {
    value?: string;
    content?: React.ReactNode;
    href?: string;
}

export type TocItems = (TocItem & {
    items?: TocItem[];
})[];
