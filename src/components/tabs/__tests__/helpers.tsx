import * as React from 'react';

import {Tab, TabList, TabPanel, TabProvider} from '..';
import {Box} from '../../layout';
import {getTabsMock} from '../__stories__/getTabsMock';
import type {TabListProps} from '../types';

import {panel1qa, panel2qa, tab1, tab2} from './constants';

export const ControlledTabs = ({value}: {value?: string}) => {
    const [stateValue, setStateValue] = React.useState(value);

    return (
        <TabProvider value={stateValue} onUpdate={setStateValue}>
            <TabList>
                <Tab value={tab1.value} qa={tab1.qa}>
                    {tab1.title}
                </Tab>
                <Tab value={tab2.value} qa={tab2.qa}>
                    {tab2.title}
                </Tab>
            </TabList>
            <TabPanel value={tab1.value} qa={panel1qa}>
                panel1
            </TabPanel>
            <TabPanel value={tab2.value} qa={panel2qa}>
                panel2
            </TabPanel>
        </TabProvider>
    );
};

export const TestTabList = (props: Partial<TabListProps>) => {
    const items = React.useMemo(
        () => getTabsMock({})?.map((props, i) => <Tab key={i} {...props} />),
        [],
    );

    return <TabList {...props}>{items}</TabList>;
};

export const TestTabListWithCustomTabs = (props: Partial<TabListProps>) => {
    const items = React.useMemo(
        () =>
            getTabsMock({withCustomChildren: true})?.map((props, i) => <Tab key={i} {...props} />),
        [],
    );

    return <TabList {...props}>{items}</TabList>;
};

export const TestCollapsedTabList = ({
    title,
    listToOpenQa,
    ...props
}: Partial<TabListProps> & {title: string; listToOpenQa: string}) => {
    return (
        <Box width={800} spacing={{px: 4, py: 10}}>
            <h4>{title}</h4>

            <Box spacing={{mb: 2}}>
                <TestTabList {...props} />
            </Box>

            <Box style={{width: 500}} spacing={{mb: 2}}>
                <TestTabList {...props} qa={listToOpenQa} />
            </Box>

            <Box style={{width: 150}}>
                <TestTabList {...props} />
            </Box>
        </Box>
    );
};
