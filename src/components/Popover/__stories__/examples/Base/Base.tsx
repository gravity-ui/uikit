import React from 'react';
import type {FC, MouseEvent} from 'react';
import {Popover} from '../../../Popover';
import {PopoverProps} from '../../../types';

export const Base: FC<PopoverProps> = (props) => {
    const handleClick = async (event: MouseEvent<HTMLSpanElement>) => {
        props.onClick?.(event);
        return true;
    };

    return <Popover {...props} onClick={handleClick} />;
};
