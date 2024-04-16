import React from 'react';

import {Text} from '../../../Text';
import type {LayoutTheme} from '../../../layout';
import {Flex} from '../../Flex/Flex';
import {LayoutProvider} from '../../LayoutProvider/LayoutProvider';
import {useLayoutContext} from '../../hooks/useLayoutContext';
import {sp} from '../../spacing/spacing';

interface LayoutPresenterProps {
    children?: React.ReactNode;
    title?: string;
    theme?: LayoutTheme;
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

export const LayoutPresenter = ({children, title, theme}: LayoutPresenterProps) => {
    return (
        <LayoutProvider theme={theme}>
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
        </LayoutProvider>
    );
};
