import React from 'react';
import {CommonProps} from '../../types';
import {useLayoutContext} from '../../hooks/useLayoutContext';

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
    const {isMediaActive, theme, getClosestMediaProps} = useLayoutContext();

    const rowThemeProps = React.useMemo(
        () => ({
            ...pickRowProps(theme.smartProps?.common),
            ...pickRowProps(getClosestMediaProps(theme.smartProps?.common?.media)),
        }),
        [getClosestMediaProps, theme.smartProps?.common],
    );

    return {
        isMediaActive,
        rowThemeProps,
    };
};
