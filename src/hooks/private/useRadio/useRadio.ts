import * as React from 'react';

import {useControlledState, useForkRef, useUniqId} from '../..';
import type {ControlProps, ControlValidationProps} from '../../../components/types';
import {eventBroker} from '../../../components/utils/event-broker';
import {useFormResetHandler} from '../useFormResetHandler';

export type UseRadioProps = ControlProps & ControlValidationProps;

export type UseRadioResult = {
    checked: boolean;
    inputProps: React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>;
};

export function useRadio({
    name,
    value,
    checked,
    defaultChecked,
    disabled,
    validationState,
    controlRef,
    controlProps,
    onUpdate,
    onChange,
    onFocus,
    onBlur,
    id,
}: UseRadioProps): UseRadioResult {
    const controlId = useUniqId();
    const innerControlRef = React.useRef<HTMLInputElement>(null);
    const [isChecked, setCheckedState] = useControlledState(
        checked,
        defaultChecked ?? false,
        onUpdate,
    );

    const formFieldRef = useFormResetHandler({initialValue: isChecked, onReset: setCheckedState});

    const handleRef = useForkRef(controlRef, innerControlRef, formFieldRef);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedState(event.target.checked);

        if (onChange) {
            onChange(event);
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
        'aria-invalid': validationState === 'invalid' || undefined,
        ref: handleRef,
    };

    return {checked: isChecked, inputProps};
}
