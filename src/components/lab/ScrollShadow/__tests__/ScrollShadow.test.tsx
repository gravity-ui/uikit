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
});
