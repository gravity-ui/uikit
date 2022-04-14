import React from 'react';

import {block} from '../../../utils/cn';
import {StoryMedia} from '../../types';

import './ImageView.scss';

const b = block('stories-image-view');

export interface ImageViewProps {
    media: StoryMedia;
    className?: string;
}

export const ImageView: React.FC<ImageViewProps> = ({media, className}) => {
    return <img className={b(null, className)} src={media.url} alt="" />;
};
