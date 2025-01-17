import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Pagination} from '../../Pagination';
import type {PaginationProps} from '../../Pagination';

const PAGE_PARAM = 'page_number';
const PAGE_SIZE_PARAM = 'page_size';

function pageHrefBuilder(page: number, pageSize: number) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set(PAGE_PARAM, String(page));
    queryParams.set(PAGE_SIZE_PARAM, String(pageSize));
    return window.location.href.replace(window.location.search, `?${queryParams.toString()}`);
}

function getParamNumberValue(
    paramName: string,
    queryParams: URLSearchParams,
    defaultValue: number,
) {
    const paramValue = Number(queryParams.get(paramName));
    return paramValue ? paramValue : defaultValue;
}

const useState = (args: PaginationProps) => {
    const [state, setState] = React.useState({...args});

    const onUpdate: PaginationProps['onUpdate'] = (page, pageSize) => {
        if (args.buttonWrapper) {
            window.location.href = pageHrefBuilder(page, pageSize);
        } else {
            setState((prevState) => ({...prevState, page, pageSize}));
        }
    };

    React.useEffect(() => {
        let currentPage = args.page;
        let currentPageSize = args.pageSize;
        if (args.buttonWrapper) {
            const queryParams = new URLSearchParams(window.location.search);

            currentPage = getParamNumberValue(PAGE_PARAM, queryParams, currentPage);
            currentPageSize = getParamNumberValue(PAGE_SIZE_PARAM, queryParams, currentPageSize);
        }

        setState({...args, page: currentPage, pageSize: currentPageSize});
    }, [args]);

    return {...state, onUpdate};
};

export default {
    title: 'Components/Navigation/Pagination',
    component: Pagination,
} as Meta;

const Template: StoryFn<PaginationProps> = (args) => {
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

const LinksTemplate: StoryFn<PaginationProps> = (args) => {
    const state = useState(args);
    return <Pagination {...state} />;
};

export const Links = LinksTemplate.bind({});
Links.args = {
    page: 1,
    pageSize: 100,
    total: 950,
    pageSizeOptions: [20, 50, 100],
    showInput: true,
    compact: false,
    buttonWrapper({page, pageSize, button}) {
        return button.props.disabled ? (
            button
        ) : (
            <a href={pageHrefBuilder(page, pageSize)} key={button.key}>
                {button}
            </a>
        );
    },
};

const TotalUnknownTemplate: StoryFn<PaginationProps> = (args) => {
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

const CompactTemplate: StoryFn<PaginationProps> = (args) => {
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

const HidePagesTemplate: StoryFn<PaginationProps> = (args) => {
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

const PagesSetTemplate: StoryFn<PaginationProps> = (args) => {
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
