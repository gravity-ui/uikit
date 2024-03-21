import React from 'react';

import {ChevronDown, TriangleExclamation} from '@gravity-ui/icons';
import isEmpty from 'lodash/isEmpty';

import {useUniqId} from '../../../../hooks';
import {Icon} from '../../../Icon';
import {Popover} from '../../../Popover';
import type {CnMods} from '../../../utils/cn';
import {selectControlBlock, selectControlButtonBlock} from '../../constants';
import i18n from '../../i18n';
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
    isErrorVisible?: boolean;
    errorMessage?: SelectProps['errorMessage'];
    disabled?: boolean;
    value: SelectProps['value'];
    clearValue: () => void;
    hasClear?: boolean;
    title?: string;
} & Omit<SelectRenderControlProps, 'onClick' | 'onClear'>;

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
        isErrorVisible,
        errorMessage,
        open,
        disabled,
        value,
        hasClear,
        popupId,
        selectId,
        activeIndex,
        title,
    } = props;
    const showOptionsText = Boolean(selectedOptionsContent);
    const showPlaceholder = Boolean(placeholder && !showOptionsText);
    const hasValue = Array.isArray(value) && !isEmpty(value.filter(Boolean));
    const errorTooltipId = useUniqId();

    const [isDisabledButtonAnimation, setIsDisabledButtonAnimation] = React.useState(false);

    const controlMods: CnMods = {
        open,
        size,
        pin,
        disabled,
        error: isErrorVisible,
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
        error: isErrorVisible,
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
                onClear: clearValue,
                onClick: toggleOpen,
                renderClear: (arg) => renderClearIcon(arg),
                ref,
                open: Boolean(open),
                popupId,
                selectId,
                activeIndex,
            },
            {value},
        );
    }

    return (
        <React.Fragment>
            <div className={selectControlBlock(controlMods)} role="group">
                <button
                    ref={ref}
                    role="combobox"
                    aria-controls={popupId}
                    className={selectControlButtonBlock(buttonMods, className)}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-activedescendant={
                        activeIndex === undefined
                            ? undefined
                            : `${selectId}-list-item-${activeIndex}`
                    }
                    name={name}
                    disabled={disabled}
                    onClick={toggleOpen}
                    onKeyDown={onKeyDown}
                    type="button"
                    data-qa={qa}
                    title={title}
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

                {errorMessage && (
                    <Popover content={errorMessage} tooltipId={errorTooltipId}>
                        <button
                            aria-label={i18n('label_show-error-info')}
                            aria-describedby={errorTooltipId}
                            className={selectControlBlock('error-icon')}
                        >
                            <Icon data={TriangleExclamation} size={size === 's' ? 12 : 16} />
                        </button>
                    </Popover>
                )}

                <Icon
                    className={selectControlBlock('chevron-icon', {disabled})}
                    data={ChevronDown}
                    aria-hidden="true"
                />
            </div>
        </React.Fragment>
    );
});

SelectControl.displayName = 'SelectControl';
