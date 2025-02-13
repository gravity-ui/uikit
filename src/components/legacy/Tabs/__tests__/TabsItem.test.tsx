import {Flame} from '@gravity-ui/icons';
import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../../test-utils/utils';
import {TabsItem} from '../TabsItem';

const tabId = 'tab-id';
const tabTitle = 'Tab title';

test('should render tab item by default', () => {
    render(<TabsItem id={tabId} title={tabTitle} onClick={jest.fn()} />);
    const component = screen.getByRole('tab');

    expect(component).toBeVisible();
    expect(component).not.toHaveClass('g-tabs-legacy__item_active');
    expect(component).toHaveAttribute('aria-selected', 'false');
    expect(component).toHaveAttribute('aria-disabled', 'false');
});

test('should render active tab item', () => {
    render(<TabsItem id={tabId} title={tabTitle} onClick={jest.fn()} active={true} />);
    const component = screen.getByRole('tab');

    expect(component).toBeVisible();
    expect(component).toHaveClass('g-tabs-legacy__item_active');
    expect(component).toHaveAttribute('aria-selected', 'true');
});

test('should render disabled tab item', () => {
    render(<TabsItem id={tabId} title={tabTitle} onClick={jest.fn()} disabled={true} />);
    const component = screen.getByRole('tab');

    expect(component).toBeVisible();
    expect(component).toHaveAttribute('aria-disabled', 'true');
    expect(component).toHaveAttribute('tabIndex', '-1');
});

test('should passed title', () => {
    render(<TabsItem id={tabId} title={tabTitle} onClick={jest.fn()} />);
    const component = screen.getByTitle(tabTitle);

    expect(component).toBeVisible();
});

test('should passed hint', () => {
    const hint = 'Some hint';
    render(<TabsItem id={tabId} title={tabTitle} hint={hint} onClick={jest.fn()} />);
    const component = screen.getByTitle(hint);
    const component2 = screen.queryByTitle(tabTitle);

    expect(component).toBeVisible();
    expect(component2).not.toBeInTheDocument();
});

test('should passed html title', () => {
    const titleQaId = 'title-qa-id';
    const title = <span data-qa={titleQaId}>html title</span>;
    render(<TabsItem id={tabId} title={title} onClick={jest.fn()} />);

    const component = screen.getByRole('tab');
    const titleComponent = screen.getByTestId(titleQaId);

    expect(component).toContainElement(titleComponent);
});

test('should render id if title is empty', () => {
    render(<TabsItem id={tabId} title={''} onClick={jest.fn()} />);

    const component = screen.getByRole('tab');
    const titleComponent = screen.getByText(tabId);

    expect(component).toContainElement(titleComponent);
    expect(titleComponent).toHaveClass('g-tabs-legacy__item-title');
});

test('should render counter', () => {
    const counter = 3;

    render(<TabsItem id={tabId} title={tabTitle} counter={counter} onClick={jest.fn()} />);

    const component = screen.getByRole('tab');
    const counterComponent = screen.getByText(counter);

    expect(counterComponent).toBeVisible();
    expect(counterComponent).toHaveClass('g-tabs-legacy__item-counter');
    expect(component).toContainElement(counterComponent);
});

test('should render label', () => {
    const labelQaId = 'label-qa-id';

    const label = {
        theme: 'normal' as const,
        content: <span data-qa={labelQaId}>label content</span>,
    };

    render(<TabsItem id={tabId} title={tabTitle} label={label} onClick={jest.fn()} />);

    const component = screen.getByRole('tab');
    const labelComponent = screen.getByTestId(labelQaId);

    expect(labelComponent).toBeVisible();
    expect(component).toContainElement(labelComponent);
});

test('should render icon', () => {
    const iconQaId = 'icon-qa-id';

    const icon = <Flame data-qa={iconQaId} width={18} height={18} />;

    render(<TabsItem id={tabId} title={tabTitle} icon={icon} onClick={jest.fn()} />);

    const component = screen.getByRole('tab');
    const iconComponent = screen.getByTestId(iconQaId);

    expect(iconComponent).toBeVisible();
    expect(component).toContainElement(iconComponent);
});

test('should render meta', () => {
    const meta = 'meta content';

    render(<TabsItem id={tabId} title={tabTitle} meta={meta} onClick={jest.fn()} />);

    const component = screen.getByRole('tab');
    const metaComponent = screen.getByText(meta);

    expect(metaComponent).toBeVisible();
    expect(metaComponent).toHaveClass('g-tabs-legacy__item-meta');
    expect(component).toContainElement(metaComponent);
});

test('should call onClick on tab click', async () => {
    const onClickFn = jest.fn();
    const user = userEvent.setup();

    render(<TabsItem id={tabId} title={tabTitle} onClick={onClickFn} />);

    const component = screen.getByRole('tab');

    await user.click(component);
    expect(onClickFn).toBeCalledWith(tabId);
});

test('should call onClick on "\' \'" key', async () => {
    const onClickFn = jest.fn();
    const user = userEvent.setup();
    render(<TabsItem id={tabId} title={tabTitle} onClick={onClickFn} />);

    const component = screen.getByRole('tab');
    component.focus();

    await user.keyboard(' ');

    expect(onClickFn).toBeCalledWith(tabId);
});

test('should not call onClick on "[Enter]" key', async () => {
    const onClickFn = jest.fn();
    const user = userEvent.setup();

    render(<TabsItem id={tabId} title={tabTitle} onClick={onClickFn} />);

    const component = screen.getByRole('tab');
    component.focus();

    await user.keyboard('[Enter]');

    expect(onClickFn).not.toBeCalled();
});
