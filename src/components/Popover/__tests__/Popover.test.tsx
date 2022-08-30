import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

import {setupTimersMock} from '../../../tests/utils/setupTimersMock';
import {Popover} from '../Popover';
import type {PopoverProps} from '../';

setupTimersMock();

const defaultTooltipContent = 'Tooltip';
const defaultTriggerText = 'Trigger';

const renderPopover = (props?: Partial<PopoverProps>) => (
    <Popover content={defaultTooltipContent} qa="popover" openOnHover={false} {...props}>
        {defaultTriggerText}
    </Popover>
);

const waitForTooltipOpenedStateChange = () => jest.advanceTimersByTime(300);

const checkIfPopoverOpened = () => {
    const popover = screen.queryByTestId('popover-tooltip');

    expect(popover).toHaveClass('yc-popup_open');
};

const checkIfPopoverClosed = () => {
    const popover = screen.queryByTestId('popover-tooltip');

    if (popover) {
        expect(popover).not.toHaveClass('yc-popup_open');
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
    const onOpenChange = jest.fn();

    render(
        renderPopover({
            openOnHover: true,
            autoclosable: true,
            onOpenChange,
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.mouseEnter(popoverTrigger);
    waitForTooltipOpenedStateChange();

    checkIfPopoverOpened();

    fireEvent.mouseLeave(popoverTrigger);
    waitForTooltipOpenedStateChange();

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
    waitForTooltipOpenedStateChange();

    const tooltip = screen.getByText(defaultTooltipContent);
    fireEvent.mouseLeave(popoverTrigger);
    fireEvent.mouseEnter(tooltip);
    waitForTooltipOpenedStateChange();

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
    waitForTooltipOpenedStateChange();
    fireEvent.mouseLeave(popoverTrigger);
    waitForTooltipOpenedStateChange();

    checkIfPopoverOpened();
});

test('Can be opened/closed on click', () => {
    const onOpenChange = jest.fn();
    render(
        renderPopover({
            openOnHover: false,
            autoclosable: false,
            onOpenChange,
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
    const onOpenChange = jest.fn();

    render(
        renderPopover({
            hasClose: true,
            onOpenChange,
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
    const onLinkClick = jest.fn();

    const linkWithHrefConfig = {
        text: 'Link with a href',
        href: 'https://yandex.ru',
    };
    const linkWithClickHandlerConfig = {
        text: 'Link with an onClick handler',
        onClick: onLinkClick,
    };

    render(
        renderPopover({
            links: [linkWithHrefConfig, linkWithClickHandlerConfig],
        }),
    );

    const popoverTrigger = screen.getByText(defaultTriggerText);
    fireEvent.click(popoverTrigger);

    const linkWithHref = screen.getByText(linkWithHrefConfig.text);
    const linkWithClickHandler = screen.getByText(linkWithClickHandlerConfig.text);
    expect(linkWithHref).toBeInTheDocument();
    expect(linkWithClickHandler).toBeInTheDocument();

    fireEvent.click(linkWithClickHandler);
    expect(onLinkClick).toHaveBeenCalledTimes(1);
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
