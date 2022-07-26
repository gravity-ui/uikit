import React from 'react';

import {block} from '../../../utils/cn';
import {Loader} from '../../../Loader';

import './Picture.scss';

const b = block('changelog-dialog-picture');

type LoadingState = 'loading' | 'loaded' | 'error';

export interface PictureProps {
    className?: string;
    src: string;
    ratio: number;
}

export function Picture({className, src, ratio}: PictureProps) {
    const [loadingState, setLoadingState] = React.useState<LoadingState>('loading');

    React.useEffect(() => {
        setLoadingState('loading');

        const img = new Image();
        img.onload = () => {
            setLoadingState('loaded');
        };
        img.onerror = img.onabort = () => {
            setLoadingState('error');
        };
        img.src = src;
    }, [src]);

    if (loadingState === 'error') {
        return null;
    }

    return (
        <div className={b(null, className)} style={{paddingBottom: `${ratio * 100}%`}}>
            {loadingState === 'loading' ? (
                <div className={b('loader')}>
                    <Loader size="s" />
                </div>
            ) : null}
            <div
                className={b('image', {visible: loadingState === 'loaded'})}
                style={{backgroundImage: `url(${src})`}}
            />
        </div>
    );
}
