import React from 'react';
import {ButtonsProps} from './components/Buttons/Buttons';
import {ContentProps} from './components/Content/Content';
import {LinksProps} from './components/Links/Links';
import {TriggerProps} from './components/Trigger/Trigger';
import {PopupProps, PopupAnchorRef} from '../Popup';
import {PopoverBehavior} from './config';
import {LayerConfig} from '../utils/LayerManager';

export type PopoverButtonProps = {
    /**
     * Button's text
     */
    text: string;
    /**
     * Button's click handler
     */
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type PopoverExternalProps = {
    /** Tooltip's trigger content over which the tooltip is shown */
    children?: TriggerProps['children'];
    /** Tooltip's title */
    title?: string;
    /** Tooltip's content */
    content?: ContentProps['content'];
    /** Tooltip's html content to be rendered via `dangerouslySetInnerHTML` */
    htmlContent?: ContentProps['htmlContent'];
    /** css class for `content` */
    contentClassName?: string;
    /** Links under the content */
    links?: LinksProps['links'];
    /**
     * Action button properties
     * The button won't be rendered without it
     */
    tooltipActionButton?: ButtonsProps['tooltipActionButton'];
    /**
     * Cancel button properties
     * The button won't be rendered without it
     */
    tooltipCancelButton?: ButtonsProps['tooltipCancelButton'];
    /** Tooltip's offset relative to the control */
    tooltipOffset?: [number, number];
    /** Tooltip's css class */
    tooltipClassName?: string;
    /** css class for the control */
    className?: string;
    /**
     * Anchor click callback.
     * If the function returns `true', the tooltip will be open, otherwise it won't be opened.
     */
    onClick?: TriggerProps['onClick'];
    /**
     * Open state change handler
     * Might be useful for the delayed rendering of the tooltip's content.
     */
    onOpenChange?: (open: boolean) => void;
    /** Close button click handler */
    onCloseClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export type PopoverBehaviorProps = {
    /** Tooltip open/close behaviour when `openOnHover`
     * Immediate - without any delay
     * Delayed - with 300ms delay for opening and closing
     * DelayedClosing - with 300ms delay only for closing
     * Won't be applied if `delayOpening` or `delayClosing` are passed
     */
    behavior?: PopoverBehavior;
    /**
     * Custom delay for opening if openOnHover
     */
    delayOpening?: number;
    /**
     * Custom delay for closing if autoclosable
     */
    delayClosing?: number;
};

export type PopoverTheme = 'info' | 'special' | 'announcement';
export type PopoverAnchorRef = PopupAnchorRef;

export type PopoverDefaultProps = {
    /** Whether the tooltip initially opened */
    initialOpen: boolean;
    /** Disables open state changes */
    disabled: boolean;
    /** Whether the tooltip automatically closes when cursor moves outside it */
    autoclosable: boolean;
    /** Whether the tooltip opens when hovered */
    openOnHover: boolean;
    /** Control's offset */
    offset: {
        top?: number;
        left?: number;
    };
    /** Whether the tooltip has a tail */
    hasArrow: boolean;
    /** Whether the tooltip has a close button */
    hasClose: boolean;
    /** Force styles for links */
    forceLinksAppearance: boolean;
    /** Tooltip's theme */
    theme: PopoverTheme;
    /** Tooltip's size */
    size: 's' | 'l';
    category: LayerConfig['category'];
};

export type PopoverProps = Pick<PopupProps, 'anchorRef' | 'strategy' | 'placement'> &
    PopoverExternalProps &
    PopoverBehaviorProps &
    Partial<PopoverDefaultProps>;

export type PopoverInstanceProps = {
    /**
     * Opens tooltip
     */
    openTooltip: () => void;
    /**
     * Closes tooltip
     */
    closeTooltip: () => void;
};
