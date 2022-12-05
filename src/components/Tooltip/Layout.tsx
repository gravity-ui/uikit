import React, {ReactNode} from 'react';
import {block} from '../utils/cn';
import type {DOMProps, QAProps} from '../types';
import {HotKey, HotKeyProps} from '../HotKey';

import './Layout.scss';

const b = block('tooltip-layout');

export interface TooltipLayoutProps extends DOMProps, QAProps {
    title: string;
    hotkey?: HotKeyProps['value'];
    description?: ReactNode;
}

export const TooltipLayout: React.FC<TooltipLayoutProps> = function TooltipLayout(props) {
    const {title, hotkey, description, className, style, qa} = props;
    return (
        <div className={b(null, className)} style={style} data-qa={qa}>
            <div className={b('heading')}>
                <div className={b('title')}>{title}</div>
                {hotkey && <HotKey value={hotkey} className={b('hotkey')} />}
            </div>
            {description && <div className={b('description')}>{description}</div>}
        </div>
    );
};
