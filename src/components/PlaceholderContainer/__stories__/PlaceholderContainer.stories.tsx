import React from 'react';

import {ChevronDown} from '@gravity-ui/icons';
import type {Meta, /*StoryFn,*/ StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Button} from '../../Button';
import {DropdownMenu} from '../../DropdownMenu';
import {Icon} from '../../Icon';
import {block} from '../../utils/cn';
import {PlaceholderContainer} from '../PlaceholderContainer';
import type {PlaceholderContainerActionProps, PlaceholderContainerProps} from '../types';

import './PlaceholderContainerShowcase.scss';

export default {
    title: 'Components/Data Display/PlaceholderContainer',
    component: PlaceholderContainer,
    parameters: {
        a11y: {
            element: '#storybook-root',
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

const contentComponentTest = (
    <div>
        <h1>Custom title</h1>
        <h2>with custom subtitle</h2>
        <h3>and etc</h3>
        <p>
            You can add <strong>here</strong> any long text with custom content and use custom
            content size for displaying very long texts.
        </p>
    </div>
);

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

const baseProps = {
    title: 'Container with one button & image component',
    image: <ImageComponentTest />,
    className: 'placeholder-container',
};

const placeholderContainerProps: Omit<PlaceholderContainerProps, 'size' | 'direction'> = {
    ...baseProps,
    actions: [actionMainProps],
    align: 'center',
};

const actionsProps = {
    actions: [actionMainProps, actionAdditionalBtnProps],
};

const placeholderContainerCustomRenderedProps: Omit<
    PlaceholderContainerProps,
    'size' | 'direction'
> = {
    ...placeholderContainerProps,
    content: contentComponentTest,
};

const placeholderContainerCustomActionProps: Omit<PlaceholderContainerProps, 'size' | 'direction'> =
    {
        ...placeholderContainerProps,
        actions: actionComponentTest,
    };

const descriptionProps = {
    description:
        'Some long descriptionProps text that can contain of long long very long text etc. It can be repeated like this. Some long descriptionProps text that can contain of long long very long text etc.',
    promoDescription:
        "Comparing to 'L' size promo size has full width of the content block, a larger title size and alignment",
};

export const Default: Story = {
    render: () => (
        <Showcase>
            <PlaceholderContainer
                title="Default title"
                image={<ImageComponentTest />}
                description="Default description"
            />
        </Showcase>
    ),
};

export const Size: Story = {
    render: () => (
        <React.Fragment>
            <Showcase title="Size row">
                <ShowcaseItem title="Size s">
                    <PlaceholderContainer
                        {...placeholderContainerProps}
                        description={descriptionProps.description}
                        direction="row"
                        size="s"
                    />
                </ShowcaseItem>
                <ShowcaseItem title="Size m">
                    <PlaceholderContainer
                        {...placeholderContainerProps}
                        description={descriptionProps.description}
                        direction="row"
                        size="m"
                    />
                </ShowcaseItem>
                <ShowcaseItem title="Size l">
                    <PlaceholderContainer
                        {...placeholderContainerProps}
                        description={descriptionProps.description}
                        direction="row"
                        size="l"
                    />
                </ShowcaseItem>
                <ShowcaseItem title="Size promo">
                    <PlaceholderContainer
                        {...placeholderContainerProps}
                        description={descriptionProps.promoDescription}
                        direction="row"
                        size="promo"
                    />
                </ShowcaseItem>
            </Showcase>
            <Showcase title="Size column">
                <ShowcaseItem title="Size s">
                    <PlaceholderContainer
                        {...placeholderContainerProps}
                        description={descriptionProps.description}
                        direction="column"
                        size="s"
                    />
                </ShowcaseItem>
                <ShowcaseItem title="Size m">
                    <PlaceholderContainer
                        {...placeholderContainerProps}
                        description={descriptionProps.description}
                        direction="column"
                        size="m"
                    />
                </ShowcaseItem>
                <ShowcaseItem title="Size l">
                    <PlaceholderContainer
                        {...placeholderContainerProps}
                        description={descriptionProps.description}
                        direction="column"
                        size="l"
                    />
                </ShowcaseItem>
                <ShowcaseItem title="Size promo">
                    <PlaceholderContainer
                        {...placeholderContainerProps}
                        description={descriptionProps.promoDescription}
                        direction="column"
                        size="promo"
                    />
                </ShowcaseItem>
            </Showcase>
        </React.Fragment>
    ),
};

export const Actions: Story = {
    render: () => (
        <React.Fragment>
            <Showcase title="Actions">
                <ShowcaseItem title="single control">
                    <PlaceholderContainer
                        {...placeholderContainerProps}
                        description={descriptionProps.description}
                        direction="row"
                        size="m"
                        title="Size m"
                    />
                </ShowcaseItem>
                <ShowcaseItem title="multi controls">
                    <PlaceholderContainer
                        {...placeholderContainerProps}
                        {...actionsProps}
                        description={descriptionProps.description}
                        direction="row"
                        size="m"
                        title="Size m"
                    />
                </ShowcaseItem>
                <ShowcaseItem title="custom control">
                    <PlaceholderContainer
                        {...placeholderContainerCustomActionProps}
                        description={descriptionProps.description}
                        direction="row"
                        size="m"
                        title="Size m"
                    />
                </ShowcaseItem>
            </Showcase>
        </React.Fragment>
    ),
};

export const Content: Story = {
    render: () => (
        <React.Fragment>
            <Showcase>
                <PlaceholderContainer
                    {...placeholderContainerCustomRenderedProps}
                    direction="row"
                    size="s"
                    title="Size s"
                />
            </Showcase>
        </React.Fragment>
    ),
};
