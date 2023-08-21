import React from 'react';

import {Popup} from '../../../Popup';
import {Sheet} from '../../../Sheet';
import {blockNew} from '../../../utils/cn';
import {BORDER_WIDTH, SelectQa} from '../../constants';

import {getModifiers} from './modifiers';
import type {SelectPopupProps} from './types';

import './SelectPopup.scss';

const b = blockNew('select-popup');

export const SelectPopup = React.forwardRef<HTMLDivElement, SelectPopupProps>(
    (
        {
            handleClose,
            width,
            open,
            controlRef,
            children,
            className,
            disablePortal,
            virtualized,
            mobile,
            focusTrap,
        },
        ref,
    ) =>
        mobile ? (
            <Sheet
                qa={SelectQa.SHEET}
                className={className}
                visible={Boolean(open)}
                onClose={handleClose}
            >
                {children}
            </Sheet>
        ) : (
            <Popup
                contentClassName={b(null, className)}
                qa={SelectQa.POPUP}
                anchorRef={ref as React.RefObject<HTMLDivElement>}
                placement={['bottom-start', 'bottom-end', 'top-start', 'top-end']}
                offset={[BORDER_WIDTH, BORDER_WIDTH]}
                open={open}
                onClose={handleClose}
                disablePortal={disablePortal}
                restoreFocus
                restoreFocusRef={controlRef}
                modifiers={getModifiers({width, disablePortal, virtualized})}
                focusTrap={focusTrap}
            >
                {children}
            </Popup>
        ),
);

SelectPopup.displayName = 'SelectPopup';
