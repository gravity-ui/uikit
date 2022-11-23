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
};

export const SelectPopup: React.FC<SelectPopupProps> = (props) => {
    const {handleClose, verticalOffset, width, minWidth, open, controlRef, children} = props;

    return (
        <Popup
            qa={SelectQa.POPUP}
            style={{width, minWidth}}
            anchorRef={controlRef}
            offset={[BORDER_WIDTH, verticalOffset]}
            placement={['bottom-start', 'top-start']}
            open={open}
            onClose={handleClose}
        >
            {children}
        </Popup>
    );
};
