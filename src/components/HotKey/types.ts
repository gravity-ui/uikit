export type Platform = 'pc' | 'mac';

export type KeyDefs = {
    raw: string;
    id: string;
    priority: number;
    displayName?: string;
};

export type PlatformDefs = {
    NormalizeMap: Partial<Record<string, string>>;
    Priority: Partial<Record<string, number>>;
    DisplayName: Partial<Record<string, string>>;
};

export type KeyParser = (raw: string) => KeyDefs;
