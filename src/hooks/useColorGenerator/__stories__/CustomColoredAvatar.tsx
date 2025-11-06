import * as React from 'react';

import {FaceRobot} from '@gravity-ui/icons';

import {Avatar} from '../../../components/Avatar';
import type {AvatarProps} from '../../../components/Avatar';
import {Popover} from '../../../components/Popover';
import {useTheme} from '../../../components/theme/useTheme';
import {getPersistentColorDetails} from '../color';
import type {UseColorGeneratorProps} from '../types';

import {ColorInfoPopup} from './ColorInfoPopup';
import {getBackgroundColor, mixColors} from './utils';

import './ColorInfoPopup.scss';

type CustomColoredAvatarProps = AvatarProps & {
    content?: 'text' | 'icon' | 'empty';
    seed: UseColorGeneratorProps['seed'];
    withTransparentBackground?: boolean;
    storyAvatarStyle: 'filled' | 'outline' | 'transparent';
};

export const CustomColoredAvatar = ({
    seed,
    content,
    storyAvatarStyle,
    ...avatarProps
}: CustomColoredAvatarProps) => {
    const theme = useTheme();
    const colorInfo = getPersistentColorDetails({
        seed,
        theme,
    });

    const {r, g, b} = colorInfo.rgb;

    const color = colorInfo.rgbString;
    let colorToGetContrast = colorInfo.rgbString;
    const backgroundColor = getBackgroundColor();

    let colors: Record<string, string> = {
        color: 'var(--g-color-text-inverted-primary)',
        backgroundColor: color,
    };

    if (storyAvatarStyle === 'transparent') {
        colors = {
            color: color,
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
        };
        colorToGetContrast = mixColors(`rgba(${r}, ${g}, ${b}, 0.1)`, backgroundColor);
    }

    if (storyAvatarStyle === 'outline') {
        colors = {
            color: color,
            borderColor: color,
            backgroundColor: 'transparent',
        };
        colorToGetContrast = mixColors(color, backgroundColor);
    }

    console.log('targetColor', colorToGetContrast);

    let contentProps = {};

    if (content === 'icon') {
        contentProps = {
            icon: FaceRobot,
        };
    }

    if (content === 'text') {
        contentProps = {
            text: seed,
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
                        title={`Click for color info: ${color}`}
                        {...contentProps}
                        {...colors}
                    />
                </div>
            )}
        </Popover>
    );
};
