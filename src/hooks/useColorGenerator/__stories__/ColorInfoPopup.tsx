import {Text} from '../../../components/Text';
import {block} from '../../../components/utils/cn';
import type {ColorDetails} from '../types';

import {formatOklchColor, getHexColor} from './utils';

const b = block('color-info-popup');

interface ColorInfoPopupProps {
    colorDetails: ColorDetails;
    seed: string;
    contrast: number;
}

export const ColorInfoPopup = ({colorDetails, seed, contrast}: ColorInfoPopupProps) => {
    const hex = getHexColor(colorDetails);

    return (
        <div className={b()}>
            <div className={b('header')}>
                <Text variant="subheader-3">Color Information</Text>
                <div
                    className={b('color-preview')}
                    style={{backgroundColor: colorDetails.rgbString}}
                />
            </div>

            <div className={b('info-section')}>
                <div className={b('info-row')}>
                    <Text variant="body-2" className={b('label')}>
                        Source string:
                    </Text>
                    <div className={b('value-container')}>
                        <Text variant="code-1" className={b('value')}>
                            {seed}
                        </Text>
                    </div>
                </div>

                <div className={b('info-row')}>
                    <Text variant="body-2" className={b('label')}>
                        Hash:
                    </Text>
                    <div className={b('value-container')}>
                        <Text variant="code-1" className={b('value')}>
                            {colorDetails.hash}
                        </Text>
                    </div>
                </div>

                <div className={b('info-row')}>
                    <Text variant="body-2" className={b('label')}>
                        OKLCH:
                    </Text>
                    <div className={b('value-container')}>
                        <Text variant="code-1" className={b('value')}>
                            {formatOklchColor(colorDetails)}
                        </Text>
                    </div>
                </div>

                <div className={b('info-row')}>
                    <Text variant="body-2" className={b('label')}>
                        RGB:
                    </Text>
                    <div className={b('value-container')}>
                        <Text variant="code-1" className={b('value')}>
                            {colorDetails.rgbString}
                        </Text>
                    </div>
                </div>

                <div className={b('info-row')}>
                    <Text variant="body-2" className={b('label')}>
                        HEX:
                    </Text>
                    <div className={b('value-container')}>
                        <Text variant="code-1" className={b('value')}>
                            {hex}
                        </Text>
                    </div>
                </div>

                <div className={b('info-row')}>
                    <Text variant="body-2" className={b('label')}>
                        WCAG contrast:
                    </Text>
                    <div className={b('value-container')}>
                        <Text variant="code-1" className={b('value')}>
                            {contrast}
                        </Text>
                    </div>
                </div>
            </div>

            <div className={b('details')}>
                <Text variant="caption-2" color="secondary">
                    L: {colorDetails.oklch.l.toFixed(1)}% • C: {colorDetails.oklch.c.toFixed(1)}% •
                    H: {colorDetails.oklch.h.toFixed(1)}°
                </Text>
                <Text variant="caption-2" color="secondary">
                    RGB: {colorDetails.rgb.r}, {colorDetails.rgb.g}, {colorDetails.rgb.b}
                </Text>
            </div>
        </div>
    );
};
