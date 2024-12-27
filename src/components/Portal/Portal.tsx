'use client';

import * as React from 'react';

import {FloatingPortal} from '@floating-ui/react';

import {usePortalContainer} from '../../hooks';
import {ThemeProvider} from '../theme';
import {useThemeContext} from '../theme/useThemeContext';
import {block} from '../utils/cn';

import './Portal.scss';

const b = block('portal');

export interface PortalProps {
    container?: HTMLElement;
    children?: React.ReactNode;
    disablePortal?: boolean;
}

export function Portal({container, children, disablePortal}: PortalProps) {
    const defaultContainer = usePortalContainer();
    const {scoped} = useThemeContext();

    const containerNode = container ?? defaultContainer;

    if (disablePortal) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    if (containerNode) {
        return (
            <FloatingPortal root={containerNode}>
                {scoped ? (
                    <ThemeProvider rootClassName={b('theme-wrapper')} scoped>
                        {children}
                    </ThemeProvider>
                ) : (
                    children
                )}
            </FloatingPortal>
        );
    }

    return null;
}
