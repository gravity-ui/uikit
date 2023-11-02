import React from 'react';

/** @deprecated drop on next major */

export function useForceUpdate() {
    const [, setState] = React.useState({});
    return React.useCallback(() => {
        setState({});
    }, []);
}
