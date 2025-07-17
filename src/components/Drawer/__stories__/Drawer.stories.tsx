import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {DisablePortalShowcase} from './DisablePortal';
import {DrawerShowcase} from './DrawerShowcase';
import {HideVeilShowcase} from './HideVeil';
import {ResizableItemShowcase} from './ResizableItem';
import {ScrollLockShowcase} from './ScrollLock';
import {UsePortalShowcase} from './UsePortal';

export default {
    title: 'Components/Overlays/Drawer',
    component: DrawerShowcase,
} as Meta;

const ShowcaseTemplate: StoryFn = () => <DrawerShowcase />;
export const Showcase = ShowcaseTemplate.bind({});

const ResizableItemTemplate: StoryFn = () => <ResizableItemShowcase />;
export const ResizableItem = ResizableItemTemplate.bind({});

const DisablePortalTemplate: StoryFn = () => <DisablePortalShowcase />;
export const DisablePortal = DisablePortalTemplate.bind({});

const HideVeilTemplate: StoryFn = () => <HideVeilShowcase />;
export const HideVeil = HideVeilTemplate.bind({});

const ScrollLockTemplate: StoryFn = () => <ScrollLockShowcase />;
export const ScrollLock = ScrollLockTemplate.bind({});

const UsePortalTemplate: StoryFn = () => <UsePortalShowcase />;
export const UsePortal = UsePortalTemplate.bind({});
