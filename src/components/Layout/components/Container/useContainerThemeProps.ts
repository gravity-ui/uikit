import React from 'react';
import {useLayoutContext} from '../../hooks/useLayoutContext';
import {CommonProps, ContainerConfigProps} from '../../types';

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
    const {theme, getClosestMediaProps, isMediaActive} = useLayoutContext();

    const containerThemeProps = React.useMemo(
        () => ({
            ...pickContainerProps(theme.smartProps?.common),
            ...pickContainerProps(getClosestMediaProps(theme.smartProps?.common?.media)),
            ...pickContainerProps(theme.smartProps?.container),
            ...pickContainerProps(getClosestMediaProps(theme.smartProps?.container?.media)),
        }),
        [getClosestMediaProps, theme],
    );

    return {
        isMediaActive,
        containerThemeProps,
    };
};
