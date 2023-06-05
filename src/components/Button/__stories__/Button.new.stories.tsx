import React from 'react';

import type {Meta, Story} from '@storybook/react';

import {Icon} from '../../Icon';
import {GearIcon} from '../../icons/GearIcon';
import {Button} from '../Button';

import Docs from './Button.docs.mdx';

export default {
    title: 'Components/Basic/Button',
    id: 'components/Button',
    argTypes: {
        view: {
            options: [
                'normal',
                'action',
                'outlined',
                'outlined-info',
                'outlined-danger',
                'raised',
                'flat',
                'flat-info',
                'flat-danger',
                'flat-secondary',
                'normal-contrast',
                'outlined-contrast',
                'flat-contrast',
            ],
            control: {type: 'select'},
            defaultValue: 'normal',
        },
        size: {
            options: ['xs', 's', 'm', 'l', 'xl'],
            control: {type: 'radio'},
            defaultValue: 'm',
        },
        state: {
            options: ['normal', 'disabled', 'loading', 'selected'],
            control: {type: 'radio'},
            defaultValue: 'normal',
        },
        width: {
            options: [undefined, 'auto', 'max'],
            control: {type: 'radio'},
            defaultValue: undefined,
        },
        content: {
            control: {type: 'text'},
            defaultValue: 'Button',
        },
        icon: {
            options: ['none', 'left', 'right', 'only'],
            control: {type: 'radio'},
            defaultValue: 'none',
        },
    },
    parameters: {
        order: -100,
        docs: {
            page: Docs,
        },
    },
} as Meta;

const iconSizeMap: Record<string, number> = {
    s: 16,
    m: 18,
    l: 22,
    xl: 26,
};

export const Playground: Story = (args) => {
    const content = [args.content];
    const icon = <Icon data={GearIcon} size={iconSizeMap[args.size]} />;

    if (args.icon === 'left') {
        content.unshift(icon);
    } else if (args.icon === 'right') {
        content.push(icon);
    } else if (args.icon === 'only') {
        content.splice(0, 1, icon);
    }

    return (
        <Button
            view={args.state === 'selected' ? 'normal' : args.view}
            size={args.size}
            disabled={args.state === 'disabled'}
            loading={args.state === 'loading'}
            selected={args.state === 'selected'}
            width={args.width}
        >
            {content}
        </Button>
    );
};
Playground.storyName = 'Button';
