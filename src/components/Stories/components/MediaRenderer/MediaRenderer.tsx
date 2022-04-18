import React from 'react';

import {StoriesItemMedia} from '../../types';
import {ImageView, VideoView} from '../../components';

export interface MediaRendererProps {
    media: StoriesItemMedia;
}

export function MediaRenderer({media}: MediaRendererProps) {
    return (media.type || 'image') === 'image' ? (
        <ImageView media={media} />
    ) : (
        <VideoView media={media} />
    );
}
