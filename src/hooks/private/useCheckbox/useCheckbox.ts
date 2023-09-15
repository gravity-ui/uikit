import React from 'react';

import {useControlledState, useForkRef} from '../..';
import type {ControlProps, DataAttrProps} from '../../../components/types';
import {eventBroker} from '../../../components/utils/event-broker';

export type UseCheckboxProps = ControlProps;

export type UseCheckboxResult = {
    checked: boolean;
    inputProps: React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>;
    dataAttrProps: DataAttrProps;
};

export function useCheckbox({
    name,
    value,
    id,
    defaultChecked,
    checked,
    indeterminate,
    onUpdate,
    onChange,
    controlRef,
    controlProps,
    onFocus,
    onBlur,
    disabled,
    ...otherProps
}: UseCheckboxProps): UseCheckboxResult {
    const innerControlRef = React.useRef<HTMLInputElement>(null);
    const [isChecked, setCheckedState] = useControlledState(
        checked,
        defaultChecked ?? false,
        onUpdate,
    );

    const inputChecked = indeterminate ? false : checked;
    const inputAriaChecked = indeterminate ? 'mixed' : isChecked;

    const dataAttrProps = Object.fromEntries(
        Object.entries(otherProps).filter(([key]) => key.startsWith('data-')),
    ) as DataAttrProps;

    const handleRef = useForkRef(controlRef, innerControlRef);

    React.useLayoutEffect(() => {
        if (innerControlRef.current) {
            innerControlRef.current.indeterminate = Boolean(indeterminate);
        }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedState(event.target.checked);

        if (onChange) {
            onChange(event);
        }
    };

    const handleClickCapture = React.useCallback(
        (event: React.MouseEvent<HTMLInputElement> & {target: {checked?: boolean}}) => {
            eventBroker.publish({
                componentId: 'Checkbox',
                eventId: 'click',
                domEvent: event,
                meta: {
                    checked: event.target.checked,
                },
            });
        },
        [],
    );

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> &
        React.RefAttributes<HTMLInputElement> = {
        ...controlProps,
        name,
        value,
        id,
        onFocus,
        onBlur,
        disabled,
        type: 'checkbox',
        onChange: handleChange,
        onClickCapture: handleClickCapture,
        defaultChecked: defaultChecked,
        checked: inputChecked,
        'aria-checked': inputAriaChecked,
        ref: handleRef,
    };

    return {checked: isChecked, inputProps, dataAttrProps};
}
