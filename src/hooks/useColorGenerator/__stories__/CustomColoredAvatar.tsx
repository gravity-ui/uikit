import * as React from 'react';

import {FaceRobot} from '@gravity-ui/icons';

import {Avatar} from '../../../components/Avatar';
import type {AvatarProps} from '../../../components/Avatar';
import {Popover} from '../../../components/Popover';
import {useThemeType} from '../../../components/theme/useThemeType';
import {generateColor} from '../color';
import type {GenerateColorProps} from '../types';

import {ColorInfoPopup} from './ColorInfoPopup';
import {calculateWCAGContrast, getBackgroundColor, getPageTextColor, mixColors} from './utils';

import './ColorInfoPopup.scss';

type CustomColoredAvatarProps = AvatarProps & {
    content?: 'text' | 'icon' | 'empty';
    seed: GenerateColorProps['seed'];
    withTransparentBackground?: boolean;
    storyAvatarStyle: 'filled' | 'outline' | 'transparent';
};

export const CustomColoredAvatar = ({
    seed,
    content,
    storyAvatarStyle,
    ...avatarProps
}: CustomColoredAvatarProps) => {
    const theme = useThemeType();
    const colorDetails = generateColor({
        seed,
        theme,
    });

    const {r, g, b} = colorDetails.rgb;

    const generatedColor = colorDetails.rgbString;
    const pageBackgroundColor = getBackgroundColor();

    // default for storyAvatarStyle = 'filled'
    const calculateContrastColors = {
        foreground: getPageTextColor(),
        background: generatedColor,
    };

    let colors: Record<string, string> = {
        color: colorDetails.textColor,
        backgroundColor: generatedColor,
    };

    if (storyAvatarStyle === 'transparent') {
        colors = {
            color: generatedColor,
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
        };

        calculateContrastColors.foreground = generatedColor;
        calculateContrastColors.background = mixColors(
            colorDetails.rgbString,
            pageBackgroundColor,
            0.9,
        );
    }

    if (storyAvatarStyle === 'outline') {
        colors = {
            color: generatedColor,
            borderColor: generatedColor,
            backgroundColor: 'transparent',
        };

        calculateContrastColors.foreground = generatedColor;
        calculateContrastColors.background = pageBackgroundColor;
    }

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

    const contrast = calculateWCAGContrast(
        calculateContrastColors.foreground,
        calculateContrastColors.background,
    );

    return (
        <Popover
            content={<ColorInfoPopup colorDetails={colorDetails} seed={seed} contrast={contrast} />}
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
                        title={`Click for color info: ${generatedColor}`}
                        {...contentProps}
                        {...colors}
                    />
                </div>
            )}
        </Popover>
    );
};
