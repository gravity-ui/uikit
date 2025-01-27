import * as React from 'react';

export type UseHoverResult<T> = [React.MouseEventHandler<T>, React.MouseEventHandler<T>, boolean];

export function useHover<T = Element>(): UseHoverResult<T> {
    const [isHovering, setIsHovering] = React.useState(false);
    const onMouseEnter: React.MouseEventHandler<T> = React.useCallback(() => {
        setIsHovering(true);
    }, []);
    const onMouseLeave: React.MouseEventHandler<T> = React.useCallback(() => {
        setIsHovering(false);
    }, []);

    return [onMouseEnter, onMouseLeave, isHovering];
}
