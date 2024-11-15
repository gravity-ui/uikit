'use client';

import React from 'react';

import {Eye, EyeSlash} from '@gravity-ui/icons';

import {useControlledState} from '../../../hooks';
import {ActionTooltip} from '../../ActionTooltip';
import {Button} from '../../Button';
import {ClipboardButton} from '../../ClipboardButton';
import {Icon} from '../../Icon';
import {block} from '../../utils/cn';
import {TextInput} from '../TextInput';
import type {TextInputProps} from '../TextInput';

import {i18n} from './i18n';
import {getActionButtonSizeAndIconSize} from './utils';

import './PasswordInput.scss';

const b = block('password-input');

export type PasswordInputProps = Omit<TextInputProps, 'type'> & {
    /** Show copy button */
    showCopyButton?: boolean;
    /** Show reveal button */
    showRevealButton?: boolean;
    /** Determines whether to display the tooltip for the copy button */
    showCopyTooltip?: boolean;
    /** Determines whether to display the tooltip for the reveal button */
    showRevealTooltip?: boolean;
    /** Determines the visibility state of the password input field */
    revealValue?: boolean;
    /** A callback function that is invoked whenever the revealValue state changes */
    onRevealValueUpdate?: (value: boolean) => void;
};

export const PasswordInput = (props: PasswordInputProps) => {
    const {
        autoComplete,
        controlProps,
        endContent,
        rightContent,
        showCopyButton = false,
        showCopyTooltip = false,
        showRevealButton = false,
        showRevealTooltip = false,
        size = 'm',
    } = props;

    const [inputValue, setInputValue] = useControlledState(
        props.value,
        props.defaultValue ?? '',
        props.onUpdate,
    );

    const [revealValue, setRevealValue] = useControlledState(
        props.revealValue,
        false,
        props.onRevealValueUpdate,
    );

    const {actionButtonSize, iconSize} = getActionButtonSizeAndIconSize(size);

    const additionalEndContent = (
        <React.Fragment>
            {endContent || rightContent}
            {inputValue && showCopyButton && !props.disabled ? (
                <ClipboardButton
                    view="flat-secondary"
                    text={inputValue}
                    hasTooltip={showCopyTooltip}
                    size={actionButtonSize}
                    className={b('copy-button')}
                />
            ) : null}
            {showRevealButton ? (
                <ActionTooltip
                    disabled={!showRevealTooltip}
                    title={revealValue ? i18n('label_hide-password') : i18n('label_show-password')}
                >
                    <Button
                        view="flat-secondary"
                        disabled={props.disabled}
                        onClick={() => setRevealValue(!revealValue)}
                        size={actionButtonSize}
                        extraProps={{
                            'aria-label': revealValue
                                ? i18n('label_hide-password')
                                : i18n('label_show-password'),
                            onMouseDown: (event: React.SyntheticEvent) => event.preventDefault(),
                        }}
                    >
                        <Icon data={revealValue ? EyeSlash : Eye} size={iconSize} />
                    </Button>
                </ActionTooltip>
            ) : null}
        </React.Fragment>
    );

    return (
        <TextInput
            {...props}
            type={revealValue ? 'text' : 'password'}
            unstable_endContent={additionalEndContent}
            autoComplete={autoComplete ? autoComplete : 'new-password'}
            controlProps={{
                ...controlProps,
                className: b('input-control', controlProps?.className),
            }}
            value={inputValue}
            onUpdate={setInputValue}
        />
    );
};
