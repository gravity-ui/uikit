'use client';

import * as React from 'react';

import {TextInput} from '../../../controls';
import type {ListFocusOwner} from '../../../lab/List';
import {block} from '../../../utils/cn';
import {SelectQa} from '../../constants';
import i18n from '../../i18n';
import type {SelectFilterInputProps, SelectProps} from '../../types';
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
    /** The same owner the trigger takes its props from: the input is where the focus lives while the popup is open */
    focusOwner: ListFocusOwner;
    open: boolean;
};

const style = {
    padding: '4px 4px 0',
};

export const SelectFilter = React.forwardRef<SelectFilterRef, SelectFilterProps>((props, ref) => {
    const {onChange, onKeyDown, renderFilter, size, value, placeholder, focusOwner, open} = props;
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(
        ref,
        () => ({
            focus: () => inputRef.current?.focus({preventScroll: true}),
        }),
        [],
    );

    const {t} = i18n.useTranslation();

    const ownerProps = focusOwner.getInputProps({
        onKeyDown,
        'aria-label': t('label_filter'),
        'aria-autocomplete': 'list',
    });

    // `value`, `placeholder`, `size` and `onChange` are props of an input rather than of any
    // element, so they go past the owner. `aria-expanded` too: the owner reports whether a list is
    // connected, and a filter that matches nothing unmounts the list while the popup stays open
    const inputProps: SelectFilterInputProps = {
        ...ownerProps,
        'aria-expanded': open,
        value,
        placeholder,
        size: 1,
        onChange: (e) => {
            onChange(e.target.value);
        },
    };

    if (renderFilter) {
        return renderFilter({
            onChange,
            // The deprecated argument keeps the keyboard of the list: a custom filter that has not
            // moved to `inputProps` still navigates the options
            onKeyDown: ownerProps.onKeyDown ?? onKeyDown,
            value,
            ref: inputRef,
            style,
            inputProps,
        });
    }

    return (
        <div className={b()} style={style}>
            <TextInput
                controlRef={inputRef}
                controlProps={{
                    className: b('input'),
                    size: 1,
                    role: inputProps.role,
                    'aria-label': inputProps['aria-label'],
                    'aria-controls': inputProps['aria-controls'],
                    'aria-activedescendant': inputProps['aria-activedescendant'],
                    'aria-expanded': inputProps['aria-expanded'],
                    'aria-autocomplete': inputProps['aria-autocomplete'],
                }}
                size={size}
                value={value}
                placeholder={placeholder}
                onUpdate={onChange}
                onKeyDown={inputProps.onKeyDown}
                qa={SelectQa.FILTER_INPUT}
            />
        </div>
    );
});

SelectFilter.displayName = 'SelectFilter';
