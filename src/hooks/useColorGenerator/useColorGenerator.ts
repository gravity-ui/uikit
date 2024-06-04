/* eslint-disable valid-jsdoc */
import {useThemeType} from '../../components/theme/useThemeType';

import {getPersistentColor, getTextColor} from './color';
import type {UseColorGeneratorProps} from './types';

/**
 * It is used to create a unique color from a token (string) and to obtain an inverted color (black or white), 
 * ensuring higher text contrast compared to the current color, which is usually better for human perception.
 *
 * Usage example:
 ```tsx
    import React from 'react';
    import {Avatar} from '@gravity-ui/uikit';

    const Component = ({ token, text, ...avatarProps }) => {
        const {color, textColor} = useColorGenerator({
            token,
        });

        return (
            <Avatar
                {...avatarProps}
                text={text}
                color={text ? textColor : undefined}
                backgroundColor={color}
            />
        );
    };
```
*/
export function useColorGenerator(props: UseColorGeneratorProps) {
    const theme = useThemeType();

    const {color, hue, saturation, lightness} = getPersistentColor({
        ...props,
        theme,
    });

    const textColor = getTextColor(hue, saturation, lightness);

    return {color, textColor};
}
