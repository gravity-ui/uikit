import {render, screen} from '@testing-library/react';
import React from 'react';
import {Breadcrumbs} from '../Breadcrumbs';

const items = [
    {text: 'Root', action() {}, href: 'https://example.com'},
    {text: 'Region', action() {}, href: 'https://example.com/region/'},
    {text: 'Country', action() {}, href: 'https://example.com/region/country/'},
    {text: 'City', action() {}, href: 'https://example.com/region/country/city/'},
    {
        text: 'District',
        action() {},
        href: 'https://example.com/region/country/city/district/',
    },
    {
        text: 'Street',
        action() {},
        href: 'https://example.com/region/country/city/district/street/',
    },
];

test('should apply custom renderer when first item forced to display', () => {
    render(
        <Breadcrumbs
            items={items}
            lastDisplayedItemsCount={1}
            firstDisplayedItemsCount={1}
            renderItemContent={(a) => `${a.text} (Custom item render)`}
            renderRootContent={(a) => `${a.text} (Custom root render)`}
        />,
    );

    expect(screen.getByText('Root (Custom root render)')).toBeInTheDocument();
});

test('root render should fallback to item renderer', () => {
    render(
        <Breadcrumbs
            items={items}
            lastDisplayedItemsCount={1}
            firstDisplayedItemsCount={1}
            renderItemContent={(a) => `${a.text} (Custom item render)`}
        />,
    );

    expect(screen.getByText('Root (Custom item render)')).toBeInTheDocument();
});

test('should ignore root item custom render without first item forced to display', () => {
    render(
        <Breadcrumbs
            items={items}
            lastDisplayedItemsCount={1}
            firstDisplayedItemsCount={0}
            renderRootContent={(a) => `${a.text} (Custom root render)`}
        />,
    );

    expect(screen.queryByText('Root (Custom root render)')).not.toBeInTheDocument();
    expect(screen.getByText('Root')).toBeInTheDocument();
});

test('should render links', () => {
    render(
        <Breadcrumbs
            items={items}
            lastDisplayedItemsCount={1}
            firstDisplayedItemsCount={0}
            renderRootContent={(a) => `${a.text} (Custom root render)`}
        />,
    );

    expect(screen.getByRole('link', {name: 'Root'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Region'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Country'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'City'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'District'})).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: 'Street'})).not.toBeInTheDocument();
    expect(screen.getByText('Street')).toBeInTheDocument();
});
