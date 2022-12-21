import {useContext, useCallback} from 'react';

import {DropdownMenuNavigationContext} from '../DropdownMenuNavigationContext';
import {DropdownMenuListItem} from '../types';
import {isSubmenuOpen} from '../utils/isSubmenuOpen';

export type UseSubmenuProps<T> = {
    items?: DropdownMenuListItem<T>[];
    path?: number[];
};

export function useSubmenu<T>({items, path}: UseSubmenuProps<T>) {
    const {activeMenuPath, setActiveMenuPath} = useContext(DropdownMenuNavigationContext);

    const hasSubmenu = Boolean(path) && Boolean(items?.length);

    const closeSubmenu = useCallback(() => {
        if (!path) {
            return;
        }

        setActiveMenuPath(path.slice(0, path.length - 1));
    }, [path, setActiveMenuPath]);

    const openSubmenu = useCallback(() => {
        if (!path) {
            return;
        }

        setActiveMenuPath(path);
    }, [path, setActiveMenuPath]);

    return {
        hasSubmenu,
        isSubmenuOpen: isSubmenuOpen(path, activeMenuPath),
        openSubmenu,
        closeSubmenu,
    };
}
