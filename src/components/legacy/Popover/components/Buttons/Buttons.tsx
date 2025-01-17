import {Button} from '../../../../Button';
import {cnPopover} from '../../Popover.classname';
import type {PopoverButtonProps, PopoverTheme} from '../../types';

import {getButtonView} from './helpers/getButtonView';

export type ButtonsProps = {
    /** Tooltip's theme */
    theme: PopoverTheme;
    /**
     * Action button properties
     * The button won't be rendered without them
     */
    tooltipActionButton?: PopoverButtonProps;
    /**
     * Cancel button properties
     * The button won't be rendered without them
     */
    tooltipCancelButton?: PopoverButtonProps;
};

export const Buttons = ({theme, tooltipActionButton, tooltipCancelButton}: ButtonsProps) => {
    if (!tooltipActionButton && !tooltipCancelButton) {
        return null;
    }

    return (
        <div className={cnPopover('tooltip-buttons')}>
            {tooltipActionButton && (
                <Button
                    view={getButtonView(theme, true)}
                    width="max"
                    onClick={tooltipActionButton.onClick}
                    className={cnPopover('tooltip-button')}
                >
                    {tooltipActionButton.text}
                </Button>
            )}
            {tooltipCancelButton && (
                <Button
                    view={getButtonView(theme, false)}
                    width="max"
                    onClick={tooltipCancelButton.onClick}
                    className={cnPopover('tooltip-button')}
                >
                    {tooltipCancelButton.text}
                </Button>
            )}
        </div>
    );
};
