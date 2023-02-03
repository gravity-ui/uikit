import React from 'react';
import {Popup} from '../../../Popup';
import {BORDER_WIDTH, SelectQa} from '../../constants';

type SelectPopupProps = {
    handleClose: () => void;
    verticalOffset: number;
    width?: number;
    minWidth?: number;
    open?: boolean;
    controlRef?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    className?: string;
    disablePortal?: boolean;
};

export const SelectPopup = ({
    handleClose,
    verticalOffset,
    width,
    minWidth,
    open,
    controlRef,
    children,
    className,
    disablePortal,
}: SelectPopupProps) => (
    <Popup
        className={className}
        qa={SelectQa.POPUP}
        style={{width, minWidth}}
        anchorRef={controlRef}
        offset={[BORDER_WIDTH, verticalOffset]}
        placement={['bottom-start', 'top-start']}
        open={open}
        onClose={handleClose}
        disablePortal={disablePortal}
        restoreFocus
        restoreFocusRef={controlRef}
    >
        {children}
    </Popup>
);
