import * as React from 'react';

import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Pagination} from '..';
import type {PaginationProps} from '..';

const useState = (args: PaginationProps) => {
    const [state, setState] = React.useState({...args});

    const onUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>
        setState((prevState) => ({...prevState, page, pageSize}));

    return {...state, onUpdate};
};

type FakeRouterLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {to?: string};

const FakeRouterLink = React.forwardRef<HTMLAnchorElement, FakeRouterLinkProps>(
    ({to, children, onClick, ...props}, ref) => (
        <a
            ref={ref}
            {...props}
            href={to}
            onClick={(event) => {
                // Let `Pagination` handle the click first (calls `onUpdate` for plain clicks).
                onClick?.(event);
                // Emulate a client-side router: handle plain left clicks in-place (no reload)
                // and leave alternative clicks (new tab, etc.) to the browser.
                const isPlainClick =
                    event.button === 0 &&
                    !event.metaKey &&
                    !event.ctrlKey &&
                    !event.shiftKey &&
                    !event.altKey;
                if (isPlainClick && !event.defaultPrevented) {
                    event.preventDefault();
                }
            }}
        >
            {children}
        </a>
    ),
);
FakeRouterLink.displayName = 'FakeRouterLink';

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

const ViewTemplate: StoryFn<PaginationProps> = (args) => {
    const outlinedState = useState({...args, view: 'outlined'});
    const clearState = useState({...args, view: 'clear'});

    return (
        <React.Fragment>
            <Pagination {...outlinedState} />
            <br />
            <Pagination {...clearState} />
        </React.Fragment>
    );
};

export const View = ViewTemplate.bind({});
View.args = {
    page: 1,
    pageSize: 100,
    total: 950,
    pageSizeOptions: [10],
    showInput: true,
    showPages: true,
};

// Build an absolute URL against the top-level document so links work inside the Storybook iframe.
const getPageHref = (page: number) => {
    if (typeof window === 'undefined') {
        return `?page=${page}`;
    }
    try {
        const topWindow = window.top ?? window;
        const url = new URL(topWindow.location.href);
        url.searchParams.set('page', String(page));
        return url.toString();
    } catch {
        // `window.top.location` may be inaccessible in a cross-origin iframe.
        return `?page=${page}`;
    }
};

// With link-based navigation the current page comes from the URL, not from `onUpdate`.
const getInitialPage = (fallback: number) => {
    if (typeof window === 'undefined') {
        return fallback;
    }
    try {
        const topWindow = window.top ?? window;
        const page = Number(new URL(topWindow.location.href).searchParams.get('page'));
        return Number.isInteger(page) && page > 0 ? page : fallback;
    } catch {
        return fallback;
    }
};

const WithCustomComponentTemplate: StoryFn<PaginationProps> = (args) => {
    const state = useState({...args, page: getInitialPage(args.page)});
    const lastPage = state.total ? Math.ceil(state.total / state.pageSize) : undefined;

    const getItemProps: PaginationProps['getItemProps'] = (item) => {
        if (item.type === 'page') {
            return {to: getPageHref(item.page)};
        }
        if (item.disabled) {
            return {};
        }
        switch (item.action) {
            case 'first':
                return {to: getPageHref(1)};
            case 'previous':
                return {to: getPageHref(Math.max(1, state.page - 1))};
            case 'next':
                return {to: getPageHref(Math.min(lastPage ?? state.page + 1, state.page + 1))};
            default:
                return {};
        }
    };

    return (
        <Pagination {...state} navigationComponent={FakeRouterLink} getItemProps={getItemProps} />
    );
};

export const WithCustomComponent = WithCustomComponentTemplate.bind({});
WithCustomComponent.args = {
    page: 1,
    pageSize: 100,
    total: 1000,
    compact: false,
};

const WithAnchorComponentTemplate: StoryFn<PaginationProps> = (args) => {
    const state = useState({...args, page: getInitialPage(args.page)});
    const lastPage = state.total ? Math.ceil(state.total / state.pageSize) : undefined;

    const getItemProps: PaginationProps['getItemProps'] = (item) => {
        if (item.type === 'page') {
            return {href: getPageHref(item.page)};
        }
        if (item.disabled) {
            return {};
        }
        switch (item.action) {
            case 'first':
                return {href: getPageHref(1)};
            case 'previous':
                return {href: getPageHref(Math.max(1, state.page - 1))};
            case 'next':
                return {href: getPageHref(Math.min(lastPage ?? state.page + 1, state.page + 1))};
            default:
                return {};
        }
    };

    return <Pagination {...state} navigationComponent="a" getItemProps={getItemProps} />;
};

export const WithAnchorComponent = WithAnchorComponentTemplate.bind({});
WithAnchorComponent.args = {
    page: 1,
    pageSize: 100,
    total: 1000,
    compact: false,
};
