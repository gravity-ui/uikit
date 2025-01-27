import type * as React from 'react';

import {block} from '../../utils/cn';

import './DialogHeader.scss';

const b = block('dialog-header');

export interface DialogHeaderProps {
    caption?: React.ReactNode;
    insertBefore?: React.ReactNode;
    insertAfter?: React.ReactNode;
    className?: string;
    id?: string;
}

export function DialogHeader(props: DialogHeaderProps) {
    const {caption = '', insertBefore, insertAfter, className, id} = props;

    return (
        <div className={b(null, className)}>
            {insertBefore}
            <div className={b('caption')} id={id}>
                {caption}
            </div>
            {insertAfter}
        </div>
    );
}
