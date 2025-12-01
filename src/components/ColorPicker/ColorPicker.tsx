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
     * Called when user updates the color manually or via UI. Receives a HEX(A) string.
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
     *Enables alpha channel support for HEXA/RGBA mode and transparency slider.
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

    const [color, setColor] = useControlledState(value, defaultValue, onUpdate);

    const isInternalUpdateRef = React.useRef(false);

    const [hsva, setHsva] = React.useState<HsvaColor>(() =>
        convertSelectedModeColorToHsva(color, Modes.Hex, withAlpha),
    );

    React.useEffect(() => {
        if (isInternalUpdateRef.current) {
            isInternalUpdateRef.current = false;
            return;
        }
        setHsva(convertSelectedModeColorToHsva(color, Modes.Hex, withAlpha));
    }, [color, withAlpha]);

    const [isOpen, setIsOpen] = useControlledState(open, defaultOpen, onOpenChange);

    const [inputValue, setInputValue] = React.useState(() =>
        getTextValueByMode(hsva, modeState, withAlpha),
    );

    React.useEffect(() => {
        setInputValue(getTextValueByMode(hsva, modeState, withAlpha));
    }, [hsva, modeState, withAlpha]);

    const updateHsva = React.useCallback(
        (updates: Partial<HsvaColor>) => {
            const newHsva = {...hsva, ...updates};
            setHsva(newHsva);

            const newHexValue = withAlpha ? hsvaToHexa(newHsva) : hsvaToHex(newHsva);

            isInternalUpdateRef.current = true;
            setColor(newHexValue);
        },
        [hsva, setColor, withAlpha],
    );

    const handleModeChange = (newMode: Modes) => {
        setModeState(newMode);
    };

    const handleInputChange = (val: string) => {
        setInputValue(val);
    };

    const applyInputValue = React.useCallback(() => {
        const newHsva = convertSelectedModeColorToHsva(inputValue, modeState, withAlpha);
        setHsva(newHsva);

        const newHexValue = withAlpha ? hsvaToHexa(newHsva) : hsvaToHex(newHsva);
        isInternalUpdateRef.current = true;
        setColor(newHexValue);
    }, [inputValue, modeState, withAlpha, setColor]);

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
                                    transform={'translate(-50%, -50%)'}
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
                                transform={'translate(-50%, -25%)'}
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
                                <ColorPointer
                                    left={props.left}
                                    top={props.top}
                                    transform={'translate(-50%, -25%)'}
                                />
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
