import React from 'react';

import {ImageView, VideoView} from '../../components';
import {StoriesItemMedia} from '../../types';

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
