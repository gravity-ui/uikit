'use client';

import * as React from 'react';

import {TooltipDelayGroup} from '../Tooltip/TooltipDelayGroup';
import {LayoutProvider} from '../layout/LayoutProvider/LayoutProvider';
import type {LayoutProviderProps} from '../layout/LayoutProvider/LayoutProvider';
import {MobileContext} from '../mobile/MobileContext';
import {MobileContextProvider, MobileProvider} from '../mobile/MobileProvider';
import type {MobileProviderProps} from '../mobile/MobileProvider';
import {rootMobileClassName} from '../mobile/constants';

import {DefaultPropsProvider} from './DefaultPropsProvider';
import type {DefaultPropsMap} from './DefaultPropsProvider';
import {LangProvider} from './LangProvider';
import type {LangProviderProps} from './LangProvider';
import {ThemeContext} from './ThemeContext';
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

    const parentTheme = React.useContext(ThemeContext);
    const parentMobile = React.useContext(MobileContext);
    const scoped = hasParentProvider || parentTheme !== undefined || Boolean(themeProps.scoped);
    const mobileValue = mobile ?? (scoped ? parentMobile.mobile : false);
    const Mobile = scoped ? MobileContextProvider : MobileProvider;
    const rootClassName = [themeProps.rootClassName, scoped && mobileValue && rootMobileClassName]
        .filter(Boolean)
        .join(' ');

    return (
        <ProviderContext.Provider value={true}>
            <LayoutProvider {...layout}>
                <DefaultPropsProvider defaultProps={defaultProps}>
                    <ThemeProvider {...themeProps} scoped={scoped} rootClassName={rootClassName}>
                        <LangProvider lang={lang} fallbackLang={fallbackLang}>
                            <Mobile
                                mobile={mobileValue}
                                platform={platform ?? (scoped ? parentMobile.platform : undefined)}
                                __experimentalMobileModals={
                                    __experimentalMobileModals ??
                                    (scoped ? parentMobile.__experimentalMobileModals : undefined)
                                }
                                useHistory={
                                    useHistory ?? (scoped ? parentMobile.useHistory : undefined)
                                }
                                useLocation={
                                    useLocation ?? (scoped ? parentMobile.useLocation : undefined)
                                }
                            >
                                {hasParentProvider ? (
                                    children
                                ) : (
                                    <TooltipDelayGroup>{children}</TooltipDelayGroup>
                                )}
                            </Mobile>
                        </LangProvider>
                    </ThemeProvider>
                </DefaultPropsProvider>
            </LayoutProvider>
        </ProviderContext.Provider>
    );
}

Provider.displayName = 'Provider';
