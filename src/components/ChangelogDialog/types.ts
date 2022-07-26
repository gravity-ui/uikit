interface ImageData {
    src: string;
    ratio: number;
}

export interface ChangelogItem {
    date: string;
    isNew?: boolean;
    version: string;
    title?: string;
    image?: ImageData;
    description: string;
    storyId?: string;
}

export type OnStoryClick = (storyId: string) => void;
