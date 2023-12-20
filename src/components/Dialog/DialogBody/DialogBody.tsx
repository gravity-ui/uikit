import React from 'react';

import {block} from '../../utils/cn';

import './DialogBody.scss';

const b = block('dialog-body');

export interface DialogBodyProps {
    children: React.ReactNode;
    className?: string;
    withDividers?: boolean;
}

export function DialogBody(props: DialogBodyProps) {
    const {className, withDividers = false} = props;

    return <div className={b({'with-dividers': withDividers}, className)}>{props.children}</div>;
}
