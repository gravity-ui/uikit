import * as React from 'react';

import {hsvaToRgbaString} from '@uiw/react-color';
import type {HsvaColor} from '@uiw/react-color';

import {TextInput} from '../../../../controls';
import {b} from '../../constants';
import {Modes} from '../../types';
import {convertSelectedModeColorToHsva, getTextValueByMode} from '../../utils';

type ColorDisplayProps = {
    hsva: HsvaColor;
    withAlpha: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    compact?: boolean;
    onClick: () => void;
    onColorChange?: (color: HsvaColor) => void;
    disabled?: boolean;
};
export const ColorDisplay = React.forwardRef<HTMLDivElement, ColorDisplayProps>(
    ({hsva, withAlpha, size = 'm', compact, disabled, onClick, onColorChange}, ref) => {
        const [inputValue, setInputValue] = React.useState(() =>
            getTextValueByMode(hsva, Modes.Hex, withAlpha),
        );

        React.useEffect(() => {
            setInputValue(getTextValueByMode(hsva, Modes.Hex, withAlpha));
        }, [hsva, withAlpha]);

        const handleInputBlur = React.useCallback(() => {
            try {
                const newHsva = convertSelectedModeColorToHsva(inputValue, Modes.Hex, withAlpha);

                onColorChange?.(newHsva);
            } catch {
                setInputValue(getTextValueByMode(hsva, Modes.Hex, withAlpha));
            }
        }, [inputValue, withAlpha, onColorChange, hsva]);

        const swatch = (
            <button
                type="button"
                disabled={disabled}
                className={b('color-swatch', {size, disabled})}
                onClick={onClick}
                style={{backgroundColor: hsvaToRgbaString(hsva)}}
            />
        );

        return (
            <div className={b('picker-wrapper', {compact, size, alpha: withAlpha})} ref={ref}>
                <div className={b('picker-handlers')}>
                    {compact ? (
                        swatch
                    ) : (
                        <TextInput
                            disabled={disabled}
                            size={size}
                            startContent={swatch}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onBlur={handleInputBlur}
                        />
                    )}
                </div>
            </div>
        );
    },
);

ColorDisplay.displayName = 'ColorDisplay';
