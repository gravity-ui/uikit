import React from 'react';

import {Lang} from '../index';
import {Platform} from '../mobile/constants';
import {block} from '../utils/cn';

import './StoreBadge.scss';

const b = block('store-badge');

export type StoreBadgePlatform = Platform.ANDROID | Platform.IOS;

export interface StoreBadgeProps {
    platform: StoreBadgePlatform;
    url?: string;
    lang?: Lang;
    className?: string;
    onClick?: () => void;
    alt?: string;
}

export function StoreBadge({
    platform,
    lang = Lang.En,
    className,
    onClick,
    url,
    alt,
}: StoreBadgeProps) {
    if (!url) {
        return <img className={b({platform, lang}, className)} onClick={onClick} alt={alt} />;
    }

    return (
        <a
            className={b(null, className)}
            onClick={onClick}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <img className={b('image', {platform, lang})} alt={alt} />
        </a>
    );
}
