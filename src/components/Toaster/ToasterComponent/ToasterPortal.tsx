import React from 'react';

import {Portal} from '../../Portal';
import {block} from '../../utils/cn';

type Props = React.PropsWithChildren<{
    className: string;
    mobile?: boolean;
}>;

const b = block('toaster');

export function ToasterPortal({children, className, mobile}: Props) {
    const el = React.useRef(
        typeof document === 'undefined' ? undefined : document.createElement('div'),
    );

    React.useEffect(() => {
        const container = el.current;

        if (!container) {
            return undefined;
        }

        document.body.appendChild(container);

        return () => {
            document.body.removeChild(container);
        };
    }, []);

    React.useEffect(() => {
        if (!el.current) {
            return;
        }

        el.current.className = b({mobile}, className);
    }, [className, mobile]);

    return <Portal container={el.current}>{children}</Portal>;
}

ToasterPortal.displayName = 'ToasterPortal';
