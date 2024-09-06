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
    /** Disable the tooltip for the copy button. The tooltip will not be displayed */
    hasCopyTooltip?: boolean;
    /** Disable the tooltip for the reveal button. The tooltip will not be displayed */
    hasRevealTooltip?: boolean;
};

export const PasswordInput = (props: PasswordInputProps) => {
    const {
        autoComplete,
        showCopyButton,
        rightContent,
        endContent,
        showRevealButton,
        size = 'm',
        hasCopyTooltip = true,
        hasRevealTooltip = true,
        controlProps,
    } = props;

    const [inputValue, setInputValue] = useControlledState(
        props.value,
        props.defaultValue ?? '',
        props.onUpdate,
    );

    const [hideValue, setHideValue] = React.useState(true);

    const {actionButtonSize, iconSize} = getActionButtonSizeAndIconSize(size);

    const onClick = () => {
        setHideValue((hideValue) => !hideValue);
    };

    const additionalEndContent = (
        <React.Fragment>
            {endContent || rightContent}
            {inputValue && showCopyButton ? (
                <ClipboardButton
                    view="flat-secondary"
                    text={inputValue}
                    hasTooltip={hasCopyTooltip}
                    size={actionButtonSize}
                    className={b('copy-button')}
                />
            ) : null}
            {showRevealButton ? (
                <ActionTooltip
                    disabled={!hasRevealTooltip}
                    title={hideValue ? i18n('label_show-password') : i18n('label_hide-password')}
                >
                    <Button
                        view="flat-secondary"
                        onClick={onClick}
                        size={actionButtonSize}
                        extraProps={{
                            'aria-label': hideValue
                                ? i18n('label_show-password')
                                : i18n('label_hide-password'),
                        }}
                    >
                        <Icon data={hideValue ? Eye : EyeSlash} size={iconSize} />
                    </Button>
                </ActionTooltip>
            ) : null}
        </React.Fragment>
    );

    return (
        <TextInput
            {...props}
            type={hideValue ? 'password' : 'text'}
            endContent={additionalEndContent}
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
