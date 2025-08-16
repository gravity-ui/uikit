import {ClipboardButton} from '../../../components/ClipboardButton';
import {Text} from '../../../components/Text';
import {block} from '../../../components/utils/cn';
import {overlayColorAndCalculateContrast} from '../color';
import type {ColorInfo} from '../colorInfoUtils';
import {formatColorInfo} from '../colorInfoUtils';

const b = block('color-info-popup');

interface ColorInfoPopupProps {
    colorInfo: ColorInfo;
    seed: string;
}

export const ColorInfoPopup = ({colorInfo, seed}: ColorInfoPopupProps) => {
    const formattedInfo = formatColorInfo(colorInfo);
    const contrastInfo = overlayColorAndCalculateContrast(
        colorInfo.rgb.r,
        colorInfo.rgb.g,
        colorInfo.rgb.b,
    );

    return (
        <div className={b()}>
            <div className={b('header')}>
                <Text variant="subheader-3">Color Information</Text>
                <div
                    className={b('color-preview')}
                    style={{backgroundColor: colorInfo.rgbString}}
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
                        <ClipboardButton text={seed} size="s" />
                    </div>
                </div>

                <div className={b('info-row')}>
                    <Text variant="body-2" className={b('label')}>
                        Hash:
                    </Text>
                    <div className={b('value-container')}>
                        <Text variant="code-1" className={b('value')}>
                            {formattedInfo.hash}
                        </Text>
                        <ClipboardButton text={formattedInfo.hash} size="s" />
                    </div>
                </div>

                <div className={b('info-row')}>
                    <Text variant="body-2" className={b('label')}>
                        OKLCH:
                    </Text>
                    <div className={b('value-container')}>
                        <Text variant="code-1" className={b('value')}>
                            {formattedInfo.oklch}
                        </Text>
                        <ClipboardButton text={formattedInfo.oklch} size="s" />
                    </div>
                </div>

                <div className={b('info-row')}>
                    <Text variant="body-2" className={b('label')}>
                        RGB:
                    </Text>
                    <div className={b('value-container')}>
                        <Text variant="code-1" className={b('value')}>
                            {formattedInfo.rgb}
                        </Text>
                        <ClipboardButton text={formattedInfo.rgb} size="s" />
                    </div>
                </div>

                <div className={b('info-row')}>
                    <Text variant="body-2" className={b('label')}>
                        WCAG Contrast:
                    </Text>
                    <div className={b('value-container')}>
                        <Text variant="code-1" className={b('value')}>
                            {contrastInfo.contrastRatio.toFixed(2)}:1
                        </Text>
                        <ClipboardButton text={contrastInfo.contrastRatio.toFixed(2)} size="s" />
                    </div>
                </div>
            </div>

            <div className={b('details')}>
                <Text variant="caption-2" color="secondary">
                    L: {colorInfo.oklch.l.toFixed(1)}% • C: {colorInfo.oklch.c.toFixed(1)}% • H:{' '}
                    {colorInfo.oklch.h.toFixed(1)}°
                </Text>
                <Text variant="caption-2" color="secondary">
                    RGB: {colorInfo.rgb.r}, {colorInfo.rgb.g}, {colorInfo.rgb.b}
                </Text>
                <Text variant="caption-2" color="secondary">
                    Overlaid RGB: {contrastInfo.overlaidColor.r}, {contrastInfo.overlaidColor.g},{' '}
                    {contrastInfo.overlaidColor.b}
                </Text>
            </div>
        </div>
    );
};
