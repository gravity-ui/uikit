import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {block} from '../../utils/cn';
import {Toc, TocProps} from '../Toc';

import './Toc.stories.scss';

const b = block('toc-stories');

export default {
    title: 'Components/Toc',
    component: Toc,
    argTypes: {},
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
            title: 'Virtual machine creation',
        },
        {
            value: 'info',
            title: 'Getting information about a group of virtual machines',
        },
        {
            value: 'disk',
            title: 'Disk',
            items: [
                {
                    value: 'control',
                    title: 'Disk controls',
                },
                {
                    value: 'snapshots',
                    title: 'Disk snapshots',
                },
            ],
        },
        {
            value: 'images',
            title: 'Images with preinstalled software',
        },
    ],
    className: b(),
};
