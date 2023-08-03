import type React from 'react';

export type SelectPopupProps = {
    mobile: boolean;
    handleClose: () => void;
    width?: 'outfit' | 'fit' | number;
    open?: boolean;
    controlRef?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    className?: string;
    disablePortal?: boolean;
    virtualized?: boolean;
};
