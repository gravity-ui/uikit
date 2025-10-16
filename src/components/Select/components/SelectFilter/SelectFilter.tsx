'use client';

import * as React from 'react';

import {TextInput} from '../../../controls';
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
    popupId: string;
    activeIndex?: number;
};

const style = {
    padding: '4px 4px 0',
};

export const SelectFilter = React.forwardRef<SelectFilterRef, SelectFilterProps>((props, ref) => {
    const {onChange, onKeyDown, renderFilter, size, value, placeholder, popupId, activeIndex} =
        props;
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(
        ref,
        () => ({
            focus: () => inputRef.current?.focus({preventScroll: true}),
        }),
        [],
    );

    const {t} = i18n.useTranslation();

    const inputProps: SelectFilterInputProps = {
        value,
        placeholder,
        size: 1,
        onKeyDown,
        onChange: (e) => {
            onChange(e.target.value);
        },
        'aria-label': t('label_filter'),
        'aria-controls': popupId,
        'aria-activedescendant':
            activeIndex === undefined ? undefined : `${popupId}-item-${activeIndex}`,
    };

    if (renderFilter) {
        return renderFilter({onChange, onKeyDown, value, ref: inputRef, style, inputProps});
    }

    return (
        <div className={b()} style={style}>
            <TextInput
                controlRef={inputRef}
                controlProps={{
                    className: b('input'),
                    size: 1,
                    'aria-label': inputProps['aria-label'],
                    'aria-controls': inputProps['aria-controls'],
                    'aria-activedescendant': inputProps['aria-activedescendant'],
                }}
                size={size}
                value={value}
                placeholder={placeholder}
                onUpdate={onChange}
                onKeyDown={onKeyDown}
                qa={SelectQa.FILTER_INPUT}
            />
        </div>
    );
});

SelectFilter.displayName = 'SelectFilter';
