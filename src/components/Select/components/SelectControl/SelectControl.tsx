import React from 'react';

import {ChevronDown} from '@gravity-ui/icons';
import isEmpty from 'lodash/isEmpty';

import {Icon} from '../../../Icon';
import type {CnMods} from '../../../utils/cn';
import {selectControlBlock, selectControlButtonBlock} from '../../constants';
import type {
    SelectProps,
    SelectRenderClearArgs,
    SelectRenderControl,
    SelectRenderControlProps,
} from '../../types';
import {SelectClear} from '../SelectClear/SelectClear';

import './SelectControl.scss';

type ControlProps = {
    toggleOpen: () => void;
    renderControl?: SelectRenderControl;
    view: NonNullable<SelectProps['view']>;
    size: NonNullable<SelectProps['size']>;
    pin: NonNullable<SelectProps['pin']>;
    selectedOptionsContent: React.ReactNode;
    name?: string;
    className?: string;
    qa?: string;
    label?: string;
    placeholder?: SelectProps['placeholder'];
    error?: SelectProps['error'];
    disabled?: boolean;
    value: SelectProps['value'];
    clearValue: () => void;
    hasClear?: boolean;
} & Omit<SelectRenderControlProps, 'onClick'>;

export const SelectControl = React.forwardRef<HTMLButtonElement, ControlProps>((props, ref) => {
    const {
        toggleOpen,
        clearValue,
        onKeyDown,
        renderControl,
        view,
        size,
        pin,
        selectedOptionsContent,
        className,
        qa,
        name,
        label,
        placeholder,
        error,
        open,
        disabled,
        value,
        hasClear,
    } = props;
    const showOptionsText = Boolean(selectedOptionsContent);
    const showPlaceholder = Boolean(placeholder && !showOptionsText);
    const hasValue = Array.isArray(value) && !isEmpty(value.filter(Boolean));

    const [isDisabledButtonAnimation, setIsDisabledButtonAnimation] = React.useState(false);

    const controlMods: CnMods = {
        open,
        size,
        pin,
        disabled,
        error: Boolean(error),
        'has-clear': hasClear,
        'no-active': isDisabledButtonAnimation,
        'has-value': hasValue,
    };

    const buttonMods: CnMods = {
        open,
        size,
        view,
        pin,
        disabled,
        error: Boolean(error),
    };

    const disableButtonAnimation = React.useCallback(() => {
        setIsDisabledButtonAnimation(true);
    }, []);
    const enableButtonAnimation = React.useCallback(() => {
        setIsDisabledButtonAnimation(false);
    }, []);
    const handleOnClearIconClick = React.useCallback(() => {
        // return animation on clear click
        setIsDisabledButtonAnimation(false);
        clearValue();
    }, [clearValue]);

    const renderClearIcon = (args: SelectRenderClearArgs) => {
        const hideOnEmpty = !value?.[0];
        if (!hasClear || !clearValue || hideOnEmpty || disabled) {
            return null;
        }
        return (
            <SelectClear
                size={size}
                onClick={handleOnClearIconClick}
                onMouseEnter={disableButtonAnimation}
                onMouseLeave={enableButtonAnimation}
                renderIcon={args.renderIcon}
            />
        );
    };

    if (renderControl) {
        return renderControl(
            {
                onKeyDown,
                onClick: toggleOpen,
                ref,
                open: Boolean(open),
                renderClear: (arg) => renderClearIcon(arg),
            },
            {value},
        );
    }

    return (
        <React.Fragment>
            <div className={selectControlBlock(controlMods)} role="group">
                <button
                    ref={ref}
                    className={selectControlButtonBlock(buttonMods, className)}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    name={name}
                    disabled={disabled}
                    onClick={toggleOpen}
                    onKeyDown={onKeyDown}
                    type="button"
                    data-qa={qa}
                >
                    {label && <span className={selectControlBlock('label')}>{label}</span>}
                    {showPlaceholder && (
                        <span className={selectControlBlock('placeholder')}>{placeholder}</span>
                    )}
                    {showOptionsText && (
                        <span className={selectControlBlock('option-text')}>
                            {selectedOptionsContent}
                        </span>
                    )}
                </button>
                {renderClearIcon({})}
                <Icon
                    className={selectControlBlock('chevron-icon', {disabled})}
                    data={ChevronDown}
                    aria-hidden="true"
                />
            </div>
            {typeof error === 'string' && (
                <div className={selectControlBlock('error')}>{error}</div>
            )}
        </React.Fragment>
    );
});

SelectControl.displayName = 'SelectControl';
