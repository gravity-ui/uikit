import * as React from 'react';

import type {HsvaColor} from '@uiw/react-color';
import {Alpha, Hue, Saturation, hsvaToHex, hsvaToHexa} from '@uiw/react-color';
import debounce from 'lodash/debounce';

import {useControlledState} from '../../../hooks/useControlledState';
import {Popup} from '../../Popup';
import type {PopupPlacement} from '../../Popup';
import {Select} from '../../Select';

import {ColorDisplay, ColorPointer, HexInput, RgbInputs} from './components';
import {DEFAULT_COLOR, UPDATE_COLOR_DEBOUNCE_TIME, b} from './constants';
import {Modes} from './types';
import {
    getTextValueByMode,
    isValidHsva,
    normalizeInputColorForMode,
    parseColorToHsva,
} from './utils';

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
     * Placement of the popup
     */
    popupPlacement?: PopupPlacement;
    /*
     * Container for the popup
     */
    popupContainer?: HTMLElement;
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
     * Enables alpha channel support for HEXA/RGBA mode and transparency slider.
     */
    withAlpha?: boolean;
    /*
     * Render only picker button without value
     */
    compact?: boolean;
    /**
     * Disable picker
     */
    disabled?: boolean;
}

const DEFAULT_POPUP_PLACEMENT: PopupPlacement = [
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

const COLOR_POINTER_TRANSLATE = 'translate(-50%, -50%)';
const SLIDERS_TRANSLATE = 'translate(-50%, -25%)';
const isSameHsva = (a: HsvaColor, b: HsvaColor) =>
    a.h === b.h && a.s === b.s && a.v === b.v && a.a === b.a;

export const ColorPicker = ({
    size,
    value,
    defaultValue = DEFAULT_COLOR,
    onUpdate,
    popupPlacement = DEFAULT_POPUP_PLACEMENT,
    popupContainer,
    open,
    onOpenChange,
    defaultOpen = false,
    withAlpha = false,
    compact = false,
    disabled = false,
}: ColorPickerProps) => {
    const [anchor, setAnchor] = React.useState<HTMLDivElement | null>(null);

    const [color, setColor] = useControlledState(value, defaultValue, onUpdate);
    const [isOpen, setIsOpen] = useControlledState(open, defaultOpen, onOpenChange);

    const effectiveColor = color.trim() || DEFAULT_COLOR;

    const [hsva, setHsva] = React.useState<HsvaColor>(() => {
        const parsed = parseColorToHsva(effectiveColor, withAlpha);
        return parsed.isValid ? parsed.hsva : parseColorToHsva(DEFAULT_COLOR, withAlpha).hsva;
    });

    React.useEffect(() => {
        const parsed = parseColorToHsva(effectiveColor, withAlpha);

        if (parsed.isValid) {
            setHsva((prevHsva) => {
                const prevColor = withAlpha ? hsvaToHexa(prevHsva) : hsvaToHex(prevHsva);
                return prevColor === effectiveColor ? prevHsva : parsed.hsva;
            });
        }
    }, [effectiveColor, withAlpha]);

    const [modeState, setModeState] = React.useState<Modes>(Modes.Hex);
    const [inputValue, setInputValue] = React.useState(() =>
        getTextValueByMode(hsva, modeState, withAlpha),
    );

    React.useEffect(() => {
        setInputValue(getTextValueByMode(hsva, modeState, withAlpha));
    }, [hsva, modeState, withAlpha]);

    const updateColorByHsva = React.useMemo(() => {
        return debounce((nextHsva: HsvaColor) => {
            setColor(withAlpha ? hsvaToHexa(nextHsva) : hsvaToHex(nextHsva));
        }, UPDATE_COLOR_DEBOUNCE_TIME);
    }, [setColor, withAlpha]);

    const updateHsva = React.useCallback(
        (updates: Partial<HsvaColor>) => {
            setHsva((prevHsva) => {
                const nextHsva = {...prevHsva, ...updates};

                if (!isValidHsva(nextHsva) || isSameHsva(prevHsva, nextHsva)) {
                    return prevHsva;
                }

                updateColorByHsva(nextHsva);

                return nextHsva;
            });
        },
        [updateColorByHsva],
    );

    const resetInputValue = React.useCallback(() => {
        setInputValue(getTextValueByMode(hsva, modeState, withAlpha));
    }, [hsva, modeState, withAlpha]);

    const applyInputValue = React.useCallback(() => {
        const raw = inputValue.trim();

        if (!raw) {
            resetInputValue();
            return;
        }

        const normalized = normalizeInputColorForMode(raw, modeState, withAlpha);

        if (!normalized.isValid) {
            resetInputValue();
            return;
        }

        const nextHsva = normalized.hsva;
        const nextHexValue = withAlpha ? hsvaToHexa(nextHsva) : hsvaToHex(nextHsva);

        setHsva(nextHsva);
        setColor(nextHexValue);
        setInputValue(normalized.formattedValue);
    }, [inputValue, modeState, withAlpha, resetInputValue, setColor]);
    const selectValue = React.useMemo(() => [modeState], [modeState]);

    return (
        <React.Fragment>
            <ColorDisplay
                hsva={hsva}
                withAlpha={withAlpha}
                onClick={() => {
                    if (!disabled) {
                        setIsOpen(!isOpen);
                    }
                }}
                onColorChange={updateHsva}
                ref={setAnchor}
                size={size}
                compact={compact}
                disabled={disabled}
            />

            <Popup
                open={isOpen}
                className={b('popup')}
                placement={popupPlacement}
                container={popupContainer}
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
                                transform={COLOR_POINTER_TRANSLATE}
                                color={hsvaToHex(hsva)}
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
                                transform={SLIDERS_TRANSLATE}
                                color={hsvaToHex({h: hsva.h, s: 100, v: 100, a: 1})}
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
                                    transform={SLIDERS_TRANSLATE}
                                />
                            )}
                        />
                    )}

                    <div className={b('inputs')}>
                        <Select
                            options={MODE_OPTIONS}
                            multiple={false}
                            value={selectValue}
                            onUpdate={(val) => {
                                const nextMode = val[0];
                                if (nextMode && nextMode !== modeState) {
                                    setModeState(nextMode as Modes);
                                }
                            }}
                        />

                        {modeState === Modes.Hex && (
                            <HexInput
                                value={inputValue}
                                withAlpha={withAlpha}
                                onChange={setInputValue}
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
