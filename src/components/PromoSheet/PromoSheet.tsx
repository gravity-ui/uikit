import React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {Button} from '../Button';
import type {ButtonProps} from '../Button';
import {Icon} from '../Icon';
import {Sheet} from '../Sheet';
import type {SheetProps} from '../Sheet';
import {block} from '../utils/cn';

import './PromoSheet.scss';

const cn = block('promo-sheet');

export type PromoSheetProps = {
    title: string;
    message: string;
    actionText: string;
    closeText: string;
    actionHref?: string;
    imageSrc?: string;
    className?: string;
    contentClassName?: string;
    imageContainerClassName?: string;
    imageClassName?: string;
    onActionClick?: ButtonProps['onClick'];
    onClose?: SheetProps['onClose'];
};

type ImageSizes = {
    width?: number;
    height?: number;
};

export function PromoSheet({
    title,
    message,
    actionText,
    closeText,
    actionHref,
    imageSrc,
    className,
    contentClassName,
    imageContainerClassName,
    imageClassName,
    onActionClick,
    onClose,
}: PromoSheetProps) {
    const [visible, setVisible] = React.useState(true);
    const [loaded, setLoaded] = React.useState(!imageSrc);
    const [imageSizes, setImageSizes] = React.useState<ImageSizes | undefined>();

    const handleActionClick = React.useCallback<NonNullable<PromoSheetProps['onActionClick']>>(
        (event) => {
            setVisible(false);
            onActionClick?.(event);
        },
        [onActionClick],
    );

    const handleCloseClick = React.useCallback<NonNullable<PromoSheetProps['onClose']>>(() => {
        setVisible(false);
    }, []);

    const closeButtonExtraProps = React.useMemo(
        () => ({
            'aria-label': closeText,
        }),
        [closeText],
    );

    React.useEffect(() => {
        if (!imageSrc) {
            setLoaded(true);

            return;
        }

        const image = new Image();

        image.onload = () => {
            setImageSizes({
                width: image.naturalWidth,
                height: image.naturalHeight,
            });
            setLoaded(true);
            image.onload = null;
            image.onerror = null;
        };
        image.onerror = () => {
            setImageSizes(undefined);
            setLoaded(true);
            image.onload = null;
            image.onerror = null;
        };

        image.src = imageSrc;
    }, [imageSrc]);

    return (
        <Sheet
            className={cn(null, className)}
            contentClassName={cn('content', contentClassName)}
            visible={visible && loaded}
            hideTopBar
            onClose={onClose}
        >
            <header className={cn('header')}>
                <h2 className={cn('title')}>{title}</h2>
                <Button
                    className={cn('close-button')}
                    size="xl"
                    view="flat-contrast"
                    onClick={handleCloseClick}
                    extraProps={closeButtonExtraProps}
                >
                    <Icon data={Xmark} size={24} />
                </Button>
            </header>
            <p className={cn('message')}>{message}</p>
            {imageSrc && (
                <div className={cn('image-container', imageContainerClassName)}>
                    <img
                        role="presentation"
                        className={cn('image', imageClassName)}
                        src={imageSrc}
                        alt=""
                        width={imageSizes?.width}
                        height={imageSizes?.height}
                    />
                </div>
            )}
            <div className={cn('actions')}>
                <Button
                    className={cn('action-button')}
                    size="xl"
                    view="outlined-contrast"
                    width="max"
                    href={actionHref}
                    onClick={handleActionClick}
                >
                    {actionText}
                </Button>
            </div>
        </Sheet>
    );
}
