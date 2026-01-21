import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Drawer} from '../components/Drawer';

import {DisablePortalShowcase} from './DisablePortal';
import {HideVeilShowcase} from './HideVeil';
import {ResizableDrawerShowcase} from './Resizable';

const mockText = faker.lorem.sentences(10);

export default {
    title: 'Components/Overlays/Drawer',
    component: Drawer,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                    {
                        id: 'label',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
    args: {
        children: (
            <div
                style={{
                    boxSizing: 'border-box',
                    padding: '8px 16px',
                    width: '400px',
                    height: '100%',
                    overflowY: 'auto',
                }}
            >
                {mockText}
            </div>
        ),
        open: true,
        onOpenChange: action('onOpenChange'),
        onResizeStart: action('onResizeStart'),
        onResizeEnd: action('onResizeEnd'),
        onResize: action('onResize'),
        onTransitionIn: action('onTransitionIn'),
        onTransitionInComplete: action('onTransitionInComplete'),
        onTransitionOut: action('onTransitionOut'),
        onTransitionOutComplete: action('onTransitionOutComplete'),
    },
};

const DisablePortalTemplate: StoryFn = () => <DisablePortalShowcase />;
export const DisablePortal = DisablePortalTemplate.bind({});

const HideVeilTemplate: StoryFn = () => <HideVeilShowcase />;
export const HideVeil = HideVeilTemplate.bind({});

const ResizableTemplate: StoryFn = () => <ResizableDrawerShowcase />;
export const Resizable = ResizableTemplate.bind({});
