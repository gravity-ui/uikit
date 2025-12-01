import * as React from 'react';

import {FaceRobot} from '@gravity-ui/icons';

import {Avatar} from '../../../components/Avatar';
import type {AvatarProps} from '../../../components/Avatar';
import {Popover} from '../../../components/Popover';
import {useThemeType} from '../../../components/theme/useThemeType';
import {generateColor} from '../color';
import type {GenerateColorProps} from '../types';

import {ColorInfoPopup} from './ColorInfoPopup';
import {calculateAvatarContrast, getBackgroundColor} from './utils';

import './ColorInfoPopup.scss';

type CustomColoredAvatarProps = Omit<AvatarProps, 'text'> & {
    content?: 'text' | 'icon' | 'empty';
    seed: GenerateColorProps['seed'];
    text?: string;
    withTransparentBackground?: boolean;
    storyAvatarStyle: 'filled' | 'outline' | 'transparent';
};

export const CustomColoredAvatar = ({
    seed,
    content,
    storyAvatarStyle,
    text,
    ...avatarProps
}: CustomColoredAvatarProps) => {
    const theme = useThemeType();
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const colorDetails = generateColor({
        seed,
        theme,
    });

    const {r, g, b} = colorDetails.rgb;

    const generatedColor = colorDetails.rgbString;

    let colors: Record<string, string> = {
        color: colorDetails.textColor,
        backgroundColor: generatedColor,
    };

    if (storyAvatarStyle === 'transparent') {
        colors = {
            color: generatedColor,
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
        };
    }

    if (storyAvatarStyle === 'outline') {
        colors = {
            color: generatedColor,
            borderColor: generatedColor,
            backgroundColor: 'transparent',
        };
    }

    let contentProps: Partial<AvatarProps> = {};

    if (content === 'icon') {
        contentProps = {
            icon: FaceRobot,
        };
    }

    if (content === 'text') {
        contentProps = {
            text: text || seed,
        } as AvatarProps;
    }

    const contrastResult = React.useMemo(() => {
        if (!isPopoverOpen) {
            return null;
        }
        const pageBackgroundColor = getBackgroundColor();
        return calculateAvatarContrast(colorDetails, storyAvatarStyle, pageBackgroundColor);
    }, [isPopoverOpen, colorDetails, storyAvatarStyle]);

    const popoverContent = contrastResult ? (
        <ColorInfoPopup
            colorDetails={colorDetails}
            seed={seed}
            contrast={contrastResult.contrast}
            foreground={contrastResult.foreground}
            background={contrastResult.background}
        />
    ) : null;

    return (
        <Popover
            content={popoverContent}
            open={isPopoverOpen}
            onOpenChange={setIsPopoverOpen}
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
                        {...(avatarProps as AvatarProps)}
                        title={`Click for color info: ${generatedColor}`}
                        {...(contentProps as AvatarProps)}
                        {...colors}
                    />
                </div>
            )}
        </Popover>
    );
};
