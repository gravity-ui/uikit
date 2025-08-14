import * as React from 'react';

import {EditableInput} from '@uiw/react-color';

import {Text} from '../../../Text';
import {TextInput} from '../../../controls';
import {b} from '../../constants';

type HexAlphaInputProps = {
    alpha: number;
    onChange: (alpha: number) => void;
};

const clamp = (value: number, min: number, max: number): number =>
    Math.max(min, Math.min(max, value));

export const HexAlphaInput = ({alpha, onChange}: HexAlphaInputProps) => {
    const alphaPercent = Math.round(alpha * 100);

    const handleAlphaChange = React.useCallback(
        (_evn: React.ChangeEvent<HTMLInputElement>, value: string | number) => {
            const numericValue = Number(value);
            const clampedValue = clamp(numericValue, 0, 100);
            onChange(clampedValue / 100);
        },
        [onChange],
    );

    const handleAlphaBlur = React.useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        const numericValue = Number(event.target.value);
        const clampedValue = clamp(numericValue, 0, 100);
        event.target.value = String(clampedValue);
    }, []);

    const renderInput = React.useCallback(
        (props: any) => (
            <TextInput
                onChange={props.onChange}
                value={String(props.value)}
                onBlur={props.onBlur}
                pin="clear-round"
                startContent={
                    <Text className={b('text')} color="secondary" variant="caption-1">
                        A
                    </Text>
                }
            />
        ),
        [],
    );

    return (
        <EditableInput
            className={b('input')}
            value={alphaPercent}
            style={{marginTop: 0}}
            onChange={handleAlphaChange}
            onBlur={handleAlphaBlur}
            label={undefined}
            renderInput={renderInput}
        />
    );
};
