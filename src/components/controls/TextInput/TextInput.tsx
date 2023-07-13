import React from 'react';

import {TriangleExclamation} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {Popover} from '../../Popover';
import {block} from '../../utils/cn';
import {useElementSize} from '../../utils/useElementSize';
import {useForkRef} from '../../utils/useForkRef';
import {useUniqId} from '../../utils/useUniqId';
import {ClearButton, mapTextInputSizeToButtonSize} from '../common';
import type {
    BaseInputControlProps,
    InputControlPin,
    InputControlSize,
    InputControlView,
} from '../types';
import {errorPropsMapper, getInputControlState, prepareAutoComplete} from '../utils';

import {AdditionalContent} from './AdditionalContent';
import {TextInputControl} from './TextInputControl';

import './TextInput.scss';

const b = block('text-input');

export type TextInputProps = BaseInputControlProps<HTMLInputElement> & {
    /** The control's html attributes */
    controlProps?: React.InputHTMLAttributes<HTMLInputElement>;
    /** Help text rendered to the left of the input node */
    label?: string;
    /** User`s node rendered before label and input node */
    leftContent?: React.ReactNode;
    /** User`s node rendered after input node and clear button */
    rightContent?: React.ReactNode;
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
        errorMessage,
        errorPlacement = 'text',
        validationState,
        autoComplete,
        id: originalId,
        tabIndex,
        style,
        className,
        qa,
        controlProps: originalControlProps,
        leftContent,
        rightContent,
        onUpdate,
        onChange,
    } = props;

    const {errorMessageProp, errorPlacementProp, validationStateProp} = errorPropsMapper({
        error,
        errorMessage,
        errorPlacement,
        validationState,
    });

    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
    const innerControlRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>(null);
    const handleRef = useForkRef(props.controlRef, innerControlRef);
    const labelRef = React.useRef<HTMLLabelElement>(null);
    const leftContentRef = React.useRef<HTMLDivElement>(null);
    const state = getInputControlState(validationStateProp);

    const isControlled = value !== undefined;
    const inputValue = isControlled ? value : uncontrolledValue;
    const isLabelVisible = Boolean(label);
    const isErrorMsgVisible = Boolean(errorMessageProp) && errorPlacementProp === 'text';
    const isErrorIconVisible = Boolean(errorMessageProp) && errorPlacementProp === 'tooltip';
    const isClearControlVisible = Boolean(hasClear && !disabled && inputValue);
    const isLeftContentVisible = Boolean(leftContent);
    const isRightContentVisible = Boolean(rightContent);
    const isAutoCompleteOff =
        isLabelVisible && !originalId && !name && typeof autoComplete === 'undefined';

    const innerId = useUniqId();
    const id = isLabelVisible ? originalId || innerId : originalId;

    const labelSize = useElementSize(isLabelVisible ? labelRef : null, size);
    const leftContentSize = useElementSize(isLeftContentVisible ? leftContentRef : null, size);

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
                    'has-left-content': isLeftContentVisible,
                    'has-right-content': isClearControlVisible || isRightContentVisible,
                },
                className,
            )}
            data-qa={qa}
        >
            <span className={b('content')}>
                {isLeftContentVisible && (
                    <AdditionalContent
                        ref={leftContentRef}
                        placement="left"
                        onClick={handleAdditionalContentClick}
                    >
                        {leftContent}
                    </AdditionalContent>
                )}
                {isLabelVisible && (
                    <label
                        ref={labelRef}
                        style={{
                            left: isLeftContentVisible ? leftContentSize.width : undefined,
                            maxWidth: `calc(50% - ${leftContentSize.width}px)`,
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
                    <ClearButton size={mapTextInputSizeToButtonSize(size)} onClick={handleClear} />
                )}
                {isRightContentVisible && (
                    <AdditionalContent placement="right" onClick={handleAdditionalContentClick}>
                        {rightContent}
                    </AdditionalContent>
                )}
                {isErrorIconVisible && (
                    <Popover content={errorMessageProp}>
                        <Icon
                            data={TriangleExclamation}
                            className={b('error-icon')}
                            size={size === 's' ? 12 : 16}
                        />
                    </Popover>
                )}
            </span>
            {isErrorMsgVisible && <div className={b('error')}>{errorMessageProp}</div>}
        </span>
    );
});
