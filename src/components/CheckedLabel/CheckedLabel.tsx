import React, {forwardRef, PropsWithChildren, ReactNode} from 'react';
import {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import './CheckedLabel.scss';

type Props = PropsWithChildren<{
    title?: string;
    disabled?: boolean;
    size?: 'm' | 'l';
    control: ReactNode;
}> &
    DOMProps &
    QAProps;

const b = block('checked-label');

export const CheckedLabel = forwardRef<HTMLLabelElement, Props>(
    ({children, className, title, style, disabled = false, control, size = 'm', qa}, ref) => {
        return (
            <label
                ref={ref}
                title={title}
                style={style}
                className={b({size, disabled}, className)}
                data-qa={qa}
            >
                {control}
                {children ? <span className={b('text')}>{children}</span> : null}
            </label>
        );
    },
);

CheckedLabel.displayName = 'CheckedLabel';
