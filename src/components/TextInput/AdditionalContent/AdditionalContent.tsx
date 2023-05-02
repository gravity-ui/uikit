import React from 'react';
import {block} from '../../utils/cn';

const b = block('text-input');

type Props = {
    placement: 'left' | 'right';
    children?: React.ReactNode;
};

export const AdditionalContent = React.forwardRef<HTMLDivElement, Props>(function AdditionalContent(
    {placement, children},
    ref,
) {
    if (!children) {
        return null;
    }

    return (
        <div ref={ref} className={b('additional-content', {placement})}>
            {children}
        </div>
    );
});
