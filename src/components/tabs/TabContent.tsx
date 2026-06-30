import {Label} from '../Label';

import {bTab} from './constants';
import type {TabProps} from './types';

type TabContentProps = Pick<
    Extract<TabProps, {href?: never; component?: never}>,
    'icon' | 'children' | 'value' | 'counter' | 'label'
>;

export function TabContent({icon, children, value, counter, label}: TabContentProps) {
    return (
        <div className={bTab('content')}>
            {icon && <div className={bTab('icon')}>{icon}</div>}
            <div className={bTab('title')}>{children || value}</div>
            {counter !== undefined && <div className={bTab('counter')}>{counter}</div>}
            {label && (
                <Label className={bTab('label')} theme={label.theme}>
                    {label.content}
                </Label>
            )}
        </div>
    );
}
