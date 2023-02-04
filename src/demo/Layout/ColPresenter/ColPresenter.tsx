import React from 'react';
import {Box} from '../Box/Box';
import {Col, ColProps} from '../../../components/layout';

// @ts-ignore-error
const pickSizeProps = <T extends {}>({l, xl, s, m, xxl, xxxl, size}: T = {}): string => {
    // skip empty values
    return Object.entries({...{l, xl, s, m, xxl, xxxl, size}})
        .reduce<string[]>((acc, [media, value]) => {
            if (value) {
                acc.push(`${media}=${value}`);
            }
            return acc;
        }, [])
        .join(', ');
};

export const ColPresenter = ({children, ...props}: ColProps) => (
    <Col {...props}>
        <Box style={{height: '100%'}}>{children || pickSizeProps(props)}</Box>
    </Col>
);
