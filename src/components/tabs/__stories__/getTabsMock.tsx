import type * as React from 'react';

import {Flame, SquarePlus, SquareXmark} from '@gravity-ui/icons';

import {Icon} from '../../Icon';
import {Flex} from '../../layout';
import type {TabProps} from '../types';

type StoryParams = {
    withIcon?: boolean;
    withCounter?: boolean;
    withLabel?: boolean;
    withLink?: boolean;
    withCustomChildren?: boolean;
    withTitle?: boolean;
};

const gearIcon = <Flame width={18} height={18} />;

export function getTabsMock(args: StoryParams): TabProps[] {
    const {withTitle = true} = args;
    return [
        {
            value: 'first',
            title: withTitle ? 'First Tab' : undefined,
            children: args.withCustomChildren ? <RenderWithWrap title="First Tab" /> : 'First Tab',
            icon: args.withIcon ? gearIcon : undefined,
            counter: args.withCounter ? Math.floor(Math.random() * 5 + 1) : undefined,
            label: args.withLabel ? {content: 'Normal', theme: 'normal'} : undefined,
            href: args.withLink ? 'https://gravity-ui.com' : undefined,
        },
        {
            value: 'active',
            title: withTitle ? 'Active Tab' : undefined,
            children: args.withCustomChildren ? (
                <RenderWithWrap title="Active Tab" />
            ) : (
                'Active Tab'
            ),
            icon: args.withIcon ? gearIcon : undefined,
            counter: args.withCounter ? Math.floor(Math.random() * 5 + 1) : undefined,
            label: args.withLabel ? {content: 'Warning', theme: 'warning'} : undefined,
            href: args.withLink ? 'https://gravity-ui.com/components' : undefined,
        },
        {
            value: 'disabled',
            title: withTitle ? 'disabled' : undefined,
            children: args.withCustomChildren ? (
                <RenderWithWrap title="Disabled Tab" />
            ) : (
                'Disabled Tab'
            ),
            icon: args.withIcon ? gearIcon : undefined,
            counter: args.withCounter ? Math.floor(Math.random() * 5 + 1) : undefined,
            label: args.withLabel ? {content: 'Danger', theme: 'danger'} : undefined,
            disabled: true,
            href: args.withLink ? 'https://gravity-ui.com/components/uikit/tabs' : undefined,
        },
        {
            value: 'fourth',
            title: withTitle ? 'Fourth Long Text To Show Tab' : undefined,
            children: args.withCustomChildren ? (
                <RenderWithWrap title="Fourth Long Text To Show Tab" />
            ) : (
                'Fourth Long Text To Show Tab'
            ),
            icon: args.withIcon ? gearIcon : undefined,
            counter: args.withCounter ? Math.floor(Math.random() * 5 + 1) : undefined,
            label: args.withLabel ? {content: 'Warning', theme: 'warning'} : undefined,
            href: args.withLink ? 'https://gravity-ui.com' : undefined,
        },
        {
            value: 'fifth',
            title: withTitle ? 'One More Long Text Tab To Show' : undefined,
            children: args.withCustomChildren ? (
                <RenderWithWrap title="One More Long Text Tab To Show" />
            ) : (
                'One More Long Text Tab To Show'
            ),
            icon: args.withIcon ? gearIcon : undefined,
            counter: args.withCounter ? Math.floor(Math.random() * 5 + 1) : undefined,
            label: args.withLabel ? {content: 'Warning', theme: 'warning'} : undefined,
            href: args.withLink ? 'https://gravity-ui.com' : undefined,
        },
    ];
}

const RenderWithWrap = (props: {title: string | React.ReactNode}) => {
    const {title} = props;
    return (
        <Flex alignItems="center" gap={1}>
            <Icon data={SquarePlus} size={16} />

            <span
                style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 'calc(100px - 20px - 20px)',
                    display: 'inline-block',
                    verticalAlign: 'bottom',
                }}
                title={typeof title === 'string' ? title : undefined}
            >
                {title}
            </span>
            <Icon data={SquareXmark} size={16} />
        </Flex>
    );
};
