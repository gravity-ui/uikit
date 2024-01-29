import React from 'react';

import type {PopperPlacement} from '../../../../hooks/private';
import {Popup} from '../../../Popup';
import {Sheet} from '../../../Sheet';
import {block} from '../../../utils/cn';
import {BORDER_WIDTH, SelectQa} from '../../constants';

import {getModifiers} from './modifiers';
import type {SelectPopupProps} from './types';

import './SelectPopup.scss';

const b = block('select-popup');

const DEFAULT_PLACEMENT: PopperPlacement = ['bottom-start', 'bottom-end', 'top-start', 'top-end'];

export const SelectPopup = React.forwardRef<HTMLDivElement, SelectPopupProps>(
    (
        {
            handleClose,
            width,
            open,
            placement = DEFAULT_PLACEMENT,
            controlRef,
            children,
            className,
            disablePortal,
            virtualized,
            mobile,
            id,
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
                placement={placement}
                offset={[BORDER_WIDTH, BORDER_WIDTH]}
                open={open}
                onClose={handleClose}
                disablePortal={disablePortal}
                restoreFocus
                restoreFocusRef={controlRef}
                modifiers={getModifiers({width, disablePortal, virtualized})}
                id={id}
            >
                {children}
            </Popup>
        ),
);

SelectPopup.displayName = 'SelectPopup';
