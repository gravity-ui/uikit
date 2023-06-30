import React from 'react';

import {TextInput} from '../../../TextInput';
import {blockNew as block} from '../../../utils/cn';
import type {SelectProps} from '../../types';
import type {SelectFilterRef} from '../../types-misc';

import './SelectFilter.scss';

const b = block('select-filter');

type SelectFilterProps = {
    onChange: (filter: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    renderFilter?: SelectProps['renderFilter'];
    size: NonNullable<SelectProps['size']>;
    value: string;
    placeholder?: string;
};

export const SelectFilter = React.forwardRef<SelectFilterRef, SelectFilterProps>((props, ref) => {
    const {onChange, onKeyDown, renderFilter, size, value, placeholder} = props;
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(
        ref,
        () => ({
            focus: () => inputRef.current?.focus({preventScroll: true}),
        }),
        [],
    );

    return (
        <div className={b()}>
            {renderFilter ? (
                renderFilter({onChange, onKeyDown, value, ref: inputRef})
            ) : (
                <TextInput
                    controlRef={inputRef}
                    controlProps={{className: b('input'), size: 1}}
                    size={size}
                    value={value}
                    placeholder={placeholder}
                    onUpdate={onChange}
                    onKeyDown={onKeyDown}
                />
            )}
        </div>
    );
});

SelectFilter.displayName = 'SelectFilter';
