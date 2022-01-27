import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import {CnMods, block} from '../../../utils/cn';
import {List} from '../../../List';
import {Icon} from '../../../Icon';
import {Chevron} from '../../../icons/Chevron';
import {Dispatch} from '../../store';
import {SelectProps} from '../../types';
import {FlattenOption} from '../../utils';

import './Control.scss';

const b = block('select');

type ControlProps = {
    dispatch: Dispatch;
    view: NonNullable<SelectProps['view']>;
    size: NonNullable<SelectProps['size']>;
    pin: NonNullable<SelectProps['pin']>;
    value: string[];
    width?: SelectProps['controlWidth'];
    className?: string;
    label?: string;
    placeholder?: SelectProps['placeholder'];
    active?: boolean;
    disabled?: boolean;
    listboxRef?: React.RefObject<List<FlattenOption>>;
};

export const Control = React.forwardRef<HTMLButtonElement, ControlProps>((props, ref) => {
    const {
        view,
        size,
        pin,
        value,
        width,
        className,
        label,
        placeholder,
        active,
        disabled,
        listboxRef,
        dispatch,
    } = props;
    const showValues = Boolean(value.length);
    const showPlaceholder = Boolean(placeholder && !showValues);
    const controlMods: CnMods = {
        view,
        size,
        pin,
        disabled,
        active,
        ...(typeof width === 'string' && {width}),
    };
    const controlInlineStyles: React.CSSProperties = {};

    if (typeof width === 'number') {
        controlInlineStyles.width = width;
    }

    const getControlNode = React.useCallback(() => {
        return (ref as React.RefObject<HTMLButtonElement>)?.current;
    }, [ref]);

    const handleClick = () => {
        dispatch({type: 'SET_ACTIVE', payload: {active: !active}});
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        listboxRef?.current?.onKeyDown(e);
    };

    const handleResize = React.useCallback(() => {
        const controlRect = getControlNode()?.getBoundingClientRect();
        dispatch({type: 'SET_CONTROL_RECT', payload: {controlRect}});
    }, [dispatch, getControlNode]);

    React.useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver(handleResize);
        const element = getControlNode();

        if (element) {
            resizeObserver.observe(element);
        }

        return () => {
            if (element) {
                resizeObserver.disconnect();
            }
        };
    }, [getControlNode, handleResize]);

    return (
        <button
            ref={ref}
            className={b(controlMods, className)}
            style={controlInlineStyles}
            aria-haspopup="listbox"
            disabled={disabled}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {label && <span className={b('label')}>{label}</span>}
            {showPlaceholder && <span className={b('placeholder')}>{placeholder}</span>}
            {showValues && <span className={b('value')}>{value.join(', ')}</span>}
            <Icon className={b('chevron-icon')} data={Chevron} />
        </button>
    );
});

Control.displayName = 'Control';
