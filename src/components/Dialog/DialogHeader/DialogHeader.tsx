import type * as React from 'react';

import {Text} from '../../Text';
import {block} from '../../utils/cn';

import './DialogHeader.scss';

const b = block('dialog-header');

export interface DialogHeaderProps {
    caption?: React.ReactNode;
    insertBefore?: React.ReactNode;
    insertAfter?: React.ReactNode;
    className?: string;
    as?: React.ElementType;
    id?: string;
}

export function DialogHeader(props: DialogHeaderProps) {
    const {caption = '', as = 'div', insertBefore, insertAfter, className, id} = props;

    return (
        <div className={b(null, className)}>
            {insertBefore}
            <Text as={as} className={b('caption')} id={id}>
                {caption}
            </Text>
            {insertAfter}
        </div>
    );
}
