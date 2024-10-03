'use client';

import React from 'react';

import {TriangleExclamation} from '@gravity-ui/icons';

import {useControlledState, useForkRef, useUniqId} from '../../../hooks';
import {useElementSize, useFormResetHandler} from '../../../hooks/private';
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
    /** User`s node rendered after input node, clear button and error icon.
     * This prop will replace current `endContent` prop in next major
     */
    unstable_endContent?: React.ReactNode;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
};
export type TextInputPin = InputControlPin;
export type TextInputSize = InputControlSize;
export type TextInputView = InputControlView;

export const TextInput = React.forwardRef<HTMLSpanElement, TextInputProps>(
    // eslint-disable-next-line complexity
    function TextInput(props, ref) {
        const {
            view = 'normal',
            size = 'm',
            pin = 'round-round',
            name,
            value,
            defaultValue,
            label,
            disabled,
            readOnly,
            hasClear = false,
            error,
            errorMessage: errorMessageProp,
            errorPlacement: errorPlacementProp = 'outside',
            validationState: validationStateProp,
            autoComplete,
            id: idProp,
            tabIndex,
            style,
            className,
            qa,
            controlProps: controlPropsProp,
            leftContent,
            rightContent,
            startContent = leftContent,
            endContent = rightContent,
            unstable_endContent: unstableEndContent,
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

        const [inputValue, setInputValue] = useControlledState(value, defaultValue ?? '', onUpdate);
        const innerControlRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>(null);
        const fieldRef = useFormResetHandler({initialValue: inputValue, onReset: setInputValue});
        const handleRef = useForkRef(props.controlRef, innerControlRef, fieldRef);
        const labelRef = React.useRef<HTMLLabelElement>(null);
        const startContentRef = React.useRef<HTMLDivElement>(null);
        const state = getInputControlState(validationState);

        const isLabelVisible = Boolean(label);
        const isErrorMsgVisible =
            validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'outside';
        const isErrorIconVisible =
            validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'inside';
        const isClearControlVisible = Boolean(hasClear && !disabled && !readOnly && inputValue);
        const isStartContentVisible = Boolean(startContent);
        const isUnstableEndContentVisible = Boolean(unstableEndContent);
        const isEndContentVisible = Boolean(endContent) && !isUnstableEndContentVisible;
        const isAutoCompleteOff =
            isLabelVisible && !idProp && !name && typeof autoComplete === 'undefined';

        const innerId = useUniqId();
        const id = isLabelVisible ? idProp || innerId : idProp;

        const labelSize = useElementSize(isLabelVisible ? labelRef : null, size);
        const startContentSize = useElementSize(
            isStartContentVisible ? startContentRef : null,
            size,
        );

        const errorMessageId = useUniqId();
        const noteId = useUniqId();
        const ariaDescribedBy = [
            controlPropsProp?.['aria-describedby'],
            note ? noteId : undefined,
            isErrorMsgVisible ? errorMessageId : undefined,
        ]
            .filter(Boolean)
            .join(' ');

        const controlProps: TextInputProps['controlProps'] = {
            ...controlPropsProp,
            style: {
                ...controlPropsProp?.style,
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
                setInputValue(event.target.value);

                if (onChange) {
                    onChange(event);
                }
            },
            autoComplete: isAutoCompleteOff ? 'off' : prepareAutoComplete(autoComplete),
            controlProps,
        };

        const handleClear = (event: React.MouseEvent<HTMLSpanElement>) => {
            setInputValue('');

            const control = innerControlRef.current;
            if (control) {
                const syntheticEvent = Object.create(event);
                syntheticEvent.target = control;
                syntheticEvent.currentTarget = control;

                control.value = '';

                if (onChange) {
                    onChange(syntheticEvent);
                }
            }
        };

        const handleAdditionalContentClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
            const needActivateInput =
                !event.currentTarget.contains(document.activeElement) &&
                event.currentTarget.contains(event.target as HTMLElement);
            const hasSelection = Boolean(document.getSelection()?.toString());

            if (needActivateInput && !hasSelection) {
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
                        'has-end-content':
                            isClearControlVisible ||
                            isEndContentVisible ||
                            isUnstableEndContentVisible,
                        'has-unstable-end-content': isUnstableEndContentVisible,
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
                    {isUnstableEndContentVisible && (
                        <AdditionalContent placement="end" onClick={handleAdditionalContentClick}>
                            {unstableEndContent}
                        </AdditionalContent>
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
    },
);
