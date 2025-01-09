'use client';

import * as React from 'react';

import {useActionHandlers} from '../../../../../hooks';

interface TriggerArgs {
    onClick: React.MouseEventHandler;
    onKeyDown: React.KeyboardEventHandler;
    open: boolean;
}

export interface TriggerProps {
    /**
     * Tooltip's opened state
     */
    open: boolean;
    openOnHover?: boolean;
    /**
     * Css class for the control
     */
    className?: string;
    /**
     * click handler
     */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => boolean | Promise<boolean>;
    /**
     * Disables open state changes
     */
    disabled: boolean;
    /**
     * Function, which opens tooltip
     */
    openTooltip: () => void;
    /**
     * Function, which closes tooltip
     */
    closeTooltip: () => void;
    /**
     * Indicates, that tooltip is closed manually
     */
    closedManually: React.MutableRefObject<boolean>;
    /**
     * Tooltip's trigger content
     */
    children?: React.ReactNode | ((triggerArgs: TriggerArgs) => React.ReactNode);
}

export const Trigger = ({
    open,
    openOnHover,
    disabled,
    className,
    openTooltip,
    closeTooltip,
    closedManually,
    onClick,
    children,
}: TriggerProps) => {
    const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
        // Ignores click that should close tooltip in case of {openOnHover: true}
        // to prevent situation when user could close tooltip accidentally
        const shouldPreventClosingByClick = open && openOnHover;

        if (disabled || shouldPreventClosingByClick) {
            return;
        }

        const shouldToggleTooltip = !onClick || (await onClick(event));

        if (!shouldToggleTooltip) {
            return;
        }

        const toggleTooltip = () => {
            const nextOpen = !open;

            if (nextOpen) {
                openTooltip();
                closedManually.current = false;
            } else {
                closeTooltip();
                closedManually.current = true;
            }
        };

        toggleTooltip();
    };

    const {onKeyDown} = useActionHandlers(handleClick);

    return typeof children === 'function' ? (
        <React.Fragment>{children({onClick: handleClick, onKeyDown, open})}</React.Fragment>
    ) : (
        // The event handler should only be used to capture bubbled events
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={className}
            onClick={handleClick}
            onKeyDown={onClick ? onKeyDown : undefined}
        >
            {children}
        </div>
    );
};
