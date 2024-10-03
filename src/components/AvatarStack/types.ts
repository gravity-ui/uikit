import type React from 'react';

import type {AvatarSize} from '../Avatar';

export type AvatarStackOverlapSize = 's' | 'm' | 'l';

export interface AvatarStackProps {
    /** Amount of avatars to be shown before more button. Default 3. */
    max?: number;
    /** Total amount of items, used to calculate number of not rendered avatars */
    total?: number;
    /**
     * How much each avatar should overlap next one
     * | Avatar sizes | Recommended overlap |
     * | :----------: | :-----------------: |
     * | `xs`-`m`     | `s`                 |
     * | `l`          | `m`                 |
     * | `xl`         | `l`                 |
     */
    overlapSize?: AvatarStackOverlapSize;
    /**
     * Size for control displaying count of extra avatars
     */
    size?: AvatarSize;
    className?: string;
    /**
     * Children would be wrapped for "stacking"
     * @example
     * <AvatarStack>
     *     <Avatar/>
     *     <Tooltip content="Some info"><Avatar/></Tooltip>
     * </AvatarStack>
     */
    children?: React.ReactNode;
    /**
     * Custom render for control displaying extra data
     * @example
     * <AvatarStack renderMore={({count}) => <Button>+{count}</Button>}>
     *     <Avatar/>
     * </AvatarStack>
     */
    renderMore?: (options: {count: number}) => React.ReactElement;
}

export interface AvatarStackMoreProps {
    className?: string;
    count: number;
    'aria-label'?: string;
    size?: AvatarSize;
    borderColor?: string;
}

export type AvatarStackMoreButtonProps = Pick<
    React.HTMLProps<HTMLButtonElement>,
    'className' | 'onClick' | 'aria-label'
> & {
    size?: AvatarSize;
    count: number;
};
