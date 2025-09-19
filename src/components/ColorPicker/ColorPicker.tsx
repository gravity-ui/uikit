import * as React from 'react';

import type {HsvaColor} from '@uiw/react-color';
import {Alpha, Hue, Saturation} from '@uiw/react-color';

import {Popup} from '../Popup';
import {Select} from '../Select';

import {ColorDisplay, ColorPointer, HexInput, RgbInputs} from './components';
import {DEFAULT_COLOR, b} from './constants';
import {Modes} from './types';
import {useColorPickerState} from './useColorPickerState';
import {convertSelectedModeColorToHsva, getTextValueByMode} from './utils';

export interface ColorPickerProps {
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
            inputValue: getTextValueByMode(hsva, modeState, withAlpha),
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
        const newHsva = convertSelectedModeColorToHsva(inputValue, modeState, withAlpha);

        updateHsva(newHsva);
    }, [modeState, inputValue, withAlpha, updateHsva]);

    return (
        <React.Fragment>
            <ColorDisplay
                hsva={hsva}
                withAlpha={withAlpha}
                onClick={() => setState((prev) => ({...prev, open: true}))}
                onColorChange={updateHsva}
                ref={setAnchor}
            />

            <Popup
                open={open}
                className={b('popup')}
                placement={['bottom-start', 'bottom-end']}
                anchorElement={anchor}
                onOpenChange={handleOpenChange}
            >
                <div className={b('handlers-container')}>
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

                    <div className={b('inputs')}>
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
                            <HexInput
                                value={inputValue}
                                withAlpha={withAlpha}
                                onChange={handleInputChange}
                                onBlur={applyInputValue}
                            />
                        )}

                        {modeState === Modes.Rgb && (
                            <RgbInputs
                                hsva={hsva}
                                withAlpha={withAlpha}
                                onChange={(color) => updateHsva(color.hsva)}
                            />
                        )}
                    </div>
                </div>
            </Popup>
        </React.Fragment>
    );
};
