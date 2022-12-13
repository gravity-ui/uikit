import type {FC} from 'react';
import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {block} from '../utils/cn';
import {CrossIcon} from '../icons/CrossIcon';
import type {ButtonProps, SheetProps} from '../';
import {Button, Icon, Sheet} from '../';

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

export const PromoSheet: FC<PromoSheetProps> = ({
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
}) => {
    const [visible, setVisible] = useState(true);
    const [loaded, setLoaded] = useState(!imageSrc);
    const [imageSizes, setImageSizes] = useState<ImageSizes | undefined>();

    const handleActionClick = useCallback<NonNullable<PromoSheetProps['onActionClick']>>(
        (event) => {
            setVisible(false);
            onActionClick?.(event);
        },
        [onActionClick],
    );

    const handleCloseClick = useCallback<NonNullable<PromoSheetProps['onClose']>>(() => {
        setVisible(false);
    }, []);

    const closeButtonExtraProps = useMemo(
        () => ({
            'aria-label': closeText,
        }),
        [closeText],
    );

    useEffect(() => {
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
                    <Icon data={CrossIcon} size={16} />
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
};
