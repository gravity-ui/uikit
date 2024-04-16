import type React from 'react';

import type {PopupPlacement} from '../../../Popup';
import type {ListItemSize} from '../../../useList';
import type {SelectProps} from '../../types';

export type SelectPopupProps = {
    mobile: boolean;
    handleClose: () => void;
    size?: ListItemSize;
    width?: SelectProps['popupWidth'];
    open?: boolean;
    placement?: PopupPlacement;
    controlRef?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    className?: string;
    disablePortal?: boolean;
    virtualized?: boolean;
    id?: string;
};
