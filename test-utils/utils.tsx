import type * as React from 'react';

// eslint-disable-next-line no-restricted-syntax
import {render} from '@testing-library/react';
// eslint-disable-next-line no-restricted-syntax
import type {RenderOptions} from '@testing-library/react';

import type {ThemeContextProps} from '../src';
import {ThemeContext} from '../src/components/theme/ThemeContext';

const themeContextValue: ThemeContextProps = {
    direction: 'ltr',
    theme: 'light',
    themeValue: 'light',
};

function Providers({children}: {children: React.ReactNode}) {
    return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
}

function createWrapper(Component: React.JSXElementConstructor<{children: React.ReactNode}>) {
    return function Wrapper({children}: {children: React.ReactNode}) {
        return (
            <Providers>
                <Component>{children}</Component>
            </Providers>
        );
    };
}

function customRender(ui: React.ReactElement, options?: RenderOptions) {
    const wrapper = options?.wrapper ? createWrapper(options.wrapper) : Providers;
    return render(ui, {...options, wrapper});
}

export * from '@testing-library/react';
export {customRender as render};
