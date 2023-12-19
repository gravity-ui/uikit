import React from 'react';

import {TriangleExclamation} from '@gravity-ui/icons';

import {useForkRef, useUniqId} from '../../../hooks';
import {useElementSize} from '../../../hooks/private';
import {Icon} from '../../Icon';
import {Popover} from '../../Popover';
import {block} from '../../utils/cn';
import {ClearButton, mapTextInputSizeToButtonSize} from '../common';
import {OuterAdditionalContent} from '../common/OuterAdditionalContent/OuterAdditionalContent';
import type {
    BaseInputControlProps,
    InputControlPin,
    InputControlSize,
    InputControlView,
} from '../types';
import {
    CONTROL_ERROR_ICON_QA,
    errorPropsMapper,
    getInputControlState,
    prepareAutoComplete,
} from '../utils';

import {AdditionalContent} from './AdditionalContent';
import {TextInputControl} from './TextInputControl';

import './TextInput.scss';

const b = block('text-input');

export type TextInputProps = BaseInputControlProps<HTMLInputElement> & {
    /** The control's [type](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types) */
    type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
    /** The control's html attributes */
    controlProps?: React.InputHTMLAttributes<HTMLInputElement>;
    /** Help text rendered to the left of the input node */
    label?: string;
    /** User`s node rendered before label and input node
     * @deprecated use `startContent` instead
     */
    leftContent?: React.ReactNode;
    /** User`s node rendered after input node and clear button
     * @deprecated use `endContent` instead
     */
    rightContent?: React.ReactNode;
    /** User`s node rendered before label and input node */
    startContent?: React.ReactNode;
    /** User`s node rendered after input node and clear button */
    endContent?: React.ReactNode;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
};
export type TextInputPin = InputControlPin;
export type TextInputSize = InputControlSize;
export type TextInputView = InputControlView;

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
        hasClear = false,
        error,
        errorMessage: errorMessageProp,
        errorPlacement: errorPlacementProp = 'outside',
        validationState: validationStateProp,
        autoComplete,
        id: originalId,
        tabIndex,
        style,
        className,
        qa,
        controlProps: originalControlProps,
        leftContent,
        rightContent,
        startContent = leftContent,
        endContent = rightContent,
        note,
        onUpdate,
        onChange,
    } = props;

    const {errorMessage, errorPlacement, validationState} = errorPropsMapper({
        error,
        errorMessage: errorMessageProp,
        errorPlacement: errorPlacementProp,
        validationState: validationStateProp,
    });

    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
    const innerControlRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>(null);
    const handleRef = useForkRef(props.controlRef, innerControlRef);
    const labelRef = React.useRef<HTMLLabelElement>(null);
    const startContentRef = React.useRef<HTMLDivElement>(null);
    const state = getInputControlState(validationState);

    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : uncontrolledValue;
    const isLabelVisible = Boolean(label);
    const isErrorMsgVisible =
        validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'outside';
    const isErrorIconVisible =
        validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'inside';
    const isClearControlVisible = Boolean(hasClear && !disabled && inputValue);
    const isStartContentVisible = Boolean(startContent);
    const isEndContentVisible = Boolean(endContent);
    const isAutoCompleteOff =
        isLabelVisible && !originalId && !name && typeof autoComplete === 'undefined';

    const innerId = useUniqId();
    const id = isLabelVisible ? originalId || innerId : originalId;

    const labelSize = useElementSize(isLabelVisible ? labelRef : null, size);
    const startContentSize = useElementSize(isStartContentVisible ? startContentRef : null, size);

    const errorMessageId = useUniqId();
    const noteId = useUniqId();
    const ariaDescribedBy = [
        originalControlProps?.['aria-describedby'],
        note ? noteId : undefined,
        isErrorMsgVisible ? errorMessageId : undefined,
    ]
        .filter(Boolean)
        .join(' ');

    const controlProps: TextInputProps['controlProps'] = {
        ...originalControlProps,
        style: {
            ...originalControlProps?.style,
            ...(isLabelVisible && labelSize.width
                ? {paddingInlineStart: `${labelSize.width}px`}
                : {}),
        },
        'aria-invalid': validationState === 'invalid' || undefined,
        'aria-describedby': ariaDescribedBy || undefined,
    };
    const commonProps = {
        id,
        tabIndex,
        name,
        onChange(event: React.ChangeEvent<HTMLInputElement>) {
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

    const handleAdditionalContentClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        const hasActiveElement = event.currentTarget.contains(document.activeElement);
        const hasSelection = Boolean(document.getSelection()?.toString());

        if (!hasActiveElement && !hasSelection) {
            innerControlRef.current?.focus();
        }
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
                    'has-clear': isClearControlVisible,
                    'has-start-content': isStartContentVisible,
                    'has-end-content': isClearControlVisible || isEndContentVisible,
                },
                className,
            )}
            data-qa={qa}
        >
            <span className={b('content')}>
                {isStartContentVisible && (
                    <AdditionalContent
                        ref={startContentRef}
                        placement="start"
                        onClick={handleAdditionalContentClick}
                    >
                        {startContent}
                    </AdditionalContent>
                )}
                {isLabelVisible && (
                    <label
                        ref={labelRef}
                        style={{
                            insetInlineStart: isStartContentVisible
                                ? startContentSize.width
                                : undefined,
                            maxWidth: `calc(50% - ${startContentSize.width}px)`,
                        }}
                        className={b('label')}
                        title={label}
                        htmlFor={id}
                    >
                        {`${label}`}
                    </label>
                )}
                <TextInputControl {...props} {...commonProps} controlRef={handleRef} />
                {isClearControlVisible && (
                    <ClearButton
                        size={mapTextInputSizeToButtonSize(size)}
                        onClick={handleClear}
                        className={b('clear', {size})}
                    />
                )}
                {isEndContentVisible && (
                    <AdditionalContent placement="end" onClick={handleAdditionalContentClick}>
                        {endContent}
                    </AdditionalContent>
                )}
                {isErrorIconVisible && (
                    <Popover content={errorMessage}>
                        <span data-qa={CONTROL_ERROR_ICON_QA}>
                            <Icon
                                data={TriangleExclamation}
                                className={b('error-icon')}
                                size={size === 's' ? 12 : 16}
                            />
                        </span>
                    </Popover>
                )}
            </span>
            <OuterAdditionalContent
                note={note}
                errorMessage={isErrorMsgVisible ? errorMessage : null}
                noteId={noteId}
                errorMessageId={errorMessageId}
            />
        </span>
    );
});
