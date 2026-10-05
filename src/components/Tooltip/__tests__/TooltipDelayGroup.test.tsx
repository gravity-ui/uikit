import * as React from 'react';

// eslint-disable-next-line no-restricted-syntax
import {render as renderWithoutProviders} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {setupTimersMock} from '../../../../test-utils/setupTimersMock';
import {act, render, screen} from '../../../../test-utils/utils';
import {ActionTooltip} from '../../ActionTooltip';
import {ThemeProvider} from '../../theme/ThemeProvider';
import type {ThemeProviderProps} from '../../theme/ThemeProvider';
import {Tooltip} from '../Tooltip';
import {TooltipDelayGroup} from '../TooltipDelayGroup';

const OPEN_DELAY = 1000;
const SKIP_DELAY = 300;

setupTimersMock();

function setup() {
    return userEvent.setup({advanceTimers: jest.advanceTimersByTime});
}

function advanceTime(ms: number) {
    act(() => {
        jest.advanceTimersByTime(ms);
    });
}

function renderTooltips(wrapper?: React.JSXElementConstructor<{children: React.ReactNode}>) {
    render(
        <React.Fragment>
            <Tooltip content="first tooltip">
                <button>first</button>
            </Tooltip>
            <Tooltip content="second tooltip">
                <button>second</button>
            </Tooltip>
        </React.Fragment>,
        {wrapper},
    );

    return {
        first: screen.getByRole('button', {name: 'first'}),
        second: screen.getByRole('button', {name: 'second'}),
    };
}

test('should open the first tooltip of the group after its own delay', async () => {
    const user = setup();
    const {first} = renderTooltips(TooltipDelayGroup);

    await user.hover(first);

    advanceTime(OPEN_DELAY - 1);
    expect(screen.queryByText('first tooltip')).not.toBeInTheDocument();

    advanceTime(1);
    expect(screen.getByText('first tooltip')).toBeVisible();
});

test('should reopen a tooltip closed by its neighbour on focus', async () => {
    const user = setup();
    const {first, second} = renderTooltips(TooltipDelayGroup);

    await user.hover(first);
    advanceTime(OPEN_DELAY);
    expect(screen.getByText('first tooltip')).toBeVisible();

    await user.hover(second);
    expect(screen.getByText('second tooltip')).toBeVisible();
    expect(screen.queryByText('first tooltip')).not.toBeInTheDocument();

    await user.tab();
    expect(first).toHaveFocus();
    expect(screen.getByText('first tooltip')).toBeVisible();
    expect(screen.queryByText('second tooltip')).not.toBeInTheDocument();
});

test('should keep the group warm during the skip delay after close', async () => {
    const user = setup();
    const {first, second} = renderTooltips(TooltipDelayGroup);

    await user.hover(first);
    advanceTime(OPEN_DELAY);

    await user.unhover(first);
    expect(screen.queryByText('first tooltip')).not.toBeInTheDocument();

    advanceTime(SKIP_DELAY - 1);
    await user.hover(second);

    expect(screen.getByText('second tooltip')).toBeVisible();
});

test('should restore the initial delay after the group cools down', async () => {
    const user = setup();
    const {first, second} = renderTooltips(TooltipDelayGroup);

    await user.hover(first);
    advanceTime(OPEN_DELAY);

    await user.unhover(first);
    advanceTime(SKIP_DELAY);

    await user.hover(second);
    advanceTime(OPEN_DELAY - 1);
    expect(screen.queryByText('second tooltip')).not.toBeInTheDocument();

    advanceTime(1);
    expect(screen.getByText('second tooltip')).toBeVisible();
});

test('should not close a tooltip opened by focus when hovering another one without the group', async () => {
    const user = setup();
    const {first, second} = renderTooltips();

    await user.tab();
    expect(first).toHaveFocus();
    expect(screen.getByText('first tooltip')).toBeVisible();

    await user.hover(second);
    advanceTime(OPEN_DELAY);
    expect(screen.getByText('first tooltip')).toBeVisible();
    expect(screen.getByText('second tooltip')).toBeVisible();
});

test('should keep a single tooltip open after another member of the group is unmounted', async () => {
    const user = setup();

    function Group() {
        const [showSecond, setShowSecond] = React.useState(true);

        return (
            <TooltipDelayGroup>
                <Tooltip content="first tooltip">
                    <button>first</button>
                </Tooltip>
                {showSecond && (
                    <Tooltip content="second tooltip">
                        <button>second</button>
                    </Tooltip>
                )}
                <Tooltip content="third tooltip">
                    <button>third</button>
                </Tooltip>
                <button onClick={() => setShowSecond(false)}>remove second</button>
            </TooltipDelayGroup>
        );
    }

    render(<Group />);

    await user.tab();
    expect(screen.getByText('first tooltip')).toBeVisible();

    act(() => {
        screen.getByRole('button', {name: 'remove second'}).click();
    });

    await user.hover(screen.getByRole('button', {name: 'third'}));
    expect(screen.getByText('third tooltip')).toBeVisible();
    expect(screen.queryByText('first tooltip')).not.toBeInTheDocument();
});

test('should cool the group down after the open tooltip is unmounted', async () => {
    const user = setup();

    function Group() {
        const [showFirst, setShowFirst] = React.useState(true);

        return (
            <TooltipDelayGroup>
                {showFirst && (
                    <Tooltip content="first tooltip">
                        <button onClick={() => setShowFirst(false)}>first</button>
                    </Tooltip>
                )}
                <Tooltip content="second tooltip">
                    <button>second</button>
                </Tooltip>
            </TooltipDelayGroup>
        );
    }

    render(<Group />);

    const first = screen.getByRole('button', {name: 'first'});
    await user.hover(first);
    advanceTime(OPEN_DELAY);
    expect(screen.getByText('first tooltip')).toBeVisible();

    await user.click(first);
    expect(first).not.toBeInTheDocument();
    advanceTime(SKIP_DELAY);

    await user.hover(screen.getByRole('button', {name: 'second'}));
    advanceTime(OPEN_DELAY - 1);
    expect(screen.queryByText('second tooltip')).not.toBeInTheDocument();
    advanceTime(1);
    expect(screen.getByText('second tooltip')).toBeVisible();
});

test('should not change the behavior of tooltips without the group', async () => {
    const user = setup();
    const {first, second} = renderTooltips();

    await user.hover(first);
    advanceTime(OPEN_DELAY);
    expect(screen.getByText('first tooltip')).toBeVisible();

    await user.hover(second);
    expect(screen.queryByText('second tooltip')).not.toBeInTheDocument();

    advanceTime(OPEN_DELAY);
    expect(screen.getByText('second tooltip')).toBeVisible();
});

test('should ask a controlled tooltip to close when its neighbour opens', async () => {
    const user = setup();
    const onOpenChange = jest.fn();

    render(
        <TooltipDelayGroup>
            <Tooltip content="controlled tooltip" open onOpenChange={onOpenChange}>
                <button>controlled</button>
            </Tooltip>
            <Tooltip content="second tooltip">
                <button>second</button>
            </Tooltip>
        </TooltipDelayGroup>,
    );

    const second = screen.getByRole('button', {name: 'second'});
    expect(screen.getByText('controlled tooltip')).toBeVisible();

    await user.hover(second);
    expect(screen.getByText('second tooltip')).toBeVisible();
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, undefined, undefined);

    await user.unhover(second);
    advanceTime(SKIP_DELAY);

    // A controlled tooltip ignoring the request does not keep the group warm
    await user.hover(second);
    advanceTime(OPEN_DELAY - 1);
    expect(screen.queryByText('second tooltip')).not.toBeInTheDocument();
    advanceTime(1);
    expect(screen.getByText('second tooltip')).toBeVisible();
    expect(onOpenChange).toHaveBeenCalledTimes(2);
});

test('should not warm the group up with a disabled tooltip', async () => {
    const user = setup();

    render(
        <TooltipDelayGroup>
            <Tooltip content="first tooltip" disabled>
                <button>first</button>
            </Tooltip>
            <Tooltip content="second tooltip">
                <button>second</button>
            </Tooltip>
        </TooltipDelayGroup>,
    );

    await user.hover(screen.getByRole('button', {name: 'first'}));
    advanceTime(OPEN_DELAY);
    expect(screen.queryByText('first tooltip')).not.toBeInTheDocument();

    await user.hover(screen.getByRole('button', {name: 'second'}));
    expect(screen.queryByText('second tooltip')).not.toBeInTheDocument();

    advanceTime(OPEN_DELAY);
    expect(screen.getByText('second tooltip')).toBeVisible();
});

test.each([
    {first: 'action', tooltipDelay: undefined, actionDelay: undefined},
    {first: 'tooltip', tooltipDelay: 700, actionDelay: 250},
])(
    'should preserve individual cold delays in a mixed group: %j',
    async ({first, tooltipDelay, actionDelay}) => {
        const user = setup();
        render(
            <TooltipDelayGroup>
                <Tooltip content="tooltip content" openDelay={tooltipDelay}>
                    <button>tooltip</button>
                </Tooltip>
                <ActionTooltip title="action content" openDelay={actionDelay}>
                    <button>action</button>
                </ActionTooltip>
            </TooltipDelayGroup>,
        );

        const anchors = {
            tooltip: screen.getByRole('button', {name: 'tooltip'}),
            action: screen.getByRole('button', {name: 'action'}),
        };
        const delays = {tooltip: tooltipDelay ?? OPEN_DELAY, action: actionDelay ?? 500};
        const order =
            first === 'tooltip'
                ? (['tooltip', 'action'] as const)
                : (['action', 'tooltip'] as const);

        for (const name of order) {
            await user.hover(anchors[name]);
            advanceTime(delays[name] - 1);
            expect(screen.queryByText(`${name} content`)).not.toBeInTheDocument();
            advanceTime(1);
            expect(screen.getByText(`${name} content`)).toBeVisible();

            await user.unhover(anchors[name]);
            advanceTime(SKIP_DELAY);
        }
    },
);

describe('ThemeProvider', () => {
    function renderRootTooltips(props?: Omit<ThemeProviderProps, 'children'>) {
        renderWithoutProviders(
            <ThemeProvider {...props}>
                <Tooltip content="first tooltip">
                    <button>first</button>
                </Tooltip>
                <Tooltip content="second tooltip">
                    <button>second</button>
                </Tooltip>
            </ThemeProvider>,
        );

        return {
            first: screen.getByRole('button', {name: 'first'}),
            second: screen.getByRole('button', {name: 'second'}),
        };
    }

    test('should share the delay between all tooltips by default', async () => {
        const user = setup();
        const {first, second} = renderRootTooltips();

        await user.hover(first);
        advanceTime(OPEN_DELAY);
        expect(screen.getByText('first tooltip')).toBeVisible();

        await user.hover(second);
        expect(screen.getByText('second tooltip')).toBeVisible();
        expect(screen.queryByText('first tooltip')).not.toBeInTheDocument();
    });

    test('should not split the group by a nested provider', async () => {
        const user = setup();
        renderWithoutProviders(
            <ThemeProvider>
                <Tooltip content="outer tooltip">
                    <button>outer</button>
                </Tooltip>
                <ThemeProvider scoped theme="dark">
                    <Tooltip content="inner tooltip">
                        <button>inner</button>
                    </Tooltip>
                </ThemeProvider>
            </ThemeProvider>,
        );

        await user.hover(screen.getByRole('button', {name: 'outer'}));
        advanceTime(OPEN_DELAY);
        expect(screen.getByText('outer tooltip')).toBeVisible();

        await user.hover(screen.getByRole('button', {name: 'inner'}));
        expect(screen.getByText('inner tooltip')).toBeVisible();
        expect(screen.queryByText('outer tooltip')).not.toBeInTheDocument();
    });

    test('should configure the app group with default props', async () => {
        const user = setup();
        const {first, second} = renderRootTooltips({
            defaultProps: {TooltipDelayGroup: {skipDelay: 40}},
        });

        await user.hover(first);
        advanceTime(OPEN_DELAY);
        await user.unhover(first);

        advanceTime(40);
        await user.hover(second);
        advanceTime(OPEN_DELAY - 1);
        expect(screen.queryByText('second tooltip')).not.toBeInTheDocument();
        advanceTime(1);
        expect(screen.getByText('second tooltip')).toBeVisible();
    });
});
