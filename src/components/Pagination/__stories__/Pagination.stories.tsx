import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Pagination, PaginationProps} from '../../Pagination';

const useState = (args: PaginationProps) => {
    const [state, setState] = React.useState({...args});
    const onUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
        setState((prevState) => ({...prevState, page, pageSize}));
    return {...state, onUpdate};
};

export default {
    title: 'Components/Pagination',
    component: Pagination,
} as Meta;

const Template: Story<PaginationProps> = (args) => {
    const state = useState(args);
    return <Pagination {...state} />;
};

export const Default = Template.bind({});
Default.args = {
    page: 1,
    pageSize: 100,
    total: 950,
    pageSizeOptions: [20, 50, 100],
    showInput: true,
    compact: false,
};

const TotalUnknownTemplate: Story<PaginationProps> = (args) => {
    const state = useState(args);
    return <Pagination {...state} />;
};

export const TotalUnknown = TotalUnknownTemplate.bind({});
TotalUnknown.args = {
    page: 1,
    pageSize: 100,
    pageSizeOptions: [20, 50, 100],
    showInput: true,
    compact: false,
};

const CompactTemplate: Story<PaginationProps> = (args) => {
    const state = useState(args);
    return <Pagination {...state} />;
};

export const Compact = CompactTemplate.bind({});
Compact.args = {
    page: 1,
    pageSize: 1,
    total: 5,
    showInput: false,
    compact: true,
};

const HidePagesTemplate: Story<PaginationProps> = (args) => {
    const state1 = useState({
        ...args,
        page: 1,
        pageSize: 100,
        showInput: true,
        compact: false,
        showPages: false,
    });
    const state2 = useState({
        ...args,
        page: 1,
        pageSize: 100,
        total: 1000,
        showInput: false,
        pageSizeOptions: [100, 200, 500],
        compact: true,
        showPages: false,
    });

    return (
        <React.Fragment>
            <Pagination {...state1} />
            <br />
            <Pagination {...state2} />
            <br />
        </React.Fragment>
    );
};

export const HidePages = HidePagesTemplate.bind({});

const PagesSetTemplate: Story<PaginationProps> = (args) => {
    const state1 = useState({...args, page: 1, pageSize: 1, total: 1});
    const state2 = useState({...args, page: 1, pageSize: 1, total: 2});
    const state3 = useState({...args, page: 1, pageSize: 1, total: 3});
    const state4 = useState({...args, page: 1, pageSize: 1, total: 5});
    const state5 = useState({...args, page: 1, pageSize: 1, total: 6});
    const state6 = useState({...args, page: 1, pageSize: 1, total: 10});
    return (
        <React.Fragment>
            <Pagination {...state1} />
            <br />
            <Pagination {...state2} />
            <br />
            <Pagination {...state3} />
            <br />
            <Pagination {...state4} />
            <br />
            <Pagination {...state5} />
            <br />
            <Pagination {...state6} />
        </React.Fragment>
    );
};

export const PagesSet = PagesSetTemplate.bind({});
