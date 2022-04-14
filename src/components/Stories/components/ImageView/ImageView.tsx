import React from 'react';

import {block} from '../../../utils/cn';
import {StoryMedia} from '../../types';

import './ImageView.scss';

const b = block('stories-image-view');

export interface ImageViewProps {
    media: StoryMedia;
}

export function ImageView({media}: ImageViewProps) {
    return <img className={b(null)} src={media.url} alt="" />;
}
