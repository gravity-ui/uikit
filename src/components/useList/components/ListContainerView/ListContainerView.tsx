import * as React from 'react';

import {Flex} from '../../../layout';
import type {QAProps} from '../../../types';
import {block} from '../../../utils/cn';

import './ListContainerView.scss';

const b = block('list-container-view');

export interface ListContainerViewProps extends QAProps {
    /**
     * Ability to override default html tag
     */
    as?: keyof JSX.IntrinsicElements;
    id?: string;
    role?: React.AriaRole;
    className?: string;
    style?: React.CSSProperties;
    /**
     * Removes `overflow: auto` from container and set fixed container size (`--g-list-height` = `300px`)
     */
    fixedHeight?: boolean;
    children: React.ReactNode;
    extraProps?: React.HTMLAttributes<'div'>;
}

export const ListContainerView = React.forwardRef<HTMLDivElement, ListContainerViewProps>(
    function ListContainerView(
        {as = 'div', role = 'listbox', children, id, className, fixedHeight, extraProps, qa, style},
        ref,
    ) {
        return (
            <Flex
                qa={qa}
                as={as}
                direction="column"
                ref={ref}
                grow
                tabIndex={-1}
                id={id}
                role={role}
                style={style}
                className={b({'fixed-height': fixedHeight}, className)}
                {...extraProps}
            >
                {children}
            </Flex>
        );
    },
);
