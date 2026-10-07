import * as React from 'react';

import {
    act,
    renderWithoutProviders as render,
    renderHook,
    screen,
} from '../../../../test-utils/utils';
import {
    Dialog,
    LangProvider,
    LayoutProvider,
    MobileContext,
    MobileProvider,
    Modal,
    Platform,
    Portal,
    Provider,
    ThemeProvider,
    configure,
    useDefaultProps,
    useDirection,
    useLang,
    useLayoutContext,
    useMobile,
    usePlatform,
    useTheme,
    useThemeSettings,
    useThemeValue,
} from '../../../index';
import type {ThemeProviderProps} from '../../../index';
import * as domHelpers from '../dom-helpers';

afterEach(() => {
    document.body.className = '';
    document.body.removeAttribute('dir');
    configure({lang: 'en', fallbackLang: 'en'});
});

test.each([Provider, ThemeProvider])(
    'nested Provider is scoped inside %p even with scoped=false',
    (Parent) => {
        const {rerender} = render(
            <Parent theme="light" direction="ltr">
                <Provider theme="dark" direction="rtl" scoped={false} rootClassName="local">
                    <span>region</span>
                </Provider>
            </Parent>,
        );
        const region = screen.getByText('region').parentElement;
        expect(region).toHaveClass('g-root_theme_dark', 'local');
        expect(region).toHaveAttribute('dir', 'rtl');
        expect(document.body).toHaveClass('g-root_theme_light');
        expect(document.body).not.toHaveClass('g-root_mobile', 'local');
        expect(document.body).not.toHaveAttribute('dir');

        rerender(
            <Parent theme="light">
                <Provider mobile={false} scoped={false}>
                    <span>region</span>
                </Provider>
            </Parent>,
        );
        expect(screen.getByText('region').parentElement).toHaveClass('g-root_theme_light');
        expect(screen.getByText('region').parentElement).not.toHaveClass('g-root_mobile');
        expect(document.body).not.toHaveClass('g-root_mobile');
    },
);

test('works in StrictMode and updates body theme, direction and mobile mode', () => {
    const {rerender} = render(
        <React.StrictMode>
            <Provider theme="dark" direction="rtl" rootClassName="custom" mobile />
        </React.StrictMode>,
    );
    expect(document.body).toHaveClass('g-root', 'g-root_theme_dark', 'custom', 'g-root_mobile');
    expect(document.body).toHaveAttribute('dir', 'rtl');

    rerender(
        <React.StrictMode>
            <Provider theme="light" rootClassName="updated" />
        </React.StrictMode>,
    );
    expect(document.body).toHaveClass('g-root_theme_light', 'updated');
    expect(document.body).not.toHaveClass('g-root_theme_dark', 'custom', 'g-root_mobile');
    expect(document.body).not.toHaveAttribute('dir');
});

test.each([ThemeProvider, Provider])('keeps feature contexts through nested %p', (Nested) => {
    const {result} = renderHook(
        () => ({
            theme: useTheme(),
            value: useThemeValue(),
            direction: useDirection(),
            settings: useThemeSettings(),
            lang: useLang(),
            layout: useLayoutContext(),
            defaults: useDefaultProps('Button', {}),
            mobile: useMobile(),
            platform: usePlatform(),
        }),
        {
            wrapper: ({children}) => (
                <Provider
                    theme="light"
                    direction="rtl"
                    systemDarkTheme="dark-hc"
                    lang="ru"
                    fallbackLang="en"
                    layout={{fixBreakpoints: true}}
                    defaultProps={{Button: {size: 'l'}}}
                    mobile
                    platform={Platform.IOS}
                >
                    <Nested theme="dark">
                        <Nested scoped={false}>{children}</Nested>
                    </Nested>
                </Provider>
            ),
        },
    );
    expect(result.current).toMatchObject({
        theme: 'dark',
        value: 'dark',
        direction: 'rtl',
        settings: {systemLightTheme: 'light', systemDarkTheme: 'dark-hc'},
        lang: {lang: 'ru', fallbackLang: 'en'},
        layout: {activeMediaQuery: 'xs'},
        defaults: {size: 'l'},
        mobile: Nested === ThemeProvider,
        platform: Nested === ThemeProvider ? Platform.IOS : Platform.BROWSER,
    });
    expect(document.body).toHaveClass('g-root_theme_light', 'g-root_mobile');
});

test('provides the existing mobile defaults', () => {
    const {result} = renderHook(() => React.useContext(MobileContext), {
        wrapper: Provider,
    });
    expect(result.current).toMatchObject({
        mobile: false,
        platform: Platform.BROWSER,
    });
    expect(result.current.useLocation()).toEqual({pathname: '', search: '', hash: ''});
    expect(result.current.useHistory().action).toBe('');
});

test.each([Provider, MobileProvider])('mobile modals follow mobile mode in %p', (Wrapper) => {
    const content = (
        <React.Fragment>
            <Modal open qa="modal">
                Modal content
            </Modal>
            <Dialog open qa="dialog">
                Dialog content
            </Dialog>
        </React.Fragment>
    );
    const {rerender} = render(<Wrapper mobile>{content}</Wrapper>, {wrapper: ThemeProvider});
    expect(screen.getByTestId('modal')).toHaveClass('g-modal_mobile');
    expect(screen.getByTestId('dialog')).toHaveClass('g-modal_mobile', 'g-dialog__modal_mobile');
    expect(screen.getByText('Dialog content')).toHaveClass('g-dialog_mobile');

    rerender(<Wrapper mobile={false}>{content}</Wrapper>);
    expect(screen.getByTestId('modal')).not.toHaveClass('g-modal_mobile');
    expect(screen.getByTestId('dialog')).not.toHaveClass(
        'g-modal_mobile',
        'g-dialog__modal_mobile',
    );
    expect(screen.getByText('Dialog content')).not.toHaveClass('g-dialog_mobile');
});

test.each(['back', 'goBack'] as const)('passes router hooks and adapts %s', (backMethod) => {
    const back = jest.fn();
    const history = {
        action: 'POP' as const,
        push: jest.fn(),
        replace: jest.fn(),
        [backMethod]: back,
    };
    const location = {pathname: '/page', search: '?q=1', hash: '#sheet'};
    const {result} = renderHook(
        () => {
            const mobile = React.useContext(MobileContext);
            return {history: mobile.useHistory(), location: mobile.useLocation()};
        },
        {
            wrapper: ({children}) => (
                <Provider>
                    <Provider useHistory={() => history} useLocation={() => location}>
                        {children}
                    </Provider>
                </Provider>
            ),
        },
    );
    expect(result.current.location).toBe(location);
    expect(result.current.history.push).toBe(history.push);
    result.current.history.goBack();
    expect(back).toHaveBeenCalledTimes(1);
});

test('nested Provider uses mobile defaults instead of inheriting parent settings', () => {
    const parentBack = jest.fn();
    const {result} = renderHook(() => React.useContext(MobileContext), {
        wrapper: ({children}) => (
            <Provider
                mobile
                platform={Platform.IOS}
                useHistory={() => ({action: 'POP', push() {}, replace() {}, back: parentBack})}
                useLocation={() => ({pathname: '/parent', search: '?q=1', hash: '#sheet'})}
            >
                <Provider>{children}</Provider>
            </Provider>
        ),
    });
    expect(result.current).toMatchObject({
        mobile: false,
        platform: Platform.BROWSER,
    });
    expect(result.current.useLocation()).toEqual({pathname: '', search: '', hash: ''});
    expect(result.current.useHistory().action).toBe('');
    result.current.useHistory().goBack();
    expect(parentBack).not.toHaveBeenCalled();
});

test.each([Provider, MobileProvider])(
    'nested %p preserves MobileProvider body-class behavior',
    (Nested) => {
        const child = jest.fn();
        function Settings() {
            child(React.useContext(MobileContext));
            return <span>region</span>;
        }
        const {rerender} = render(
            <Provider mobile={false} platform={Platform.IOS}>
                <Nested>
                    <Settings />
                </Nested>
            </Provider>,
        );
        expect(document.body).not.toHaveClass('g-root_mobile');
        rerender(
            <Provider mobile={false} platform={Platform.IOS}>
                <Nested mobile platform={Platform.ANDROID}>
                    <Settings />
                </Nested>
            </Provider>,
        );
        expect(child).toHaveBeenLastCalledWith(
            expect.objectContaining({
                mobile: true,
                platform: Platform.ANDROID,
            }),
        );
        expect(document.body).toHaveClass('g-root_mobile');
        expect(screen.getByText('region').parentElement).not.toHaveClass('g-root_mobile');
        rerender(
            <Provider mobile={false} platform={Platform.IOS}>
                <Nested mobile={false}>
                    <Settings />
                </Nested>
            </Provider>,
        );
        expect(document.body).not.toHaveClass('g-root_mobile');
    },
);

test('standalone ThemeProvider can be global or explicitly scoped', () => {
    const {rerender} = render(<ThemeProvider theme="light" direction="rtl" />);
    expect(document.body).toHaveClass('g-root_theme_light');
    expect(document.body).toHaveAttribute('dir', 'rtl');
    rerender(
        <ThemeProvider scoped theme="dark" direction="ltr">
            <span>region</span>
        </ThemeProvider>,
    );
    expect(screen.getByText('region').parentElement).toHaveClass('g-root_theme_dark');
    expect(screen.getByText('region').parentElement).toHaveAttribute('dir', 'ltr');
    expect(document.body).toHaveClass('g-root_theme_light');
    expect(document.body).toHaveAttribute('dir', 'rtl');
});

test('system theme updates inherit custom system themes', () => {
    const supports = jest.replaceProperty(domHelpers, 'supportsMatchMedia', true);
    const listeners: ((event: MediaQueryListEvent) => void)[] = [];
    const media = jest.spyOn(window, 'matchMedia').mockImplementation((query) => ({
        media: query,
        matches: false,
        onchange: null,
        addEventListener: (_type: string, handler: EventListenerOrEventListenerObject) => {
            if (query === '(prefers-color-scheme: dark)') {
                listeners.push(handler as (event: MediaQueryListEvent) => void);
            }
        },
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: () => true,
    }));
    try {
        const {result} = renderHook(useThemeValue, {
            wrapper: ({children}) => (
                <ThemeProvider systemLightTheme="light-hc" systemDarkTheme="dark-hc">
                    <ThemeProvider>{children}</ThemeProvider>
                </ThemeProvider>
            ),
        });
        expect(result.current).toBe('light-hc');
        act(() =>
            listeners.forEach((listener) => listener({matches: true} as MediaQueryListEvent)),
        );
        expect(result.current).toBe('dark-hc');
    } finally {
        media.mockRestore();
        supports.restore();
    }
});

test('scoped portals keep theme and direction in custom containers and inline', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    try {
        render(
            <Provider theme="light">
                <ThemeProvider theme="dark" direction="rtl" scoped={false}>
                    <Portal container={container}>
                        <span>portal</span>
                    </Portal>
                    <Portal disablePortal>
                        <span>inline</span>
                    </Portal>
                </ThemeProvider>
            </Provider>,
        );
        expect(screen.getByText('portal').parentElement).toHaveClass('g-root_theme_dark');
        expect(screen.getByText('portal').parentElement).toHaveAttribute('dir', 'rtl');
        expect(container).toContainElement(screen.getByText('portal'));
        expect(screen.getByText('inline').parentElement).toHaveClass('g-root_theme_dark');
        expect(document.body).toHaveClass('g-root_theme_light');
    } finally {
        container.remove();
    }
});

test('feature providers work independently and retain language configuration fallback', () => {
    const {result} = renderHook(() => ({lang: useLang(), layout: useLayoutContext()}), {
        wrapper: ({children}) => (
            <LayoutProvider fixBreakpoints>
                <LangProvider>{children}</LangProvider>
            </LayoutProvider>
        ),
    });
    act(() => configure({lang: 'ru'}));
    expect(result.current.lang.lang).toBe('ru');
    expect(result.current.layout.activeMediaQuery).toBe('xs');
});

test('LangProvider inherits unspecified options', () => {
    const {result} = renderHook(useLang, {
        wrapper: ({children}) => (
            <LangProvider lang="ru" fallbackLang="ru">
                <LangProvider lang="unknown">
                    <LangProvider>{children}</LangProvider>
                </LangProvider>
            </LangProvider>
        ),
    });
    expect(result.current).toEqual({lang: 'unknown', fallbackLang: 'ru'});
});

test('ThemeProvider no longer accepts unrelated feature props', () => {
    // @ts-expect-error Language belongs to LangProvider or Provider
    const lang: ThemeProviderProps = {lang: 'ru'};
    // @ts-expect-error Language fallback belongs to LangProvider or Provider
    const fallback: ThemeProviderProps = {fallbackLang: 'ru'};
    // @ts-expect-error Layout belongs to LayoutProvider or Provider
    const layout: ThemeProviderProps = {layout: {}};
    // @ts-expect-error Defaults belong to DefaultPropsProvider or Provider
    const defaults: ThemeProviderProps = {defaultProps: {}};
    // @ts-expect-error Mobile mode belongs to MobileProvider or Provider
    const mobile: ThemeProviderProps = {mobile: true};
    expect([lang, fallback, layout, defaults, mobile]).toHaveLength(5);
});
