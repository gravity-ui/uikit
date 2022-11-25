import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Label, LabelProps} from '../Label';
import {Link} from '../../Link';
import {Icon as IconComponent} from '../../Icon';
import {Tick as TickIcon} from '../../icons/Tick';
import {GearIcon} from '../../icons/GearIcon';

import './Label.stories.scss';

const icons = {
    '-': undefined,
    TickIcon: <IconComponent size={12} data={TickIcon} />,
    GearIcon: <IconComponent size={12} data={GearIcon} />,
};

export default {
    title: 'Components/Label',
    component: Label,
    argTypes: {
        icon: {
            control: {type: 'select'},
            mapping: icons,
            options: Object.keys(icons),
        },
        children: {
            control: {type: 'text'},
            defaultValue: '',
        },
    },
} as Meta;

const Template: Story<LabelProps> = (args) => <Label {...args} />;

export const Default = Template.bind({});

Default.args = {
    children: 'Default',
};

const ThemeTemplate: Story<LabelProps> = (args) => {
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
        </div>
    );
};

export const Theme = ThemeTemplate.bind({});

const SizeTemplate: Story<LabelProps> = (args) => {
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

const StyleTemplate: Story<LabelProps> = (args) => {
    return (
        <div className="label-stories">
            <Label {...args} style="default">
                default
            </Label>
            <Label {...args} style="rounded">
                rounded
            </Label>
        </div>
    );
};

export const Style = StyleTemplate.bind({});

const IconTemplate: Story<LabelProps> = (args) => {
    return <Label {...args} />;
};

export const Icon = IconTemplate.bind({});

Icon.args = {
    icon: 'TickIcon',
};

export const Interactions: Story<LabelProps> = (args) => (
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
                size="xs"
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
