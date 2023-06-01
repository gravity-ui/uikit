import React from 'react';

import {Loader} from '../../../Loader';
import {block} from '../../../utils/cn';

import './Picture.scss';

const b = block('changelog-dialog-picture');

type LoadingState = 'loading' | 'loaded' | 'error';

const SHOW_LOADER_TIMEOUT = 150;

export interface PictureProps {
    className?: string;
    src: string;
    alt?: string;
    ratio?: number;
}

export function Picture({className, src, alt = '', ratio}: PictureProps) {
    const [loadingState, setLoadingState] = React.useState<LoadingState>('loading');
    const [isVisibleLoader, setIsVisibleLoader] = React.useState<boolean>(false);

    React.useEffect(() => {
        setLoadingState('loading');
        setIsVisibleLoader(false);

        const img = new Image();
        img.onload = () => {
            setLoadingState('loaded');
        };
        img.onerror = img.onabort = () => {
            setLoadingState('error');
        };
        img.src = src;

        const timeoutId = setTimeout(() => {
            setIsVisibleLoader(true);
        }, SHOW_LOADER_TIMEOUT);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [src]);

    if (loadingState === 'error') {
        return null;
    }

    return (
        <div className={b(null, className)}>
            {ratio ? (
                <div
                    className={b('placeholder')}
                    style={loadingState === 'loading' ? {paddingBottom: `${ratio * 100}%`} : {}}
                >
                    {isVisibleLoader && loadingState === 'loading' ? (
                        <div className={b('loader')}>
                            <Loader size="s" />
                        </div>
                    ) : null}

                    <img
                        className={b('image-with-ratio', {
                            visible: loadingState === 'loaded',
                        })}
                        src={src}
                        alt={alt}
                    />
                </div>
            ) : (
                <img className={b('image')} src={src} alt={alt} />
            )}
        </div>
    );
}
