import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {ActionsPanel} from '../../ActionsPanel';

import {actions, actionsGroups, actionsSubmenu, actionsWithIcons, actionsWithNote} from './actions';

const meta: Meta<typeof ActionsPanel> = {
    title: 'Components/Data Display/ActionsPanel',
    component: ActionsPanel,
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
};

export default meta;

type Story = StoryObj<typeof ActionsPanel>;

export const Default = {
    render: (args) => <ActionsPanel {...args} actions={actions} />,
} satisfies Story;

export const WithIcons = {
    render: (args) => <ActionsPanel {...args} actions={actionsWithIcons} />,
} satisfies Story;

export const WithNote = {
    render: (args) => (
        <ActionsPanel
            {...args}
            actions={actionsWithNote}
            onClose={() => console.log('click close handle')}
            renderNote={() => '10 items'}
            maxRowActions={2}
        />
    ),
} satisfies Story;

export const Groups = {
    render: (args) => <ActionsPanel {...args} actions={actionsGroups} />,
} satisfies Story;

export const Submenu = {
    render: (args) => <ActionsPanel {...args} actions={actionsSubmenu} />,
} satisfies Story;
