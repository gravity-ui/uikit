import React from 'react';

import {block} from '../../../utils/cn';
import {StoryMedia} from '../../types';

import './VideoView.scss';

const b = block('stories-video-view');

export interface VideoViewProps {
    media: StoryMedia;
}

export function VideoView({media}: VideoViewProps) {
    return (
        <video
            className={b(null)}
            src={media.url}
            controls={false}
            playsInline
            muted
            autoPlay
            webkit-playsinline="true"
        />
    );
}
