import type {HotkeysGroup, HotkeysListItem} from '../types';

export function flattenHotkeyGroups<T>(hotkeys: HotkeysGroup<T>[]) {
    const result: HotkeysListItem[] = [];

    for (const hotkeysGroup of hotkeys) {
        result.push({
            title: hotkeysGroup.title,
            group: true,
        });

        result.push(...hotkeysGroup.items);
    }

    return result;
}
