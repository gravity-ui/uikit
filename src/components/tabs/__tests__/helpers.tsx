import * as React from 'react';

import {Tab, TabList, TabPanel, TabProvider} from '..';
import {Box, Flex} from '../../layout';
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
        () => getTabsMock({})?.map((itemProps, i) => <Tab key={i} {...itemProps} />),
        [],
    );

    return <TabList {...props}>{items}</TabList>;
};

export const TestTabListWithCustomTabs = (props: Partial<TabListProps>) => {
    const items = React.useMemo(
        () =>
            getTabsMock({withCustomChildren: true})?.map((itemProps, i) => (
                <Tab key={i} {...itemProps} />
            )),
        [],
    );

    return <TabList {...props}>{items}</TabList>;
};

export const TestTabListScroll = () => {
    const [value, setValue] = React.useState('active');

    return (
        <Flex direction="column" gap="3" width={800} spacing={{py: 10}}>
            <h4>contentOverflow scroll</h4>
            <Box style={{width: 450}}>
                <TestTabList value={value} onUpdate={setValue} contentOverflow="scroll" />
            </Box>
        </Flex>
    );
};

export const TestTabListCollapse = () => {
    const [value, setValue] = React.useState('active');

    return (
        <Flex direction="column" gap="3" width={800} spacing={{py: 10}}>
            <h4>contentOverflow collapse</h4>
            <Box style={{width: 450}}>
                <TestTabList value={value} onUpdate={setValue} contentOverflow="collapse" />
            </Box>
        </Flex>
    );
};

export const TestTabListContentOverflow = ({
    title,
    listToOpenQa,
    ...props
}: Partial<TabListProps> & {title: string; listToOpenQa: string}) => {
    return (
        <Flex direction="column" gap="3" width={800} spacing={{py: 10}}>
            <h4>{title}</h4>

            <Box style={{width: 500}}>
                <TestTabList {...props} contentOverflow="wrap" qa={listToOpenQa} />
            </Box>

            <Box style={{width: 500}}>
                <TestTabList {...props} contentOverflow="scroll" qa={listToOpenQa} />
            </Box>

            <Box style={{width: 500}}>
                <TestTabList {...props} contentOverflow="collapse" qa={listToOpenQa} />
            </Box>
        </Flex>
    );
};
