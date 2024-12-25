import type * as React from 'react';

import {block} from '../utils/cn';

const b = block('avatar-stack');

type Props = React.PropsWithChildren<{}>;

export const AvatarStackItem = ({children}: Props) => {
    return <li className={b('item')}>{children}</li>;
};

AvatarStackItem.displayName = 'AvatarStack.Item';
