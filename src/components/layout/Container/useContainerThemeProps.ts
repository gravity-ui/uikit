import * as React from 'react';

import {useLayoutContext} from '../hooks/useLayoutContext';
import type {ContainerConfigProps} from '../types';

const pickContainerProps = ({gutters, rowGap}: ContainerConfigProps = {}) => {
    const res: ContainerConfigProps = {};

    if (gutters !== undefined) {
        res.gutters = gutters;
    }
    if (rowGap !== undefined) {
        res.rowGap = rowGap;
    }

    return res;
};

export const useContainerThemeProps = () => {
    const {theme, getClosestMediaProps} = useLayoutContext();

    const containerThemeProps = React.useMemo(
        () => ({
            ...pickContainerProps(theme.components?.container),
            ...pickContainerProps(getClosestMediaProps(theme.components?.container?.media)),
        }),
        [getClosestMediaProps, theme],
    );

    return {
        getClosestMediaProps,
        containerThemeProps,
        breakpoints: theme.breakpoints,
    };
};
