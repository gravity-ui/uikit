import type * as React from 'react';

import type {PopupPlacement} from '../../../Popup';
import type {SheetProps} from '../../../Sheet';
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
    sheetTitle?: string;
    disablePortal?: boolean;
    virtualized?: boolean;
    id?: string;
    onAfterOpen?: () => void;
    onAfterClose?: () => void;
    /** The element the mobile sheet focuses on open: the sheet itself by default */
    sheetInitialFocus?: SheetProps['initialFocus'];
};
