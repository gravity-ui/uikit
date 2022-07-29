import React from 'react';

import {block} from '../utils/cn';
import {Platform} from '../mobile/constants';

import './StoreBadge.scss';

const b = block('store-badge');

export type BadgeLang = 'ru' | 'en';
export type BadgePlatform = Platform.ANDROID | Platform.IOS;

export interface StoreBadgeProps {
    platform: BadgePlatform;
    url?: string;
    lang?: BadgeLang;
    className?: string;
    onClick?: () => void;
    alt?: string;
}

export function StoreBadge({platform, lang = 'en', className, onClick, url, alt}: StoreBadgeProps) {
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
