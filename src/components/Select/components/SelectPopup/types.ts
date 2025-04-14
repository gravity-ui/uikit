import type * as React from 'react';

import type {PopupPlacement} from '../../../Popup';
import type {SelectProps} from '../../types';

export type SelectPopupProps = {
    mobile: boolean;
    handleClose: () => void;
    width?: SelectProps['popupWidth'];
    open?: boolean;
    placement?: PopupPlacement;
    controlRef?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    className?: string;
    disablePortal?: boolean;
    virtualized?: boolean;
    id?: string;
    onAfterOpen?: () => void;
    onAfterClose?: () => void;
};
