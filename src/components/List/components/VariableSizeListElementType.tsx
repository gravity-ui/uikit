'use client';

import * as React from 'react';

export interface VariableSizeListElementTypeProps extends React.HTMLAttributes<HTMLDivElement> {
    role: string;
    listId: string;
}

export const VariableSizeListElementType = React.forwardRef<
    HTMLDivElement,
    VariableSizeListElementTypeProps
>(({style, role, listId, ...rest}, ref) => (
    <div ref={ref} style={style} role={role} id={listId} {...rest} />
));

VariableSizeListElementType.displayName = 'VariableSizeListElementType';

export const createVariableSizeListElementType = (role: string, listId: string) => {
    const Component = React.forwardRef<HTMLDivElement, VariableSizeListElementTypeProps>(
        (props, ref) => (
            <VariableSizeListElementType {...props} role={role} ref={ref} listId={listId} />
        ),
    );

    Component.displayName = 'VariableSizeListElementType';

    return Component;
};
