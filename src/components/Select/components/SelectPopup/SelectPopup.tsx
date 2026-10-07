'use client';

import * as React from 'react';

import {Popup} from '../../../Popup';
import type {PopupPlacement} from '../../../Popup';
import {Sheet} from '../../../Sheet';
import {block} from '../../../utils/cn';
import {SelectQa} from '../../constants';

import {getMiddlewares} from './middlewares';
import type {SelectPopupProps} from './types';

import './SelectPopup.scss';

const b = block('select-popup');

const DEFAULT_PLACEMENT: PopupPlacement = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];

export const SelectPopup = React.forwardRef<HTMLDivElement, SelectPopupProps>(
    (
        {
            handleClose,
            onAfterOpen,
            onAfterClose,
            width,
            open,
            placement = DEFAULT_PLACEMENT,
            controlRef,
            children,
            className,
            sheetClassName,
            sheetTitle,
            disablePortal,
            virtualized,
            mobile,
            id,
        },
        ref,
    ) => {
        const [anchorElement, setAnchorElement] = React.useState<HTMLDivElement | null>(null);

        React.useEffect(() => {
            setAnchorElement(ref && typeof ref !== 'function' ? ref.current : null);
        }, [ref]);

        const handleOpenChange = (isOpen: boolean) => {
            if (!isOpen) handleClose();
        };

        return mobile ? (
            <Sheet
                qa={SelectQa.SHEET}
                className={sheetClassName}
                title={sheetTitle}
                open={Boolean(open)}
                onOpenChange={handleOpenChange}
            >
                {children}
            </Sheet>
        ) : (
            <Popup
                className={b(null, className)}
                qa={SelectQa.POPUP}
                anchorElement={anchorElement}
                placement={placement}
                open={open}
                onOpenChange={handleOpenChange}
                disablePortal={disablePortal}
                returnFocus={controlRef}
                floatingMiddlewares={getMiddlewares({width, disablePortal, virtualized})}
                id={id}
                onTransitionIn={onAfterOpen}
                onTransitionOutComplete={onAfterClose}
            >
                {children}
            </Popup>
        );
    },
);

SelectPopup.displayName = 'SelectPopup';
