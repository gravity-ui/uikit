import React from 'react';

import {Check, Gear} from '@gravity-ui/icons';

import {Icon as IconComponent} from '../../Icon';
import {cn} from '../../utils/cn';
import {Label} from '../Label';
import type {LabelProps} from '../Label';

import './LabelShowcase.scss';

const b = cn('label-showcase');
type WithKey<T> = T & {key: React.Key};

const icons = (id: 'TickIcon' | 'GearIcon' | '-', size: 'xs' | 's' | 'm' = 'xs') => {
    const sizes = {xs: 12, s: 14, m: 16} as const;

    return {
        '-': undefined,
        TickIcon: <IconComponent size={sizes[size]} data={Check} />,
        GearIcon: <IconComponent size={sizes[size]} data={Gear} />,
    }[id];
};

export function LabelShowcase(args: LabelProps) {
    const themes = ['normal', 'info', 'danger', 'warning', 'success', 'unknown', 'clear'] as const;
    const sizes = ['xs', 's', 'm'] as const;

    const getLabel = ({...props}: WithKey<LabelProps>) => <Label {...props} />;

    const section = (props: LabelProps) => {
        const cases: LabelProps[] = [
            {children: 'Label', icon: icons('TickIcon', props.size), type: 'default'},
            {children: 'Label', type: 'default'},
            {
                children: 'Label',
                icon: icons('TickIcon', props.size),
                type: 'copy',
            },
            {children: 'Label', type: 'copy'},
            {
                children: 'Label',
                icon: icons('TickIcon', props.size),
                type: 'close',
            },
            {children: 'Label', type: 'close'},
            {
                children: 'Key',
                value: 'Value',
                icon: icons('TickIcon', props.size),
                type: 'default',
            },
            {children: 'Key', value: 'Value', type: 'default'},
            {
                children: 'Key',
                value: 'Value',
                icon: icons('TickIcon', props.size),
                type: 'copy',
            },
            {children: 'Key', value: 'Value', type: 'copy'},
            {
                children: 'Key',
                value: 'Value',
                icon: icons('TickIcon', props.size),
                type: 'close',
            },
            {children: 'Key', value: 'Value', type: 'close'},
            {icon: icons('TickIcon', props.size)},
        ];
        return cases.map((label, i) => getLabel({key: i, ...props, ...label}));
    };

    return (
        <div className={b()}>
            <div
                className="grid"
                style={{gridTemplateColumns: `repeat(${1 + themes.length}, 1fr)`}}
            >
                <div></div>
                {themes.map((theme) => (
                    <div key={`${theme}-header`} className="header">
                        {theme}
                    </div>
                ))}
                {sizes.map((size) => (
                    <React.Fragment key={size}>
                        <div className="header">{size}</div>
                        {themes.map((theme) => (
                            <div key={theme} className="section">
                                {section({theme, size, ...args})}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
