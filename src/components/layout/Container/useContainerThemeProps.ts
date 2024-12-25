import * as React from 'react';

import {useLayoutContext} from '../hooks/useLayoutContext';
import type {CommonProps, ContainerConfigProps} from '../types';

const pickContainerProps = ({
    gutters,
    spaceRow,
    space,
}: ContainerConfigProps & CommonProps = {}) => {
    const res: ContainerConfigProps = {};

    if (gutters) {
        res.gutters = gutters;
    }
    if (spaceRow || space) {
        res.spaceRow = spaceRow || space;
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
