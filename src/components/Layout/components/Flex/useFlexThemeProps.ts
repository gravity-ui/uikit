import React from 'react';
import {CommonProps} from '../../types';
import {useLayoutContext} from '../../hooks/useLayoutContext';

const pickFlexProps = ({space}: CommonProps = {}) => {
    const res: CommonProps = {};

    if (space) {
        res.space = space;
    }
    return res;
};

export const useFlexThemeProps = () => {
    const {theme, getClosestMediaProps, isMediaActive} = useLayoutContext();

    const themeFlexProps = React.useMemo(
        () => ({
            ...pickFlexProps(theme.smartProps?.common),
            ...pickFlexProps(getClosestMediaProps(theme.smartProps?.common?.media)),
        }),
        [getClosestMediaProps, theme],
    );

    return {
        themeFlexProps,
        isMediaActive,
    };
};
