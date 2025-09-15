import * as React from 'react';

import {Avatar} from '../../../components/Avatar';
import type {AvatarProps} from '../../../components/Avatar';
import {Popover} from '../../../components/Popover';
import {useThemeType} from '../../../components/theme/useThemeType';
import {getColorInfo} from '../colorInfoUtils';
import {useColorGenerator} from '../useColorGenerator';
import type {ThemeColorSettings, UseColorGeneratorProps} from '../types';

import {ColorInfoPopup} from './ColorInfoPopup';

import './ColorInfoPopup.scss';
import {getPersistentColorDetails, getTextColor} from '../color';

type CustomColoredAvatarProps = AvatarProps & {
    withText: boolean;
    intensity: UseColorGeneratorProps['intensity'];
    seed: UseColorGeneratorProps['seed'];
    withTransparentBackground?: boolean;
    interfaceTheme: 'light' | 'dark';
    storyAvatarStyle: 'filled' | 'outline' | 'transparent';
};

export const CustomColoredAvatar = ({
    intensity,
    interfaceTheme,
    seed,
    withText,
    storyAvatarStyle,
    ...avatarProps
}: CustomColoredAvatarProps) => {
    const colorInfo = getPersistentColorDetails({
        seed,
        intensity,
        theme: interfaceTheme,
    });

    const {r, g, b} = colorInfo.rgb;

    const textColor = getTextColor(intensity);
    const color = colorInfo.rgbString;

    let colors: Record<string, string> = {
        color: textColor,
        backgroundColor: color,
    };

    if (storyAvatarStyle === 'transparent') {
        colors = {
            color: color,
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
        };
    }

    if (storyAvatarStyle === 'outline') {
        colors = {
            color: color,
            borderColor: color,
            backgroundColor: 'transparent',
        };
    }

    return (
        <Popover
            content={<ColorInfoPopup colorInfo={colorInfo} seed={seed} />}
            trigger="click"
            enableSafePolygon
            hasArrow
            placement="top"
        >
            {(props, ref) => (
                <div
                    {...props}
                    ref={ref as React.LegacyRef<HTMLDivElement>}
                    style={{
                        display: 'inline-block',
                        cursor: 'pointer',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Color info for ${seed}. Click to view details`}
                >
                    <Avatar
                        {...avatarProps}
                        text={withText ? seed : ''}
                        title={`Click for color info: ${color}`}
                        size="l"
                        {...colors}
                    />
                </div>
            )}
        </Popover>
    );
};
