import type * as React from 'react';

import {block} from '../utils/cn';

const b = block('avatar-stack');

type Props = React.PropsWithChildren<Pick<React.HTMLAttributes<HTMLLIElement>, 'style'>>;

export const AvatarStackItem = ({children, style}: Props) => {
    return (
        <li className={b('item')} style={style}>
            {children}
        </li>
    );
};

AvatarStackItem.displayName = 'AvatarStack.Item';
