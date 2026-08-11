import * as React from 'react';

import {fireEvent, render, screen} from '../../../../../test-utils/utils';
import {ScrollShadow} from '../ScrollShadow';

const qa = 'scroll-shadow';

interface ScrollMetrics {
    clientHeight?: number;
    clientWidth?: number;
    scrollHeight?: number;
    scrollLeft?: number;
    scrollTop?: number;
    scrollWidth?: number;
}

function setScrollMetrics(element: HTMLElement, metrics: ScrollMetrics) {
    for (const [name, value] of Object.entries(metrics)) {
        Object.defineProperty(element, name, {
            configurable: true,
            writable: true,
            value,
        });
    }
}

function getScrollShadow() {
    return screen.getByTestId(qa);
}

describe('ScrollShadow', () => {
    test('renders a native scroll container and forwards div props and ref', () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <ScrollShadow
                ref={ref}
                data-qa={qa}
                className="custom-class"
                style={{maxHeight: 120}}
                aria-label="Updates"
            >
                Content
            </ScrollShadow>,
        );

        const element = getScrollShadow();
        expect(element).toBe(ref.current);
        expect(element).toHaveClass('g-scroll-shadow', 'custom-class');
        expect(element).toHaveStyle({maxHeight: '120px'});
        expect(element).toHaveAttribute('aria-label', 'Updates');
        expect(element).toHaveAttribute('tabindex', '0');
        expect(element).toHaveTextContent('Content');
    });

    test('does not show shadows without overflow', () => {
        render(<ScrollShadow data-qa={qa}>Content</ScrollShadow>);
        const element = getScrollShadow();

        setScrollMetrics(element, {
            clientHeight: 100,
            scrollHeight: 100,
            scrollTop: 0,
        });
        fireEvent.scroll(element);

        expect(element).not.toHaveAttribute('data-scroll-shadow-top');
        expect(element).not.toHaveAttribute('data-scroll-shadow-bottom');
    });

    test('shows only the block-end shadow at the initial scroll position by default', () => {
        render(<ScrollShadow data-qa={qa}>Content</ScrollShadow>);
        const element = getScrollShadow();

        setScrollMetrics(element, {
            clientHeight: 100,
            scrollHeight: 300,
            scrollTop: 0,
        });
        fireEvent.scroll(element);

        expect(element).not.toHaveAttribute('data-scroll-shadow-top');
        expect(element).toHaveAttribute('data-scroll-shadow-bottom', 'true');
        expect(element).not.toHaveAttribute('data-scroll-shadow-left');
        expect(element).not.toHaveAttribute('data-scroll-shadow-right');
    });

    test('updates block shadows while scrolling', () => {
        render(<ScrollShadow data-qa={qa}>Content</ScrollShadow>);
        const element = getScrollShadow();

        setScrollMetrics(element, {
            clientHeight: 100,
            scrollHeight: 300,
            scrollTop: 80,
        });
        fireEvent.scroll(element);

        expect(element).toHaveAttribute('data-scroll-shadow-top', 'true');
        expect(element).toHaveAttribute('data-scroll-shadow-bottom', 'true');

        setScrollMetrics(element, {scrollTop: 200});
        fireEvent.scroll(element);

        expect(element).toHaveAttribute('data-scroll-shadow-top', 'true');
        expect(element).not.toHaveAttribute('data-scroll-shadow-bottom');
    });

    test('respects inline axis and position', () => {
        render(
            <ScrollShadow data-qa={qa} axis="inline" position="end">
                Content
            </ScrollShadow>,
        );
        const element = getScrollShadow();

        setScrollMetrics(element, {
            clientWidth: 100,
            scrollLeft: 40,
            scrollWidth: 300,
        });
        fireEvent.scroll(element);

        expect(element).not.toHaveAttribute('data-scroll-shadow-left');
        expect(element).toHaveAttribute('data-scroll-shadow-right', 'true');
        expect(element).not.toHaveAttribute('data-scroll-shadow-top');
        expect(element).not.toHaveAttribute('data-scroll-shadow-bottom');
    });

    test('supports both logical axes', () => {
        render(
            <ScrollShadow data-qa={qa} axis="both">
                Content
            </ScrollShadow>,
        );
        const element = getScrollShadow();

        setScrollMetrics(element, {
            clientHeight: 100,
            clientWidth: 100,
            scrollHeight: 300,
            scrollWidth: 300,
            scrollTop: 50,
            scrollLeft: 50,
        });
        fireEvent.scroll(element);

        expect(element).toHaveAttribute('data-scroll-shadow-top', 'true');
        expect(element).toHaveAttribute('data-scroll-shadow-right', 'true');
        expect(element).toHaveAttribute('data-scroll-shadow-bottom', 'true');
        expect(element).toHaveAttribute('data-scroll-shadow-left', 'true');
    });

    test('maps inline start and end to physical edges in RTL', () => {
        render(
            <ScrollShadow data-qa={qa} axis="inline" dir="rtl">
                Content
            </ScrollShadow>,
        );
        const element = getScrollShadow();

        setScrollMetrics(element, {
            clientWidth: 100,
            scrollLeft: 0,
            scrollWidth: 300,
        });
        fireEvent.scroll(element);

        expect(element).toHaveAttribute('data-scroll-shadow-left', 'true');
        expect(element).not.toHaveAttribute('data-scroll-shadow-right');

        setScrollMetrics(element, {scrollLeft: -200});
        fireEvent.scroll(element);

        expect(element).not.toHaveAttribute('data-scroll-shadow-left');
        expect(element).toHaveAttribute('data-scroll-shadow-right', 'true');
    });

    test('does not show shadows when disabled', () => {
        render(
            <ScrollShadow data-qa={qa} axis="both" disabled>
                Content
            </ScrollShadow>,
        );
        const element = getScrollShadow();

        setScrollMetrics(element, {
            clientHeight: 100,
            clientWidth: 100,
            scrollHeight: 300,
            scrollWidth: 300,
            scrollTop: 50,
            scrollLeft: 50,
        });
        fireEvent.scroll(element);

        expect(element).not.toHaveAttribute('data-scroll-shadow-top');
        expect(element).not.toHaveAttribute('data-scroll-shadow-right');
        expect(element).not.toHaveAttribute('data-scroll-shadow-bottom');
        expect(element).not.toHaveAttribute('data-scroll-shadow-left');
    });

    test('calls onScroll', () => {
        const onScroll = jest.fn();
        render(
            <ScrollShadow data-qa={qa} onScroll={onScroll}>
                Content
            </ScrollShadow>,
        );

        fireEvent.scroll(getScrollShadow());

        expect(onScroll).toHaveBeenCalledTimes(1);
    });
});
