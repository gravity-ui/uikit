'use client';
import * as React from 'react';

export interface DialogPrivateContextProps {
    mobile: boolean;
    disableHeightTransition: boolean;
    initialFocusRef?: React.RefObject<HTMLElement | null>;
    initialFocusAction?: 'apply' | 'cancel';
    onTooltipEscapeKeyDown?: (event: KeyboardEvent) => void;
}

export const DialogPrivateContext = React.createContext<DialogPrivateContextProps>({
    mobile: false,
    disableHeightTransition: false,
});
