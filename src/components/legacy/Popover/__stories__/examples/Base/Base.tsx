import type * as React from 'react';

import {Popover} from '../../../Popover';
import type {PopoverProps} from '../../../types';

export function Base(props: PopoverProps) {
    const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
        props.onClick?.(event);
        return true;
    };

    return <Popover {...props} onClick={handleClick} />;
}
