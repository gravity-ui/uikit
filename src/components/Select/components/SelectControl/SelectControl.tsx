'use client';

import * as React from 'react';

import {ChevronDown, TriangleExclamation} from '@gravity-ui/icons';

import {useUniqId} from '../../../../hooks';
import {Icon} from '../../../Icon';
import {Popover} from '../../../legacy';
import type {AriaLabelingProps} from '../../../types';
import type {CnMods} from '../../../utils/cn';
import {filterDOMProps} from '../../../utils/filterDOMProps';
import {selectControlBlock, selectControlButtonBlock} from '../../constants';
import i18n from '../../i18n';
import type {
    SelectProps,
    SelectRenderClearArgs,
    SelectRenderControl,
    SelectRenderCounter,
    SelectRenderTriggerProps,
} from '../../types';
import {SelectClear} from '../SelectClear/SelectClear';
import {SelectCounter} from '../SelectCounter/SelectCounter';

import './SelectControl.scss';

type ControlProps = {
    toggleOpen: () => void;
    renderControl?: SelectRenderControl;
    renderCounter?: SelectRenderCounter;
    view: NonNullable<SelectProps['view']>;
    size: NonNullable<SelectProps['size']>;
    pin: NonNullable<SelectProps['pin']>;
    selectedOptionsContent: React.ReactNode;
    className?: string;
    qa?: string;
    label?: string;
    placeholder?: SelectProps['placeholder'];
    isErrorVisible?: boolean;
    errorMessage?: SelectProps['errorMessage'];
    disabled?: boolean;
    value: NonNullable<SelectProps['value']>;
    clearValue: () => void;
    hasClear?: boolean;
    hasCounter?: boolean;
    title?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
    open: boolean;
    popupId: string;
    selectId: string;
    activeIndex?: number;
} & AriaLabelingProps;

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
        renderCounter,
        hasCounter,
        title,
    } = props;
    const showOptionsText = Boolean(selectedOptionsContent);
    const showPlaceholder = Boolean(placeholder && !showOptionsText);
    const hasValue = Array.isArray(value) && value.filter(Boolean).length > 0;
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

    const handleControlClick = React.useCallback(
        (e?: React.MouseEvent<HTMLElement>) => {
            // Fix for Safari
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus
            if (e && e.currentTarget !== document.activeElement && 'focus' in e.currentTarget) {
                e.currentTarget.focus();
            }

            toggleOpen();
        },
        [toggleOpen],
    );

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

    const renderCounterComponent = () => {
        if (!hasCounter) {
            return null;
        }
        const count = value.length;
        const counterComponent = <SelectCounter count={count} size={size} disabled={disabled} />;
        return renderCounter
            ? renderCounter(counterComponent, {count, size, disabled})
            : counterComponent;
    };

    const renderClearIcon = (args: SelectRenderClearArgs) => {
        const valueIsEmpty = value.length === 0;
        if (!hasClear || valueIsEmpty || disabled) {
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

    const triggerProps: SelectRenderTriggerProps = {
        ...filterDOMProps(props, {labelable: true}),
        id: selectId,
        role: 'combobox',
        'aria-controls': open ? popupId : undefined,
        'aria-haspopup': 'listbox',
        'aria-expanded': open,
        'aria-activedescendant':
            activeIndex === undefined ? undefined : `${popupId}-item-${activeIndex}`,
        onClick: handleControlClick,
        onKeyDown,
        disabled,
    };

    const {t} = i18n.useTranslation();

    if (renderControl) {
        return renderControl(
            {
                onClear: clearValue,
                renderClear: renderClearIcon,
                renderCounter: renderCounterComponent,
                ref,
                open,
                disabled,
                triggerProps,
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
                    type="button"
                    data-qa={qa}
                    title={title}
                    tabIndex={0}
                    {...triggerProps}
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
                {renderCounterComponent()}
                {renderClearIcon({})}

                {errorMessage && (
                    <Popover content={errorMessage} tooltipId={errorTooltipId}>
                        <button
                            aria-label={t('label_show-error-info')}
                            aria-describedby={errorTooltipId}
                            type={'button'}
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
