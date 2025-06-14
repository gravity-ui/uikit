import type * as React from 'react';

import {Text} from '../../../Text';
import type {LayoutTheme} from '../../../layout';
import {ThemeProvider} from '../../../theme';
import {Flex} from '../../Flex/Flex';
import {useLayoutContext} from '../../hooks/useLayoutContext';
import {sp} from '../../spacing/spacing';

interface LayoutPresenterProps {
    children?: React.ReactNode;
    title?: string;
    theme?: LayoutTheme;
    fixBreakpoints?: boolean;
}

function Title({title}: {title?: string}) {
    const {
        activeMediaQuery,
        theme: {breakpoints},
    } = useLayoutContext();
    return (
        <Flex direction="column" space="5" className={sp({mb: '5'})}>
            {title && (
                <Text variant="subheader-2" as="div">
                    {title}
                </Text>
            )}
            <Text color="secondary" as="div">
                Active media query: {activeMediaQuery}, breakpoint value:{' '}
                {breakpoints[activeMediaQuery]}
            </Text>
        </Flex>
    );
}

export const LayoutPresenter = ({children, title, theme: config}: LayoutPresenterProps) => {
    return (
        <ThemeProvider layout={{config, fixBreakpoints: true}} scoped>
            <Title title={title} />
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    border: '3px dashed lightgray',
                }}
            >
                {children}
            </div>
        </ThemeProvider>
    );
};
