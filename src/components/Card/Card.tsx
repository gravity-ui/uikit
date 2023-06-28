import React from 'react';

import {KeyCode} from '../constants';
import {block} from '../utils/cn';
import {useForkRef} from '../utils/useForkRef';

import './Card.scss';

const b = block('card');

type SelectionCardView = 'outlined' | 'clear';
type ContainerCardView = 'outlined' | 'filled' | 'raised';

export type CardType = 'selection' | 'action' | 'container';
export type CardTheme = 'normal' | 'info' | 'positive' | 'warning' | 'danger';
export type CardView = SelectionCardView | ContainerCardView;
export type CardSize = 'm' | 'l';

export interface CardProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
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
    /** Card's size affects on available properties*/
    size?: CardSize;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
    const {
        type = 'container',
        theme,
        view,
        size = 'm',
        children,
        className,
        onClick,
        disabled,
        selected,
        style,
    } = props;

    const cardRef = React.useRef<HTMLDivElement>(null);
    const handleRef = useForkRef(ref, cardRef);

    const isTypeAction = type === 'action';
    const isTypeSelection = type === 'selection';
    const isTypeContainer = type === 'container';

    /* Clickable card — only with type 'action' or 'selection' and not selected or disabled */
    const hasAction = isTypeAction || isTypeSelection;
    const isClickable = hasAction && Boolean(onClick) && !(disabled || selected);

    /* Theme only with type 'container' */
    const defaultTheme = isTypeContainer ? 'normal' : undefined;
    /* View only with type 'container' and 'selection' */
    const defaultView = isTypeContainer || isTypeSelection ? 'outlined' : undefined;

    const handleClick = isClickable ? onClick : undefined;

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
        switch (event.key) {
            case KeyCode.SPACEBAR:
                event.preventDefault();

                if (isClickable) {
                    cardRef.current?.click();
                }
                break;
        }
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            style={style}
            ref={handleRef}
            className={b(
                {
                    theme: theme || defaultTheme,
                    view: view || defaultView,
                    type,
                    selected,
                    size,
                    disabled,
                    clickable: isClickable,
                },
                className,
            )}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={isClickable ? 0 : -1}
        >
            {children}
        </div>
    );
});
