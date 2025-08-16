import * as React from 'react';

import {Avatar} from '../../../components/Avatar';
import type {AvatarProps} from '../../../components/Avatar';
import {Popup} from '../../../components/Popup';
import {useThemeType} from '../../../components/theme/useThemeType';
import {getColorInfo} from '../colorInfoUtils';
import type {UseColorGeneratorProps} from '../types';
import {useColorGenerator} from '../useColorGenerator';

import {ColorInfoPopup} from './ColorInfoPopup';

import './ColorInfoPopup.scss';

type ColoredAvatarProps = AvatarProps & {
    withText: boolean;
    intensity: UseColorGeneratorProps['intensity'];
    seed: UseColorGeneratorProps['seed'];
};

export const ColoredAvatarWithPopup = ({
    intensity,
    theme,
    seed,
    withText,
    ...avatarProps
}: ColoredAvatarProps) => {
    const {color, textColor} = useColorGenerator({
        seed,
        intensity,
    });

    const currentTheme = useThemeType();
    const colorInfo = React.useMemo(() => {
        return getColorInfo(seed, intensity, theme || currentTheme);
    }, [seed, intensity, theme, currentTheme]);

    const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
    const [open, setOpen] = React.useState(false);

    const handleClick = React.useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
            }
        },
        [handleClick],
    );

    return (
        <React.Fragment>
            <div
                ref={setAnchorElement}
                style={{
                    display: 'inline-block',
                    cursor: 'pointer',
                }}
                tabIndex={0}
                role="button"
                aria-label={`Color info for ${seed}. Click to view details`}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
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
            <Popup
                anchorElement={anchorElement}
                open={open}
                onOutsideClick={() => setOpen(false)}
                onEscapeKeyDown={() => setOpen(false)}
                hasArrow
                placement="top"
            >
                <ColorInfoPopup colorInfo={colorInfo} seed={seed} />
            </Popup>
        </React.Fragment>
    );
};
