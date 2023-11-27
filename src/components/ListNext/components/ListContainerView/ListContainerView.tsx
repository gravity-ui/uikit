import React from 'react';

import {Flex} from '../../../layout';
import {block} from '../../../utils/cn';

import './ListContainerView.scss';

const b = block('list-container-view');

export interface ListContainerViewProps {
    id?: string;
    className?: string;
    virtualized?: boolean;
    children: React.ReactNode;
}

export const ListContainerView = React.forwardRef<HTMLDivElement, ListContainerViewProps>(
    function ListContainerView({children, id, className, virtualized, ...props}, ref) {
        return (
            <Flex
                as="div"
                direction="column"
                ref={ref}
                grow
                tabIndex={-1}
                id={id}
                role="listbox"
                className={b({virtualized}, className)}
                {...props}
            >
                {children}
            </Flex>
        );
    },
);
