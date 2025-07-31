import * as React from 'react';

import {userEvent} from '@testing-library/user-event';

import {render, screen, within} from '../../../../test-utils/utils';
import {Breadcrumbs} from '../Breadcrumbs';
import {BreadcrumbsItem} from '../BreadcrumbsItem';
import type {BreadcrumbsItemProps} from '../BreadcrumbsItem';

beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
        this: Element,
    ) {
        if (this instanceof HTMLOListElement) {
            return 500;
        }
        return 100;
    });
});

it('handles multiple items', () => {
    render(
        <Breadcrumbs>
            <Breadcrumbs.Item>Folder 1</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 2</Breadcrumbs.Item>
            <Breadcrumbs.Item disabled>Folder 3</Breadcrumbs.Item>
        </Breadcrumbs>,
    );
    const item1 = screen.getByText('Folder 1');
    expect(item1.tabIndex).toBe(0);
    expect(item1).not.toHaveAttribute('aria-current');
    const item2 = screen.getByText('Folder 2');
    expect(item2.tabIndex).toBe(0);
    expect(item2).not.toHaveAttribute('aria-current');
    const item3 = screen.getByText('Folder 3');
    expect(item3.tabIndex).toBe(-1);
    expect(item3).toHaveAttribute('aria-disabled', 'true');
    expect(item3).toHaveAttribute('aria-current', 'page');
});

it('should handle forward ref', function () {
    let ref: React.RefObject<any> | undefined;
    const Component = () => {
        ref = React.useRef(null);
        return (
            <Breadcrumbs ref={ref} aria-label="breadcrumbs-test">
                <Breadcrumbs.Item>Folder 1</Breadcrumbs.Item>
            </Breadcrumbs>
        );
    };
    render(<Component />);
    const breadcrumb = screen.getByLabelText('breadcrumbs-test');
    expect(breadcrumb).toBe(ref?.current);
});

it('shows four items with no menu', () => {
    render(
        <Breadcrumbs maxItems={4}>
            <Breadcrumbs.Item>Folder 1</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 2</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 3</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 4</Breadcrumbs.Item>
        </Breadcrumbs>,
    );
    const {children} = screen.getByRole('list');
    expect(within(children[0] as HTMLElement).queryByRole('button')).toBeNull();
    expect(screen.getByText('Folder 1')).toBeTruthy();
    expect(screen.getByText('Folder 2')).toBeTruthy();
    expect(screen.getByText('Folder 3')).toBeTruthy();
    expect(screen.getByText('Folder 4')).toBeTruthy();
});

it('shows a maximum of 3 items', () => {
    render(
        <Breadcrumbs maxItems={3}>
            <Breadcrumbs.Item>Folder 1</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 2</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 3</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 4</Breadcrumbs.Item>
        </Breadcrumbs>,
    );
    const {children} = screen.getByRole('list');
    expect(within(children[0] as HTMLElement).getByRole('button')).toBeTruthy();
    expect(() => screen.getByText('Folder 1')).toThrow();
    expect(() => screen.getByText('Folder 2')).toThrow();
    expect(screen.getByText('Folder 3')).toBeTruthy();
    expect(screen.getByText('Folder 4')).toBeTruthy();
});

it('shows a maximum of 3 items with showRoot', () => {
    render(
        <Breadcrumbs maxItems={3} showRoot>
            <Breadcrumbs.Item>Folder 1</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 2</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 3</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 4</Breadcrumbs.Item>
        </Breadcrumbs>,
    );
    const {children} = screen.getByRole('list');
    expect(screen.getByText('Folder 1')).toBeTruthy();
    expect(within(children[1] as HTMLElement).getByRole('button')).toBeTruthy();
    expect(() => screen.getByText('Folder 2')).toThrow();
    expect(() => screen.getByText('Folder 3')).toThrow();
    expect(screen.getByText('Folder 4')).toBeTruthy();
});

it('shows less than 4 items if they do not fit', () => {
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
        this: Element,
    ) {
        if (this instanceof HTMLOListElement) {
            return 300;
        }

        return 100;
    });

    render(
        <Breadcrumbs maxItems={4}>
            <Breadcrumbs.Item>Folder 1</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 2</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 3</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 4</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 5</Breadcrumbs.Item>
        </Breadcrumbs>,
    );

    const {children} = screen.getByRole('list');
    expect(within(children[0] as HTMLElement).getByRole('button')).toBeTruthy();
    expect(() => screen.getByText('Folder 1')).toThrow();
    expect(() => screen.getByText('Folder 2')).toThrow();
    expect(() => screen.getByText('Folder 3')).toThrow();
    expect(() => screen.getByText('Folder 4')).toThrow();
    expect(screen.getByText('Folder 5')).toBeTruthy();
});

it('shows other items if the last item is too long', () => {
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
        this: Element,
    ) {
        if (this instanceof HTMLOListElement) {
            return 401;
        }

        if (this.getAttribute('class')?.includes('__item_current')) {
            return 300;
        }
        return 100;
    });

    render(
        <Breadcrumbs maxItems={4}>
            <Breadcrumbs.Item>Folder 1</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 2</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 3</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 4</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 5</Breadcrumbs.Item>
        </Breadcrumbs>,
    );

    const {children} = screen.getByRole('list');
    expect(within(children[0] as HTMLElement).getByRole('button')).toBeTruthy();
    expect(() => screen.getByText('Folder 1')).toThrow();
    expect(() => screen.getByText('Folder 2')).toThrow();
    expect(() => screen.getByText('Folder 3')).toThrow();
    expect(screen.getByText('Folder 4')).toBeTruthy();
    expect(screen.getByText('Folder 5')).toBeTruthy();
});

it('collapses root item if it does not fit', () => {
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (
        this: Element,
    ) {
        if (this instanceof HTMLOListElement) {
            return 300;
        }

        return 100;
    });

    render(
        <Breadcrumbs showRoot>
            <Breadcrumbs.Item>Folder 1</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 2</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 3</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 4</Breadcrumbs.Item>
            <Breadcrumbs.Item>Folder 5</Breadcrumbs.Item>
        </Breadcrumbs>,
    );

    const {children} = screen.getByRole('list');
    expect(() => screen.getByText('Folder 1')).toThrow();
    expect(within(children[0] as HTMLElement).getByRole('button')).toBeTruthy();
    expect(() => screen.getByText('Folder 2')).toThrow();
    expect(() => screen.getByText('Folder 3')).toThrow();
    expect(() => screen.getByText('Folder 4')).toThrow();
    expect(screen.getByText('Folder 5')).toBeTruthy();
});

it('supports aria-label', function () {
    render(
        <Breadcrumbs aria-label="Test">
            <Breadcrumbs.Item>Folder 1</Breadcrumbs.Item>
        </Breadcrumbs>,
    );
    const breadcrumbs = screen.getByRole('list');
    expect(breadcrumbs).toHaveAttribute('aria-label', 'Test');
});

it('supports aria-labelledby', function () {
    render(
        <React.Fragment>
            <span id="test">Test</span>
            <Breadcrumbs aria-labelledby="test">
                <Breadcrumbs.Item>Folder 1</Breadcrumbs.Item>
            </Breadcrumbs>
        </React.Fragment>,
    );
    const breadcrumbs = screen.getByRole('list');
    expect(breadcrumbs).toHaveAttribute('aria-labelledby', 'test');
});

it('supports aria-describedby', function () {
    render(
        <React.Fragment>
            <span id="test">Test</span>
            <Breadcrumbs aria-describedby="test">
                <Breadcrumbs.Item>Folder 1</Breadcrumbs.Item>
            </Breadcrumbs>
        </React.Fragment>,
    );
    const breadcrumbs = screen.getByRole('list');
    expect(breadcrumbs).toHaveAttribute('aria-describedby', 'test');
});

it('supports custom props', function () {
    render(
        <Breadcrumbs data-testid="test">
            <Breadcrumbs.Item>Folder 1</Breadcrumbs.Item>
        </Breadcrumbs>,
    );
    const breadcrumbs = screen.getByRole('list');
    expect(breadcrumbs).toHaveAttribute('data-testid', 'test');
});

it('should support links', async function () {
    render(
        <Breadcrumbs>
            <Breadcrumbs.Item href="https://example.com">Example.com</Breadcrumbs.Item>
            <Breadcrumbs.Item href="https://example.com/foo">Foo</Breadcrumbs.Item>
            <Breadcrumbs.Item href="https://example.com/foo/bar">Bar</Breadcrumbs.Item>
            <Breadcrumbs.Item href="https://example.com/foo/bar/baz">Baz</Breadcrumbs.Item>
            <Breadcrumbs.Item href="https://example.com/foo/bar/baz/qux">Qux</Breadcrumbs.Item>
        </Breadcrumbs>,
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', 'https://example.com/foo/bar');
    expect(links[1]).toHaveAttribute('href', 'https://example.com/foo/bar/baz');
    expect(links[2]).toHaveAttribute('href', 'https://example.com/foo/bar/baz/qux');

    const menuButton = screen.getByRole('button');
    await userEvent.click(menuButton);

    const menu = screen.getByRole('menu');
    const items = within(menu).getAllByRole('menuitem');
    expect(items).toHaveLength(2);
    expect(items[0].tagName).toBe('A');
    expect(items[0]).toHaveAttribute('href', 'https://example.com');
    expect(items[1].tagName).toBe('A');
    expect(items[1]).toHaveAttribute('href', 'https://example.com/foo');
});

it('should support custom item component', async () => {
    const navigate = jest.fn();
    function RouterLink({
        href,
        routerOptions,
        ...rest
    }: {
        href: string;
        routerOptions: {foo: string};
    } & Omit<BreadcrumbsItemProps, 'href' | 'onClick'>) {
        return (
            <BreadcrumbsItem
                {...rest}
                href={href}
                onClick={(e) => {
                    e.preventDefault();
                    navigate(href, routerOptions);
                }}
            />
        );
    }
    render(
        <Breadcrumbs itemComponent={RouterLink}>
            <RouterLink href="/" routerOptions={{foo: 'bar'}} disabled>
                Example.com
            </RouterLink>
            <RouterLink href="/foo" routerOptions={{foo: 'foo'}}>
                Foo
            </RouterLink>
            <RouterLink href="/foo/bar" routerOptions={{foo: 'bar'}}>
                Bar
            </RouterLink>
            <RouterLink href="/foo/bar/baz" routerOptions={{foo: 'bar'}}>
                Baz
            </RouterLink>
            <RouterLink href="/foo/bar/baz/qux" routerOptions={{foo: 'bar'}} disabled>
                Qux
            </RouterLink>
        </Breadcrumbs>,
    );

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/foo/bar');
    await userEvent.click(links[0]);
    expect(navigate).toHaveBeenCalledWith('/foo/bar', {foo: 'bar'});
    navigate.mockReset();

    expect(links[2]).toHaveAttribute('aria-disabled', 'true');
    expect(links[2]).toHaveAttribute('aria-current', 'page');

    const menuButton = screen.getByRole('button');
    await userEvent.click(menuButton);

    const menu = screen.getByRole('menu');
    const items = within(menu).getAllByRole('menuitem');
    expect(items[1]).toHaveAttribute('href', '/foo');
    await userEvent.click(items[1]);
    expect(navigate).toHaveBeenCalledWith('/foo', {foo: 'foo'});

    expect(items[0]).toHaveAttribute('aria-disabled', 'true');
});
