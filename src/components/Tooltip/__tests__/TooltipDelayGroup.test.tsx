import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {setupTimersMock} from '../../../../test-utils/setupTimersMock';
import {act, render, screen} from '../../../../test-utils/utils';
import {Tooltip} from '../Tooltip';
import {TooltipDelayGroup} from '../TooltipDelayGroup';

const OPEN_DELAY = 1000;
const SKIP_DELAY = 300;
const WARM_CLOSE_DELAY = 200;

setupTimersMock();

function setup() {
    return userEvent.setup({advanceTimers: jest.advanceTimersByTime});
}

function advanceTime(ms: number) {
    act(() => {
        jest.advanceTimersByTime(ms);
    });
}

function renderTooltips(grouped: boolean) {
    const tooltips = (
        <React.Fragment>
            <Tooltip content="first tooltip">
                <button>first</button>
            </Tooltip>
            <Tooltip content="second tooltip">
                <button>second</button>
            </Tooltip>
        </React.Fragment>
    );

    render(grouped ? <TooltipDelayGroup>{tooltips}</TooltipDelayGroup> : tooltips);

    return {
        first: screen.getByRole('button', {name: 'first'}),
        second: screen.getByRole('button', {name: 'second'}),
    };
}

test('should open the first tooltip of the group after its own delay', async () => {
    const user = setup();
    const {first} = renderTooltips(true);

    await user.hover(first);

    advanceTime(OPEN_DELAY - 1);
    expect(screen.queryByText('first tooltip')).not.toBeInTheDocument();

    advanceTime(1);
    expect(screen.getByText('first tooltip')).toBeVisible();
});

test('should open the neighbour tooltip instantly while the group is warm', async () => {
    const user = setup();
    const {first, second} = renderTooltips(true);

    await user.hover(first);
    advanceTime(OPEN_DELAY);
    expect(screen.getByText('first tooltip')).toBeVisible();

    await user.hover(second);

    expect(screen.getByText('second tooltip')).toBeVisible();
    expect(screen.queryByText('first tooltip')).not.toBeInTheDocument();
});

test('should keep a tooltip reopened by focus visible after the previous hover close delay', async () => {
    const user = setup();
    const {first, second} = renderTooltips(true);

    await user.hover(first);
    advanceTime(OPEN_DELAY);
    expect(screen.getByText('first tooltip')).toBeVisible();

    await user.hover(second);
    expect(screen.getByText('second tooltip')).toBeVisible();
    expect(screen.queryByText('first tooltip')).not.toBeInTheDocument();

    // Reopen the first tooltip before its previous hover close timer would fire.
    await user.tab();
    expect(first).toHaveFocus();
    expect(screen.getByText('first tooltip')).toBeVisible();
    expect(screen.queryByText('second tooltip')).not.toBeInTheDocument();

    advanceTime(WARM_CLOSE_DELAY);
    expect(first).toHaveFocus();
    expect(screen.getByText('first tooltip')).toBeVisible();
});

test('should keep the group warm during the skip delay after close', async () => {
    const user = setup();
    const {first, second} = renderTooltips(true);

    await user.hover(first);
    advanceTime(OPEN_DELAY);

    await user.unhover(first);
    advanceTime(WARM_CLOSE_DELAY);
    expect(screen.queryByText('first tooltip')).not.toBeInTheDocument();

    advanceTime(SKIP_DELAY - 1);
    await user.hover(second);

    expect(screen.getByText('second tooltip')).toBeVisible();
});

test('should restore the initial delay after the group cools down', async () => {
    const user = setup();
    const {first, second} = renderTooltips(true);

    await user.hover(first);
    advanceTime(OPEN_DELAY);

    await user.unhover(first);
    advanceTime(WARM_CLOSE_DELAY);
    advanceTime(SKIP_DELAY);

    await user.hover(second);
    advanceTime(OPEN_DELAY - 1);
    expect(screen.queryByText('second tooltip')).not.toBeInTheDocument();

    advanceTime(1);
    expect(screen.getByText('second tooltip')).toBeVisible();
});

test('should not change the behavior of tooltips without the group', async () => {
    const user = setup();
    const {first, second} = renderTooltips(false);

    await user.hover(first);
    advanceTime(OPEN_DELAY);
    expect(screen.getByText('first tooltip')).toBeVisible();

    await user.hover(second);
    expect(screen.queryByText('second tooltip')).not.toBeInTheDocument();

    advanceTime(OPEN_DELAY);
    expect(screen.getByText('second tooltip')).toBeVisible();
});

test('should keep asking a controlled tooltip to close while it stays open', async () => {
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

    // The group is warm because of the open controlled tooltip
    await user.hover(second);
    expect(screen.getByText('second tooltip')).toBeVisible();
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenLastCalledWith(false, undefined, undefined);

    await user.unhover(second);
    advanceTime(WARM_CLOSE_DELAY);
    advanceTime(SKIP_DELAY);

    // The controlled tooltip is still open, so the group must not cool down
    await user.hover(second);
    expect(screen.getByText('second tooltip')).toBeVisible();
    expect(onOpenChange).toHaveBeenCalledTimes(2);
});

test('should keep at most one uncontrolled tooltip open next to a controlled one', async () => {
    const user = setup();

    render(
        <TooltipDelayGroup>
            <Tooltip content="controlled tooltip" open onOpenChange={() => {}}>
                <button>controlled</button>
            </Tooltip>
            <Tooltip content="first tooltip">
                <button>first</button>
            </Tooltip>
            <Tooltip content="second tooltip">
                <button>second</button>
            </Tooltip>
        </TooltipDelayGroup>,
    );

    await user.hover(screen.getByRole('button', {name: 'first'}));
    expect(screen.getByText('first tooltip')).toBeVisible();

    await user.hover(screen.getByRole('button', {name: 'second'}));
    expect(screen.getByText('second tooltip')).toBeVisible();
    expect(screen.queryByText('first tooltip')).not.toBeInTheDocument();
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
