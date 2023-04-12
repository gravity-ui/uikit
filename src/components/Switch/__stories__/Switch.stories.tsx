import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Switch, SwitchProps} from '../Switch';
import {SwitchShowcase} from './SwitchShowcase';

export default {
    title: 'Components/Switch',
    component: Switch,
} as Meta;

const DefaultTemplate: Story<SwitchProps> = (args) => <Switch {...args} />;
export const Default = DefaultTemplate.bind({});

const SizeTemplate: Story<SwitchProps> = (args) => (
    <>
        m: <Switch {...args} size="m" />
        <span style={{margin: '16px'}} />
        l: <Switch {...args} size="l" />
    </>
);
export const Size = SizeTemplate.bind({});

const DisabledTemplate: Story<SwitchProps> = (args) => (
    <>
        <Switch {...args} defaultChecked disabled content="Disabled checked" />
        <span style={{margin: '16px'}} />
        <Switch disabled content="Disabled" />
    </>
);
export const Disabled = DisabledTemplate.bind({});

const LabelTemplate: Story<SwitchProps> = (args) => (
    <>
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
    </>
);
export const Label = LabelTemplate.bind({});

const ControlledTemplate: Story<SwitchProps> = (args) => (
    <>
        <Switch {...args} content="Controlled checked" checked />
        <span style={{margin: '16px'}} />
        <Switch {...args} content="Controlled unchecked" checked={false} />
    </>
);
export const Controlled = ControlledTemplate.bind({});

const ShowcaseTemplate: Story = () => <SwitchShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
