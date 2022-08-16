import React from 'react';
import block from 'bem-cn-lite';
import {DocsContainer, DocsContainerProps} from '@storybook/addon-docs';
import {themes} from '../../../.storybook/theme';

import {ThemeProvider, MobileProvider} from '../..';

import './DocsDecorator.scss';

export interface DocsDecoratorProps extends React.PropsWithChildren<DocsContainerProps> {}

const b = block('docs-decorator');

export function DocsDecorator({children, context}: DocsDecoratorProps) {
    const storyContext = context.getStoryContext(context.storyById(context.id));
    const theme = storyContext.globals.theme as 'dark' | 'light';
    return (
        <div className={b()}>
            {/* @ts-ignore */}
            <DocsContainer
                context={{
                    ...context,
                    storyById: (id) => {
                        const story = context.storyById(id);
                        return {
                            ...story,
                            parameters: {
                                ...story?.parameters,
                                docs: {
                                    ...story?.parameters?.docs,
                                    theme: themes[theme],
                                },
                            },
                        };
                    },
                }}
            >
                <ThemeProvider theme={theme}>
                    <MobileProvider mobile={false}>{children}</MobileProvider>
                </ThemeProvider>
            </DocsContainer>
        </div>
    );
}
