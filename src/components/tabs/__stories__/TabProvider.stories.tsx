import * as React from 'react';

import {useArgs} from '@storybook/preview-api';
import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../Button';
import {Tab} from '../Tab';
import {TabList} from '../TabList';
import type {TabListProps} from '../TabList';
import {TabPanel} from '../TabPanel';
import {TabProvider} from '../TabProvider';

import {getTabsMock} from './getTabsMock';

const meta: Meta<typeof TabList> = {
    title: 'Components/Navigation/tabs/TabProvider',
    component: TabList,
    args: {
        value: 'active',
    },
    argTypes: {
        value: {
            control: {type: 'select'},
            options: getTabsMock({})?.map(({value}) => value),
        },
    },
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'aria-required-children',
                        enabled: false,
                        selector: '[id^="wrapped"]',
                    },
                    {
                        id: 'aria-required-parent',
                        enabled: false,
                        selector: '[id^="wrapped"]',
                    },
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

export const Default: StoryFn<TabListProps> = ({...args}) => {
    const [, setStoryArgs] = useArgs();

    const items = React.useMemo(
        () =>
            getTabsMock({})?.map((props, i) => (
                <Tab key={i} {...props} aria-controls={`panel-${i}`} id={`tab-${i}`} />
            )),
        [],
    );

    const panels = React.useMemo(
        () =>
            getTabsMock({})?.map((tab, i) => (
                <TabPanel key={i} value={tab.value} aria-labelledby={`tab-${i}`} id={`panel-${i}`}>
                    <Button
                        style={{marginTop: '10px'}}
                    >{`Content of ${tab.value} tab panel`}</Button>
                </TabPanel>
            )),
        [],
    );

    return (
        <TabProvider value={args.value}>
            <TabList {...args} onUpdate={(tabId) => setStoryArgs({value: tabId})}>
                {items}
            </TabList>
            <div>{panels}</div>
        </TabProvider>
    );
};
