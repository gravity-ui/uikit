import * as React from 'react';

import {useForkRef} from '../../../hooks';
import {block} from '../../utils/cn';

import type {TextInputProps} from './TextInput';

type Props = Omit<TextInputProps, 'autoComplete' | 'controlProps'> & {
    autoComplete?: React.TextareaHTMLAttributes<HTMLInputElement>['autoComplete'];
    controlProps: NonNullable<TextInputProps['controlProps']>;
};

const b = block('text-input');

export function TextInputControl(props: Props) {
    const {
        controlProps,
        controlRef,
        type,
        disableWheelChange = false,
        name,
        id,
        tabIndex,
        autoComplete,
        placeholder,
        value,
        defaultValue,
        autoFocus,
        disabled,
        readOnly,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
        onKeyPress,
    } = props;

    const innerRef = React.useRef<HTMLInputElement>(null);
    const handleRef = useForkRef(controlRef, innerRef);

    React.useEffect(() => {
        const input = innerRef.current;

        if (!input || type !== 'number' || !disableWheelChange) {
            return undefined;
        }

        const handleWheel = (event: WheelEvent) => {
            if (
                !event.ctrlKey &&
                event.deltaY !== 0 &&
                input === input.ownerDocument.activeElement
            ) {
                input.blur();
            }
        };

        // Run before native stepping and scrolling, without cancelling the scroll gesture.
        input.addEventListener('wheel', handleWheel, {passive: false});

        return () => {
            input.removeEventListener('wheel', handleWheel);
        };
    }, [type, disableWheelChange]);

    return (
        <input
            {...controlProps}
            ref={handleRef}
            className={b('control', {type: 'input'}, controlProps.className)}
            type={type}
            name={name}
            id={id}
            tabIndex={tabIndex}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            disabled={disabled ?? controlProps.disabled}
            readOnly={readOnly ?? controlProps.readOnly}
        />
    );
}
