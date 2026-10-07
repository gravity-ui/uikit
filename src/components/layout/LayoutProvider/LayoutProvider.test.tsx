import * as React from 'react';

import type * as ReactDOMServer from 'react-dom/server';

import {act, renderWithoutProviders as render} from '../../../../test-utils/utils';
import {LayoutProvider, useLayoutContext} from '../../../index';
import {DEFAULT_LAYOUT_CONTEXT, LayoutContext} from '../contexts/LayoutContext';

// Use the Node entrypoint for SSR in Jest's jsdom environment.
const {renderToStaticMarkup} = require('react-dom/server.node') as typeof ReactDOMServer;

test('inherits all parent settings and subsequent active breakpoint updates', () => {
    const read = jest.fn();
    function Read() {
        read(React.useContext(LayoutContext));
        return null;
    }
    const parent = {...DEFAULT_LAYOUT_CONTEXT, fixBreakpoints: true};
    const {rerender} = render(
        <LayoutContext.Provider value={{...parent, activeMediaQuery: 'l'}}>
            <LayoutProvider config={{spaceBaseSize: 5}}>
                <Read />
            </LayoutProvider>
        </LayoutContext.Provider>,
    );
    expect(read).toHaveBeenLastCalledWith(
        expect.objectContaining({
            activeMediaQuery: 'l',
            fixBreakpoints: true,
            theme: expect.objectContaining({spaceBaseSize: 5}),
        }),
    );
    rerender(
        <LayoutContext.Provider value={{...parent, activeMediaQuery: 'xl'}}>
            <LayoutProvider config={{spaceBaseSize: 5}}>
                <Read />
            </LayoutProvider>
        </LayoutContext.Provider>,
    );
    expect(read).toHaveBeenLastCalledWith(expect.objectContaining({activeMediaQuery: 'xl'}));
    expect(DEFAULT_LAYOUT_CONTEXT.theme.spaceBaseSize).toBe(4);
});

test('inherits the parent SSR breakpoint while allowing explicit overrides', () => {
    function Breakpoint() {
        return <span>{useLayoutContext().activeMediaQuery}</span>;
    }
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    try {
        expect(
            renderToStaticMarkup(
                <LayoutProvider initialMediaQuery="l" fixBreakpoints>
                    <LayoutProvider config={{spaceBaseSize: 5}}>
                        <Breakpoint />
                    </LayoutProvider>
                    <LayoutProvider initialMediaQuery="m">
                        <Breakpoint />
                    </LayoutProvider>
                    <LayoutProvider config={{breakpoints: {s: 400}}}>
                        <Breakpoint />
                    </LayoutProvider>
                </LayoutProvider>,
            ),
        ).toBe('<span>l</span><span>m</span><span>l</span>');
        expect(
            renderToStaticMarkup(
                <LayoutProvider>
                    <Breakpoint />
                </LayoutProvider>,
            ),
        ).toBe('<span>s</span>');
        expect(
            renderToStaticMarkup(
                <LayoutProvider fixBreakpoints>
                    <Breakpoint />
                </LayoutProvider>,
            ),
        ).toBe('<span>xs</span>');
    } finally {
        error.mockRestore();
    }
});

test('local breakpoints recalculate without mutating parent configuration', () => {
    const contexts: Record<string, React.ContextType<typeof LayoutContext>> = {};
    const listeners = new Set<() => void>();
    let width = 500;
    const matchMedia = jest.spyOn(window, 'matchMedia').mockImplementation((media) => {
        const min = /min-width: (\d+)px/.exec(media);
        const max = /max-width: (\d+)px/.exec(media);
        return {
            media,
            get matches() {
                return width >= Number(min?.[1] ?? 0) && width <= Number(max?.[1] ?? Infinity);
            },
            addEventListener: (_type: string, listener: EventListenerOrEventListenerObject) =>
                listeners.add(listener as () => void),
            removeEventListener: (_type: string, listener: EventListenerOrEventListenerObject) =>
                listeners.delete(listener as () => void),
            addListener() {},
            removeListener() {},
            onchange: null,
            dispatchEvent: () => true,
        };
    });
    function Read({name}: {name: string}) {
        contexts[name] = React.useContext(LayoutContext);
        return null;
    }
    try {
        render(
            <LayoutProvider fixBreakpoints>
                <Read name="parent" />
                <LayoutProvider>
                    <Read name="inherited" />
                </LayoutProvider>
                <LayoutProvider fixBreakpoints={false}>
                    <Read name="legacy" />
                </LayoutProvider>
                <LayoutProvider config={{breakpoints: {s: 400}}}>
                    <Read name="local" />
                </LayoutProvider>
            </LayoutProvider>,
        );
        expect(contexts.parent.activeMediaQuery).toBe('xs');
        expect(contexts.inherited.activeMediaQuery).toBe('xs');
        expect(contexts.legacy).toMatchObject({activeMediaQuery: 's', fixBreakpoints: false});
        expect(contexts.local.activeMediaQuery).toBe('s');
        expect(contexts.parent.theme.breakpoints.s).toBe(576);
        act(() => {
            width = 900;
            listeners.forEach((listener) => listener());
        });
        expect(contexts.parent.activeMediaQuery).toBe('m');
        expect(contexts.inherited.activeMediaQuery).toBe('m');
        expect(contexts.local.activeMediaQuery).toBe('m');
    } finally {
        matchMedia.mockRestore();
    }
});
