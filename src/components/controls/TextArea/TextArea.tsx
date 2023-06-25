import React from 'react';

import {block} from '../../utils/cn';
import {useForkRef} from '../../utils/useForkRef';
import {useUniqId} from '../../utils/useUniqId';
import {ClearButton, mapTextInputSizeToButtonSize} from '../utility-components';
import type {TextInputState} from '../utility-types';

import {TextAreaControl} from './TextAreaControl';
import type {TextAreaProps} from './types';

import './TextArea.scss';

const b = block('text-area');

const getTextInputState = (args: Pick<TextAreaProps, 'error'> = {}): TextInputState | undefined => {
    const {error} = args;

    return error ? 'error' : undefined;
};

const prepareAutoComplete = (autoComplete: TextAreaProps['autoComplete']): string | undefined => {
    if (typeof autoComplete === 'boolean') {
        return autoComplete ? 'on' : 'off';
    } else {
        return autoComplete;
    }
};

// eslint-disable-next-line complexity
export const TextArea = React.forwardRef<HTMLSpanElement, TextAreaProps>(function TextInput(
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
        hasClear = false,
        error,
        autoComplete,
        id: originalId,
        tabIndex,
        style,
        className,
        qa,
        controlProps,
        onUpdate,
        onChange,
    } = props;
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
    const innerControlRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>(null);
    const [hasVerticalScrollbar, setHasVerticalScrollbar] = React.useState(false);
    const state = getTextInputState({error});
    const handleRef = useForkRef(props.controlRef, innerControlRef);
    const innerId = useUniqId();

    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : uncontrolledValue;
    const isErrorMsgVisible = typeof error === 'string';
    const isClearControlVisible = Boolean(hasClear && !disabled && inputValue);
    const id = originalId || innerId;

    const commonProps = {
        id,
        tabIndex,
        name,
        onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
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
        controlProps,
    };

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

    React.useEffect(() => {
        const control = innerControlRef.current;

        if (control) {
            const currHasVerticalScrollbar = control.scrollHeight > control.clientHeight;

            if (hasVerticalScrollbar !== currHasVerticalScrollbar) {
                setHasVerticalScrollbar(currHasVerticalScrollbar);
            }
        }
    }, [inputValue, hasVerticalScrollbar]);

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
                    'has-clear': isClearControlVisible,
                    'has-scrollbar': hasVerticalScrollbar,
                },
                className,
            )}
            data-qa={qa}
        >
            <span className={b('content')}>
                <TextAreaControl {...props} {...commonProps} controlRef={handleRef} />
                {isClearControlVisible && (
                    <ClearButton
                        className={b('clear', {size})}
                        size={mapTextInputSizeToButtonSize(size)}
                        onClick={handleClear}
                    />
                )}
            </span>
            {isErrorMsgVisible && <div className={b('error')}>{error}</div>}
        </span>
    );
});
