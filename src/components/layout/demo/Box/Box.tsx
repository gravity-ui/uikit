import React from 'react';
import {Flex, FlexProps} from '../../Flex/Flex';

interface BoxProps extends FlexProps<'div'> {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    minHeight?: number;
    w?: number;
    h?: number;
    grow?: true;
    bc?: React.CSSProperties['backgroundColor'];
    bgc?: React.CSSProperties['backgroundColor'];
}

export const Box: React.FC<BoxProps> = ({
    children,
    w = '100%',
    h = '100%',
    minHeight,
    bgc = '#DDBEE1',
    bc = 'rosybrown',
    ...props
}) => {
    return (
        <Flex {...props}>
            <div
                style={{
                    padding: 5,
                    boxSizing: 'border-box',
                    width: w,
                    height: h,
                    minHeight,
                    border: `2px dashed ${bc}`,
                    backgroundColor: bgc,
                }}
            >
                {children}
            </div>
        </Flex>
    );
};
