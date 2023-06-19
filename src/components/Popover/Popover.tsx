import React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {Button} from '../Button';
import {Icon} from '../Icon';
import {Popup} from '../Popup';
import type {QAProps} from '../types';

import {cnPopover} from './Popover.classname';
import {Buttons} from './components/Buttons/Buttons';
import {Content} from './components/Content/Content';
import {Links} from './components/Links/Links';
import {Trigger} from './components/Trigger/Trigger';
import {PopoverBehavior} from './config';
import {useOpen} from './hooks/useOpen';
import type {PopoverInstanceProps, PopoverProps} from './types';

import './Popover.scss';

export const Popover = React.forwardRef<PopoverInstanceProps, PopoverProps & QAProps>(function (
    {
        initialOpen = false,
        disabled = false,
        autoclosable = true,
        openOnHover = true,
        delayOpening,
        delayClosing,
        behavior = PopoverBehavior.Delayed,
        placement = ['right', 'bottom'],
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
        strategy,
        qa,
    },
    ref,
) {
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

    const tooltip = (
        <Popup
            strategy={strategy}
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
            placement={placement}
            hasArrow={hasArrow}
            offset={tooltipOffset}
            onClose={anchorRef ? undefined : closeTooltip}
            qa={qa ? `${qa}-tooltip` : ''}
        >
            <React.Fragment>
                {title && <h3 className={cnPopover('tooltip-title')}>{title}</h3>}
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
                            extraProps={{
                                'aria-label': 'Close',
                            }}
                        >
                            <Icon data={Xmark} size={16} />
                        </Button>
                    </div>
                )}
            </React.Fragment>
        </Popup>
    );

    if (anchorRef) {
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

    return (
        <div
            ref={controlRef}
            className={cnPopover({disabled}, className)}
            onMouseEnter={openOnHover ? onMouseEnter : undefined}
            onMouseLeave={openOnHover ? onMouseLeave : undefined}
            style={{
                top: offset.top,
                left: offset.left,
            }}
            data-qa={qa}
        >
            <Trigger
                closeTooltip={closeTooltip}
                openTooltip={openTooltip}
                open={isOpen}
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
