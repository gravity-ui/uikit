'use client';
import * as React from 'react';

export interface DialogPrivateContextProps {
    disableHeightTransition: boolean;
    initialFocusRef?: React.RefObject<HTMLElement | null>;
    initialFocusAction?: 'apply' | 'cancel';
    onTooltipEscapeKeyDown?: (event: KeyboardEvent) => void;
}

export const DialogPrivateContext = React.createContext<DialogPrivateContextProps>({
    disableHeightTransition: false,
});
