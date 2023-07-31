import React from 'react';

import type {QAProps} from '../types';
import {block} from '../utils/cn';

import {TocItem} from './TocItem/TocItem';
import type {TocItem as TocItemType} from './types';

import './Toc.scss';

const b = block('toc');

export interface TocProps extends QAProps {
    className?: string;
    value: string;
    onUpdate: (value: string) => void;
    items: (TocItemType & {
        items?: TocItemType[];
    })[];
}

export const Toc = React.forwardRef<HTMLDivElement, TocProps>(function Toc(props, ref) {
    const {value: activeValue, items, className, onUpdate, qa} = props;

    return (
        <div className={b(null, className)} ref={ref} data-qa={qa}>
            <div className={b('sections')}>
                {items.map(({value, title, items: childrenItems}) => (
                    <React.Fragment key={value}>
                        <TocItem
                            title={title}
                            value={value}
                            active={activeValue === value}
                            onClick={onUpdate}
                        />
                        {childrenItems?.map(({value: childrenValue, title: childrenTitle}) => (
                            <TocItem
                                key={childrenValue}
                                title={childrenTitle}
                                value={childrenValue}
                                childItem={true}
                                active={activeValue === childrenValue}
                                onClick={onUpdate}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
});
