import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Icon as IconComponent} from '../../Icon';
import {Link} from '../../Link';
import {GearIcon} from '../../icons/GearIcon';
import {Tick as TickIcon} from '../../icons/Tick';
import {Label} from '../Label';
import type {LabelProps} from '../Label';

import './Label.stories.scss';

const icons = {
    '-': undefined,
    TickIcon: <IconComponent size={12} data={TickIcon} />,
    GearIcon: <IconComponent size={12} data={GearIcon} />,
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
        <div className="label-stories">
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
        <div className="label-stories">
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

type WithKey<T> = T & {key: React.Key};

const themes = ['normal', 'info', 'danger', 'warning', 'success', 'unknown', 'clear'] as const;
const sizes = ['xs', 's', 'm'] as const;

const getLabel = ({...args}: WithKey<LabelProps>) => <Label {...args}></Label>;

const section = (args: LabelProps) => {
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
    return cases.map((label, i) => getLabel({key: i, ...args, ...label}));
};

const KeyValuesTemplate: StoryFn<LabelProps> = (args) => (
    <div className="label-stories">
        <div className="grid" style={{gridTemplateColumns: `repeat(${1 + themes.length}, 1fr)`}}>
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

export const Showcase = KeyValuesTemplate.bind({});

Showcase.args = {
    interactive: true,
};
