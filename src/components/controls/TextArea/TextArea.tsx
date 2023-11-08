import React from 'react';

import {useForkRef, useUniqId} from '../../../hooks';
import {blockNew} from '../../utils/cn';
import {ClearButton, mapTextInputSizeToButtonSize} from '../common';
import {OuterAdditionalContent} from '../common/OuterAdditionalContent/OuterAdditionalContent';
import type {
    BaseInputControlProps,
    InputControlPin,
    InputControlSize,
    InputControlView,
} from '../types';
import {errorPropsMapper, getInputControlState, prepareAutoComplete} from '../utils';

import {TextAreaControl} from './TextAreaControl';

import './TextArea.scss';

const b = blockNew('text-area');

export type TextAreaProps = BaseInputControlProps<HTMLTextAreaElement> & {
    /** The control's html attributes */
    controlProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    /** The number of visible text lines for the control. If not specified, the hight will be automatically calculated based on the content */
    rows?: number;
    /** The number of minimum visible text lines for the control. Ignored if `rows` is specified */
    minRows?: number;
    /** The number of maximum visible text lines for the control. Ignored if `rows` is specified */
    maxRows?: number;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
};
export type TextAreaPin = InputControlPin;
export type TextAreaSize = InputControlSize;
export type TextAreaView = InputControlView;

// eslint-disable-next-line complexity
export const TextArea = React.forwardRef<HTMLSpanElement, TextAreaProps>(function TextArea(
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
        errorMessage: errorMessageProp,
        validationState: validationStateProp,
        autoComplete,
        id: originalId,
        tabIndex,
        style,
        className,
        qa,
        controlProps,
        note,
        onUpdate,
        onChange,
    } = props;

    const {errorMessage, validationState} = errorPropsMapper({
        error,
        errorMessage: errorMessageProp,
        validationState: validationStateProp,
    });

    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
    const innerControlRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>(null);
    const [hasVerticalScrollbar, setHasVerticalScrollbar] = React.useState(false);
    const state = getInputControlState(validationState);
    const handleRef = useForkRef(props.controlRef, innerControlRef);
    const innerId = useUniqId();

    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : uncontrolledValue;
    const isErrorMsgVisible = validationState === 'invalid' && Boolean(errorMessage);
    const isClearControlVisible = Boolean(hasClear && !disabled && inputValue);
    const id = originalId || innerId;

    const errorMessageId = useUniqId();
    const noteId = useUniqId();
    const ariaDescribedBy = [
        controlProps?.['aria-describedby'],
        note ? noteId : undefined,
        isErrorMsgVisible ? errorMessageId : undefined,
    ]
        .filter(Boolean)
        .join(' ');

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
        controlProps: {
            ...controlProps,
            'aria-describedby': ariaDescribedBy || undefined,
            'aria-invalid': validationState === 'invalid' || undefined,
        },
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
            <OuterAdditionalContent
                errorMessage={isErrorMsgVisible ? errorMessage : null}
                errorMessageId={errorMessageId}
                note={note}
                noteId={noteId}
            />
        </span>
    );
});
