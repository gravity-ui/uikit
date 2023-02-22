import type React from 'react';

export type SelectPopupProps = {
    handleClose: () => void;
    width?: number;
    open?: boolean;
    controlRef?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    className?: string;
    zIndex?: number;
    disablePortal?: boolean;
    virtualized?: boolean;
};
