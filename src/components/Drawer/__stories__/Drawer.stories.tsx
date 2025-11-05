import type {Meta, StoryFn, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Drawer} from '../components/Drawer';

import {DisablePortalShowcase} from './DisablePortal';
import {HideVeilShowcase} from './HideVeil';
import {ResizableItemShowcase} from './ResizableItem';
import {PlaceholderText} from './mock';

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
                    height: '100%',
                    overflowY: 'auto',
                }}
            >
                <PlaceholderText />
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

const ResizableItemTemplate: StoryFn = () => <ResizableItemShowcase />;
export const ResizableItem = ResizableItemTemplate.bind({});

const DisablePortalTemplate: StoryFn = () => <DisablePortalShowcase />;
export const DisablePortal = DisablePortalTemplate.bind({});

const HideVeilTemplate: StoryFn = () => <HideVeilShowcase />;
export const HideVeil = HideVeilTemplate.bind({});
