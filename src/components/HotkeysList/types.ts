export type HotkeysItem = {
    title: string;
    value: string;
};

export type HotkeysGroup<T = {}> = {
    title: string;
    items: HotkeysItem[];
} & T;

export type HotkeysListItem = {
    title: string;
    group?: boolean;
    value?: string;
};
