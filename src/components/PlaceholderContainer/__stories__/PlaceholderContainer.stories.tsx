import * as React from 'react';

import {ChevronDown} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {Button} from '../../Button';
import {DropdownMenu} from '../../DropdownMenu';
import {Icon} from '../../Icon';
import {block} from '../../utils/cn';
import {PlaceholderContainer} from '../PlaceholderContainer';
import type {PlaceholderContainerActionProps} from '../types';

import './PlaceholderContainerShowcase.scss';

export default {
    title: 'Components/Data Display/PlaceholderContainer',
    component: PlaceholderContainer,
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

type Story = StoryObj<typeof PlaceholderContainer>;

const b = block('placeholder-container-showcase');

const ImageComponentTest = () => {
    return (
        <svg width="230" height="230" viewBox="0 0 230 230" xmlns="http://www.w3.org/2000/svg">
            <g>
                <rect fill="#DDDDDD" height="100%" transform="matrix(1 0 0 1 0 0)" width="100%" />
                <text
                    fill="#999999"
                    fontFamily="Sans-serif"
                    fontSize="26"
                    strokeWidth="0"
                    textAnchor="middle"
                    transform="matrix(1.88041 0 0 1.88041 -48.1289 -81.7475)"
                    x="86.49"
                    y="114"
                >
                    1:1
                </text>
            </g>
        </svg>
    );
};

const actionComponentTest = (
    <div className={b('custom-action')}>
        <DropdownMenu
            defaultSwitcherProps={{view: 'flat-secondary'}}
            items={[
                {text: 'text 1', action: () => {}},
                {text: 'text 2', action: () => {}},
            ]}
            onSwitcherClick={(e) => e?.stopPropagation()}
            switcher={
                <Button>
                    Text
                    <Icon data={ChevronDown} size={16} />
                </Button>
            }
        />
    </div>
);

const actionMainProps: PlaceholderContainerActionProps = {
    text: 'Main button',
    view: 'normal',
    onClick: () => alert('Click by main button'),
};

const actionAdditionalBtnProps: PlaceholderContainerActionProps = {
    text: 'Additional button',
    view: 'flat-secondary',
    onClick: () => alert('Click by additional button'),
};

const actionLinkProps: PlaceholderContainerActionProps = {
    text: 'Link button',
    view: 'flat-info',
    href: 'https://gravity-ui.com/',
};

export const Default: Story = {
    args: {
        title: 'Some title',
        image: <ImageComponentTest />,
        description:
            'Some long descriptionProps text that can contain of long long very long text etc. It can be repeated like this. Some long descriptionProps text that can contain of long long very long text etc.',
    },
};

export const Direction: Story = {
    render: (args) => (
        <React.Fragment>
            <Showcase>
                <PlaceholderContainer {...args} direction="row" title={`${args.title}: row`} />
            </Showcase>
            <Showcase>
                <PlaceholderContainer
                    {...args}
                    direction="column"
                    title={`${args.title}: column`}
                />
            </Showcase>
        </React.Fragment>
    ),
    args: {
        ...Default.args,
        title: 'Direction',
    },
};

export const Align: Story = {
    render: (args) => (
        <React.Fragment>
            <Showcase className={b('full-width')}>
                <PlaceholderContainer {...args} align="center" title={`${args.title}: center`} />
            </Showcase>
            <Showcase className={b('full-width')}>
                <PlaceholderContainer {...args} align="left" title={`${args.title}: left`} />
            </Showcase>
        </React.Fragment>
    ),
    args: {
        ...Default.args,
        title: 'Align of component inside flex parent',
    },
};

export const Size: Story = {
    render: (args) => (
        <React.Fragment>
            <Showcase className={b('container')}>
                <PlaceholderContainer {...args} size="s" title="Size S" />
            </Showcase>
            <Showcase className={b('container')}>
                <PlaceholderContainer {...args} size="m" title="Size M" />
            </Showcase>
            <Showcase className={b('container')}>
                <PlaceholderContainer {...args} size="l" title="Size L" />
            </Showcase>
            <Showcase className={b('container')}>
                <PlaceholderContainer {...args} size="promo" title="Size promo" />
            </Showcase>
        </React.Fragment>
    ),
    args: {
        ...Default.args,
        description: 'Description text',
    },
};

export const Actions: Story = {
    render: (args) => (
        <React.Fragment>
            <Showcase>
                <PlaceholderContainer
                    {...args}
                    title="Array of actions"
                    actions={[actionMainProps, actionAdditionalBtnProps, actionLinkProps]}
                />
            </Showcase>
            <Showcase>
                <PlaceholderContainer
                    {...args}
                    title="Custom actions component"
                    actions={actionComponentTest}
                />
            </Showcase>
        </React.Fragment>
    ),
    args: {
        ...Default.args,
    },
};

export const CustomMaxWidth: Story = {
    render: (args) => (
        <React.Fragment>
            <Showcase>
                <PlaceholderContainer {...args} title="Default max-width" />
            </Showcase>
            <Showcase>
                <PlaceholderContainer {...args} title="Custom max-width: 800" maxWidth={800} />
            </Showcase>
        </React.Fragment>
    ),
    args: {
        ...Default.args,
        description:
            'This example demonstrates how to override the default max-width of the content using the maxWidth prop.',
    },
};
