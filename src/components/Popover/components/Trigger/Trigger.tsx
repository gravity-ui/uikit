import React from 'react';

export type TriggerProps = {
    /**
     * Tooltip's opened state
     */
    open: boolean;
    /**
     * click handler
     */
    onClick?: (event: React.MouseEvent<HTMLSpanElement>) => boolean | Promise<boolean>;
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
    children?: React.ReactNode;
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
    const handleClick = async (event: React.MouseEvent<HTMLSpanElement>) => {
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

    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    return <span onClick={handleClick}>{children}</span>;
};
