import {render, screen} from '../../../../test-utils/utils';
import {Ellipsis} from '../Ellipsis';

// Isolation characters that wrap the truncated part to keep bidi rendering stable.
const FSI = '\u2068';
const PDI = '\u2069';
const stripIsolation = (value: string | null | undefined) =>
    (value ?? '').replaceAll(FSI, '').replaceAll(PDI, '');

const LONG_TEXT = 'a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz';

// The `center` position relies on ResizeObserver and document.fonts, which jsdom does
// not implement, so for it we can only rely on the visual tests.
describe('Ellipsis', () => {
    test('exposes the full text as an accessible label', () => {
        render(<Ellipsis qa="ellipsis">{LONG_TEXT}</Ellipsis>);

        expect(screen.getByTestId('ellipsis')).toHaveAttribute('aria-label', LONG_TEXT);
    });

    test('applies className and style to the root element', () => {
        render(
            <Ellipsis qa="ellipsis" className="custom" style={{color: 'red'}}>
                {LONG_TEXT}
            </Ellipsis>,
        );

        const root = screen.getByTestId('ellipsis');
        expect(root).toHaveClass('custom');
        expect(root).toHaveStyle({color: 'red'});
    });

    test('keeps the full text in the DOM (for copying)', () => {
        render(<Ellipsis qa="ellipsis">{LONG_TEXT}</Ellipsis>);

        expect(stripIsolation(screen.getByTestId('ellipsis').textContent)).toBe(LONG_TEXT);
    });

    describe('offsets', () => {
        test('keeps offsetStart/offsetEnd characters untruncated at the edges', () => {
            render(
                <Ellipsis position="end" offsetStart={2} offsetEnd={3}>
                    1234567890
                </Ellipsis>,
            );

            expect(screen.getByText('12')).toBeInTheDocument();
            expect(screen.getByText('890')).toBeInTheDocument();
        });
    });

    describe('separator', () => {
        test('counts offsets in separator-delimited parts', () => {
            render(
                <Ellipsis position="end" separator="/" offsetStart={1} offsetEnd={1}>
                    path/to/some/file.tsx
                </Ellipsis>,
            );

            expect(screen.getByText('path')).toBeInTheDocument();
            expect(screen.getByText('file.tsx')).toBeInTheDocument();
        });

        test('supports multiple separators', () => {
            render(
                <Ellipsis position="end" separator={['.', '/', '-']} offsetStart={1} offsetEnd={1}>
                    src.components.Ellipsis/Ellipsis-tsx
                </Ellipsis>,
            );

            expect(screen.getByText('src')).toBeInTheDocument();
            expect(screen.getByText('tsx')).toBeInTheDocument();
        });
    });
});
