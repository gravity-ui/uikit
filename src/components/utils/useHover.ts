import React from 'react';

export function useHover<T = Element>(): [
    React.MouseEventHandler<T>,
    React.MouseEventHandler<T>,
    boolean,
] {
    const [isHovering, setIsHovering] = React.useState(false);
    const onMouseEnter: React.MouseEventHandler<T> = React.useCallback(() => {
        setIsHovering(true);
    }, []);
    const onMouseLeave: React.MouseEventHandler<T> = React.useCallback(() => {
        setIsHovering(false);
    }, []);

    return [onMouseEnter, onMouseLeave, isHovering];
}
