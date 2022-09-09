import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Icon} from '../../Icon';
import {GearIcon} from '../../icons';
import {Label, LabelProps} from '../Label';

export default {
    title: 'Components/Basic/Label',
    id: 'components/Label',
    argTypes: {
        size: {
            options: ['s', 'm'],
            control: {type: 'inline-radio'},
            defaultValue: 'm',
        },

        theme: {
            options: ['normal', 'unknown', 'info', 'success', 'warning', 'danger'],
            control: {type: 'radio'},
            defaultValue: 'normal',
        },

        state: {
            options: [
                'Only text',
                'Icon before text',
                'Icon after text',
                'Icons before and after text',
                'Only icon',
            ],
            control: {type: 'select'},
            defaultValue: 'Only text',
        },

        interactions: {
            options: ['default', 'interactive', 'disabled', 'clickable', 'copy', 'close'],
            control: {type: 'radio'},
            defaultValue: 'text',
        },

        style: {
            options: ['default', 'rounded'],
            control: {type: 'radio'},
            defaultValue: 'default',
        },

        content: {
            control: {type: 'text'},
            defaultValue: 'Default',
        },
    },
    parameters: {
        order: -100,
    },
} as Meta;

const iconSizeMap: Record<string, number> = {
    s: 16,
    m: 18,
};

export const Playground: Story = (args) => {
    const renderedIcon = <Icon data={GearIcon} size={iconSizeMap[args.size]} />;
    let type: LabelProps['type'];
    let copyText,
        disabled = false,
        interactive = false,
        icon,
        content = args.content;

    switch (args.state) {
        case 'Icon before text':
            icon = renderedIcon;
            break;
        case 'Icons before and after text':
            icon = renderedIcon;
            type = 'copy';
            break;

        case 'Icon after text':
            type = 'copy';
            break;

        case 'Only icon':
            content = renderedIcon;
    }

    switch (args.interactions) {
        case 'interactive':
            interactive = true;
            break;

        case 'copy':
            type = 'copy';
            copyText = 'copy text';
            break;

        case 'disabled':
            disabled = true;
            break;

        case 'close':
            type = 'close';
            break;
    }

    return (
        <Label
            disabled={disabled}
            copyText={copyText}
            interactive={interactive}
            icon={icon}
            style={args.style}
            theme={args.theme}
            size={args.size}
            type={type}
        >
            {content}
        </Label>
    );
};
Playground.storyName = 'Label';
