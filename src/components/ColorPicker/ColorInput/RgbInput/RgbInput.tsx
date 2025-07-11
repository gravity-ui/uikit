import * as React from 'react';

import {NumberInput} from '../../../NumberInput';
import {Text} from '../../../Text';
import {Flex} from '../../../layout';
import {block} from '../../../utils/cn';
import type {HexColor} from '../../types';
import {hexToOpacity, hexToRgb, opacityToHex, rgbToHex} from '../../utils';

import './RgbInput.scss';
const b = block('rgb-input');

export const RgbInput = ({value, onChange}: {value: HexColor; onChange: (v: HexColor) => void}) => {
    const currentRgb = React.useMemo(() => {
        const rgbValue = hexToRgb(value);
        return rgbValue || {r: 0, g: 0, b: 0};
    }, [value]);

    const handleChange = React.useCallback(
        (channel: 'r' | 'g' | 'b', newValue: number | null) => {
            if (newValue === null) return;

            const clampedValue = Math.max(0, Math.min(255, Math.round(newValue)));

            if (clampedValue === currentRgb[channel]) {
                return;
            }

            const newRgb = {...currentRgb, [channel]: clampedValue};

            const currentAlpha = hexToOpacity(value);
            let hexValue = rgbToHex(newRgb);

            if (currentAlpha < 100) {
                hexValue = opacityToHex(hexValue, currentAlpha);
            }

            if (hexValue !== value) {
                onChange(hexValue);
            }
        },
        [currentRgb, value, onChange],
    );

    return (
        <Flex>
            <Flex direction={'column'}>
                <NumberInput
                    className={b('input')}
                    value={currentRgb.r}
                    onUpdate={(val) => handleChange('r', val)}
                    min={0}
                    max={255}
                    hiddenControls
                    startContent={
                        <Text className={b('text')} color={'secondary'} variant={'caption-1'}>
                            R
                        </Text>
                    }
                    pin={'round-clear'}
                />
            </Flex>
            <Flex direction={'column'}>
                <NumberInput
                    className={b('input')}
                    value={currentRgb.g}
                    onUpdate={(val) => handleChange('g', val)}
                    min={0}
                    max={255}
                    hiddenControls
                    startContent={
                        <Text className={b('text')} color={'secondary'} variant={'caption-1'}>
                            G
                        </Text>
                    }
                    pin={'brick-brick'}
                />
            </Flex>
            <Flex direction={'column'}>
                <NumberInput
                    className={b('input')}
                    value={currentRgb.b}
                    onUpdate={(val) => handleChange('b', val)}
                    min={0}
                    max={255}
                    hiddenControls
                    startContent={
                        <Text className={b('text')} color={'secondary'} variant={'caption-1'}>
                            B
                        </Text>
                    }
                    pin={'clear-round'}
                />
            </Flex>
        </Flex>
    );
};
