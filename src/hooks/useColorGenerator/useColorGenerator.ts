import * as React from 'react';

import {useThemeType} from '../../components/theme/useThemeType';

import {generateColor} from './color';
import type {ColorDetails, GenerateColorProps} from './types';

/**
 * The `useColorGenerator` hook generates a unique (but consistent) background color based on some unique attribute (e.g., name, id, email).
 * The background color remains unchanged with each update.
 * @param {object} props
 * @param {string} props.seed - unique attribute of the entity (e.g., name, id, email).
 * @example
 *
 *  import React from 'react';
 *  import {Avatar} from '@gravity-ui/uikit';
 *
 *  const Component = ({ token, text, ...avatarProps }) => {
 *      const {rgb, textColor} = useColorGenerator({
 *          seed,
 *      });
 *
 *      return (
 *          <Avatar
 *              {...avatarProps}
 *              text={text}
 *              color={text ? textColor : undefined}
 *              backgroundColor={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
 *          />
 *      );
 *  };
 * @returns {ColorDetails} returns an object with color details:
 * - hash: number - hash value generated from seed
 * - oklch: object with lightness (l), chroma (c), and hue (h) values
 * - rgb: object with red (r), green (g), and blue (b) values
 * - textColor: string - text color (dark or light), ensuring higher contrast on generated color
 */
export function useColorGenerator({seed}: GenerateColorProps): ColorDetails {
    const theme = useThemeType();

    const colorDetails = React.useMemo(() => {
        return generateColor({
            seed,
            theme,
        });
    }, [seed, theme]);

    return colorDetails;
}
