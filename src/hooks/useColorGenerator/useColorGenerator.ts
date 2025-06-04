import * as React from 'react';

import {useThemeType} from '../../components/theme/useThemeType';

import {getPersistentColor, getTextColor} from './color';
import type {UseColorGeneratorProps, UseColorGeneratorResult} from './types';

/**
 * The `useColorGenerator` hook generates a unique (but consistent) background color based on some unique attribute (e.g., name, id, email).
 * The background color remains unchanged with each update.
 * @param {object} props
 * @param {string} [props.intensity] - value to control color saturation.
 * @param {string} props.seed - unique attribute of the entity (e.g., name, id, email).
 * @example
 *
 *  import React from 'react';
 *  import {Avatar} from '@gravity-ui/uikit';
 *
 *  const Component = ({ token, text, ...avatarProps }) => {
 *      const {color, textColor} = useColorGenerator({
 *          seed,
 *      });
 *
 *      return (
 *          <Avatar
 *              {...avatarProps}
 *              text={text}
 *              color={text ? textColor : undefined}
 *              backgroundColor={color}
 *          />
 *      );
 *  };
@returns {object} returns an object with exactly two values:
 * - color: unique color from a token.
 * - textColor: text color (dark or light), ensurring higher contrast on generated color.
 */
export function useColorGenerator(props: UseColorGeneratorProps): UseColorGeneratorResult {
    const theme = useThemeType();

    const color = React.useMemo(
        () =>
            getPersistentColor({
                ...props,
                theme,
            }),
        [props, theme],
    );

    const textColor = React.useMemo(() => getTextColor(props.intensity), [props.intensity]);

    return {color, textColor};
}
