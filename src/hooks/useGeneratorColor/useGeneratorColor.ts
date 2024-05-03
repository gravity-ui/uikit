/* eslint-disable valid-jsdoc */
import {useThemeType} from '../../components/theme/useThemeType';

import type {UseGeneratorColorProps} from './types';
import {colorGenerator} from './utils/color';

/**
 * It is used to create a unique color from a token (string) and to obtain an inverted color (black or white), 
 * ensuring higher text contrast compared to the current color, which is usually better for human perception.
 *
 * Usage example:
 ```tsx
    import React from 'react';
    import {Avatar} from '@gravity-ui/uikit';

    const Component = ({ token, text, ...avatarProps }) => {
        const {color, oppositeColor} = useGeneratorColor({
            token,
        });

        return (
            <Avatar
                {...avatarProps}
                text={text}
                color={text ? oppositeColor : undefined}
                backgroundColor={color}
            />
        );
    };
```
*/
export function useGeneratorColor(props: UseGeneratorColorProps) {
    const theme = useThemeType();

    const options = colorGenerator({
        ...props,
        theme,
    });

    return options;
}
