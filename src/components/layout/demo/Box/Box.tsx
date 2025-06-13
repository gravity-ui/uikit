import type * as React from 'react';

import {Text} from '../../../Text/Text';
import {Flex} from '../../Flex/Flex';
import type {FlexProps} from '../../Flex/Flex';

interface BoxProps extends FlexProps<'div'> {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    minHeight?: number;
    w?: number | string;
    h?: number | string;
    grow?: true;
    bc?: React.CSSProperties['borderColor'];
    bgc?: React.CSSProperties['backgroundColor'];
}

export function Box({
    children,
    w = '100%',
    h = '100%',
    minHeight,
    bgc = '#DDBEE1',
    bc = 'rosybrown',
    ...props
}: BoxProps) {
    return (
        <Flex
            {...props}
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
            <Text variant="code-1" color="complementary">
                {children}
            </Text>
        </Flex>
    );
}
