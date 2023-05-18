import React from 'react';

import {ChevronDown} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import type {CnMods} from '../../../utils/cn';
import {useForkRef} from '../../../utils/useForkRef';
import {selectControlBlock} from '../../constants';
import type {SelectProps, SelectRenderControl, SelectRenderControlProps} from '../../types';
import {SelectClearIcon} from '../SelectClearIcon/SelectClearIcon';

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
    clearValue?: (e: React.MouseEvent) => void;
    hasClear?: boolean;
} & Omit<SelectRenderControlProps, 'onClick'>;

export const SelectControl = React.forwardRef<HTMLElement, ControlProps>((props, ref) => {
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
    const controlRef = React.useRef<HTMLElement>(null);
    const handleControlRef = useForkRef<HTMLElement>(ref, controlRef);
    const showOptionsText = Boolean(selectedOptionsContent);
    const showPlaceholder = Boolean(placeholder && !showOptionsText);
    const mods: CnMods = {open, size, view, pin, disabled, error: Boolean(error)};

    if (renderControl) {
        return renderControl(
            {
                onKeyDown,
                onClick: toggleOpen,
                ref: handleControlRef,
                open: Boolean(open),
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
                {hasClear && clearValue && (
                    <SelectClearIcon size={size} disabled={disabled} onClick={clearValue} />
                )}
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
