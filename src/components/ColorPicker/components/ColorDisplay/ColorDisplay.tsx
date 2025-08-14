import * as React from 'react';

import {hsvaToRgbaString} from '@uiw/react-color';
import type {HsvaColor} from '@uiw/react-color';

import {Button} from '../../../Button';
import {Card} from '../../../Card';
import {TextInput} from '../../../controls';
import {Flex} from '../../../layout';
import {b} from '../../constants';
import {Modes} from '../../types';
import {convertSelectedModeColorToHsva, getTextValueByMode} from '../../utils';

type ColorDisplayProps = {
    hsva: HsvaColor;
    onClick: () => void;
    onColorChange?: (color: HsvaColor) => void;
};
export const ColorDisplay = React.forwardRef<HTMLDivElement, ColorDisplayProps>(
    ({hsva, onClick, onColorChange}, ref) => {
        const [inputValue, setInputValue] = React.useState(() =>
            getTextValueByMode(hsva, Modes.Hex, false),
        );

        React.useEffect(() => {
            setInputValue(getTextValueByMode(hsva, Modes.Hex, false));
        }, [hsva]);

        const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
        }, []);

        const handleInputBlur = React.useCallback(() => {
            try {
                const newHsva = convertSelectedModeColorToHsva(inputValue, Modes.Hex, false);
                const updatedHsva = {...newHsva, a: hsva.a};

                onColorChange?.(updatedHsva);
            } catch {
                setInputValue(getTextValueByMode(hsva, Modes.Hex, false));
            }
        }, [inputValue, hsva.a, onColorChange, hsva]);

        return (
            <Card view={'outlined'} className={b('picker-wrapper')} ref={ref}>
                <Flex alignItems={'center'} gap={2}>
                    <Button size={'s'} className={b('underlay')} onClick={onClick}>
                        <div
                            className={b('overlay')}
                            style={{
                                backgroundColor: hsvaToRgbaString(hsva),
                            }}
                        />
                    </Button>
                    <TextInput
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        size="s"
                        view={'clear'}
                    />
                </Flex>
            </Card>
        );
    },
);

ColorDisplay.displayName = 'ColorDisplay';
