import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Label, LabelProps} from '../Label';
import {Link} from '../../Link';

export default {
    title: 'Components/Label',
    component: Label,
} as Meta;

const Template: Story<LabelProps> = (args: any) => <Label {...args}>Default</Label>;

export const Default = Template.bind({});

const ThemeTemplate: Story<LabelProps> = (args: any) => {
    return (
        <>
            <Label {...args} theme="normal">
                normal
            </Label>
            <Label {...args} theme="info">
                info
            </Label>
            <Label {...args} theme="danger">
                danger
            </Label>
            <Label {...args} theme="warning">
                warning
            </Label>
            <Label {...args} theme="unknown">
                unknown
            </Label>
        </>
    );
};

export const Theme = ThemeTemplate.bind({});

const SizeTemplate: Story<LabelProps> = (args: any) => {
    return (
        <>
            <Label {...args} size="s">
                xs
            </Label>
            <Label {...args} size="m">
                s
            </Label>
        </>
    );
};

export const Size = SizeTemplate.bind({});

const StyleTemplate: Story<LabelProps> = (args) => {
    return (
        <>
            <Label {...args} style="default">
                default
            </Label>
            <Label {...args} style="rounded">
                rounded
            </Label>
        </>
    );
};

export const Style = StyleTemplate.bind({});

export const Interactions: Story<LabelProps> = () => (
    <div style={{display: 'flex', flexFlow: 'column', gap: 10}}>
        <div>
            <Label>No interactions</Label>
        </div>
        <div>
            <Label
                onClick={() => {
                    console.log('click');
                }}
            >
                Clickable
            </Label>
        </div>
        <div>
            <Label type={'copy'} copyText={'copyText'}>
                Copy
            </Label>
        </div>
        <div>
            <Label type={'close'}>Close</Label>
        </div>
        <div>
            <Link href={'https://ya.ru'} target={'_blank'}>
                <Label>Link</Label>
            </Link>
        </div>
        <div>
            <Link href={'https://ya.ru'} target={'_blank'}>
                <Label interactive>Link interactive</Label>
            </Link>
        </div>
    </div>
);
