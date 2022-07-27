import React from 'react';
import {block} from '../utils/cn';

import {AppStoreRu} from '../icons/stores/AppStoreRu';
import {AppStoreEn} from '../icons/stores/AppStoreEn';
import {GooglePlayRu} from '../icons/stores/GooglePlayRu';
import {GooglePlayEn} from '../icons/stores/GooglePlayEn';
import {Platform} from '../mobile/constants';
import {Icon} from '../Icon/Icon';

const b = block('store-badge');

export type BadgeLang = 'ru' | 'en';
export type BadgePlatform = Platform.ANDROID | Platform.IOS;

export interface StoreBadgeProps {
    platform: BadgePlatform;
    url?: string;
    lang?: BadgeLang;
    className?: string;
    onClick?: () => void;
    // alt?: string;
}

const badgeData: Record<BadgePlatform, Record<BadgeLang, unknown>> = {
    [Platform.IOS]: {
        ru: AppStoreRu,
        en: AppStoreEn,
    },
    [Platform.ANDROID]: {
        ru: GooglePlayRu,
        en: GooglePlayEn,
    },
};

export function StoreBadge({platform, lang = 'ru', className, onClick, url}: StoreBadgeProps) {
    const iconData = badgeData?.[platform][lang] as string;

    if (!iconData) {
        return null;
    }

    if (!url) {
        return <Icon className={b(null, className)} data={iconData} onClick={onClick} />;
    }

    return (
        <a
            className={b(null, className)}
            onClick={onClick}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Icon data={iconData} />
        </a>
    );
}
