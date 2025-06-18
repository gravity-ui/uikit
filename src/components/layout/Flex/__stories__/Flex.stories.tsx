import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Button} from '../../../Button/Button';
import {Box, LayoutPresenter} from '../../demo';
import {Flex} from '../Flex';

const meta = {
    title: 'Components/Layout/Flex',
    component: Flex,
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
} satisfies Meta<typeof Flex>;
export default meta;

type Story = StoryObj<typeof meta>;

const defaultDecorators = [
    (Story) => (
        <LayoutPresenter title="Change screen size to 's' to see result">
            <Story />
        </LayoutPresenter>
    ),
] satisfies Story['decorators'];

export const Default = {
    render: (args) => (
        <Flex {...args}>
            <Box w={50} h={50}>
                50x50
            </Box>

            <Box w={100} h={70}>
                100x70
            </Box>
            <Box w={200} h={150}>
                200x150
            </Box>
            <Box w={100} h={40}>
                100x40
            </Box>
        </Flex>
    ),
    decorators: defaultDecorators,
    args: {
        alignItems: 'center',
        justifyContent: 'center',
        direction: {xs: 'column', m: 'row'},
        gap: {xs: 1, m: 4},
    },
} satisfies Story;

export const FlexGap = {
    render: (args) => (
        <Flex {...args}>
            {new Array(20).fill('_').map((_, i) => (
                <Box w={100} h={50} key={i}>
                    100x50
                </Box>
            ))}
        </Flex>
    ),
    decorators: defaultDecorators,
    args: {
        wrap: 'wrap',
        gap: {xs: 1, m: 6},
    },
} satisfies Story;

export const GapAndRowGap = {
    render: (args) => (
        <Flex {...args}>
            {new Array(20).fill('_').map((_, i) => (
                <Box w={100} h={50} key={i}>
                    100x50
                </Box>
            ))}
        </Flex>
    ),
    decorators: defaultDecorators,
    args: {
        wrap: 'wrap',
        gap: {xs: 1, m: 6},
        gapRow: {xs: 6, m: 1},
    },
} satisfies Story;

export const ChildrenWithBgColor = {
    render: (args) => (
        <Flex {...args}>
            <Button>Some element with background</Button>
            <Button>Some element with background</Button>
        </Flex>
    ),
    decorators: defaultDecorators,
    args: {
        wrap: 'wrap',
        gap: 5,
    },
} satisfies Story;

export const WithNullChildren = {
    render: (args) => (
        <Flex {...args}>
            <Box>Box</Box>
            {null}
            {null}
            <Box>Box</Box>
            {null}
            <Box>Box</Box>
        </Flex>
    ),
    decorators: [
        (Story) => (
            <LayoutPresenter title="Null elements don't affect spacings">
                <Story />
            </LayoutPresenter>
        ),
    ],
    args: {
        direction: 'column',
        gap: 5,
    },
} satisfies Story;
