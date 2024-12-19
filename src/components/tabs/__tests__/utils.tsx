import React from 'react';

import {Tab, TabList, TabPanel, TabProvider} from '..';

import {panel1qa, panel2qa, tab1, tab2} from './constants';

export const ControlledTabs = ({value}: {value?: string}) => {
    const [stateValue, setStateValue] = React.useState(value);

    const handleUpdate = (nextValue: string) => {
        setStateValue(nextValue);
    };

    return (
        <TabProvider value={stateValue}>
            <TabList onUpdate={handleUpdate}>
                <Tab value={tab1.id} qa={tab1.qa}>
                    {tab1.title}
                </Tab>
                <Tab value={tab2.id} qa={tab2.qa}>
                    {tab2.title}
                </Tab>
            </TabList>
            <TabPanel value={tab1.id} qa={panel1qa}>
                panel1
            </TabPanel>
            <TabPanel value={tab2.id} qa={panel2qa}>
                panel2
            </TabPanel>
        </TabProvider>
    );
};
