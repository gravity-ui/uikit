import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Checkbox} from '../Checkbox';
import type {CheckboxProps} from '../Checkbox';

import {CheckboxShowcase} from './CheckboxShowcase';

export default {
    title: 'Components/Checkbox',
    component: Checkbox,
} as Meta;

const DefaultTemplate: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} />;
export const Default = DefaultTemplate.bind({});

const SizeTemplate: StoryFn<CheckboxProps> = (args) => (
    <React.Fragment>
        m: <Checkbox {...args} size="m" />
        <span style={{margin: '16px'}} />
        l: <Checkbox {...args} size="l" />
    </React.Fragment>
);
export const Size = SizeTemplate.bind({});

const DisabledTemplate: StoryFn<CheckboxProps> = (args) => (
    <React.Fragment>
        <Checkbox {...args} defaultChecked disabled content="Disabled checked" />
        <span style={{margin: '16px'}} />
        <Checkbox disabled content="Disabled" />
    </React.Fragment>
);
export const Disabled = DisabledTemplate.bind({});

const IndeterminateTemplate: StoryFn<CheckboxProps> = (args) => (
    <Checkbox {...args} indeterminate />
);
export const Indeterminate = IndeterminateTemplate.bind({});

const LabelTemplate: StoryFn<CheckboxProps> = (args) => (
    <React.Fragment>
        <Checkbox {...args} size="m" content="content m" />
        <span style={{margin: '16px'}} />
        <Checkbox {...args} size="l" content="content l" />
        <div style={{width: 200, marginTop: 10}}>
            <Checkbox {...args} size="m" style={{width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>Full</span>
                    <span>width</span>
                    <span>content</span>
                </div>
            </Checkbox>
        </div>
    </React.Fragment>
);
export const Label = LabelTemplate.bind({});

const ControlledTemplate: StoryFn<CheckboxProps> = (args) => (
    <React.Fragment>
        <Checkbox {...args} content="Controlled checked" checked />
        <span style={{margin: '16px'}} />
        <Checkbox {...args} content="Controlled unchecked" checked={false} />
    </React.Fragment>
);
export const Controlled = ControlledTemplate.bind({});

const ShowcaseTemplate: StoryFn = () => <CheckboxShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
