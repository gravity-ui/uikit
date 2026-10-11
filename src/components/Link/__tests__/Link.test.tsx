import * as React from 'react';

import {render, screen} from '../../../../test-utils/utils';
import {Link} from '../Link';

const qaId = 'link-component';

describe('Link', () => {
    test('Link is anchor', () => {
        render(<Link href="#" />);

        const link = screen.getByRole('link');

        expect(link).toBeInTheDocument();
    });

    test('rel attribute is present', () => {
        render(<Link href="#" target="_blank" />);

        const link = screen.getByRole('link');

        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('should render custom component', () => {
        const RouterLink = ({to, children, ...props}: React.ComponentProps<'a'> & {to: string}) => (
            <a {...props} href={to}>
                {children}
            </a>
        );

        render(
            <Link component={RouterLink} to="/path" view="primary">
                Router link
            </Link>,
        );

        const link = screen.getByRole('link');

        expect(link).toHaveAttribute('href', '/path');
        expect(link).toHaveClass('g-link', 'g-link_view_primary');
        expect(link).toHaveTextContent('Router link');
    });

    test('should not forward "component" prop to the rendered element', () => {
        render(<Link component="span" qa={qaId} />);

        const link = screen.getByTestId(qaId);

        expect(link.tagName).toBe('SPAN');
        expect(link).not.toHaveAttribute('component');
    });

    test('should forward ref to custom component', () => {
        const ref = React.createRef<HTMLSpanElement>();

        render(<Link component="span" ref={ref} qa={qaId} />);

        expect(ref.current).toBe(screen.getByTestId(qaId));
    });

    test('should forward ref to the element rendered by a custom component', () => {
        const RouterLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<'a'>>(
            function RouterLink({children, ...props}, ref) {
                return (
                    <a {...props} ref={ref}>
                        {children}
                    </a>
                );
            },
        );
        const ref = React.createRef<HTMLAnchorElement>();

        render(
            <Link component={RouterLink} href="/path" ref={ref}>
                Router link
            </Link>,
        );

        expect(ref.current).toBe(screen.getByRole('link'));
    });
});
