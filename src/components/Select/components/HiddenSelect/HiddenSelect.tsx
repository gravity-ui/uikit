'use client';

import * as React from 'react';

import {useFormResetHandler} from '../../../../hooks/private';

interface HiddenSelectProps {
    name?: string;
    value: string[];
    disabled?: boolean;
    form?: string;
    onReset: (value: string[]) => void;
}
//FIXME: current implementation is not accessible to screen readers and does not support browser autofill and
// form validation
export function HiddenSelect(props: HiddenSelectProps) {
    const {name, value, disabled, form, onReset} = props;

    const ref = useFormResetHandler({onReset, initialValue: value});

    if (!name || disabled) {
        return null;
    }

    if (value.length === 0) {
        return (
            <input
                ref={ref}
                type="hidden"
                name={name}
                value={value}
                form={form}
                disabled={disabled}
            />
        );
    }

    return (
        <React.Fragment>
            {value.map((v, i) => (
                <input
                    key={v}
                    ref={i === 0 ? ref : undefined}
                    value={v}
                    type="hidden"
                    name={name}
                    form={form}
                    disabled={disabled}
                />
            ))}
        </React.Fragment>
    );
}
