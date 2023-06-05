import React from 'react';

import type {Meta, Story} from '@storybook/react';

import {Switch} from '../Switch';
import type {SwitchProps} from '../Switch';

import {SwitchShowcase} from './SwitchShowcase';

export default {
    title: 'Components/Switch',
    component: Switch,
} as Meta;

const DefaultTemplate: Story<SwitchProps> = (args) => <Switch {...args} />;
export const Default = DefaultTemplate.bind({});

const SizeTemplate: Story<SwitchProps> = (args) => (
    <React.Fragment>
        m: <Switch {...args} size="m" />
        <span style={{margin: '16px'}} />
        l: <Switch {...args} size="l" />
    </React.Fragment>
);
export const Size = SizeTemplate.bind({});

const DisabledTemplate: Story<SwitchProps> = (args) => (
    <React.Fragment>
        <Switch {...args} defaultChecked disabled content="Disabled checked" />
        <span style={{margin: '16px'}} />
        <Switch disabled content="Disabled" />
    </React.Fragment>
);
export const Disabled = DisabledTemplate.bind({});

const LabelTemplate: Story<SwitchProps> = (args) => (
    <React.Fragment>
        <Switch {...args} size="m" content="content m" />
        <span style={{margin: '16px'}} />
        <Switch {...args} size="l" content="content l" />
        <div style={{width: 200, marginTop: 10}}>
            <Switch {...args} size="m" style={{width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span>Full</span>
                    <span>width</span>
                    <span>content</span>
                </div>
            </Switch>
        </div>
    </React.Fragment>
);
export const Label = LabelTemplate.bind({});

const ControlledTemplate: Story<SwitchProps> = (args) => (
    <React.Fragment>
        <Switch {...args} content="Controlled checked" checked />
        <span style={{margin: '16px'}} />
        <Switch {...args} content="Controlled unchecked" checked={false} />
    </React.Fragment>
);
export const Controlled = ControlledTemplate.bind({});

const ShowcaseTemplate: Story = () => <SwitchShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
