import React from 'react';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Chevron} from '../../../icons/Chevron';
import {useForkRef} from '../../../utils/useForkRef';
import {selectControlBlock} from '../../constants';
import type {SelectProps, SelectRenderControl, SelectRenderControlProps} from '../../types';
import {mapToButtonView} from '../../utils';

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
} & Omit<SelectRenderControlProps, 'onClick'>;

export const SelectControl = React.forwardRef<HTMLElement, ControlProps>((props, ref) => {
    const {
        toggleOpen,
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
    } = props;
    const controlRef = React.useRef<HTMLElement>(null);
    const handleControlRef = useForkRef<HTMLElement>(ref, controlRef);
    const showOptionsText = Boolean(selectedOptionsContent);
    const showPlaceholder = Boolean(placeholder && !showOptionsText);

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
            <Button
                ref={handleControlRef as React.Ref<HTMLButtonElement>}
                className={selectControlBlock({open, error: Boolean(error)}, className)}
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
                onClick={toggleOpen}
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
                <Icon className={selectControlBlock('chevron-icon', {disabled})} data={Chevron} />
            </Button>
            {typeof error === 'string' && (
                <div className={selectControlBlock('error')}>{error}</div>
            )}
        </React.Fragment>
    );
});

SelectControl.displayName = 'SelectControl';
