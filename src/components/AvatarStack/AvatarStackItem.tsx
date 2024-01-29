import React from 'react';

import {blockNew} from '../utils/cn';

const b = blockNew('avatar-stack');

type Props = React.PropsWithChildren<{}>;

export const AvatarStackItem = ({children}: Props) => {
    return <li className={b('item')}>{children}</li>;
};

AvatarStackItem.displayName = 'AvatarStack.Item';
