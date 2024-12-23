import * as React from 'react';

import {block} from '../../utils/cn';

const b = block('text-input');

type Props = {
    placement: 'start' | 'end';
    children?: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const AdditionalContent = React.forwardRef<HTMLDivElement, Props>(function AdditionalContent(
    {placement, children, onClick},
    ref,
) {
    if (!children) {
        return null;
    }

    return (
        // It is used to focus the control input if non-interaction element is provided.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div ref={ref} className={b('additional-content', {placement})} onClick={onClick}>
            {children}
        </div>
    );
});
