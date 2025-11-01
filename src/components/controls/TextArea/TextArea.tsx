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
import {
    CONTROL_ERROR_ICON_QA,
    errorPropsMapper,
    getInputControlState,
    prepareAutoComplete,
} from '../utils';

import {TextAreaControl} from './TextAreaControl';

import './TextArea.scss';

const b = block('text-area');

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
            errorPlacement = 'outside',
        } = props;

        const {errorMessage, validationState} = errorPropsMapper({
            error,
            errorMessage: errorMessageProp,
            validationState: validationStateProp,
        });

        const [inputValue, setInputValue] = useControlledState(value, defaultValue ?? '', onUpdate);
        const innerControlRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>(null);
        const fieldRef = useFormResetHandler({initialValue: inputValue, onReset: setInputValue});
        const handleRef = useForkRef(props.controlRef, innerControlRef, fieldRef);
        const [hasVerticalScrollbar, setHasVerticalScrollbar] = React.useState(false);
        const state = getInputControlState(validationState);
        const innerId = useUniqId();

        const isClearControlVisible = Boolean(hasClear && !disabled && !readOnly && inputValue);
        const isErrorMsgVisible =
            validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'outside';
        const isErrorIconVisible =
            validationState === 'invalid' && Boolean(errorMessage) && errorPlacement === 'inside';
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
                    {isClearControlVisible && (
                        <ClearButton
                            size={mapTextInputSizeToButtonSize(size)}
                            onClick={handleClear}
                            className={b('clear', {size})}
                        />
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
                    errorMessage={isErrorMsgVisible ? errorMessage : null}
                    errorMessageId={errorMessageId}
                    note={note}
                    noteId={noteId}
                />
            </span>
        );
    },
);
