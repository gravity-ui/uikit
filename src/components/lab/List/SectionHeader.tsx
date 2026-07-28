import * as React from 'react';

import type {QAProps} from '../../types';
import {block} from '../../utils/cn';

import type {ListSize} from './types';

import './SectionHeader.scss';

const b = block('list-v2-section-header');

export interface ListSectionHeaderProps extends React.HTMLAttributes<HTMLDivElement>, QAProps {
    size?: ListSize;
    children?: React.ReactNode;
}

/** A purely presentational section header of the list */
export const ListSectionHeader = React.forwardRef<HTMLDivElement, ListSectionHeaderProps>(
    function ListSectionHeader({size = 'm', className, qa, children, ...restProps}, ref) {
        return (
            <div ref={ref} {...restProps} data-qa={qa} className={b({size}, className)}>
                {children}
            </div>
        );
    },
);
