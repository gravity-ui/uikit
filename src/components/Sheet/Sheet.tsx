import React from 'react';

import {useBodyScrollLock} from '../../hooks';
import {Portal} from '../Portal/Portal';
import type {QAProps} from '../types';

import {SheetContentContainer} from './SheetContent';
import {sheetBlock} from './constants';

import './Sheet.scss';

export interface SheetProps extends QAProps {
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
    qa,
}: SheetProps) => {
    const [open, setOpen] = React.useState(visible);
    const [prevVisible, setPrevVisible] = React.useState(visible);

    useBodyScrollLock({enabled: open});

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
        <Portal>
            <div data-qa={qa} className={sheetBlock(null, className)}>
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
                />
            </div>
        </Portal>
    );
};
