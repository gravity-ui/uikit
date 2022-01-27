import React from 'react';
import {useForkRef} from '../utils/useForkRef';
import {List} from '../List';
import {reducer, initialState} from './store';
import {SelectProps} from './types';
import {FlattenOption} from './utils';
import {Control, Listbox} from './components';

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(props, ref) {
    const {
        renderOption,
        getOptionHeight,
        className,
        label,
        placeholder,
        disabled,
        popupWidth,
        view = 'normal',
        size = 'm',
        pin = 'round-round',
        controlWidth = 'auto',
        multiple = false,
        value = [],
        options = [], // remove default after adding children handling logic
    } = props;
    const [{controlRect, active}, dispatch] = React.useReducer(reducer, initialState);
    const controlRef = React.useRef<HTMLButtonElement>(null);
    const listboxRef = React.useRef<List<FlattenOption>>(null);
    const handleControlRef = useForkRef(ref, controlRef);

    return (
        <React.Fragment>
            <Control
                ref={handleControlRef}
                listboxRef={listboxRef}
                className={className}
                view={view}
                size={size}
                pin={pin}
                width={controlWidth}
                label={label}
                placeholder={placeholder}
                value={value}
                active={active}
                disabled={disabled}
                dispatch={dispatch}
            />
            <Listbox
                ref={listboxRef}
                controlRef={controlRef}
                size={size}
                value={value}
                options={options}
                popupWidth={popupWidth}
                controlRect={controlRect}
                active={active}
                multiple={multiple}
                dispatch={dispatch}
                renderOption={renderOption}
                getOptionHeight={getOptionHeight}
            />
        </React.Fragment>
    );
});
