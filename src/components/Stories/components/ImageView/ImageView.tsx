import React from 'react';

import {block} from '../../../utils/cn';
import {StoryMedia} from '../../types';

import './ImageView.scss';

const b = block('stories-image-view');

export interface ImageViewProps {
    media: StoryMedia;
    className?: string;
    onLoad?: () => void;
}

export const ImageView: React.FC<ImageViewProps> = ({media, className, onLoad}) => {
    const [loaded, setLoaded] = React.useState(false);

    const handleLoad = React.useCallback(() => {
        setLoaded(true);
        onLoad?.();
    }, [onLoad]);

    return (
        <img
            className={b(null, className)}
            src={media.url}
            style={loaded ? {} : {visibility: 'hidden'}}
            onLoad={handleLoad}
            alt=""
        />
    );
};
