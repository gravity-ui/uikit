import * as React from 'react';

import {Avatar} from '../../../components/Avatar';
import type {AvatarProps} from '../../../components/Avatar';
import {Popover} from '../../../components/Popover';
import {useThemeType} from '../../../components/theme/useThemeType';
import {getColorInfo} from '../colorInfoUtils';
import type {ThemeColorSettings, UseColorGeneratorProps} from '../types';

import {ColorInfoPopup} from './ColorInfoPopup';
import {useCustomColorGenerator} from './useCustomColorGenerator';

import './ColorInfoPopup.scss';

type CustomColoredAvatarProps = AvatarProps & {
    withText: boolean;
    intensity: UseColorGeneratorProps['intensity'];
    seed: UseColorGeneratorProps['seed'];
    colorOptions: ThemeColorSettings;
};

export const CustomColoredAvatar = ({
    intensity,
    theme,
    seed,
    withText,
    colorOptions,
    ...avatarProps
}: CustomColoredAvatarProps) => {
    const {color, textColor} = useCustomColorGenerator({
        seed,
        intensity,
        colorOptions,
    });

    const currentTheme = useThemeType();
    const colorInfo = React.useMemo(() => {
        return getColorInfo(seed, intensity, theme || currentTheme);
    }, [seed, intensity, theme, currentTheme]);

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
                        theme={theme}
                        text={withText ? seed : ''}
                        color={withText ? textColor : undefined}
                        title={`Click for color info: ${color}`}
                        backgroundColor={color}
                        size="l"
                    />
                </div>
            )}
        </Popover>
    );
};
