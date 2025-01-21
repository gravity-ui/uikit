import {Flame} from '@gravity-ui/icons';

import {Tab} from '../';
import {render, screen} from '../../../../test-utils/utils';

import {tab1} from './constants';

test('should render tab item by default', () => {
    render(<Tab value={tab1.id}>{tab1.title}</Tab>);
    const component = screen.getByRole('tab');

    expect(component).toBeVisible();
    expect(component).not.toHaveClass('g-tabs__item_active');
    expect(component).toHaveAttribute('aria-selected', 'false');
    expect(component).toHaveAttribute('aria-disabled', 'false');
});

test('should render disabled tab item', () => {
    render(
        <Tab value={tab1.id} disabled={true}>
            {tab1.title}
        </Tab>,
    );
    const component = screen.getByRole('tab');

    expect(component).toBeVisible();
    expect(component).toHaveAttribute('aria-disabled', 'true');
    expect(component).toHaveAttribute('tabIndex', '-1');
});

test('should passed title', () => {
    render(
        <Tab value={tab1.id} title={tab1.title}>
            {tab1.title}
        </Tab>,
    );
    const component = screen.getByTitle(tab1.title);

    expect(component).toBeVisible();
});

test('should passed aria-controls and id', () => {
    const tabId = 'tab-id';
    const ariaId = 'aria-id';
    render(
        <Tab value={tab1.id} title={tab1.title} aria-controls={ariaId} id={tabId}>
            {tab1.title}
        </Tab>,
    );
    const component = screen.getByTitle(tab1.title);

    expect(component).toHaveAttribute('aria-controls', ariaId);
    expect(component).toHaveAttribute('id', tabId);
});

test('should passed children', () => {
    const titleQaId = 'title-qa-id';
    render(
        <Tab value={tab1.id}>
            <span data-qa={titleQaId}>html title</span>
        </Tab>,
    );

    const component = screen.getByRole('tab');
    const titleComponent = screen.getByTestId(titleQaId);

    expect(component).toContainElement(titleComponent);
});

test('should render value if children is empty', () => {
    render(<Tab value={tab1.id} />);

    const component = screen.getByRole('tab');
    const titleComponent = screen.getByText(tab1.id);

    expect(component).toContainElement(titleComponent);
    expect(titleComponent).toHaveClass('g-tab-list__item-title');
});

test('should render counter', () => {
    const counter = 3;

    render(
        <Tab value={tab1.id} counter={counter}>
            {tab1.title}
        </Tab>,
    );

    const component = screen.getByRole('tab');
    const counterComponent = screen.getByText(counter);

    expect(counterComponent).toBeVisible();
    expect(counterComponent).toHaveClass('g-tab-list__item-counter');
    expect(component).toContainElement(counterComponent);
});

test('should render label', () => {
    const labelQaId = 'label-qa-id';

    const label = {
        theme: 'normal' as const,
        content: <span data-qa={labelQaId}>label content</span>,
    };

    render(
        <Tab value={tab1.id} label={label}>
            {tab1.title}
        </Tab>,
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
        <Tab value={tab1.id} title={tab1.title} icon={icon}>
            {tab1.title}
        </Tab>,
    );

    const component = screen.getByRole('tab');
    const iconComponent = screen.getByTestId(iconQaId);

    expect(iconComponent).toBeVisible();
    expect(component).toContainElement(iconComponent);
});

test('should render link', async () => {
    render(
        <Tab value={tab1.id} title={tab1.title} href={'https://example.com/foo/bar'}>
            {tab1.title}
        </Tab>,
    );

    const component = screen.getByRole('tab');
    expect(component.tagName).toBe('A');
    expect(component).toHaveAttribute('href', 'https://example.com/foo/bar');
});
