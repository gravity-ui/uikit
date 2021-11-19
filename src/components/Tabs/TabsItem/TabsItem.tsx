import React, {useMemo} from 'react';
import {block} from '../../utils/cn';
import {TabsDirection} from '../Tabs';
import './TabsItem.scss';

const b = block('tabs-item');

export interface TabsItemProps {
    id: string;
    title: string | React.ReactNode;
    meta?: string;
    hint?: string;
    active?: boolean;
    disabled?: boolean;
    direction: TabsDirection;
    onClick(tabId: string): void;
}

export const TabsItem: React.FC<TabsItemProps> = ({
    id,
    title,
    meta,
    hint,
    active,
    disabled,
    direction,
    onClick,
}) => {
    const handleClick = () => {
        onClick(id);
    };

    const htmlTitle = useMemo(() => {
        if (hint !== undefined) {
            return hint;
        }

        if (typeof title === 'string') {
            return title;
        }

        return undefined;
    }, [hint, title]);

    return (
        <div className={b({active, disabled, direction})} title={htmlTitle} onClick={handleClick}>
            <div className={b('title')}>{title || id}</div>

            {direction === TabsDirection.Vertical && meta && (
                <div className={b('meta')}>{meta}</div>
            )}
        </div>
    );
};
