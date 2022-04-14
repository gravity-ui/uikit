export interface StoryMedia {
    /** default 'image' */
    type?: 'image' | 'video';
    url: string;
}

export interface Story {
    title?: string;
    description?: string;
    /** Url for link "more" */
    url?: string;
    media?: StoryMedia;
}
