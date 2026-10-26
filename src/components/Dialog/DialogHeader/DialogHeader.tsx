import * as React from 'react';

import {Text} from '../../Text';
import {block} from '../../utils/cn';
import {DialogPrivateContext} from '../DialogPrivateContext';

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
    const {mobile} = React.useContext(DialogPrivateContext);

    return (
        <div className={b({mobile}, className)}>
            {insertBefore}
            <Text
                as={as}
                variant={mobile ? 'header-1' : 'subheader-3'}
                className={b('caption')}
                id={id}
            >
                {caption}
            </Text>
            {insertAfter}
        </div>
    );
}
