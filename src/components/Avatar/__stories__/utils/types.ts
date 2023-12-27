type SrcSetUrlItem = string;

type SrcSetWidthDescriptor<T> = T extends `${infer _A}w` ? T : never;
type SrcSetWidthItem<T> = [string, SrcSetWidthDescriptor<T>];
type SrcSetWidthType<T> = SrcSetWidthItem<T> | SrcSetUrlItem;

type SrcSetDensityDescriptor<T> = T extends `${infer _A}x` ? T : never;
type SrcSetDensityItem<T> = [string, SrcSetDensityDescriptor<T>];
type SrcSetDensityType<T> = SrcSetDensityItem<T> | SrcSetUrlItem;

export type SrcSetType<T> = SrcSetWidthType<T>[] | SrcSetDensityType<T>[];
