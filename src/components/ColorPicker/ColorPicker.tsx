import * as React from 'react';

import type {HsvaColor} from '@uiw/react-color';
import {Alpha, Hue, Saturation} from '@uiw/react-color';

import {Popup} from '../Popup';
import {Select} from '../Select';
import {Flex} from '../layout';

import {ColorDisplay, ColorPointer, HexInputs, RgbInputs} from './components';
import {DEFAULT_COLOR, b} from './constants';
import {Modes} from './types';
import {useColorPickerState} from './useColorPickerState';
import {convertSelectedModeColorToHsva, getTextValueByMode} from './utils';

interface ColorPickerProps {
    withAlpha?: boolean;
    mode?: Modes;
    defaultColor?: HsvaColor;
    onChange?: (color: HsvaColor) => void;
    onClose?: () => void;
}

export const ColorPicker = ({
    withAlpha = true,
    mode = Modes.Hex,
    defaultColor = DEFAULT_COLOR,
    onChange,
    onClose,
}: ColorPickerProps) => {
    const [state, setState] = useColorPickerState(defaultColor, mode, withAlpha);
    const [anchor, setAnchor] = React.useState<HTMLDivElement | null>(null);

    const {open, hsva, modeState, inputValue} = state;

    React.useEffect(() => {
        setState((prev) => ({
            ...prev,
            inputValue: getTextValueByMode(
                hsva,
                modeState,
                modeState === Modes.Hex ? false : withAlpha,
            ),
        }));
    }, [hsva, modeState, withAlpha]);

    React.useEffect(() => {
        onChange?.(hsva);
    }, [hsva, onChange]);

    const updateHsva = (updates: Partial<HsvaColor>) => {
        setState((prev) => ({
            ...prev,
            hsva: {...prev.hsva, ...updates},
        }));
    };

    const handleOpenChange = React.useCallback(
        (newOpen: boolean) => {
            setState((prev) => ({...prev, open: newOpen}));
            if (!newOpen) {
                onClose?.();
            }
        },
        [onClose],
    );

    const handleModeChange = (newMode: Modes) => {
        setState((prev) => ({...prev, modeState: newMode}));
    };

    const handleInputChange = (value: string) => {
        setState((prev) => ({...prev, inputValue: value}));
    };

    const applyInputValue = React.useCallback(() => {
        const newHsva = convertSelectedModeColorToHsva(
            inputValue,
            modeState,
            modeState === Modes.Hex ? false : withAlpha,
        );

        if (modeState === Modes.Hex) {
            updateHsva({...newHsva, a: hsva.a});
        } else {
            updateHsva(newHsva);
        }
    }, [modeState, inputValue, withAlpha, hsva.a, updateHsva]);

    const handleAlphaChange = React.useCallback(
        (alpha: number) => {
            updateHsva({a: alpha});
        },
        [updateHsva],
    );

    return (
        <React.Fragment>
            <ColorDisplay
                hsva={hsva}
                onClick={() => setState((prev) => ({...prev, open: true}))}
                onColorChange={updateHsva}
                ref={setAnchor}
            />

            <Popup
                open={open}
                className={b('popup')}
                placement={'bottom-end'}
                anchorElement={anchor}
                onOpenChange={handleOpenChange}
            >
                <Flex direction={'column'} gap={2}>
                    <Saturation
                        hsva={hsva}
                        onChange={(newColor) => updateHsva({...newColor, a: hsva.a})}
                        className={b('saturation')}
                        radius={4}
                        pointer={(props) => (
                            <div {...props}>
                                <ColorPointer
                                    left={props.left}
                                    top={props.top}
                                    transform="translate(-8px, -8px)"
                                />
                            </div>
                        )}
                    />

                    <Hue
                        className={b('slider')}
                        hue={hsva.h}
                        onChange={(newHue) => updateHsva(newHue)}
                        pointerProps={{className: b('pointer')}}
                        radius={4}
                        pointer={(props) => (
                            <ColorPointer
                                left={props.left}
                                top={props.top}
                                transform="translate(-4px, -4px)"
                            />
                        )}
                    />

                    {withAlpha && (
                        <Alpha
                            hsva={hsva}
                            onChange={(newAlpha) => updateHsva(newAlpha)}
                            className={b('slider')}
                            pointerProps={{className: b('pointer')}}
                            radius={4}
                            pointer={(props) => (
                                <div {...props}>
                                    <ColorPointer
                                        left={props.left}
                                        top={props.top}
                                        transform="translate(-12px, -4px)"
                                    />
                                </div>
                            )}
                        />
                    )}

                    <Flex gap={2}>
                        <Select
                            options={Object.values(Modes).map((val) => ({
                                content: val,
                                value: val,
                            }))}
                            multiple={false}
                            value={[modeState]}
                            onUpdate={(val) => handleModeChange(val[0] as Modes)}
                        />

                        {modeState === Modes.Hex && (
                            <HexInputs
                                inputValue={inputValue}
                                hsva={hsva}
                                withAlpha={withAlpha}
                                onInputChange={handleInputChange}
                                onInputBlur={applyInputValue}
                                onAlphaChange={handleAlphaChange}
                            />
                        )}

                        {modeState === Modes.Rgb && (
                            <RgbInputs
                                hsva={hsva}
                                withAlpha={withAlpha}
                                onChange={(color) => updateHsva(color.hsva)}
                            />
                        )}
                    </Flex>
                </Flex>
            </Popup>
        </React.Fragment>
    );
};
