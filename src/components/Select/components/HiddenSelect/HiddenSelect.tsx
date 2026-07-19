'use client';

import * as React from 'react';

import {useFormResetHandler} from '../../../../hooks/private';
import {getOptionValueKey, serializeOptionValue} from '../../utils';

interface HiddenSelectProps<V> {
    name?: string;
    value: V[];
    disabled?: boolean;
    form?: string;
    onReset: (value: V[]) => void;
}
//FIXME: current implementation is not accessible to screen readers and does not support browser autofill and
// form validation
export function HiddenSelect<V>(props: HiddenSelectProps<V>) {
    const {name, value, disabled, form, onReset} = props;

    const ref = useFormResetHandler({onReset, initialValue: value});

    if (!name || disabled) {
        return null;
    }

    if (value.length === 0) {
        return (
            <input ref={ref} type="hidden" name={name} value="" form={form} disabled={disabled} />
        );
    }

    return (
        <React.Fragment>
            {value.map((v, i) => (
                <input
                    key={getOptionValueKey(v)}
                    ref={i === 0 ? ref : undefined}
                    value={serializeOptionValue(v)}
                    type="hidden"
                    name={name}
                    form={form}
                    disabled={disabled}
                />
            ))}
        </React.Fragment>
    );
}
