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
};
export const ColorDisplay = React.forwardRef<HTMLDivElement, ColorDisplayProps>(
    ({hsva, withAlpha, size = 'm', compact, onClick, onColorChange}, ref) => {
        const [inputValue, setInputValue] = React.useState(() =>
            getTextValueByMode(hsva, Modes.Hex, withAlpha),
        );

        React.useEffect(() => {
            setInputValue(getTextValueByMode(hsva, Modes.Hex, withAlpha));
        }, [hsva, withAlpha]);

        const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
        }, []);

        const handleInputBlur = React.useCallback(() => {
            try {
                const newHsva = convertSelectedModeColorToHsva(inputValue, Modes.Hex, withAlpha);

                onColorChange?.(newHsva);
            } catch {
                setInputValue(getTextValueByMode(hsva, Modes.Hex, withAlpha));
            }
        }, [inputValue, withAlpha, onColorChange, hsva]);

        return (
            <div className={b('picker-wrapper', {compact, size, alpha: withAlpha})} ref={ref}>
                <div className={b('picker-handlers')}>
                    {compact ? (
                        <button
                            type="button"
                            className={b('color-swatch', {size})}
                            onClick={onClick}
                            style={{
                                backgroundColor: hsvaToRgbaString(hsva),
                            }}
                        />
                    ) : (
                        <TextInput
                            size={size}
                            startContent={
                                <button
                                    type="button"
                                    className={b('color-swatch', {size})}
                                    onClick={onClick}
                                    style={{
                                        backgroundColor: hsvaToRgbaString(hsva),
                                    }}
                                />
                            }
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                        />
                    )}
                </div>
            </div>
        );
    },
);

ColorDisplay.displayName = 'ColorDisplay';
