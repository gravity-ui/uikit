import React from 'react';
import {useForkRef} from '../../../../utils/useForkRef';
import {CnMods, block} from '../../../../utils/cn';
import {Icon} from '../../../../Icon';
import {Chevron} from '../../../../icons/Chevron';
import {SelectProps} from '../../types';

import './SelectControl.scss';

const b = block('select');

type ControlProps = {
    setActive: (nextActive: boolean) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
    view: NonNullable<SelectProps['view']>;
    size: NonNullable<SelectProps['size']>;
    pin: NonNullable<SelectProps['pin']>;
    optionsText: string[];
    width?: SelectProps['width'];
    name?: string;
    className?: string;
    label?: string;
    placeholder?: SelectProps['placeholder'];
    active?: boolean;
    disabled?: boolean;
};

export const SelectControl = React.forwardRef<HTMLButtonElement, ControlProps>((props, ref) => {
    const {
        setActive,
        onKeyDown,
        view,
        size,
        pin,
        optionsText,
        width,
        className,
        name,
        label,
        placeholder,
        active,
        disabled,
    } = props;
    const controlRef = React.useRef<HTMLButtonElement>(null);
    const handleControlRef = useForkRef(ref, controlRef);
    const showOptionsText = Boolean(optionsText.length);
    const showPlaceholder = Boolean(placeholder && !showOptionsText);
    const mods: CnMods = {
        view,
        size,
        pin,
        disabled,
        active,
        ...(typeof width === 'string' && {width}),
    };
    const inlineStyles: React.CSSProperties = {};

    if (typeof width === 'number') {
        inlineStyles.width = width;
    }

    const handleClick = () => setActive(!active);

    return (
        <button
            ref={handleControlRef}
            name={name}
            className={b(mods, className)}
            style={inlineStyles}
            aria-haspopup="listbox"
            disabled={disabled}
            onClick={handleClick}
            onKeyDown={onKeyDown}
        >
            {label && <span className={b('label')}>{label}</span>}
            {showPlaceholder && <span className={b('placeholder')}>{placeholder}</span>}
            {showOptionsText && <span className={b('option-text')}>{optionsText.join(', ')}</span>}
            <Icon className={b('chevron-icon')} data={Chevron} />
        </button>
    );
});

SelectControl.displayName = 'SelectControl';
