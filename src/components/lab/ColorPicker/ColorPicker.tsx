import * as React from 'react';

import type {HsvaColor} from '@uiw/react-color';
import {Alpha, Hue, Saturation, hsvaToHex, hsvaToHexa, validHex} from '@uiw/react-color';

import {useControlledState} from '../../../hooks/useControlledState';
import {Popup} from '../../Popup';
import type {PopupPlacement} from '../../Popup';
import {Select} from '../../Select';

import {ColorDisplay, ColorPointer, HexInput, RgbInputs} from './components';
import {DEFAULT_COLOR, b} from './constants';
import {Modes} from './types';
import {convertSelectedModeColorToHsva, getTextValueByMode, isValidHsva} from './utils';

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
    compact?: boolean;
}

const POPUP_PLACEMENTS: PopupPlacement = [
    'bottom-start',
    'bottom-end',
    'left-start',
    'left-end',
    'top-start',
    'top-end',
];

const MODE_OPTIONS = Object.values(Modes).map((val) => ({
    content: val,
    value: val,
}));

export const ColorPicker = ({
    size,
    value,
    defaultValue = DEFAULT_COLOR,
    onUpdate,
    open,
    onOpenChange,
    defaultOpen = false,
    withAlpha = false,
    compact = false,
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

            // Validate HSVA before applying
            if (!isValidHsva(newHsva)) {
                return;
            }

            setHsva(newHsva);

            const newHexValue = withAlpha ? hsvaToHexa(newHsva) : hsvaToHex(newHsva);

            // Validate HEX before calling onUpdate
            if (!validHex(newHexValue)) {
                return;
            }

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
        const raw = inputValue.trim();

        if (!raw) {
            setInputValue(color);
            return;
        }

        if (modeState === Modes.Hex && !validHex(raw)) {
            setInputValue(color);
            return;
        }
        const newHsva = convertSelectedModeColorToHsva(raw, modeState, withAlpha);

        if (!isValidHsva(newHsva)) {
            setInputValue(color);
            return;
        }

        const newHexValue = withAlpha ? hsvaToHexa(newHsva) : hsvaToHex(newHsva);

        if (!validHex(newHexValue)) {
            setInputValue(color);
            return;
        }

        isInternalUpdateRef.current = true;
        setHsva(newHsva);
        setColor(newHexValue);
    }, [inputValue, modeState, withAlpha, setColor, color]);

    return (
        <React.Fragment>
            <ColorDisplay
                hsva={hsva}
                withAlpha={withAlpha}
                onClick={() => setIsOpen(!isOpen)}
                onColorChange={updateHsva}
                ref={setAnchor}
                size={size}
                compact={compact}
            />

            <Popup
                open={isOpen}
                className={b('popup')}
                placement={POPUP_PLACEMENTS}
                anchorElement={anchor}
                onOpenChange={setIsOpen}
                disableTransition
            >
                <div className={b('handlers-container')}>
                    <Saturation
                        hsva={hsva}
                        onChange={(newColor) => updateHsva({...newColor, a: hsva.a})}
                        className={b('saturation')}
                        radius={4}
                        pointer={(props) => (
                            <ColorPointer
                                left={props.left}
                                top={props.top}
                                transform={'translate(-50%, -50%)'}
                            />
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
                            options={MODE_OPTIONS}
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
