import type * as React from 'react';

import type {PopupPlacement} from '../../../Popup';
import type {SelectProps, SelectSize} from '../../types';

export type SelectPopupProps = {
    mobile: boolean;
    size?: SelectSize;
    handleClose: () => void;
    width?: SelectProps['popupWidth'];
    open?: boolean;
    placement?: PopupPlacement;
    controlRef?: React.RefObject<HTMLElement | null>;
    children?: React.ReactNode;
    className?: string;
    sheetClassName?: string;
    disablePortal?: boolean;
    virtualized?: boolean;
    id?: string;
    onAfterOpen?: () => void;
    onAfterClose?: () => void;
};
