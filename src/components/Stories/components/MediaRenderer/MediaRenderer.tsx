import React from 'react';
import {StoryMedia} from '../../types';
import {ImageView, VideoView} from '../../components';
import {Loader} from '../../../Loader';
import {block} from '../../../utils/cn';

import './MediaRenderer.scss';

const b = block('stories-media-renderer');

export interface MediaRendererProps {
    media: StoryMedia;
    onLoad?: () => void;
}

export const MediaRenderer: React.FC<MediaRendererProps> = ({media, onLoad}) => {
    const [loaded, setLoaded] = React.useState(false);

    const handleLoad = React.useCallback(() => {
        setLoaded(true);
        onLoad?.();
    }, [onLoad]);

    React.useEffect(() => {
        setLoaded(false);
    }, [media]);

    return (
        <div>
            {(media.type || 'image') === 'image' && <ImageView media={media} onLoad={handleLoad} />}
            {media.type === 'video' && <VideoView media={media} onLoad={handleLoad} />}
            {!loaded && (
                <div className={b('loader-container')}>
                    <Loader />
                </div>
            )}
        </div>
    );
};
