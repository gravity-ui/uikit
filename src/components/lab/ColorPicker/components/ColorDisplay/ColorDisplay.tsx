import * as React from 'react';

import {hsvaToRgbaString} from '@uiw/react-color';
import type {HsvaColor} from '@uiw/react-color';

import {Card} from '../../../../Card';
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
            <Card
                view={'outlined'}
                className={b('picker-wrapper', {alpha: withAlpha, size, compact})}
                ref={ref}
            >
                <div className={b('picker-handlers')}>
                    <button
                        type="button"
                        className={b('color-swatch', {size})}
                        onClick={onClick}
                        style={{
                            backgroundColor: hsvaToRgbaString(hsva),
                        }}
                    />
                    {!compact && (
                        <TextInput
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            size={size}
                            view={'clear'}
                        />
                    )}
                </div>
            </Card>
        );
    },
);

ColorDisplay.displayName = 'ColorDisplay';
