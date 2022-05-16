import React from 'react';

import {block} from '../../../utils/cn';
import {StoriesItemMedia} from '../../types';

import './VideoView.scss';

const b = block('stories-video-view');

export interface VideoViewProps {
    media: StoriesItemMedia;
}

export function VideoView({media}: VideoViewProps) {
    return media.type === 'video' ? (
        <video
            className={b()}
            src={media.url}
            controls={false}
            playsInline
            muted
            autoPlay
            loop
            webkit-playsinline="true"
            poster={media.posterUrl}
        />
    ) : null;
}
