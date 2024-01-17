import React from 'react';

import {block} from '../../utils/cn';

import './DialogBody.scss';

const b = block('dialog-body');

export interface DialogBodyProps {
    children: React.ReactNode;
    className?: string;
    hasDividers?: boolean;
}

export function DialogBody(props: DialogBodyProps) {
    const {className, hasDividers = false} = props;

    return <div className={b({'has-dividers': hasDividers}, className)}>{props.children}</div>;
}
