'use client';

import * as React from 'react';

import {FloatingOverlay} from '@floating-ui/react';

import {Portal} from '../Portal/Portal';
import type {PortalProps} from '../Portal/Portal';
import type {QAProps} from '../types';

import {SheetContentContainer} from './SheetContent';
import {sheetBlock} from './constants';

import './Sheet.scss';

export interface SheetProps extends Pick<PortalProps, 'container' | 'disablePortal'>, QAProps {
    children?: React.ReactNode;
    onClose?: () => void;
    /** Show/hide sheet */
    visible: boolean;
    /** ID of the sheet, used as hash in URL. It's important to specify different `id` values if there can be more than one sheet on the page */
    id?: string;
    /** Title of the sheet window */
    title?: string;
    /** Class name for the sheet window */
    className?: string;
    /** Class name for the sheet content */
    contentClassName?: string;
    /** Class name for the swipe area */
    swipeAreaClassName?: string;
    /** Enable the behavior in which you can close the sheet window with a swipe down if the content is scrolled to its top (`contentNode.scrollTop === 0`) or has no scroll at all */
    allowHideOnContentScroll?: boolean;
    /** Hide top bar with resize handle */
    hideTopBar?: boolean;
    /** Coefficient that determines the maximum height of the `Sheet` relative to the height of the viewport (range 0-1) */
    maxContentHeightCoefficient?: number;
    /** `Sheet` height will always have the maximum value */
    alwaysFullHeight?: boolean;
}

export const Sheet = ({
    children,
    onClose,
    visible,
    id,
    title,
    className,
    contentClassName,
    swipeAreaClassName,
    allowHideOnContentScroll,
    hideTopBar,
    maxContentHeightCoefficient,
    alwaysFullHeight,
    container,
    disablePortal,
    qa,
}: SheetProps) => {
    const [open, setOpen] = React.useState(visible);
    const [prevVisible, setPrevVisible] = React.useState(visible);

    if (!prevVisible && visible) {
        setOpen(true);
    }

    if (visible !== prevVisible) {
        setPrevVisible(visible);
    }

    const hideSheet = () => {
        if (onClose) {
            onClose();
        }
        setOpen(false);
    };

    if (!open) {
        return null;
    }

    return (
        <Portal container={container} disablePortal={disablePortal}>
            <FloatingOverlay
                data-qa={qa}
                className={sheetBlock(null, className)}
                lockScroll={open}
                style={{overflow: undefined}}
            >
                <SheetContentContainer
                    id={id}
                    content={children}
                    contentClassName={contentClassName}
                    swipeAreaClassName={swipeAreaClassName}
                    title={title}
                    visible={visible}
                    allowHideOnContentScroll={allowHideOnContentScroll}
                    hideTopBar={hideTopBar}
                    hideSheet={hideSheet}
                    maxContentHeightCoefficient={maxContentHeightCoefficient}
                    alwaysFullHeight={alwaysFullHeight}
                />
            </FloatingOverlay>
        </Portal>
    );
};
