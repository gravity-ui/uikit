import React from 'react';
import {block} from '../../../utils/cn';
import {TextInput} from '../../../TextInput';
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
    const wrapRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(
        ref,
        () => ({
            getHeight: () => wrapRef.current?.getBoundingClientRect().height,
            focus: () => inputRef.current?.focus({preventScroll: true}),
        }),
        [],
    );

    return (
        <div ref={wrapRef} className={b()}>
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
