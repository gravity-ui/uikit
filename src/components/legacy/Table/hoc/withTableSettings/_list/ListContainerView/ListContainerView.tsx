import * as React from 'react';

import {Flex} from '../../../../../../layout';
import {block} from '../../../../../../utils/cn';

import './ListContainerView.scss';

const b = block('list-container-view-legacy');

export interface ListContainerViewProps {
    id?: string;
    className?: string;
    children: React.ReactNode;
}

export const ListContainerView = React.forwardRef<HTMLDivElement, ListContainerViewProps>(
    function ListContainerView({children, id, className}, ref) {
        return (
            <Flex
                direction="column"
                ref={ref}
                grow
                tabIndex={-1}
                id={id}
                role="listbox"
                className={b(null, className)}
            >
                {children}
            </Flex>
        );
    },
);
