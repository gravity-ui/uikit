import React from 'react';

import ReactDOM from 'react-dom';

import {usePortalContainer} from '../../hooks';
import {ThemeProvider} from '../theme';
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

    const containerNode = container ?? defaultContainer;

    if (disablePortal) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    return containerNode
        ? ReactDOM.createPortal(
              <ThemeProvider rootClassName={b('theme-wrapper')} scoped>
                  {children}
              </ThemeProvider>,
              containerNode,
          )
        : null;
}
