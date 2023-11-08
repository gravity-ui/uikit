import type React from 'react';

import type {SelectProps} from '../../types';

export type SelectPopupProps = {
    mobile: boolean;
    handleClose: () => void;
    width?: SelectProps['popupWidth'];
    open?: boolean;
    controlRef?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    className?: string;
    disablePortal?: boolean;
    virtualized?: boolean;
    id?: string;
};
