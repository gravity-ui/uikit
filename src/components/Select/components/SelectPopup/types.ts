import type React from 'react';

import type {POPUP_WIDTH_MODE} from '../../constants';

export type SelectPopupProps = {
    mobile: boolean;
    handleClose: () => void;
    width?: keyof typeof POPUP_WIDTH_MODE | number;
    open?: boolean;
    controlRef?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    className?: string;
    disablePortal?: boolean;
    virtualized?: boolean;
};
