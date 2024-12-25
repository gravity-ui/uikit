'use client';

import React from 'react';

import {Portal} from '../../Portal';
import {block} from '../../utils/cn';

type Props = React.PropsWithChildren<{
    className: string;
    mobile?: boolean;
}>;

const b = block('toaster');

export function ToasterPortal({children, className, mobile}: Props) {
    return (
        <Portal>
            <div className={b({mobile}, className)} aria-live="assertive">
                {children}
            </div>
        </Portal>
    );
}

ToasterPortal.displayName = 'ToasterPortal';
