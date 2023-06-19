import React from 'react';

import {Check, Gear} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react';
import block from 'bem-cn-lite';

import {Icon as IconComponent} from '../../Icon';
import {Link} from '../../Link';
import {Label} from '../Label';
import type {LabelProps} from '../Label';

import {LabelShowcase} from './LabelShowcase';

import './Label.stories.scss';

const b = block('label-stories');

const icons = {
    '-': undefined,
    TickIcon: <IconComponent size={12} data={Check} />,
    GearIcon: <IconComponent size={12} data={Gear} />,
};

export default {
    title: 'Components/Label',
    component: Label,
    args: {
        children: '',
    },
    argTypes: {
        icon: {
            control: {type: 'select'},
            mapping: icons,
            options: Object.keys(icons),
        },
        children: {
            control: {type: 'text'},
        },
        copyText: {
            control: {type: 'text'},
            defaultValue: '',
        },
    },
} as Meta;

const Template: StoryFn<LabelProps> = (args) => <Label {...args} />;

export const Default = Template.bind({});

Default.args = {
    children: 'Default',
};

const ThemeTemplate: StoryFn<LabelProps> = (args) => {
    return (
        <div className={b()}>
            <Label {...args} theme="normal">
                normal
            </Label>
            <Label {...args} theme="info">
                info
            </Label>
            <Label {...args} theme="success">
                success
            </Label>
            <Label {...args} theme="warning">
                warning
            </Label>
            <Label {...args} theme="danger">
                danger
            </Label>
            <Label {...args} theme="unknown">
                unknown
            </Label>
            <Label {...args} theme="clear">
                clear
            </Label>
        </div>
    );
};

export const Theme = ThemeTemplate.bind({});

const SizeTemplate: StoryFn<LabelProps> = (args) => {
    return (
        <div className={b()}>
            <Label {...args} size="xs">
                xs
            </Label>
            <Label {...args} size="s">
                s
            </Label>
            <Label {...args} size="m">
                m
            </Label>
        </div>
    );
};

export const Size = SizeTemplate.bind({});

const IconTemplate: StoryFn<LabelProps> = (args) => {
    return <Label {...args} />;
};

export const Icon = IconTemplate.bind({});

Icon.args = {
    icon: 'TickIcon',
};

export const Interactions: StoryFn<LabelProps> = (args) => (
    <div style={{display: 'flex', flexFlow: 'column', gap: 10}}>
        <div>
            <Label {...args}>No interactions</Label>
        </div>
        <div>
            <Label
                {...args}
                onClick={() => {
                    console.log('click');
                }}
            >
                Clickable
            </Label>
        </div>
        <div>
            <Label {...args} type={'copy'} copyText={'copyText'}>
                Copy
            </Label>
        </div>
        <div>
            <Label
                {...args}
                type={'close'}
                onClose={() => {
                    console.log('close');
                }}
            >
                Close
            </Label>
        </div>
        <div>
            <Link href={'https://ya.ru'} target={'_blank'}>
                <Label {...args}>Link</Label>
            </Link>
        </div>
        <div>
            <Link href={'https://ya.ru'} target={'_blank'}>
                <Label {...args} interactive>
                    Link interactive
                </Label>
            </Link>
        </div>
        <div>
            <Label
                {...args}
                type={'close'}
                theme={'unknown'}
                onClick={() => {
                    console.log('click');
                }}
                onClose={() => {
                    console.log('close');
                }}
            >
                Click and Close
            </Label>
        </div>
    </div>
);

const ShowcaseTemplate: StoryFn = () => <LabelShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.args = {
    interactive: true,
};
