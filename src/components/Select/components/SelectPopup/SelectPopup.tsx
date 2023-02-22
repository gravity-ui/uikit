import React from 'react';
import {Popup} from '../../../Popup';
import {blockNew} from '../../../utils/cn';
import {BORDER_WIDTH, SelectQa} from '../../constants';
import type {SelectPopupProps} from './types';
import {getModifiers} from './modifiers';

import './SelectPopup.scss';

const b = blockNew('select-popup');

export const SelectPopup = ({
    handleClose,
    width,
    open,
    controlRef,
    children,
    className,
    zIndex,
    disablePortal,
    virtualized,
}: SelectPopupProps) => (
    <Popup
        className={b(null, className)}
        zIndex={zIndex}
        qa={SelectQa.POPUP}
        anchorRef={controlRef}
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
);
