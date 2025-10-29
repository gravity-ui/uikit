import * as React from 'react';

import type {HsvaColor} from '@uiw/react-color';
import {Alpha, Hue, Saturation, hsvaToHex, hsvaToHexa} from '@uiw/react-color';

import {useControlledState} from '../../hooks/useControlledState';
import {Popup} from '../Popup';
import {Select} from '../Select';

import {ColorDisplay, ColorPointer, HexInput, RgbInputs} from './components';
import {DEFAULT_COLOR, b} from './constants';
import {Modes} from './types';
import {convertSelectedModeColorToHsva, getTextValueByMode} from './utils';

export interface ColorPickerProps {
    /*
     * Picker size
     */
    size?: 's' | 'm' | 'l' | 'xl';
    /*
     * Color value for controlled state
     */
    value?: string;
    /*
     * Default color value
     */
    defaultValue?: string;
    /*
     * Picker value update handler
     */
    onUpdate?: (value: string) => void;
    /*
     * Open popup for controlled state
     */
    open?: boolean;
    /*
     * Open popup by default
     */
    defaultOpen?: boolean;
    /*
     * Open popup handler
     */
    onOpenChange?: (open: boolean) => void;
    /*
     * Flag of use of alpha channel
     */
    withAlpha?: boolean;
    /*
     * Render only picker button without value
     */
    onlyPicker?: boolean;
}

export const ColorPicker = ({
    size,
    value,
    defaultValue = DEFAULT_COLOR,
    onUpdate,
    open,
    onOpenChange,
    defaultOpen = false,
    withAlpha = false,
    onlyPicker = false,
}: ColorPickerProps) => {
    const [anchor, setAnchor] = React.useState<HTMLDivElement | null>(null);
    const [modeState, setModeState] = React.useState<Modes>(Modes.Hex);

    const [hexValue, setHexValue] = useControlledState(value, defaultValue, onUpdate);

    const [isOpen, setIsOpen] = useControlledState(open, defaultOpen, onOpenChange);

    const hsva = React.useMemo(() => {
        return convertSelectedModeColorToHsva(hexValue, Modes.Hex, withAlpha);
    }, [hexValue, withAlpha]);

    const [inputValue, setInputValue] = React.useState(() =>
        getTextValueByMode(hsva, modeState, withAlpha),
    );

    React.useEffect(() => {
        setInputValue(getTextValueByMode(hsva, modeState, withAlpha));
    }, [hsva, modeState, withAlpha]);

    const updateHsva = React.useCallback(
        (updates: Partial<HsvaColor>) => {
            const newHsva = {...hsva, ...updates};
            const newHexValue = withAlpha ? hsvaToHexa(newHsva) : hsvaToHex(newHsva);
            setHexValue(newHexValue);
        },
        [hsva, withAlpha, setHexValue],
    );

    const handleModeChange = (newMode: Modes) => {
        setModeState(newMode);
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    const applyInputValue = React.useCallback(() => {
        const newHsva = convertSelectedModeColorToHsva(inputValue, modeState, withAlpha);
        const newHexValue = withAlpha ? hsvaToHexa(newHsva) : hsvaToHex(newHsva);
        setHexValue(newHexValue);
    }, [modeState, inputValue, withAlpha, setHexValue]);

    return (
        <React.Fragment>
            <ColorDisplay
                hsva={hsva}
                withAlpha={withAlpha}
                onClick={() => setIsOpen(true)}
                onColorChange={updateHsva}
                ref={setAnchor}
                size={size}
                onlyPicker={onlyPicker}
            />

            <Popup
                open={isOpen}
                className={b('popup')}
                placement={['bottom-start', 'bottom-end']}
                anchorElement={anchor}
                onOpenChange={setIsOpen}
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
