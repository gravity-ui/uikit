import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {block} from '../../utils/cn';
import {Toc} from '../Toc';
import type {TocProps} from '../Toc';

import './Toc.stories.scss';

const b = block('toc-stories');

export default {
    title: 'Components/Navigation/Toc',
    component: Toc,
    argTypes: {},
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<TocProps> = (args) => {
    const [active, setActive] = React.useState('control');

    return <Toc {...args} value={active} onUpdate={(value: string) => setActive(value)} />;
};

export const Default = DefaultTemplate.bind({});
Default.args = {
    items: [
        {
            value: 'vm',
            content: 'Virtual machine creation',
        },
        {
            value: 'info',
            content: 'Getting information about a group of virtual machines',
        },
        {
            value: 'disk',
            content: 'Disk',
            items: [
                {
                    value: 'control',
                    content: 'Disk controls',
                    items: [
                        {
                            value: 'floppy',
                            content: 'Floppy',
                        },
                        {
                            value: 'hard',
                            content: 'Hard',
                            items: [],
                        },
                    ],
                },
                {
                    value: 'snapshots',
                    content: 'Disk snapshots',
                    items: [
                        {
                            value: 'standard',
                            content: 'Standard',
                        },
                    ],
                },
            ],
        },
        {
            value: 'images',
            content: 'Images with preinstalled software',
        },
    ],
    className: b(),
};

const WithLinksTemplate: StoryFn<TocProps> = (args) => {
    const [active, setActive] = React.useState('control');

    return <Toc {...args} value={active} onUpdate={(value: string) => setActive(value)} />;
};

export const WithLinks = WithLinksTemplate.bind({});
WithLinks.args = {
    items: [
        {
            value: 'vm',
            content: 'Virtual machine creation',
            href: '#vm',
        },
        {
            value: 'info',
            content: 'Getting information about a group of virtual machines',
            href: '#info',
        },
        {
            value: 'disk',
            content: 'Disk',
            href: '#disk',
            items: [
                {
                    value: 'control',
                    content: 'Disk controls',
                    href: '#control',
                },
                {
                    value: 'snapshots',
                    content: 'Disk snapshots',
                    href: '#snapshots',
                },
            ],
        },
        {
            value: 'images',
            content: 'Images with preinstalled software',
            href: '#images',
        },
    ],
    className: b(),
};
