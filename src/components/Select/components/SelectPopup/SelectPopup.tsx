import React from 'react';
import {Popup} from '../../../Popup';
import {blockNew} from '../../../utils/cn';
import {BORDER_WIDTH, SelectQa} from '../../constants';
import type {SelectPopupProps} from './types';
import {getModifiers} from './modifiers';

import './SelectPopup.scss';
import {Sheet} from '../../../Sheet';

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
                className={b(null, className)}
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
            >
                {children}
            </Popup>
        ),
);

SelectPopup.displayName = 'SelectPopup';
