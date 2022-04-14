import React from 'react';

import {StoryMedia} from '../../types';
import {ImageView, VideoView} from '../../components';

export interface MediaRendererProps {
    media: StoryMedia;
}

export function MediaRenderer({media}: MediaRendererProps) {
    return (
        <React.Fragment>
            {(media.type || 'image') === 'image' && <ImageView media={media} />}
            {media.type === 'video' && <VideoView media={media} />}
        </React.Fragment>
    );
}
