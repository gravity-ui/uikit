import {Flame} from '@gravity-ui/icons';

import {Tab, TabList} from '../';
import {render, screen} from '../../../../test-utils/utils';

import {tab1} from './constants';

test('should render tab item by default', () => {
    render(
        <TabList>
            <Tab value={tab1.value}>{tab1.title}</Tab>
        </TabList>,
    );
    const component = screen.getByRole('tab');

    expect(component).toBeVisible();
    expect(component).not.toHaveClass('g-tab_active');
    expect(component).toHaveAttribute('aria-selected', 'false');
});

test('should render disabled tab item', () => {
    render(
        <TabList>
            <Tab value={tab1.value} disabled={true}>
                {tab1.title}
            </Tab>
        </TabList>,
    );
    const component = screen.getByRole('tab');

    expect(component).toBeVisible();
    expect(component).toHaveAttribute('aria-disabled', 'true');
    expect(component).toHaveAttribute('tabIndex', '-1');
});

test('should have passed title', () => {
    render(
        <TabList>
            <Tab value={tab1.value} title={tab1.title}>
                {tab1.title}
            </Tab>
        </TabList>,
    );
    const component = screen.getByTitle(tab1.title);

    expect(component).toBeVisible();
});

test('should render passed children', () => {
    const titleQaId = 'title-qa-id';
    render(
        <TabList>
            <Tab value={tab1.value}>
                <span data-qa={titleQaId}>html title</span>
            </Tab>
        </TabList>,
    );

    const component = screen.getByRole('tab');
    const titleComponent = screen.getByTestId(titleQaId);

    expect(component).toContainElement(titleComponent);
});

test('should render value if children is empty', () => {
    render(
        <TabList>
            <Tab value={tab1.value} />
        </TabList>,
    );

    const component = screen.getByRole('tab');
    const titleComponent = screen.getByText(tab1.value);

    expect(component).toContainElement(titleComponent);
    expect(titleComponent).toHaveClass('g-tab__title');
});

test('should render counter', () => {
    const counter = 3;

    render(
        <TabList>
            <Tab value={tab1.value} counter={counter}>
                {tab1.title}
            </Tab>
        </TabList>,
    );

    const component = screen.getByRole('tab');
    const counterComponent = screen.getByText(counter);

    expect(counterComponent).toBeVisible();
    expect(counterComponent).toHaveClass('g-tab__counter');
    expect(component).toContainElement(counterComponent);
});

test('should render label', () => {
    const labelQaId = 'label-qa-id';

    const label = {
        theme: 'normal' as const,
        content: <span data-qa={labelQaId}>label content</span>,
    };

    render(
        <TabList>
            <Tab value={tab1.value} label={label}>
                {tab1.title}
            </Tab>
        </TabList>,
    );

    const component = screen.getByRole('tab');
    const labelComponent = screen.getByTestId(labelQaId);

    expect(labelComponent).toBeVisible();
    expect(component).toContainElement(labelComponent);
});

test('should render icon', () => {
    const iconQaId = 'icon-qa-id';

    const icon = <Flame data-qa={iconQaId} width={18} height={18} />;

    render(
        <TabList>
            <Tab value={tab1.value} title={tab1.title} icon={icon}>
                {tab1.title}
            </Tab>
        </TabList>,
    );

    const component = screen.getByRole('tab');
    const iconComponent = screen.getByTestId(iconQaId);

    expect(iconComponent).toBeVisible();
    expect(component).toContainElement(iconComponent);
});

test('should render link', async () => {
    render(
        <TabList>
            <Tab value={tab1.value} title={tab1.title} href={'https://example.com/foo/bar'}>
                {tab1.title}
            </Tab>
        </TabList>,
    );

    const component = screen.getByRole('tab');
    expect(component.tagName).toBe('A');
    expect(component).toHaveAttribute('href', 'https://example.com/foo/bar');
});
