import React from 'react';

import type {ControlProps} from '../types';

import {eventBroker} from './event-broker';
import {useForkRef} from './useForkRef';
import {useUniqId} from './useUniqId';

export function useRadio({
    name,
    value,
    checked,
    defaultChecked,
    disabled,
    controlRef,
    controlProps,
    onUpdate,
    onChange,
    onFocus,
    onBlur,
    id,
}: ControlProps) {
    const controlId = useUniqId();
    const innerControlRef = React.useRef<HTMLInputElement>(null);
    const [checkedState, setCheckedState] = React.useState(defaultChecked ?? false);
    const isControlled = typeof checked === 'boolean';
    const isChecked = isControlled ? checked : checkedState;

    const handleRef = useForkRef(controlRef, innerControlRef);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setCheckedState(event.target.checked);
        }

        if (onChange) {
            onChange(event);
        }

        if (onUpdate) {
            onUpdate(event.target.checked);
        }
    };

    const onChangeCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
        eventBroker.publish({
            componentId: 'Radio',
            eventId: 'click',
            domEvent: event,
        });
    };

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> &
        React.RefAttributes<HTMLInputElement> = {
        ...controlProps,
        name: name || controlId,
        value,
        id,
        onFocus,
        onBlur,
        disabled,
        type: 'radio',
        onChange: handleChange,
        onChangeCapture: onChangeCapture,
        checked,
        defaultChecked: defaultChecked,
        'aria-checked': isChecked,
        ref: handleRef,
    };

    return {checked: isChecked, inputProps};
}
