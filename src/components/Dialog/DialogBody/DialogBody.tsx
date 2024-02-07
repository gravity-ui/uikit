import React from 'react';

import {block} from '../../utils/cn';

import './DialogBody.scss';

const b = block('dialog-body');

export interface DialogBodyProps {
    children: React.ReactNode;
    className?: string;
    hasBorders?: boolean;
}

export function DialogBody(props: DialogBodyProps) {
    const {className, hasBorders = false} = props;

    return <div className={b({'has-borders': hasBorders}, className)}>{props.children}</div>;
}
