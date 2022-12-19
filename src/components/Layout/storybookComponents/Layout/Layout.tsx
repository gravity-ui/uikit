import React from 'react';
import {Text} from '../../../Text';
import {spacing} from '../../components';
import {LayoutProvider} from '../../components/LayoutProvider';

interface LayoutProps {
    children?: React.ReactNode;
    title?: string;
}

export const Layout = ({children, title}: LayoutProps) => {
    return (
        <LayoutProvider>
            {title && (
                <Text variant="subheader-2" as="div" className={spacing({mb: 'l'})}>
                    {title}
                </Text>
            )}
            <div style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>{children}</div>
        </LayoutProvider>
    );
};
