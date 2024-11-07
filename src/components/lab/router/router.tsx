import React from 'react';

import type {Href, RouterOptions} from '../../types';

interface RouterProps {
    openLink: (
        link: HTMLAnchorElement,
        modifiers: Modifiers,
        href: Href,
        routerOptions: RouterOptions | undefined,
    ) => boolean;
    useHref: (href: Href) => string;
}

const routerContext = React.createContext<RouterProps>({
    openLink: () => false,
    useHref: (href) => href,
});

export interface RouterProviderProps {
    navigate: (href: Href, routerOptions: RouterOptions | undefined) => void;
    useHref?: (href: Href) => string;
    children: React.ReactNode;
}

export function RouterProvider({navigate, useHref, children}: RouterProviderProps) {
    const value: RouterProps = React.useMemo(
        () => ({
            openLink: (link, modifiers, href, routerOptions) => {
                if (shouldClientNavigate(link, modifiers)) {
                    navigate(href, routerOptions);
                    return true;
                }
                return false;
            },
            useHref: useHref || ((href: Href) => href),
        }),
        [navigate, useHref],
    );

    return <routerContext.Provider value={value}>{children}</routerContext.Provider>;
}

export function useRouter() {
    return React.useContext(routerContext);
}

interface Modifiers {
    metaKey?: boolean;
    ctrlKey?: boolean;
    altKey?: boolean;
    shiftKey?: boolean;
}

export function shouldClientNavigate(link: HTMLAnchorElement, modifiers: Modifiers) {
    // Use getAttribute here instead of link.target. Firefox will default link.target to "_parent" when inside an iframe.
    const target = link.getAttribute('target');
    return (
        link.href &&
        (!target || target === '_self') &&
        link.origin === location.origin &&
        !link.hasAttribute('download') &&
        !modifiers.metaKey && // open in new tab (mac)
        !modifiers.ctrlKey && // open in new tab (windows)
        !modifiers.altKey && // download
        !modifiers.shiftKey
    );
}

interface LinkProps {
    /** A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href). */
    href?: Href;
    /** Hints at the human language of the linked URL. See[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang). */
    hrefLang?: string;
    /** The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target). */
    target?: React.HTMLAttributeAnchorTarget;
    /** The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). */
    rel?: string;
    /** Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download). */
    download?: boolean | string;
    /** A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping). */
    ping?: string;
    /** How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy). */
    referrerPolicy?: React.HTMLAttributeReferrerPolicy;
    /** Options for the configured client side router. */
    routerOptions?: RouterOptions;
    /** Handler that is called when the press is released over the target. */
    onClick?: (e: React.MouseEvent<any>) => void;
}

export function useLinkProps(props: LinkProps) {
    const {useHref, openLink} = useRouter();
    const href = useHref(props.href ?? '');
    return {
        href: props.href ? href : undefined,
        hrefLang: props.hrefLang,
        target: props.target,
        rel: props.target === '_blank' && !props.rel ? 'noopener noreferrer' : props.rel,
        download: props.download,
        ping: props.ping,
        referrerPolicy: props.referrerPolicy,
        onClick: (e: React.MouseEvent) => {
            if (typeof props.onClick === 'function') {
                props.onClick(e);
            }

            if (
                props.href &&
                !e.defaultPrevented &&
                e.currentTarget instanceof HTMLAnchorElement &&
                openLink(e.currentTarget, e, props.href, props.routerOptions)
            ) {
                e.preventDefault();
            }
        },
    };
}
