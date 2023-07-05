import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {Tick as TickIcon} from '../../icons/Tick';
import {Disclosure} from '../Disclosure';
import type {DisclosureProps} from '../Disclosure';

import './Disclosure.stories.scss';

export default {
    title: 'Components/Disclosure',
    component: Disclosure,
    args: {
        children: 'Default content',
        summary: 'Default summary',
        size: 'xl',
        disabled: false,
        arrowPosition: 'left',
    },
} as Meta;

const DefaultTemplate: StoryFn<DisclosureProps> = (args) => <Disclosure {...args} />;

export const Default = DefaultTemplate.bind({});

const SizeTemplate: StoryFn<DisclosureProps> = (args) => {
    return (
        <div className="label-stories">
            <Disclosure {...args} size="m">
                m
            </Disclosure>
            <Disclosure {...args} size="l">
                l
            </Disclosure>
            <Disclosure {...args} size="xl">
                xl
            </Disclosure>
        </div>
    );
};

export const Size = SizeTemplate.bind({});

const ArrowPositionTemplate: StoryFn<DisclosureProps> = (args) => {
    return (
        <div className="label-stories">
            <Disclosure {...args} arrowPosition="left" />
            <Disclosure {...args} arrowPosition="right" />
        </div>
    );
};

export const ArrowPosition = ArrowPositionTemplate.bind({});

const CustomTemplate: StoryFn<DisclosureProps> = (args) => {
    return (
        <div className="label-stories">
            <Disclosure {...args}>
                <Disclosure.Summary>
                    {(props) => (
                        <Button {...props}>
                            <Icon data={TickIcon} size={14} />
                            Custom summary
                            <Icon data={TickIcon} size={14} />
                        </Button>
                    )}
                </Disclosure.Summary>
                <div>Custom details</div>
                <div>More custom details</div>
            </Disclosure>
            <Disclosure {...args}>
                <Disclosure.Summary>
                    {(props) => <Button {...props}>Without content</Button>}
                </Disclosure.Summary>
            </Disclosure>
        </div>
    );
};

export const Custom = CustomTemplate.bind({});
