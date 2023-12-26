import React from 'react';

import type {QAProps} from 'src/components/types';

import {Flex} from '../../../layout';
import {block} from '../../../utils/cn';

import './ListContainerView.scss';

const b = block('list-container-view');

export interface ListContainerViewProps extends QAProps, React.HTMLAttributes<'div'> {
    id?: string;
    className?: string;
    /**
     * Removes `overflow: auto` from container and set fixed container size (`--g-list-height` = `300px`)
     */
    fixedHeight?: boolean;
    children: React.ReactNode;
}

export const ListContainerView = React.forwardRef<HTMLDivElement, ListContainerViewProps>(
    function ListContainerView(
        {role = 'listbox', children, id, className, fixedHeight, ...props},
        ref,
    ) {
        return (
            <Flex
                as="div"
                direction="column"
                ref={ref}
                grow
                tabIndex={-1}
                id={id}
                role={role}
                className={b({'fixed-height': fixedHeight}, className)}
                {...props}
            >
                {children}
            </Flex>
        );
    },
);
