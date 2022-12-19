import {LayoutProps, LayoutTheme, MediaPartial} from '../types';

/**
 * Select provided prop value from LayoutTheme. Depends on the current screen media query
 */
export function getThemeValue<T extends keyof LayoutProps>(
    key: T,
    theme: Partial<LayoutTheme>,
    medias: MediaPartial<boolean>,
): LayoutProps[T] | undefined {
    if (medias.mobile) {
        return theme.medias?.mobile?.[key] || theme.base?.[key];
    }

    if (medias.tablH) {
        return theme.medias?.tablH?.[key] || theme.base?.[key];
    }

    if (medias.lptpM) {
        return theme.medias?.lptpM?.[key] || theme.base?.[key];
    }
    if (medias.lptpS) {
        return theme.medias?.lptpS?.[key] || theme.base?.[key];
    }

    if (medias.dsktp) {
        return theme.medias?.dsktp?.[key] || theme.base?.[key];
    }

    return undefined;
}
