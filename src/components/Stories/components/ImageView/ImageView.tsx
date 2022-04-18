import React from 'react';

import {block} from '../../../utils/cn';
import {StoriesItemMedia} from '../../types';

import './ImageView.scss';

const b = block('stories-image-view');

export interface ImageViewProps {
    media: StoriesItemMedia;
}

export function ImageView({media}: ImageViewProps) {
    const type = media.type || 'image';

    return type === 'image' ? <img className={b()} src={media.url} alt="" /> : null;
}
