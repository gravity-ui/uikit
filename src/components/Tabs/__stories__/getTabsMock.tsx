import {Flame} from '@gravity-ui/icons';

import type {TabsProps} from '../Tabs';

import type {StoryParams} from './types';

const gearIcon = <Flame width={18} height={18} />;

export function getTabsMock(args: StoryParams): TabsProps['items'] {
    return [
        {
            id: 'first',
            title: 'First Tab',
            icon: args.withIcon ? gearIcon : undefined,
            counter: args.withCounter ? Math.floor(Math.random() * 5 + 1) : undefined,
            label: args.withLabel ? {content: 'Normal', theme: 'normal'} : undefined,
            hasOverflow: args.withOverflow,
            extraProps: {
                style: {
                    maxWidth: args.withOverflow ? '100px' : 'auto',
                },
            },
            qa: '1',
        },
        {
            id: 'active',
            title: 'Active Tab',
            icon: args.withIcon ? gearIcon : undefined,
            counter: args.withCounter ? Math.floor(Math.random() * 5 + 1) : undefined,
            label: args.withLabel ? {content: 'Warning', theme: 'warning'} : undefined,
            hasOverflow: args.withOverflow,
            extraProps: {
                style: {
                    maxWidth: args.withOverflow ? '100px' : 'auto',
                },
            },
            qa: '2',
        },
        {
            id: 'disabled',
            title: 'Disabled Tab',
            icon: args.withIcon ? gearIcon : undefined,
            counter: args.withCounter ? Math.floor(Math.random() * 5 + 1) : undefined,
            label: args.withLabel ? {content: 'Danger', theme: 'danger'} : undefined,
            disabled: true,
            hasOverflow: args.withOverflow,
            extraProps: {
                style: {
                    maxWidth: args.withOverflow ? '100px' : 'auto',
                },
            },
            qa: '3',
        },
    ];
}
