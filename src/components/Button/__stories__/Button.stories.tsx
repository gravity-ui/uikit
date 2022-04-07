import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Button, ButtonProps} from '../Button';
import {Icon as IconComponent} from '../../Icon/Icon';
import {GearIcon} from '../../icons/GearIcon';
import {ButtonShowcase} from './ButtonShowcase';

export default {
    title: 'Components/Button',
    component: Button,
} as Meta;

const DefaultTemplate: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>;
export const Default = DefaultTemplate.bind({});

const SizeTemplate: Story<ButtonProps> = (args) => (
    <>
        <Button {...args} size="s">
            Size s
        </Button>
        <span style={{margin: '16px'}} />
        <Button {...args} size="m">
            Size m
        </Button>
        <span style={{margin: '16px'}} />
        <Button {...args} size="l">
            Size l
        </Button>
        <span style={{margin: '16px'}} />
        <Button {...args} size="xl">
            Size xl
        </Button>
    </>
);
export const Size = SizeTemplate.bind({});

const IconTemplate: Story<ButtonProps> = (args) => (
    <>
        <Button {...args}>No icon</Button>
        <span style={{margin: '16px'}} />
        <Button {...args}>
            <IconComponent data={GearIcon} size={18} />
            Left
        </Button>
        <span style={{margin: '16px'}} />
        <Button {...args}>
            Right
            <IconComponent data={GearIcon} size={18} />
        </Button>
        <span style={{margin: '16px'}} />
        <Button {...args}>
            <IconComponent data={GearIcon} size={18} />
            Both
            <IconComponent data={GearIcon} size={18} />
        </Button>
        <span style={{margin: '16px'}} />
        <Button {...args}>
            <Button.Icon side="right">
                <IconComponent data={GearIcon} size={18} />
            </Button.Icon>
            Both (with Button.Icon)
            <IconComponent data={GearIcon} size={18} />
        </Button>
        <span style={{margin: '16px'}} />
        <Button {...args}>
            <IconComponent data={GearIcon} size={18} />
        </Button>
        <span style={{margin: '16px'}} />
        <Button {...args}>
            <Button.Icon>
                <IconComponent data={GearIcon} size={18} />
            </Button.Icon>
        </Button>
    </>
);
export const Icon = IconTemplate.bind({});

export const Selected: Story<ButtonProps> = (args) => {
    const [selected, setSelected] = React.useState(true);

    return (
        <Button {...args} view="normal" selected={selected} onClick={() => setSelected(!selected)}>
            {`Button is ${selected ? 'on' : 'off'}`}
        </Button>
    );
};

export const Link: Story<ButtonProps> = (args) => {
    return (
        <Button {...args} view="normal" href={'//ya.ru'} target={'_blank'}>
            {`Open ya.ru`}
        </Button>
    );
};

export const ButtonInRouter: Story<ButtonProps> = (args) => {
    return (
        <a href={'https://ya.ru'} target={'_blank'} rel="noreferrer">
            <Button {...args} view="normal" component={'span'}>
                {`Open ya.ru`}
            </Button>
        </a>
    );
};

export const CustomComponent: Story<ButtonProps> = (args) => {
    const ButtonComponent = (props: ButtonProps) => {
        return <button {...props} style={{boxShadow: '2px 2px 2px 2px deepskyblue'}} />;
    };
    return (
        <Button {...args} view="normal" component={ButtonComponent}>
            {`Button with custom component`}
        </Button>
    );
};

const ShowcaseTemplate: Story = () => <ButtonShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
