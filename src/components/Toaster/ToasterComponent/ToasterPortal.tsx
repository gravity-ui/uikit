import React, {PropsWithChildren, useEffect, useRef} from 'react';
import {Portal} from '../../Portal';
import {block} from '../../utils/cn';

type Props = PropsWithChildren<{
    className: string;
    mobile?: boolean;
}>;

const b = block('toaster');

export function ToasterPortal({children, className, mobile}: Props) {
    const el = useRef(typeof document !== 'undefined' ? document.createElement('div') : undefined);

    useEffect(() => {
        const container = el.current;

        if (!container) {
            return;
        }

        document.body.appendChild(container);

        return () => {
            document.body.removeChild(container);
        };
    }, []);

    useEffect(() => {
        if (!el.current) {
            return;
        }

        el.current.className = b({mobile}, className);
    }, [className, mobile]);

    return <Portal container={el.current}>{children}</Portal>;
}

ToasterPortal.displayName = 'ToasterPortal';
