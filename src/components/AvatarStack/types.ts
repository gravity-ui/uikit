import type React from 'react';

import type {AvatarSize} from '../Avatar';

export type AvatarStackOverlapSize = 's' | 'm' | 'l';

export interface AvatarStackProps {
    /** Amount of avatars to be shown before more button. Default 3. */
    max?: number;
    /**
     * How much each avatar should overlap next one
     * | Avatar sizes | Recommended overlap |
     * | :----------: | :-----------------: |
     * | `xs`-`m`     | `s`                 |
     * | `l`          | `m`                 |
     * | `xl`         | `l`                 |
     */
    overlapSize?: AvatarStackOverlapSize;
    size?: AvatarSize;
    className?: string;
    /** Avatars and optionally `<AvatarStack.MoreButton/>` */
    children?: React.ReactNode;
    renderMoreButton?: (options: {count: number}) => React.ReactElement;
}
