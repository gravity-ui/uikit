export type StoriesItemMedia = {url: string} & (
    | {
          /** default 'image' */
          type?: 'image';
      }
    | {
          type: 'video';
          /** A URL for an image to be shown while the video is downloading */
          posterUrl?: string;
      }
);

export interface StoriesItem {
    title?: string;
    description?: string;
    /** Url for link "more" */
    url?: string;
    media?: StoriesItemMedia;
}
