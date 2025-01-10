import {render, screen} from '../../../../../test-utils/utils';
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

test('should allow to override separator', () => {
    render(
        <Breadcrumbs
            items={items}
            lastDisplayedItemsCount={1}
            firstDisplayedItemsCount={0}
            renderItemDivider={() => '•'}
        />,
    );

    expect(screen.getAllByText('•')).toHaveLength(items.length);
});

test('should display custom title', () => {
    render(
        <Breadcrumbs
            items={items.map((item) => ({...item, title: `Custom title for ${item.text}`}))}
            lastDisplayedItemsCount={1}
            firstDisplayedItemsCount={0}
        />,
    );

    expect(screen.getByTitle('Custom title for Root')).toBeInTheDocument();
    expect(screen.getByTitle('Custom title for Street')).toBeInTheDocument();
});

test('renderItem property', () => {
    const getText = (text: string) => `qwerty_${text}`;

    render(
        <Breadcrumbs
            items={items}
            firstDisplayedItemsCount={0}
            lastDisplayedItemsCount={1}
            renderItem={({item}) => <div>{getText(item.text)}</div>}
        />,
    );

    items.forEach(({text}) => {
        expect(screen.getByText(getText(text))).toBeInTheDocument();
    });
});
