import * as React from 'react';

import {fireEvent, render, screen} from '../../../../../test-utils/utils';
import {ScrollShadow} from '../ScrollShadow';

describe('ScrollShadow', () => {
    test('forwards native props, ref, qa, and custom CSS properties', () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <ScrollShadow
                ref={ref}
                qa="scroll-shadow"
                className="custom-class"
                style={{maxHeight: 120, '--g-scroll-shadow-size': '40px'}}
                aria-label="Updates"
            >
                Content
            </ScrollShadow>,
        );

        const element = screen.getByTestId('scroll-shadow');
        expect(element).toBe(ref.current);
        expect(element).toHaveClass('g-scroll-shadow', 'custom-class');
        expect(element).toHaveStyle({maxHeight: '120px'});
        expect(element.style.getPropertyValue('--g-scroll-shadow-size')).toBe('40px');
        expect(element).toHaveAttribute('aria-label', 'Updates');
        expect(element).not.toHaveAttribute('tabindex');
        expect(element).toHaveTextContent('Content');
    });

    test('respects an explicit tabIndex', () => {
        render(
            <ScrollShadow qa="scroll-shadow" tabIndex={-1}>
                Content
            </ScrollShadow>,
        );

        expect(screen.getByTestId('scroll-shadow')).toHaveAttribute('tabindex', '-1');
    });

    test('calls onScroll', () => {
        const onScroll = jest.fn();
        render(
            <ScrollShadow qa="scroll-shadow" onScroll={onScroll}>
                Content
            </ScrollShadow>,
        );

        fireEvent.scroll(screen.getByTestId('scroll-shadow'));

        expect(onScroll).toHaveBeenCalledTimes(1);
    });

    test.each([
        {clientLeft: 0, clientTop: 0, vertical: 'right top', horizontal: 'left bottom'},
        {clientLeft: 15, clientTop: 15, vertical: 'left top', horizontal: 'left top'},
    ])('keeps scrollbar tracks opaque at $vertical and $horizontal', (metrics) => {
        render(<ScrollShadow qa="scroll-shadow">Content</ScrollShadow>);

        const element = screen.getByTestId('scroll-shadow');
        Object.defineProperties(element, {
            offsetWidth: {configurable: true, value: 220},
            clientWidth: {configurable: true, value: 205},
            offsetHeight: {configurable: true, value: 160},
            clientHeight: {configurable: true, value: 145},
            clientLeft: {configurable: true, value: metrics.clientLeft},
            clientTop: {configurable: true, value: metrics.clientTop},
        });
        fireEvent.scroll(element);

        expect(element.style.getPropertyValue('--_--vertical-scrollbar-position')).toBe(
            metrics.vertical,
        );
        expect(element.style.getPropertyValue('--_--horizontal-scrollbar-position')).toBe(
            metrics.horizontal,
        );
        expect(element.style.getPropertyValue('--_--scrollbar-left')).toBe(
            `${metrics.clientLeft}px`,
        );
        expect(element.style.getPropertyValue('--_--scrollbar-top')).toBe(`${metrics.clientTop}px`);
    });
});
