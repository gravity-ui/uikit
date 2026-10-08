import {render, screen} from '../../../../test-utils/utils';
import {EllipsisText} from '../EllipsisText';

const LONG_TEXT = 'a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz';

// General center-truncation layout is covered by visual tests; focused cases mock widths below.
describe('EllipsisText', () => {
    test.each(['start', 'end'] as const)('exposes the full text with position %s', (position) => {
        render(
            <button>
                <EllipsisText qa="ellipsis" position={position}>
                    {LONG_TEXT}
                </EllipsisText>
            </button>,
        );

        expect(screen.getByTestId('ellipsis')).not.toHaveAttribute('aria-label');
        expect(screen.getByRole('button')).toHaveAccessibleName(LONG_TEXT);
    });

    test('applies className and style to the root element', () => {
        render(
            <EllipsisText qa="ellipsis" className="custom" style={{color: 'red'}}>
                {LONG_TEXT}
            </EllipsisText>,
        );

        const root = screen.getByTestId('ellipsis');
        expect(root).toHaveClass('custom');
        expect(root).toHaveStyle({color: 'red'});
    });

    test.each(['start', 'end'] as const)(
        'keeps unmodified text for copying with position %s',
        (position) => {
            render(
                <EllipsisText qa="ellipsis" position={position}>
                    {LONG_TEXT}
                </EllipsisText>,
            );

            expect(
                screen.getByText(LONG_TEXT, {
                    selector: '.g-ellipsis-text__ellipsis-content bdi',
                }),
            ).toBeInTheDocument();
        },
    );

    describe('offsets', () => {
        test.each([
            {text: 'a👍b', offsetStart: 0, offsetEnd: 2, start: '', middle: 'a', end: '👍b'},
            {text: '👍🏽abc👨‍👩‍👧‍👦', offsetStart: 1, offsetEnd: 1, start: '👍🏽', middle: 'abc', end: '👨‍👩‍👧‍👦'},
        ])('keeps Unicode characters intact in $text', ({text, start, middle, end, ...offsets}) => {
            render(<EllipsisText {...offsets}>{text}</EllipsisText>);

            if (start) {
                expect(screen.getByText(start)).toBeInTheDocument();
            }
            expect(screen.getByText(middle, {selector: 'bdi'})).toBeInTheDocument();
            expect(screen.getByText(end)).toBeInTheDocument();
        });

        test('preserves surrogate pairs without Intl.Segmenter', () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const descriptor = Object.getOwnPropertyDescriptor(Intl, 'Segmenter')!;
            Object.defineProperty(Intl, 'Segmenter', {value: undefined, configurable: true});
            try {
                render(<EllipsisText offsetEnd={2}>a👍b</EllipsisText>);
                expect(screen.getByText('a', {selector: 'bdi'})).toBeInTheDocument();
                expect(screen.getByText('👍b')).toBeInTheDocument();
            } finally {
                Object.defineProperty(Intl, 'Segmenter', descriptor);
            }
        });

        test.each([
            {text: '123456', offsetStart: 4, offsetEnd: 4, separator: ''},
            {text: '123456', offsetStart: 10, offsetEnd: 10, separator: ''},
            {text: '123456', offsetStart: 0, offsetEnd: 10, separator: ''},
            {text: '', offsetStart: 2, offsetEnd: 2, separator: ''},
        ])('does not duplicate text for $text with offsets $offsetStart/$offsetEnd', (props) => {
            for (const position of ['start', 'end'] as const) {
                const {unmount} = render(
                    <EllipsisText qa="ellipsis" position={position} {...props}>
                        {props.text}
                    </EllipsisText>,
                );

                // The root contains one accessible copy and one visual copy of the full text.
                expect(screen.getByTestId('ellipsis').textContent).toBe(props.text.repeat(2));
                unmount();
            }
        });

        test('keeps offsetStart/offsetEnd characters untruncated at the edges', () => {
            render(
                <EllipsisText position="end" offsetStart={2} offsetEnd={3}>
                    1234567890
                </EllipsisText>,
            );

            expect(screen.getByText('12')).toBeInTheDocument();
            expect(screen.getByText('890')).toBeInTheDocument();
        });
    });

    test('updates center truncation without splitting Unicode characters', () => {
        const measure = jest
            .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
            .mockImplementation(function (this: HTMLElement) {
                return {
                    width: this.classList.contains('g-ellipsis-text__ellipsis-measure')
                        ? Array.from(this.textContent || '').length * 10
                        : 50,
                } as DOMRect;
            });
        try {
            const {rerender} = render(
                <EllipsisText position="center">{'👍🏽abcdefe\u0301'}</EllipsisText>,
            );
            expect(
                screen.getByText('👍🏽…e\u0301', {selector: '.g-ellipsis-text__ellipsis-content'}),
            ).toBeInTheDocument();

            rerender(<EllipsisText position="center">abcdef</EllipsisText>);
            expect(
                screen.getByText('ab…ef', {selector: '.g-ellipsis-text__ellipsis-content'}),
            ).toBeInTheDocument();

            rerender(
                <EllipsisText position="center" offsetStart={4}>
                    abcdef
                </EllipsisText>,
            );
            expect(
                screen.getByText('abcd…', {selector: '.g-ellipsis-text__ellipsis-content'}),
            ).toBeInTheDocument();
        } finally {
            measure.mockRestore();
        }
    });

    describe('separator', () => {
        test('keeps fully protected text unchanged in a narrow center container', () => {
            const text = 'a/b/c';
            const measure = jest
                .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
                .mockImplementation(function (this: HTMLElement) {
                    return {
                        width: this.classList.contains('g-ellipsis-text__ellipsis-measure')
                            ? 100
                            : 1,
                    } as DOMRect;
                });
            try {
                render(
                    <EllipsisText position="center" separator="/" offsetStart={1} offsetEnd={2}>
                        {text}
                    </EllipsisText>,
                );
                expect(
                    screen.getByText(text, {selector: '.g-ellipsis-text__ellipsis-content'}),
                ).toBeInTheDocument();
            } finally {
                measure.mockRestore();
            }
        });

        test.each([
            {text: 'hello', offsetStart: 1, offsetEnd: 0},
            {text: 'hello', offsetStart: 0, offsetEnd: 1},
            {text: 'a/b/c', offsetStart: 3, offsetEnd: 0},
            {text: 'a/b/c', offsetStart: 0, offsetEnd: 10},
            {text: 'a/b/c', offsetStart: 1, offsetEnd: 2},
            {text: 'a/b/c', offsetStart: 2, offsetEnd: 2},
        ])(
            'preserves all parts of $text with offsets $offsetStart/$offsetEnd',
            ({text, ...offsets}) => {
                render(
                    <EllipsisText qa="ellipsis" separator="/" {...offsets}>
                        {text}
                    </EllipsisText>,
                );

                expect(screen.getByText('', {selector: 'bdi'})).toBeEmptyDOMElement();
                // One accessible copy and one visual copy, without missing or duplicated characters.
                expect(screen.getByTestId('ellipsis').textContent).toBe(text.repeat(2));
            },
        );

        test.each([
            {
                separator: '::',
                text: 'left:part::middle::right',
                start: 'left:part',
                middle: '::middle::',
                end: 'right',
            },
            {
                separator: ['', '::', '->'],
                text: 'left::middle->right',
                start: 'left',
                middle: '::middle->',
                end: 'right',
            },
            {
                separator: '😀',
                text: 'left😀middle😀right',
                start: 'left',
                middle: '😀middle😀',
                end: 'right',
            },
            {
                separator: ['-', '->'],
                text: 'left->middle->right',
                start: 'left',
                middle: '->middle->',
                end: 'right',
            },
            {separator: '::', text: 'a:::b:::c', start: 'a', middle: ':::b::', end: ':c'},
            {separator: [''], text: 'abc', start: 'a', middle: 'b', end: 'c'},
        ])(
            'matches complete tokens in $text with $separator',
            ({separator, text, start, middle, end}) => {
                render(
                    <EllipsisText separator={separator} offsetStart={1} offsetEnd={1}>
                        {text}
                    </EllipsisText>,
                );

                expect(screen.getByText(start)).toBeInTheDocument();
                expect(screen.getByText(end)).toBeInTheDocument();
                expect(screen.getByText(middle, {selector: 'bdi'})).toBeInTheDocument();
            },
        );

        test('counts offsets in separator-delimited parts', () => {
            render(
                <EllipsisText position="end" separator="/" offsetStart={1} offsetEnd={1}>
                    path/to/some/file.tsx
                </EllipsisText>,
            );

            expect(screen.getByText('path')).toBeInTheDocument();
            expect(screen.getByText('file.tsx')).toBeInTheDocument();
        });
    });
});
