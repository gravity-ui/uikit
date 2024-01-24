import React from 'react';

import {setupTimersMock} from '../../../../test-utils/setupTimersMock';
import {act, fireEvent, render, screen} from '../../../../test-utils/utils';
import {Popover} from '../Popover';
import {PopoverBehavior, delayByBehavior} from '../config';
import type {PopoverProps} from '../types';

setupTimersMock();

const defaultTooltipContent = 'Tooltip';
const defaultTriggerText = 'Trigger';

const renderPopover = (props?: Partial<PopoverProps>) => (
    <Popover
        content={defaultTooltipContent}
        behavior={PopoverBehavior.Delayed}
        qa="popover"
        openOnHover={false}
        {...props}
    >
        {defaultTriggerText}
    </Popover>
);

const waitForTooltipOpenedStateChange = (shouldOpen?: boolean) =>
    jest.advanceTimersByTime(delayByBehavior[PopoverBehavior.Delayed][shouldOpen ? 0 : 1]);

const checkIfPopoverOpened = () => {
    const popover = screen.queryByTestId('popover-tooltip');

    expect(popover).toHaveClass('g-popup_open');
};

const checkIfPopoverClosed = () => {
    const popover = screen.queryByTestId('popover-tooltip');

    if (popover) {
        expect(popover).not.toHaveClass('g-popup_open');
    } else {
        expect(true).toBe(true);
    }
};

test('Renders with opened tooltip if initialOpen', () => {
    render(
        renderPopover({
            initialOpen: true,
        }),
    );

    checkIfPopoverOpened();
});

test('Can be opened/closed on hover/unhover', async () => {
    render(
        renderPopover({
            openOnHover: true,
            autoclosable: true,
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.mouseEnter(popoverTrigger);
    act(() => {
        waitForTooltipOpenedStateChange(true);
    });

    checkIfPopoverOpened();

    fireEvent.mouseLeave(popoverTrigger);
    act(() => {
        waitForTooltipOpenedStateChange(false);
    });

    checkIfPopoverClosed();
});

test("Doesn't close if the cursor is on the tooltip", () => {
    render(
        renderPopover({
            openOnHover: true,
            autoclosable: true,
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.mouseEnter(popoverTrigger);
    act(() => {
        waitForTooltipOpenedStateChange(true);
    });

    const tooltip = screen.getByText(defaultTooltipContent);
    fireEvent.mouseLeave(popoverTrigger);
    fireEvent.mouseEnter(tooltip);
    act(() => {
        waitForTooltipOpenedStateChange(false);
    });

    checkIfPopoverOpened();
});

test("Doesn't close on unhover if not autoclosable", () => {
    render(
        renderPopover({
            openOnHover: true,
            autoclosable: false,
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.mouseEnter(popoverTrigger);
    act(() => {
        waitForTooltipOpenedStateChange(true);
    });
    fireEvent.mouseLeave(popoverTrigger);
    act(() => {
        waitForTooltipOpenedStateChange(false);
    });

    checkIfPopoverOpened();
});

test('Can be opened/closed on click', () => {
    render(
        renderPopover({
            openOnHover: false,
            autoclosable: false,
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.click(popoverTrigger);

    checkIfPopoverOpened();

    fireEvent.click(popoverTrigger);

    checkIfPopoverClosed();
});

test("Can't be opened by click if onClick returns false", () => {
    render(
        renderPopover({
            openOnHover: false,
            onClick: async () => {
                return false;
            },
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.click(popoverTrigger);

    checkIfPopoverClosed();
});

test("Can't be opened if disabled", () => {
    render(
        renderPopover({
            disabled: true,
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.click(popoverTrigger);

    checkIfPopoverClosed();
});

test('Can be closed on click', () => {
    render(
        renderPopover({
            hasClose: true,
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.click(popoverTrigger);

    const closeButton = screen.getByRole('button', {name: 'Close'});
    fireEvent.click(closeButton);

    checkIfPopoverClosed();
});

test('Calls close button click handler on close button click', () => {
    const onCloseClick = jest.fn();

    render(
        renderPopover({
            hasClose: true,
            onCloseClick,
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.click(popoverTrigger);

    const closeButton = screen.getByRole('button', {name: 'Close'});
    fireEvent.click(closeButton);

    expect(onCloseClick).toHaveBeenCalledTimes(1);
});

test('Calls opened state change callback on open/close', () => {
    const onOpenChange = jest.fn();

    render(
        renderPopover({
            onOpenChange,
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.click(popoverTrigger);

    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    onOpenChange.mockClear();

    fireEvent.click(popoverTrigger);

    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(false);
});

test('Renders with html content', () => {
    render(
        renderPopover({
            htmlContent: '<b>html</b> content',
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.click(popoverTrigger);

    expect(screen.getByText('html')).toBeInTheDocument();
});

test('Renders with links', () => {
    const linkWithHrefConfig = {
        text: 'Link with a href',
        href: 'https://yandex.ru',
    };

    render(
        renderPopover({
            links: [linkWithHrefConfig],
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.click(popoverTrigger);

    const linkWithHref = screen.getByText(linkWithHrefConfig.text);
    expect(linkWithHref).toBeInTheDocument();
});

test('Renders with buttons', () => {
    const onActionButtonClick = jest.fn();
    const onCancelButtonClick = jest.fn();

    const actionButtonConfig = {
        text: 'Action',
        onClick: onActionButtonClick,
    };
    const cancelButtonConfig = {
        text: 'Cancel',
        onClick: onCancelButtonClick,
    };

    render(
        renderPopover({
            tooltipActionButton: actionButtonConfig,
            tooltipCancelButton: cancelButtonConfig,
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.click(popoverTrigger);

    const actionButton = screen.getByRole('button', {name: actionButtonConfig.text});
    const cancelButton = screen.getByRole('button', {name: cancelButtonConfig.text});

    expect(actionButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(onActionButtonClick).toHaveBeenCalledTimes(1);
    fireEvent.click(cancelButton);
    expect(onCancelButtonClick).toHaveBeenCalledTimes(1);
});
