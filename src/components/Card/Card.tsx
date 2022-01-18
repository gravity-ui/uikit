import React from 'react';
import {block} from '../utils/cn';

import './Card.scss';

const b = block('card');

type SelectionCardView = 'outlined' | 'clear';
type ContainerCardView = 'outlined' | 'filled' | 'raised';

export type CardType = 'selection' | 'action' | 'container';
export type CardTheme = 'normal' | 'info' | 'positive' | 'warning' | 'danger';
export type CardView = SelectionCardView | ContainerCardView;

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    /** Card click handler. Available for type: 'selection', 'action' */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Disabled card. Available for type: 'selection', 'action' */
    disabled?: boolean;
    /** Selected card. Available for type: 'selection' */
    selected?: boolean;
    /** Card's type affects on available properties */
    type?: CardType;
    /** Available for type: 'container' and 'selection' */
    view?: CardView;
    /** Card's base color. Available for type: 'container' */
    theme?: CardTheme;
}

export function Card({
    type = 'container',
    theme,
    view,
    children,
    className,
    onClick,
    disabled,
    selected,
}: CardProps) {
    const isTypeAction = type === 'action';
    const isTypeSelection = type === 'selection';
    const isTypeContainer = type === 'container';

    /* Clickable card — only with type 'action' or 'selection' and not selected or disabled */
    const hasAction = isTypeAction || isTypeSelection;
    const isClickable = hasAction && Boolean(onClick) && !(disabled || selected);

    /* Theme only with type 'conatiner' */
    const defaultTheme = isTypeContainer ? 'normal' : undefined;
    /* View only with type 'conatiner' and 'selection' */
    const defaultView = isTypeContainer || isTypeSelection ? 'outlined' : undefined;

    return (
        <div
            className={b(
                {
                    theme: theme || defaultTheme,
                    view: view || defaultView,
                    type,
                    selected,
                    disabled,
                    clickable: isClickable,
                },
                className,
            )}
            onClick={isClickable ? onClick : undefined}
        >
            {children}
        </div>
    );
}
