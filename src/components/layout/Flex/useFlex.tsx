import * as React from 'react';

import type {DOMProps} from '../../types';
import {useLayoutContext} from '../hooks/useLayoutContext';
import {baseStyleHandlers, convertStyleProps} from '../hooks/useStyleProps';
import type {BaseStyleProps} from '../hooks/useStyleProps';

import {flexStyleHandlers} from './Flex';
import type {FlexStyleProps} from './Flex';

interface FlexProps extends DOMProps, BaseStyleProps, FlexStyleProps {}

const flexHookStyleHandlers = {
    ...baseStyleHandlers,
    ...flexStyleHandlers,
};

export function useFlex() {
    const {getClosestMediaProps} = useLayoutContext();

    return React.useCallback(
        (props: FlexProps) => {
            return convertStyleProps(props, flexHookStyleHandlers, getClosestMediaProps).style;
        },
        [getClosestMediaProps],
    );
}
