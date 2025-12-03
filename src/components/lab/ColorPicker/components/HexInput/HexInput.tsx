import * as React from 'react';

import {EditableInput} from '@uiw/react-color';

import {TextInput} from '../../../../controls';
import {b} from '../../constants';

type HexInputProps = {
    value: string;
    withAlpha: boolean;
    onChange: (value: string) => void;
    onBlur: () => void;
};

export const HexInput = ({value, withAlpha, onChange, onBlur}: HexInputProps) => {
    const handleInputChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        },
        [onChange],
    );

    const renderInput = (
        props: React.InputHTMLAttributes<HTMLInputElement>,
        ref: React.Ref<HTMLInputElement>,
    ) => (
        <TextInput
            {...props}
            /*
             * @uiw/react-color: disable EditableInput styles settings
             */
            style={undefined}
            ref={ref}
            defaultValue={props.defaultValue ? String(props.defaultValue) : ''}
            size={'m'}
            type={'text'}
            value={String(props.value)}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
    );

    return (
        <EditableInput
            value={value}
            onChange={handleInputChange}
            onBlur={onBlur}
            className={b('hex-input', {withAlpha})}
            renderInput={renderInput}
        />
    );
};
