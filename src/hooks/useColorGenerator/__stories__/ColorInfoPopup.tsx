import {Text} from '../../../components/Text';
import {block} from '../../../components/utils/cn';
import type {ColorInfo} from '../colorInfoUtils';
import {formatColorInfo} from '../colorInfoUtils';

const b = block('color-info-popup');

interface ColorInfoPopupProps {
    colorInfo: ColorInfo;
    seed: string;
}

export const ColorInfoPopup = ({colorInfo, seed}: ColorInfoPopupProps) => {
    const formattedInfo = formatColorInfo(colorInfo);

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
                    </div>
                </div>

                <div className={b('info-row')}>
                    <Text variant="body-2" className={b('label')}>
                        HEX:
                    </Text>
                    <div className={b('value-container')}>
                        <Text variant="code-1" className={b('value')}>
                            {formattedInfo.hex}
                        </Text>
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
            </div>
        </div>
    );
};
