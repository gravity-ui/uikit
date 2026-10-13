import type * as React from 'react';

import type {PopupPlacement} from '../../../Popup';
import type {SelectProps} from '../../types';

export type SelectPopupProps = {
    mobile: boolean;
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
    /** Props of the mobile sheet content, which takes focus while the control is hidden */
    sheetContentProps?: React.HTMLAttributes<HTMLDivElement>;
};
