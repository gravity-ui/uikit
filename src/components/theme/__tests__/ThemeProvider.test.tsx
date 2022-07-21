import {render, screen} from '@testing-library/react';
import React from 'react';
import {mockMatchMedia} from '../../../../test-utils/mocks/mockMatchMedia';
import {ThemeProvider} from '../ThemeProvider';
import {useTheme} from '../useTheme';
import {useThemeValue} from '../useThemeValue';

function ThemeDisplay() {
    const [theme] = useTheme();
    const themeValue = useThemeValue();

    return (
        <>
            Theme: {theme}, theme value: {themeValue}
        </>
    );
}

let mock: ReturnType<typeof mockMatchMedia>;
beforeEach(() => {
    mock = mockMatchMedia();
});
afterEach(() => mock.uninstall());

test('should set "system" theme by default', () => {
    render(
        <ThemeProvider>
            <ThemeDisplay />
        </ThemeProvider>,
    );

    screen.getByText('Theme: system, theme value: light');
});

test('should change theme value on system theme change', async () => {
    render(
        <ThemeProvider>
            <ThemeDisplay />
        </ThemeProvider>,
    );

    mock.changeMedia(true);

    const el = await screen.findByText('Theme: system, theme value: dark');
    expect(el).toBeInTheDocument();
});

test('should keep selected theme when system theme changes', async () => {
    render(
        <ThemeProvider theme="light">
            <ThemeDisplay />
        </ThemeProvider>,
    );

    screen.getByText('Theme: light, theme value: light');

    mock.changeMedia(true);

    const el = await screen.findByText('Theme: light, theme value: light');
    expect(el).toBeInTheDocument();
});
