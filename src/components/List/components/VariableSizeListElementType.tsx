import * as React from 'react';

export const VariableSizeListElementType = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({style, ...rest}, ref) => <div ref={ref} style={style} role="list" {...rest} />);

VariableSizeListElementType.displayName = 'VariableSizeListElementType';
