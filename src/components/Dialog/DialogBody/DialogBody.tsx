import * as React from 'react';

import {useAnimateHeight} from '../../../hooks/private';
import {block} from '../../utils/cn';
import {DialogPrivateContext} from '../DialogPrivateContext';

import './DialogBody.scss';

const b = block('dialog-body');

export interface DialogBodyProps {
    children: React.ReactNode;
    className?: string;
    hasBorders?: boolean;
}

export function DialogBody(props: DialogBodyProps) {
    const {className, hasBorders = false} = props;
    const contentRef = React.useRef<HTMLDivElement>(null);
    const {disableHeightTransition} = React.useContext(DialogPrivateContext);
    useAnimateHeight({
        ref: contentRef,
        enabled: !disableHeightTransition,
    });

    return (
        <div ref={contentRef} className={b({'has-borders': hasBorders}, className)}>
            {props.children}
        </div>
    );
}
