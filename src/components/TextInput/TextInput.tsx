import React from 'react';
import {block} from '../utils/cn';
import {useForkRef} from '../utils/useForkRef';
import {TextAreaControl} from './TextAreaControl/TextAreaControl';
import {InputControl} from './InputControl/InputControl';
import {Icon} from '../Icon';
import {CrossIcon} from '../icons/CrossIcon';
import {TextInputProps, TextInputView, TextInputSize, TextInputPin, TextInputState} from './types';
import './TextInput.scss';

export type {TextInputProps, TextInputView, TextInputSize, TextInputPin};

const b = block('text-input');

const getTextInputState = (
    args: Pick<TextInputProps, 'error'> = {},
): TextInputState | undefined => {
    const {error} = args;

    return error ? 'error' : undefined;
};

const prepareAutoComplete = (autoComplete: TextInputProps['autoComplete']): string | undefined => {
    if (typeof autoComplete === 'boolean') {
        return autoComplete ? 'on' : 'off';
    } else {
        return autoComplete;
    }
};

export const TextInput = React.forwardRef<HTMLSpanElement, TextInputProps>(function TextInput(
    props,
    ref,
) {
    const {
        view = 'normal',
        size = 'm',
        pin = 'round-round',
        name,
        value,
        defaultValue,
        disabled = false,
        multiline = false,
        hasClear = false,
        error,
        autoComplete,
        onUpdate,
        onChange,
        id,
        tabIndex,
        style,
        className,
        qa,
    } = props;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
    const innerControlRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>(null);
    const [hasVerticalScrollbar, setHasVerticalScrollbar] = React.useState(false);

    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : uncontrolledValue;

    const handleRef = useForkRef(props.controlRef, innerControlRef);

    React.useEffect(() => {
        const control = innerControlRef.current;

        if (control && multiline) {
            const currHasVerticalScrollbar = control.scrollHeight > control.clientHeight;

            if (hasVerticalScrollbar !== currHasVerticalScrollbar) {
                setHasVerticalScrollbar(currHasVerticalScrollbar);
            }
        }
    }, [multiline, inputValue, hasVerticalScrollbar]);

    const state = React.useMemo(() => getTextInputState({error}), [error]);

    const handleClear = (event: React.MouseEvent<HTMLSpanElement>) => {
        const control = innerControlRef.current;

        if (control) {
            control.focus();

            const syntheticEvent = Object.create(event);
            syntheticEvent.target = control;
            syntheticEvent.currentTarget = control;

            control.value = '';

            if (onChange) {
                onChange(syntheticEvent);
            }

            if (onUpdate) {
                onUpdate('');
            }
        }

        if (!isControlled) {
            setUncontrolledValue('');
        }
    };

    const isErrorMsgVisible = typeof error === 'string';
    const isClearControlVisible = Boolean(hasClear && !disabled && inputValue);

    const commonProps = {
        id,
        tabIndex,
        name,
        onChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
            const newValue = event.target.value;
            if (!isControlled) {
                setUncontrolledValue(newValue);
            }
            if (onChange) {
                onChange(event);
            }
            if (onUpdate) {
                onUpdate(newValue);
            }
        },
        autoComplete: prepareAutoComplete(autoComplete),
    };

    return (
        <span
            ref={ref}
            style={style}
            className={b(
                {
                    view,
                    size,
                    pin: view === 'clear' ? undefined : pin,
                    disabled,
                    state,
                    'has-clear': hasClear,
                    'has-scrollbar': hasVerticalScrollbar,
                },
                className,
            )}
            data-qa={qa}
        >
            {props.multiline ? (
                <TextAreaControl {...props} {...commonProps} controlRef={handleRef} />
            ) : (
                <InputControl {...props} {...commonProps} controlRef={handleRef} />
            )}

            {isErrorMsgVisible && <div className={b('error')}>{error}</div>}
            {hasClear && (
                <span
                    role="button"
                    className={b('clear', {visible: isClearControlVisible})}
                    onClick={handleClear}
                >
                    <Icon data={CrossIcon} />
                </span>
            )}
        </span>
    );
});
