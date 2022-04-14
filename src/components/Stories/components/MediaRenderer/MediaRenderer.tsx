import React from 'react';

import {StoryMedia} from '../../types';
import {ImageView, VideoView} from '../../components';

export interface MediaRendererProps {
    media: StoryMedia;
}

export const MediaRenderer: React.FC<MediaRendererProps> = ({media}) => {
    return (
        <div>
            {(media.type || 'image') === 'image' && <ImageView media={media} />}
            {media.type === 'video' && <VideoView media={media} />}
        </div>
    );
};
