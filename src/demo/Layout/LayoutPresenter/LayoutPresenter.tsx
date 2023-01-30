import React from 'react';
import {Text} from '../../../components/Text';
import {Flex, sp, useLayoutContext, LayoutProvider} from '../../../components/Layout';

interface LayoutPresenterProps {
    children?: React.ReactNode;
    title?: string;
}

const Title: React.FC<{title?: string}> = ({title}) => {
    const {activeMediaQuery} = useLayoutContext();
    return (
        <Flex direction="column" space className={sp({mb: 'l'})}>
            {title && (
                <Text variant="subheader-2" as="div">
                    {title}
                </Text>
            )}
            <Text color="secondary" as="div">
                Active media query: {activeMediaQuery}
            </Text>
        </Flex>
    );
};

export const LayoutPresenter = ({children, title}: LayoutPresenterProps) => {
    return (
        <LayoutProvider>
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
