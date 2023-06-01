import React from 'react';

import {Label} from '../Label';
import type {LabelProps} from '../Label';
import {block} from '../utils/cn';

import {TabsContext} from './TabsContext';

const b = block('tabs');

type ExtraProps = Omit<
    React.HTMLProps<HTMLDivElement>,
    | 'role'
    | 'aria-selected'
    | 'aria-disabled'
    | 'tabIndex'
    | 'className'
    | 'title'
    | 'onClick'
    | 'onKeyDown'
>;

export interface TabsItemProps {
    id: string;
    className?: string;
    title: string | React.ReactNode;
    meta?: string;
    hint?: string;
    active?: boolean;
    disabled?: boolean;
    hasOverflow?: boolean;
    icon?: React.ReactNode;
    counter?: number;
    label?: {
        content: React.ReactNode;
        theme?: LabelProps['theme'];
    };
    extraProps?: ExtraProps;
    onClick(tabId: string): void;
}

export function TabsItem({
    id,
    className,
    title,
    meta,
    hint,
    icon,
    counter,
    label,
    active,
    disabled,
    hasOverflow,
    extraProps,
    onClick,
}: TabsItemProps) {
    const {activeTabId} = React.useContext(TabsContext);
    const isActive = typeof active === 'boolean' ? active : activeTabId === id;

    const handleClick = () => {
        onClick(id);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === ' ') {
            onClick(id);
        }
    };

    const htmlTitle = React.useMemo(() => {
        if (hint !== undefined) {
            return hint;
        }

        if (typeof title === 'string') {
            return title;
        }

        return undefined;
    }, [hint, title]);

    return (
        <div
            {...extraProps}
            role="tab"
            aria-selected={isActive}
            aria-disabled={disabled === true}
            tabIndex={disabled ? -1 : 0}
            className={b(
                'item',
                {active: isActive, disabled, overflow: Boolean(hasOverflow)},
                className,
            )}
            title={htmlTitle}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <div className={b('item-content')}>
                {icon && <div className={b('item-icon')}>{icon}</div>}
                <div className={b('item-title')}>{title || id}</div>
                {typeof counter === 'number' && <div className={b('item-counter')}>{counter}</div>}
                {label && (
                    <Label className={b('item-label')} theme={label.theme}>
                        {label.content}
                    </Label>
                )}
            </div>
            {meta && <div className={b('item-meta')}>{meta}</div>}
        </div>
    );
}

TabsItem.displayName = 'Tabs.Item';
