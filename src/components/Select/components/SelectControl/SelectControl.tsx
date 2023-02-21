import React from 'react';
import {useForkRef} from '../../../utils/useForkRef';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Chevron} from '../../../icons/Chevron';
import type {SelectProps} from '../../types';
import {selectControlBlock} from '../../constants';
import {mapToButtonView} from '../../utils';

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
        <Button
            ref={handleControlRef as React.Ref<HTMLButtonElement>}
            className={selectControlBlock({open}, className)}
            qa={qa}
            view={mapToButtonView(view)}
            size={size}
            pin={pin}
            extraProps={{
                name,
                'aria-haspopup': 'listbox',
                'aria-expanded': open ? 'true' : 'false',
                onKeyDown,
            }}
            disabled={disabled}
            onClick={handleClick}
        >
            {label && <span className={selectControlBlock('label')}>{label}</span>}
            {showPlaceholder && (
                <span className={selectControlBlock('placeholder')}>{placeholder}</span>
            )}
            {showOptionsText && (
                <span className={selectControlBlock('option-text')}>{selectedOptionsContent}</span>
            )}
            <Icon className={selectControlBlock('chevron-icon', {disabled})} data={Chevron} />
        </Button>
    );
});

SelectControl.displayName = 'SelectControl';
