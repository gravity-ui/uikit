import * as React from 'react';

import {Popup} from '../Popup';
import {Select} from '../Select';
import type {SelectOption} from '../Select';
import {Text} from '../Text';
import {Flex} from '../layout';
import {block} from '../utils/cn';

import {AlphaInput} from './AlphaInput/AlphaInput';
import {ColorDisplay} from './ColorDisplay/ColorDisplay';
import {ColorInput} from './ColorInput/ColorInput';
import {Picker} from './Picker/Picker';
import type {ColorPickerProps} from './types';
import {ColorPickerMode} from './types';
import {getDisplayHex, hexToOpacity, normalizeHex, opacityToHex} from './utils';

import './ColorPicker.scss';

const b = block('color-picker');

const DEFAULT_COLOR = '#5282ff';

const modeOptions: SelectOption[] = Object.values(ColorPickerMode).map((val) => ({
    value: val,
    content: val,
}));

export const ColorPicker = (props: ColorPickerProps) => {
    const {
        className,
        withAlpha = true,
        withValue = true,
        color = DEFAULT_COLOR,
        mode = ColorPickerMode.HEX,
        onChange,
    } = props;

    const [anchor, setAnchor] = React.useState<HTMLDivElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [modeValue, setModeValue] = React.useState<ColorPickerMode>(mode);

    React.useEffect(() => {
        setModeValue(mode);
    }, [mode]);

    const handleColorChange = React.useCallback(
        (newColor: string) => {
            if (newColor === color) return;
            onChange?.(newColor);
        },
        [color, onChange],
    );

    const handleInputBlur = React.useCallback(() => {
        if (modeValue === ColorPickerMode.HEX) {
            const normalizedValue = normalizeHex(color);
            if (normalizedValue !== color) {
                onChange?.(normalizedValue);
            }
        }
    }, [color, onChange, modeValue]);

    const alpha = React.useMemo(() => hexToOpacity(color), [color]);

    const handleAlphaChange = React.useCallback(
        (alphaValue: number | null) => {
            if (alphaValue !== null) {
                const newColor = opacityToHex(color, alphaValue);
                onChange?.(newColor);
            }
        },
        [color, onChange],
    );

    const handleAlphaBlur = React.useCallback(() => {
        const currentAlpha = hexToOpacity(color);
        if (currentAlpha !== alpha) {
            const newColor = opacityToHex(color, currentAlpha);
            onChange?.(newColor);
        }
    }, [color, alpha, onChange]);

    return (
        <Flex>
            <Flex className={b(null, className)} alignItems={'center'} gap={2} ref={setAnchor}>
                <ColorDisplay color={color} withAlpha={withAlpha} onClick={() => setOpen(!open)} />
                {withValue && <Text className={b('color-value')}>{getDisplayHex(color)}</Text>}
            </Flex>
            <Popup
                className={b('popup', {mode: modeValue, alpha: withAlpha})}
                open={open}
                placement={'bottom-end'}
                onOpenChange={setOpen}
                anchorElement={anchor}
            >
                <Picker
                    color={color}
                    onChange={handleColorChange}
                    mode={modeValue}
                    withAlpha={withAlpha}
                />
                <Flex gap={2} spacing={{mt: 2}}>
                    <Select
                        onUpdate={(val) => {
                            const castedVal = val[0] as ColorPickerMode;
                            setModeValue(castedVal);
                        }}
                        disablePortal
                        value={[modeValue]}
                        options={modeOptions}
                        className={b('mode-select')}
                    />
                    <ColorInput
                        value={color}
                        mode={modeValue}
                        withAlpha={withAlpha}
                        onChange={onChange}
                        onBlur={handleInputBlur}
                    />
                    {withAlpha && (
                        <AlphaInput
                            value={alpha}
                            onChange={handleAlphaChange}
                            onBlur={handleAlphaBlur}
                        />
                    )}
                </Flex>
            </Popup>
        </Flex>
    );
};
