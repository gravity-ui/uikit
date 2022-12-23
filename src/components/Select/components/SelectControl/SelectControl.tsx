import React from 'react';
import {useForkRef} from '../../../utils/useForkRef';
import type {CnMods} from '../../../utils/cn';
import {Icon} from '../../../Icon';
import {Chevron} from '../../../icons/Chevron';
import type {SelectProps} from '../../types';
import {selectBlock} from '../../constants';

import './SelectControl.scss';

type ControlProps = {
    setOpen: (nextOpen: boolean) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    renderControl?: SelectProps['renderControl'];
    view: NonNullable<SelectProps['view']>;
    size: NonNullable<SelectProps['size']>;
    pin: NonNullable<SelectProps['pin']>;
    optionsText: string[];
    width?: SelectProps['width'];
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
        optionsText,
        width,
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
    const showOptionsText = Boolean(optionsText.length);
    const showPlaceholder = Boolean(placeholder && !showOptionsText);
    const mods: CnMods = {
        view,
        size,
        pin,
        disabled,
        open,
        ...(typeof width === 'string' && {width}),
    };
    const inlineStyles: React.CSSProperties = {};

    if (typeof width === 'number') {
        inlineStyles.width = width;
    }

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
            className={selectBlock(mods, className)}
            style={inlineStyles}
            aria-haspopup="listbox"
            disabled={disabled}
            onClick={handleClick}
            onKeyDown={onKeyDown}
            type="button"
            data-qa={qa}
        >
            {label && <span className={selectBlock('label')}>{label}</span>}
            {showPlaceholder && <span className={selectBlock('placeholder')}>{placeholder}</span>}
            {showOptionsText && (
                <span className={selectBlock('option-text')}>{optionsText.join(', ')}</span>
            )}
            <Icon className={selectBlock('chevron-icon')} data={Chevron} />
        </button>
    );
});

SelectControl.displayName = 'SelectControl';
