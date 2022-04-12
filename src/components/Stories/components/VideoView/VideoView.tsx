import React from 'react';

import {block} from '../../../utils/cn';
import {StoryMedia} from '../../types';

import './VideoView.scss';

const b = block('stories-video-view');

export interface VideoViewProps {
    media: StoryMedia;
    className?: string;
    onLoad?: () => void;
}

export const VideoView: React.FC<VideoViewProps> = ({media, className, onLoad}) => {
    const handleLoad = React.useCallback(() => {
        onLoad?.();
    }, [onLoad]);

    return (
        <video
            className={b(null, className)}
            src={media.url}
            controls={false}
            playsInline
            muted={true}
            autoPlay
            webkit-playsinline="true"
            onLoadedData={handleLoad}
        />
    );
};
