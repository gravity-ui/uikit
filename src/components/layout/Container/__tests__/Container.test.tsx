import {renderWithoutProviders as render, screen} from '../../../../../test-utils/utils';
import {Container, LayoutProvider} from '../../../../index';
import type {LayoutTheme} from '../../../../index';

test.each([0, '0px'] as const)(
    'zero gutters (%s) override theme and preserve className',
    (gutters) => {
        render(
            <LayoutProvider>
                <Container gutters={gutters} className="custom" qa="container" />
            </LayoutProvider>,
        );
        expect(screen.getByTestId('container')).toHaveClass('g-container', 'custom');
        expect(screen.getByTestId('container')).toHaveStyle({paddingInline: '0px'});
    },
);

test.each<[string, LayoutTheme, string]>([
    ['defaults', {}, 'calc(var(--g-spacing-base) * 3)'],
    ['base zero', {components: {container: {gutters: 0}}}, '0px'],
    [
        'responsive zero',
        {components: {container: {gutters: 'spacing-3', media: {xs: {gutters: 0}}}}},
        '0px',
    ],
])('inherits %s gutters from the theme', (_name, config, paddingInline) => {
    render(
        <LayoutProvider config={config}>
            <Container qa="container" />
        </LayoutProvider>,
    );
    expect(screen.getByTestId('container')).toHaveStyle({paddingInline});
});
