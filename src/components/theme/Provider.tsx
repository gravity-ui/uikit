'use client';

import * as React from 'react';

import {TooltipDelayGroup} from '../Tooltip/TooltipDelayGroup';
import {LayoutProvider} from '../layout/LayoutProvider/LayoutProvider';
import type {LayoutProviderProps} from '../layout/LayoutProvider/LayoutProvider';
import {MobileProvider} from '../mobile/MobileProvider';
import type {MobileProviderProps} from '../mobile/MobileProvider';

import {DefaultPropsProvider} from './DefaultPropsProvider';
import type {DefaultPropsMap} from './DefaultPropsProvider';
import {LangProvider} from './LangProvider';
import type {LangProviderProps} from './LangProvider';
import {ThemeProvider} from './ThemeProvider';
import type {ThemeProviderProps} from './ThemeProvider';

const ProviderContext = React.createContext(false);

export interface ProviderProps extends ThemeProviderProps, LangProviderProps, MobileProviderProps {
    layout?: Omit<LayoutProviderProps, 'children'>;
    defaultProps?: DefaultPropsMap;
}

export function Provider({
    children,
    layout,
    defaultProps,
    lang,
    fallbackLang,
    mobile,
    platform,
    __experimentalMobileModals,
    useHistory,
    useLocation,
    ...themeProps
}: ProviderProps) {
    const hasParentProvider = React.useContext(ProviderContext);

    return (
        <ProviderContext.Provider value={true}>
            <LayoutProvider {...layout}>
                <DefaultPropsProvider defaultProps={defaultProps}>
                    <ThemeProvider {...themeProps} scoped={hasParentProvider || themeProps.scoped}>
                        <LangProvider lang={lang} fallbackLang={fallbackLang}>
                            <MobileProvider
                                mobile={mobile}
                                platform={platform}
                                __experimentalMobileModals={__experimentalMobileModals}
                                useHistory={useHistory}
                                useLocation={useLocation}
                            >
                                {hasParentProvider ? (
                                    children
                                ) : (
                                    <TooltipDelayGroup>{children}</TooltipDelayGroup>
                                )}
                            </MobileProvider>
                        </LangProvider>
                    </ThemeProvider>
                </DefaultPropsProvider>
            </LayoutProvider>
        </ProviderContext.Provider>
    );
}

Provider.displayName = 'Provider';
