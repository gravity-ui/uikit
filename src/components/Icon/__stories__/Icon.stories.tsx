import {Envelope, Gear, Rocket} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {Icon} from '../Icon';

const icons = {Gear, Envelope, Rocket};

const meta: Meta<typeof Icon> = {
    title: 'Components/Data Display/Icon',
    component: Icon,
    argTypes: {
        data: {
            options: Object.keys(icons),
            mapping: icons,
        },
    },
    args: {
        data: 'Gear',
    },
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'duplicate-id',
                        enabled: false,
                        selector: 'defs', // one may use same id in different <defs>
                    },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const Size: Story = {
    render: (args) => (
        <Showcase>
            <Icon {...args} size={16} />
            <Icon {...args} size={24} />
            <Icon {...args} size={36} />
        </Showcase>
    ),
};

export const Color: Story = {
    render: (args) => (
        <Showcase>
            <div style={{display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
                    <Icon {...args} size={32} color="#ff0000" />
                    <span style={{fontSize: '12px', color: '#666'}}>Hex: #ff0000</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
                    <Icon {...args} size={32} color="blue" />
                    <span style={{fontSize: '12px', color: '#666'}}>Named: blue</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
                    <Icon {...args} size={32} color="rgb(255, 165, 0)" />
                    <span style={{fontSize: '12px', color: '#666'}}>RGB: rgb(255, 165, 0)</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
                    <Icon {...args} size={32} />
                    <span style={{fontSize: '12px', color: '#666'}}>Default (currentColor)</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
                    <div style={{color: 'red'}}>
                        <Icon {...args} size={32} />
                    </div>
                    <span style={{fontSize: '12px', color: '#666'}}>Parent color: red</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
                    <div style={{color: 'red'}}>
                        <Icon {...args} size={32} color="green" />
                    </div>
                    <span style={{fontSize: '12px', color: '#666'}}>Override parent</span>
                </div>
            </div>
        </Showcase>
    ),
};
