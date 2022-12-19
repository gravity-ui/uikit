import React from 'react';
import {Row, RowProps} from '../../components';

interface RowPresenterProps extends RowProps {
    children?: React.ReactNode;
}

export const RowPresenter = ({children, ...props}: RowPresenterProps) => {
    return <Row {...props}>{children}</Row>;
};
