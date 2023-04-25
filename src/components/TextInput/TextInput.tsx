import React from 'react';
import {block, modsClassName} from '../utils/cn';
import {useForkRef} from '../utils/useForkRef';
import {useElementSize} from '../utils/useElementSize';
import {useUniqId} from '../utils/useUniqId';
import {InputControl} from './InputControl/InputControl';
import {TextAreaControl} from './TextAreaControl/TextAreaControl';
import {ClearAction} from './ClearAction/ClearAction';
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

// eslint-disable-next-line complexity
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
        label,
        disabled = false,
        multiline = false,
        hasClear = false,
        error,
        autoComplete,
        onUpdate,
        onChange,
        id: originalId,
        tabIndex,
        style,
        className,
        qa,
        controlProps: originalControlProps,
    } = props;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
    const innerControlRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>(null);
    const labelRef = React.useRef<HTMLLabelElement>(null);
    const [hasVerticalScrollbar, setHasVerticalScrollbar] = React.useState(false);

    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : uncontrolledValue;
    const isLabelVisible = !multiline && Boolean(label);

    const innerId = useUniqId();
    const id = isLabelVisible ? originalId || innerId : originalId;

    const isAutoCompleteOff =
        isLabelVisible && !originalId && !name && typeof autoComplete === 'undefined';

    const handleRef = useForkRef(props.controlRef, innerControlRef);

    const labelSize = useElementSize(isLabelVisible ? labelRef : null, size);

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

    const controlProps: TextInputProps['controlProps'] = {
        ...originalControlProps,
        style: {
            ...originalControlProps?.style,
            ...(isLabelVisible && labelSize.width ? {paddingLeft: `${labelSize.width}px`} : {}),
        },
    };

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
        autoComplete: isAutoCompleteOff ? 'off' : prepareAutoComplete(autoComplete),
        controlProps,
    };

    return (
        <span
            ref={ref}
            style={style}
            className={b(
                {
                    view,
                    size,
                    disabled,
                    state,
                    pin: view === 'clear' ? undefined : pin,
                    'has-left-content': isLabelVisible,
                    'has-right-content': isClearControlVisible && !multiline,
                    'has-scrollbar': hasVerticalScrollbar,
                },
                className,
            )}
            data-qa={qa}
        >
            <span className={b('content')}>
                {isLabelVisible && (
                    <label ref={labelRef} className={b('label')} title={label} htmlFor={id}>
                        {`${label}`}
                    </label>
                )}
                {multiline ? (
                    <TextAreaControl {...props} {...commonProps} controlRef={handleRef} />
                ) : (
                    <InputControl {...props} {...commonProps} controlRef={handleRef} />
                )}
                {isClearControlVisible && (
                    <ClearAction
                        className={modsClassName(b('clear', {textarea: multiline}))}
                        size={size}
                        onClick={handleClear}
                    />
                )}
            </span>
            {isErrorMsgVisible && <div className={b('error')}>{error}</div>}
        </span>
    );
});
