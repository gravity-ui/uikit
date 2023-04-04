import React from 'react';
import {CommonProps} from '../types';
import {useLayoutContext} from '../hooks/useLayoutContext';

const pickRowProps = ({space, spaceRow}: CommonProps = {}) => {
    const res: CommonProps = {};

    if (space) {
        res.space = space;
        res.spaceRow = space;
    }
    if (spaceRow) {
        res.spaceRow = spaceRow;
    }

    return res;
};

export const useRowThemeProps = () => {
    const {theme, getClosestMediaProps} = useLayoutContext();

    const rowThemeProps = React.useMemo(
        () => ({
            ...pickRowProps(theme.common),
            ...pickRowProps(getClosestMediaProps(theme.common?.media)),
        }),
        [getClosestMediaProps, theme],
    );

    return {
        getClosestMediaProps,
        rowThemeProps,
    };
};
