import React from 'react';

import {ChevronDown} from '@gravity-ui/icons';
import isEmpty from 'lodash/isEmpty';

import {Icon} from '../../../Icon';
import type {CnMods} from '../../../utils/cn';
import {useForkRef} from '../../../utils/useForkRef';
import {selectControlBlock} from '../../constants';
import type {
    SelectClearProps,
    SelectProps,
    SelectRenderControl,
    SelectRenderControlProps,
} from '../../types';
import {SelectClear} from '../SelectClear/SelectClear';

import './SelectControl.scss';

type ControlProps = {
    toggleOpen: () => void;
    renderControl?: SelectRenderControl;
    renderClearIcon?: NonNullable<SelectClearProps['renderClearIcon']>;
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
    clearValue?: (e: React.MouseEvent) => void;
    hasClear?: boolean;
} & Omit<SelectRenderControlProps, 'onClick'>;

export const SelectControl = React.forwardRef<HTMLElement, ControlProps>((props, ref) => {
    const {
        toggleOpen,
        clearValue,
        onKeyDown,
        renderControl,
        renderClearIcon,
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
    const controlRef = React.useRef<HTMLElement>(null);
    const handleControlRef = useForkRef<HTMLElement>(ref, controlRef);
    const showOptionsText = Boolean(selectedOptionsContent);
    const showPlaceholder = Boolean(placeholder && !showOptionsText);
    const hasValue = Array.isArray(value) && !isEmpty(value.filter(Boolean));

    const [isDisabledButtonAnimation, setIsDisabledButtonAnimation] = React.useState(false);

    const mods: CnMods = {open, size, view, pin, disabled, error: Boolean(error), 'has-clear': hasClear, 'no-active': isDisabledButtonAnimation, 'has-value': hasValue};

    const disableButtonAnimation = React.useCallback(() => {
        setIsDisabledButtonAnimation(true);
    }, []);
    const enableButtonAnimation = React.useCallback(() => {
        setIsDisabledButtonAnimation(false);
    }, []);

    const renderClear = () => {
        const hideOnEmpty = !value || !value?.[0];
        if (!hasClear || !clearValue || hideOnEmpty || disabled) {
            return null;
        }
        return (
            <SelectClear
                size={size}
                onClick={clearValue}
                onMouseEnter={disableButtonAnimation}
                onMouseLeave={enableButtonAnimation}
                renderClearIcon={renderClearIcon}
            />
        );
    };

    if (renderControl) {
        return renderControl(
            {
                onKeyDown,
                onClick: toggleOpen,
                ref: handleControlRef,
                open: Boolean(open),
                renderClear,
            },
            {value},
        );
    }

    return (
        <React.Fragment>
            <button
                ref={handleControlRef as React.Ref<HTMLButtonElement>}
                className={selectControlBlock(mods, className)}
                aria-haspopup="listbox"
                aria-expanded={open}
                data-qa={qa}
                name={name}
                disabled={disabled}
                onClick={toggleOpen}
                onKeyDown={onKeyDown}
                type="button"
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
                {renderClear()}
                <Icon
                    className={selectControlBlock('chevron-icon', {disabled})}
                    data={ChevronDown}
                />
            </button>
            {typeof error === 'string' && (
                <div className={selectControlBlock('error')}>{error}</div>
            )}
        </React.Fragment>
    );
});

SelectControl.displayName = 'SelectControl';
