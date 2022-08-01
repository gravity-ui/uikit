interface ImageData {
    src: string;
    alt?: string;
    ratio?: number;
}

export interface ChangelogItem {
    date: string;
    isNew?: boolean;
    title: string;
    image?: ImageData;
    description: string;
    storyId?: string;
}

export type ChangelogStoryClickHandler = (storyId: string) => void;
