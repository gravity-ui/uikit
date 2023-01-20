import React from 'react';
import {useForkRef} from '../../../utils/useForkRef';
import type {CnMods} from '../../../utils/cn';
import {Icon} from '../../../Icon';
import {Chevron} from '../../../icons/Chevron';
import type {SelectProps} from '../../types';
import {selectControlBlock} from '../../constants';

import './SelectControl.scss';

type ControlProps = {
    setOpen: (nextOpen: boolean) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    renderControl?: SelectProps['renderControl'];
    view: NonNullable<SelectProps['view']>;
    size: NonNullable<SelectProps['size']>;
    pin: NonNullable<SelectProps['pin']>;
    selectedOptionsContent: React.ReactNode;
    name?: string;
    className?: string;
    qa?: string;
    label?: string;
    placeholder?: SelectProps['placeholder'];
    open?: boolean;
    disabled?: boolean;
};

export const SelectControl = React.forwardRef<HTMLElement, ControlProps>((props, ref) => {
    const {
        setOpen,
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
        open,
        disabled,
    } = props;
    const controlRef = React.useRef<HTMLElement>(null);
    const handleControlRef = useForkRef<HTMLElement>(ref, controlRef);
    const showOptionsText = Boolean(selectedOptionsContent);
    const showPlaceholder = Boolean(placeholder && !showOptionsText);
    const mods: CnMods = {
        view,
        size,
        pin,
        disabled,
        open,
    };

    const handleClick = React.useCallback(() => setOpen(!open), [setOpen, open]);

    if (renderControl) {
        return renderControl({
            onKeyDown,
            onClick: handleClick,
            ref: handleControlRef,
            open: Boolean(open),
        });
    }

    return (
        <button
            ref={handleControlRef as React.Ref<HTMLButtonElement>}
            name={name}
            className={selectControlBlock(mods, className)}
            aria-haspopup="listbox"
            aria-expanded={open ? 'true' : 'false'}
            disabled={disabled}
            onClick={handleClick}
            onKeyDown={onKeyDown}
            type="button"
            data-qa={qa}
        >
            {label && <span className={selectControlBlock('label')}>{label}</span>}
            {showPlaceholder && (
                <span className={selectControlBlock('placeholder')}>{placeholder}</span>
            )}
            {showOptionsText && (
                <span className={selectControlBlock('option-text')}>{selectedOptionsContent}</span>
            )}
            <Icon className={selectControlBlock('chevron-icon')} data={Chevron} />
        </button>
    );
});

SelectControl.displayName = 'SelectControl';
