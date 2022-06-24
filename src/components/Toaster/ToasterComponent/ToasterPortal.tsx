import React, {PropsWithChildren, useEffect, useRef} from 'react';
import {Portal} from '../../Portal';
import {block} from '../../utils/cn';

type Props = PropsWithChildren<{
    className: string;
    mobile?: boolean;
}>;

const b = block('toaster');

export function ToasterPortal({children, className, mobile}: Props) {
    const el = useRef(document.createElement('div'));

    useEffect(() => {
        const container = el.current;
        document.body.appendChild(container);

        return () => {
            document.body.removeChild(container);
        };
    }, []);

    useEffect(() => {
        el.current.className = b({mobile}, className);
    }, [className, mobile]);

    return <Portal container={el.current}>{children}</Portal>;
}

ToasterPortal.displayName = 'ToasterPortal';
