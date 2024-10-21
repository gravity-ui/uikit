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

type LabelShowcaseProps = LabelProps & {multiline?: boolean};

export function LabelShowcase({multiline, ...args}: LabelShowcaseProps) {
    const themes = multiline
        ? (['normal'] as const)
        : ([
              'normal',
              'info',
              'success',
              'warning',
              'danger',
              'utility',
              'unknown',
              'clear',
          ] as const);
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
                copyButtonLabel: 'Copy',
            },
            {children: 'Label', type: 'copy', copyButtonLabel: 'Copy'},
            {
                children: 'Label',
                icon: icons('TickIcon', props.size),
                type: 'close',
                closeButtonLabel: 'Close',
            },
            {children: 'Label', type: 'close', closeButtonLabel: 'Close'},
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
                copyButtonLabel: 'Copy',
            },
            {children: 'Key', value: 'Value', type: 'copy', copyButtonLabel: 'Copy'},
            {
                children: 'Key',
                value: 'Value',
                icon: icons('TickIcon', props.size),
                type: 'close',
                closeButtonLabel: 'Close',
            },
            {children: 'Key', value: 'Value', type: 'close', closeButtonLabel: 'Close'},
            {icon: icons('TickIcon', props.size)},
        ];
        const multilineCases: LabelProps[] = [
            {
                children: 'Multiline ',
                type: 'default',
                multiline: true,
            },
            {
                children: 'Multiline',
                icon: icons('TickIcon', props.size),
                type: 'default',
                multiline: true,
            },
            {
                children: 'Multiline',
                type: 'close',
                closeButtonLabel: 'Close',
                multiline: true,
            },
            {
                children: 'Multiline',
                icon: icons('TickIcon', props.size),
                type: 'close',
                closeButtonLabel: 'Close',
                multiline: true,
            },
            {
                children: 'Multiline label short',
                type: 'default',
                multiline: true,
            },
            {
                children: 'Multiline label short',
                icon: icons('TickIcon', props.size),
                type: 'default',
                multiline: true,
            },
            {
                children: 'Multiline label short',
                type: 'close',
                closeButtonLabel: 'Close',
                multiline: true,
            },
            {
                children: 'Multiline label short',
                icon: icons('TickIcon', props.size),
                type: 'close',
                closeButtonLabel: 'Close',
                multiline: true,
            },
            {
                children: 'Multiline label very-very long',
                type: 'default',
                multiline: true,
            },
            {
                children: 'Multiline label very-very long',
                icon: icons('TickIcon', props.size),
                type: 'default',
                multiline: true,
            },
            {
                children: 'Multiline label very-very long',
                type: 'close',
                closeButtonLabel: 'Close',
                multiline: true,
            },
            {
                children: 'Multiline label very-very long',
                icon: icons('TickIcon', props.size),
                type: 'close',
                closeButtonLabel: 'Close',
                multiline: true,
            },
            {
                children: 'Multiline key-value label: key',
                value: 'Multiline key-value label: value',
                icon: icons('TickIcon', props.size),
                type: 'close',
                closeButtonLabel: 'Close',
                multiline: true,
            },
        ];
        return (multiline ? multilineCases : cases).map((label, i) => (
            <div style={{width: 'auto'}} key={i}>
                {getLabel({key: i, ...props, ...label})}
            </div>
        ));
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
