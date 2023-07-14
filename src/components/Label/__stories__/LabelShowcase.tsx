import React from 'react';

import {Check, Gear} from '@gravity-ui/icons';
import block from 'bem-cn-lite';

import {Icon as IconComponent} from '../../Icon';
import {Label} from '../Label';
import type {LabelProps} from '../Label';

import './LabelShowcase.scss';

const b = block('label-showcase');
type WithKey<T> = T & {key: React.Key};

const icons = {
    '-': undefined,
    TickIcon: <IconComponent size={12} data={Check} />,
    GearIcon: <IconComponent size={12} data={Gear} />,
};

export function LabelShowcase(args: LabelProps) {
    const themes = ['normal', 'info', 'danger', 'warning', 'success', 'unknown', 'clear'] as const;
    const sizes = ['xs', 's', 'm'] as const;

    const getLabel = ({...props}: WithKey<LabelProps>) => <Label {...props} />;

    const section = (props: LabelProps) => {
        const cases: LabelProps[] = [
            {children: 'Label', icon: icons['TickIcon'], type: 'default'},
            {children: 'Label', type: 'default'},
            {children: 'Label', icon: icons['TickIcon'], type: 'copy'},
            {children: 'Label', type: 'copy'},
            {children: 'Label', icon: icons['TickIcon'], type: 'close'},
            {children: 'Label', type: 'close'},
            {children: 'Key', value: 'Value', icon: icons['TickIcon'], type: 'default'},
            {children: 'Key', value: 'Value', type: 'default'},
            {children: 'Key', value: 'Value', icon: icons['TickIcon'], type: 'copy'},
            {children: 'Key', value: 'Value', type: 'copy'},
            {children: 'Key', value: 'Value', icon: icons['TickIcon'], type: 'close'},
            {children: 'Key', value: 'Value', type: 'close'},
            {icon: icons['TickIcon']},
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
                    <h1 key={`${theme}-header`}>{theme}</h1>
                ))}
                {sizes.map((size) => (
                    <React.Fragment key={size}>
                        <h1>{size}</h1>
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
