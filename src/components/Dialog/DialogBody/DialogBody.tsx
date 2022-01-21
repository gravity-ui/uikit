import React from 'react';
import {block} from '../../utils/cn';

import './DialogBody.scss';

const b = block('dialog-body');

export interface DialogBodyProps {
    children: React.ReactNode;
    className?: string;
}

export function DialogBody(props: DialogBodyProps) {
    const {className} = props;

    return <div className={b(null, className)}>{props.children}</div>;
}
