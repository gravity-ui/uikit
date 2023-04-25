import React from 'react';
import {block} from '../../utils/cn';

const b = block('text-input');

type Props = {
    children?: React.ReactNode;
    className?: string;
};

export const AdditionalContent = ({children, className}: Props) => {
    if (!children) {
        return null;
    }

    return <div className={b('additional-content', className)}>{children}</div>;
};
