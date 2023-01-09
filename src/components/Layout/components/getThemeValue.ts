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
        return theme.mediasOverrides?.mobile?.[key] || theme.default?.[key];
    }

    if (medias.tabletH) {
        return theme.mediasOverrides?.tabletH?.[key] || theme.default?.[key];
    }

    if (medias.laptopM) {
        return theme.mediasOverrides?.laptopM?.[key] || theme.default?.[key];
    }
    if (medias.laptopS) {
        return theme.mediasOverrides?.laptopS?.[key] || theme.default?.[key];
    }

    if (medias.desktop) {
        return theme.mediasOverrides?.desktop?.[key] || theme.default?.[key];
    }

    return undefined;
}
