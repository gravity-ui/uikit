import React, {MutableRefObject} from 'react';
import type {MouseEvent, ReactNode} from 'react';

export type TriggerProps = {
    /**
     * Tooltip's opened state
     */
    open: boolean;
    /**
     * click handler
     */
    onClick?: (event: MouseEvent<HTMLSpanElement>) => boolean | Promise<boolean>;
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
    closedManually: MutableRefObject<boolean>;
    /**
     * Tooltip's trigger content
     */
    children?: ReactNode;
};

export const Trigger = ({
    open,
    disabled,
    openTooltip,
    closeTooltip,
    closedManually,
    onClick,
    children,
}: TriggerProps) => {
    const handleClick = async (event: MouseEvent<HTMLSpanElement>) => {
        if (disabled) {
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

    return <span onClick={handleClick}>{children}</span>;
};
