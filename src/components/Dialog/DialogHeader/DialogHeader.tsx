import React from 'react';
import {block} from '../../utils/cn';
import './DialogHeader.scss';

const b = block('dialog-header');

export interface DialogHeaderProps {
    caption?: React.ReactNode;
    insertBefore?: React.ReactNode;
    insertAfter?: React.ReactNode;
    className?: string;
}

export const DialogHeader = (props: DialogHeaderProps) => {
    const {caption, insertBefore, insertAfter, className} = props;

    return (
        <div className={b(null, className)}>
            {insertBefore}
            <div className={b('caption')}>{caption}</div>
            {insertAfter}
        </div>
    );
};

DialogHeader.defaultProps = {
    caption: '',
};
