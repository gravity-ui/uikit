import React from 'react';
import block from 'bem-cn-lite';
import {DocsContainer, DocsContainerProps} from '@storybook/addon-docs/blocks';

import {ThemeProvider, MobileProvider} from '../..';

import './DocsDecorator.scss';

export interface DocsDecoratorProps extends React.PropsWithChildren<DocsContainerProps> {}

const b = block('docs-decorator');

export function DocsDecorator({children, context}: DocsDecoratorProps) {
    return (
        <div className={b()}>
            <DocsContainer context={context}>
                <ThemeProvider theme="light">
                    <MobileProvider mobile={false}>{children}</MobileProvider>
                </ThemeProvider>
            </DocsContainer>
        </div>
    );
}
