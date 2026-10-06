'use client';

import * as React from 'react';

import {useFormResetHandler} from '../../../../hooks/private';

interface HiddenSelectProps {
    name?: string;
    value: unknown[];
    /** The fields: an empty value without an option is not sent, the reset still restores it */
    selectedValues: unknown[];
    /** The value of a field is the key of a value */
    getKey: (value: unknown) => string;
    disabled?: boolean;
    form?: string;
    onReset: (value: unknown[]) => void;
}
//FIXME: current implementation is not accessible to screen readers and does not support browser autofill and
// form validation
export function HiddenSelect(props: HiddenSelectProps) {
    const {name, value, selectedValues, getKey, disabled, form, onReset} = props;

    const ref = useFormResetHandler({onReset, initialValue: value});

    if (!name || disabled) {
        return null;
    }

    if (selectedValues.length === 0) {
        return (
            <input ref={ref} type="hidden" name={name} value="" form={form} disabled={disabled} />
        );
    }

    return (
        <React.Fragment>
            {selectedValues.map(getKey).map((key, i) => (
                <input
                    key={key}
                    ref={i === 0 ? ref : undefined}
                    value={key}
                    type="hidden"
                    name={name}
                    form={form}
                    disabled={disabled}
                />
            ))}
        </React.Fragment>
    );
}
