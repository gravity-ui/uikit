'use client';

import * as React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {useUniqId} from '../../../hooks/useUniqId';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import type {PopupPlacement} from '../../Popup';
import {Popup} from '../../Popup';
import {useDirection} from '../../theme';
import type {QAProps} from '../../types';
import {warnOnce} from '../../utils/warn';

import {cnPopover} from './Popover.classname';
import {Buttons} from './components/Buttons/Buttons';
import {Content} from './components/Content/Content';
import {Links} from './components/Links/Links';
import {Trigger} from './components/Trigger/Trigger';
import {PopoverBehavior} from './config';
import {useOpen} from './hooks/useOpen';
import type {PopoverInstanceProps, PopoverProps} from './types';

import './Popover.scss';

/**
 * @deprecated
 */
export const Popover = React.forwardRef<PopoverInstanceProps, PopoverProps & QAProps>(function (
    {
        initialOpen = false,
        disabled = false,
        autoclosable = true,
        openOnHover = true,
        delayOpening,
        delayClosing,
        behavior = PopoverBehavior.Delayed,
        placement,
        offset = {},
        tooltipOffset,
        tooltipClassName,
        theme = 'info',
        size = 's',
        hasArrow = true,
        hasClose = false,
        className,
        children,
        title,
        content,
        htmlContent,
        contentClassName,
        links,
        forceLinksAppearance = false,
        tooltipActionButton,
        tooltipCancelButton,
        onOpenChange,
        onCloseClick,
        onClick,
        anchorRef,
        anchorElement,
        strategy,
        qa,
        disablePortal = false,
        tooltipId,
        focusTrap,
        autoFocus,
        restoreFocusRef,
    },
    ref,
) {
    const direction = useDirection();
    const controlRef = React.useRef<HTMLDivElement>(null);
    const closedManually = React.useRef(false);
    const shouldBeOpen = React.useRef(initialOpen);

    const {
        isOpen,
        closingTimeout,
        openTooltip,
        openTooltipDelayed,
        unsetOpeningTimeout,
        closeTooltip,
        closeTooltipDelayed,
        unsetClosingTimeout,
    } = useOpen({
        initialOpen,
        disabled,
        autoclosable,
        onOpenChange,
        delayOpening,
        delayClosing,
        behavior,
        shouldBeOpen,
    });

    const popupPlacement = React.useMemo<PopupPlacement>(() => {
        if (placement) {
            return placement;
        }

        return direction === 'rtl' ? ['left', 'bottom'] : ['right', 'bottom'];
    }, [direction, placement]);

    React.useImperativeHandle(
        ref,
        () => ({
            openTooltip,
            closeTooltip,
        }),
        [openTooltip, closeTooltip],
    );

    const handleCloseClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        closeTooltip();
        onCloseClick?.(event);
    };

    const hasTitle = Boolean(title);

    const hasAnchor = Boolean(anchorRef || anchorElement);

    const popoverTitleId = `popover-${tooltipId ?? ''}-title-${useUniqId()}`;

    const tooltip = (
        <Popup
            id={tooltipId}
            role={openOnHover ? 'tooltip' : 'dialog'}
            strategy={strategy}
            anchorElement={anchorElement}
            anchorRef={anchorRef || controlRef}
            className={cnPopover(
                'tooltip',
                {
                    theme,
                    size,
                    ['with-close']: hasClose,
                    'force-links-appearance': forceLinksAppearance,
                },
                tooltipClassName,
            )}
            open={isOpen}
            placement={popupPlacement}
            hasArrow={hasArrow}
            offset={tooltipOffset}
            onClose={hasAnchor ? undefined : closeTooltip}
            qa={qa ? `${qa}-tooltip` : ''}
            disablePortal={disablePortal}
            initialFocus={autoFocus ? 0 : undefined}
            modal={focusTrap}
            returnFocus={restoreFocusRef}
            aria-labelledby={title ? popoverTitleId : undefined}
        >
            <React.Fragment>
                {title && (
                    <h3 id={popoverTitleId} className={cnPopover('tooltip-title')}>
                        {title}
                    </h3>
                )}
                <Content
                    secondary={hasTitle ? theme !== 'announcement' : false}
                    content={content}
                    htmlContent={htmlContent}
                    className={contentClassName}
                />
                {links && <Links links={links} />}
                <Buttons
                    theme={theme}
                    tooltipActionButton={tooltipActionButton}
                    tooltipCancelButton={tooltipCancelButton}
                />
                {hasClose && (
                    <div className={cnPopover('tooltip-close')}>
                        <Button
                            size="s"
                            view="flat-secondary"
                            onClick={handleCloseClick}
                            aria-label="Close"
                        >
                            <Icon data={Xmark} size={16} />
                        </Button>
                    </div>
                )}
            </React.Fragment>
        </Popup>
    );

    if (hasAnchor) {
        return tooltip;
    }

    const onMouseEnter = () => {
        unsetClosingTimeout();

        if (!isOpen && !disabled && !closedManually.current) {
            openTooltipDelayed();
        } else {
            shouldBeOpen.current = true;
        }
    };

    const onMouseLeave = () => {
        if (autoclosable && !closedManually.current && !closingTimeout.current) {
            unsetOpeningTimeout();
            closeTooltipDelayed();
        } else {
            shouldBeOpen.current = false;
        }

        closedManually.current = false;
    };

    if (offset && (typeof offset.top === 'number' || typeof offset.left === 'number')) {
        warnOnce(
            '[Popover] Physical names (top, left) of "offset" property are deprecated. Use logical names (block, inline) instead.',
        );
    }

    return (
        <div
            ref={controlRef}
            className={cnPopover({disabled}, className)}
            onMouseEnter={openOnHover ? onMouseEnter : undefined}
            onMouseLeave={openOnHover ? onMouseLeave : undefined}
            onFocus={openOnHover ? onMouseEnter : undefined}
            onBlur={openOnHover ? onMouseLeave : undefined}
            style={{
                top: offset.top,
                left: offset.left,
                insetBlockStart: offset.block,
                insetInlineStart: offset.inline,
            }}
            data-qa={qa}
        >
            <Trigger
                closeTooltip={closeTooltip}
                openTooltip={openTooltip}
                open={isOpen}
                openOnHover={openOnHover}
                className={cnPopover('handler')}
                disabled={disabled}
                onClick={onClick}
                closedManually={closedManually}
            >
                {children}
            </Trigger>
            {tooltip}
        </div>
    );
});

Popover.displayName = 'Popover';
