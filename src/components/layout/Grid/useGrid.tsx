import * as React from 'react';

import type {DOMProps} from '../../types';
import {useLayoutContext} from '../hooks/useLayoutContext';
import {baseStyleHandlers, convertStyleProps} from '../hooks/useStyleProps';
import type {BaseStyleProps} from '../hooks/useStyleProps';

import type {GridStyleProps} from './Grid';
import {gridStyleHandlers} from './Grid';

interface GridProps extends DOMProps, BaseStyleProps, GridStyleProps {}

const gridHookStyleHandlers = {
    ...baseStyleHandlers,
    ...gridStyleHandlers,
};

export function useGrid() {
    const {getClosestMediaProps} = useLayoutContext();

    return React.useCallback(
        (props: GridProps) => {
            return convertStyleProps(props, gridHookStyleHandlers, getClosestMediaProps).style;
        },
        [getClosestMediaProps],
    );
}
