import React, {useMemo} from 'react';
import {block} from '../utils/cn';
import {Label, LabelProps} from '../Label';

const b = block('tabs');

export interface TabsItemProps {
    id: string;
    title: string | React.ReactNode;
    meta?: string;
    hint?: string;
    active?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    counter?: number;
    label?: {
        content: React.ReactNode;
        theme?: LabelProps['theme'];
    };
    onClick(tabId: string): void;
}

export const TabsItem: React.FC<TabsItemProps> = ({
    id,
    title,
    meta,
    hint,
    icon,
    counter,
    label,
    active,
    disabled,
    onClick,
}) => {
    const handleClick = () => {
        onClick(id);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === ' ') {
            onClick(id);
        }
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
        <div
            role="tab"
            aria-selected={active === true}
            aria-disabled={disabled === true}
            tabIndex={disabled ? -1 : 0}
            className={b('item', {active, disabled})}
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
};
