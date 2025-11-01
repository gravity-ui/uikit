'use client';

import * as React from 'react';

import {TriangleExclamation} from '@gravity-ui/icons';

import {useControlledState, useForkRef, useUniqId} from '../../../hooks';
import {useFormResetHandler} from '../../../hooks/private';
import {Icon} from '../../Icon';
import {Popover} from '../../legacy';
import {block} from '../../utils/cn';
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

const b = block('text-area');

export type TextAreaProps = BaseInputControlProps<HTMLTextAreaElement> & {
    controlProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    rows?: number;
    minRows?: number;
    maxRows?: number;
    note?: React.ReactNode;
    /** Controls where error message is displayed */
    errorPlacement?: 'inside' | 'outside';
};

export type TextAreaPin = InputControlPin;
export type TextAreaSize = InputControlSize;
export type TextAreaView = InputControlView;

export const TextArea = React.forwardRef<HTMLSpanElement, TextAreaProps>(
    function TextArea(props, ref) {
        const {
            view = 'normal',
            size = 'm',
            pin = 'round-round',
            name,
            value,
            defaultValue,
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
            controlProps,
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
        const [hasVerticalScrollbar, setHasVerticalScrollbar] = React.useState(false);
        const state = getInputControlState(validationState);
        const innerId = useUniqId();

        const isErrorMsgVisible =
            validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'outside';
        const isErrorIconVisible =
            validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'inside';
        const isClearControlVisible = Boolean(hasClear && !disabled && !readOnly && inputValue);

        const id = idProp || innerId;
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
                setInputValue(event.target.value);
                if (onChange) {
                    onChange(event);
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
            }

            setInputValue('');
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
                        'has-error-icon': isErrorIconVisible,
                        'has-scrollbar': hasVerticalScrollbar,
                    },
                    className,
                )}
                data-qa={qa}
            >
                <span className={b('content')}>
                    <TextAreaControl {...props} {...commonProps} controlRef={handleRef} />

                    {(isErrorIconVisible || isClearControlVisible) && (
                        <span className={b('actions')}>
                            {isClearControlVisible && (
                                <ClearButton
                                    className={b('clear', {size})}
                                    size={mapTextInputSizeToButtonSize(size)}
                                    onClick={handleClear}
                                />
                            )}
                            {isErrorIconVisible && (
                                <Popover content={errorMessage}>
                                    <span className={b('error-icon')}>
                                        <Icon
                                            data={TriangleExclamation}
                                            size={size === 's' ? 12 : 16}
                                        />
                                    </span>
                                </Popover>
                            )}
                        </span>
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
    },
);
