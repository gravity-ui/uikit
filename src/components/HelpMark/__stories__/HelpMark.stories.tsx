import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Text} from '../../Text';
import {HelpMark} from '../HelpMark';

const meta: Meta<typeof HelpMark> = {
    title: 'Components/Utils/HelpMark',
    id: 'components/utils/HelpMark',
    component: HelpMark,
    args: {
        'aria-label': 'Note',
        children: 'Some content',
    },
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'help-mark',
                        enabled: false,
                        // aria-labelledby id is valid after tooltip content is rendered
                        selector: 'button[aria-labelledby="helpMarkWithoutActionsId"]',
                    },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof HelpMark>;

export const Default = {};

export const Size = {
    render: (args) => {
        return (
            <Showcase>
                <ShowcaseItem title="Size s">
                    <HelpMark {...args} iconSize="s" />
                </ShowcaseItem>
                <ShowcaseItem title="Size m">
                    <HelpMark {...args} iconSize="m" />
                </ShowcaseItem>
                <ShowcaseItem title="Size l">
                    <HelpMark {...args} iconSize="l" />
                </ShowcaseItem>
                <ShowcaseItem title="Size xl">
                    <HelpMark {...args} iconSize="xl" />
                </ShowcaseItem>
            </Showcase>
        );
    },
} satisfies Story;

export const InsideText = {
    render: (args) => {
        return (
            <Showcase>
                <ShowcaseItem title="Body 1">
                    <Text variant="body-1">
                        Lorem ipsum
                        <br />
                        dolor <HelpMark {...args} /> sit
                        <br />
                        amet
                    </Text>
                </ShowcaseItem>
                <ShowcaseItem title="Body 2">
                    <Text variant="body-2">
                        Lorem ipsum
                        <br />
                        dolor <HelpMark {...args} /> sit
                        <br />
                        amet
                    </Text>
                </ShowcaseItem>
                <ShowcaseItem title="Body 3">
                    <Text variant="body-3">
                        Lorem ipsum
                        <br />
                        dolor <HelpMark {...args} /> sit
                        <br />
                        amet
                    </Text>
                </ShowcaseItem>
                <ShowcaseItem title="Flex Baseline">
                    <div style={{display: 'flex', alignItems: 'baseline', gap: 4}}>
                        <div>Property</div>
                        <div>......</div>
                        <div>Value</div>
                        <HelpMark {...args} />
                    </div>
                </ShowcaseItem>
            </Showcase>
        );
    },
} satisfies Story;
