import capitalize from 'lodash/capitalize';
import uniqBy from 'lodash/uniqBy';

import type {KeyDefs, KeyParser, PlatformDefs} from './types';
import {split} from './utils';

const GROUPS_SEPARATOR = /\s/;
const KEYS_SEPARATOR = '+';

export function parseKeyGroups(defs: PlatformDefs, value: string): string[][] {
    return split(value, GROUPS_SEPARATOR).map((keys) =>
        uniqBy(
            split(keys, KEYS_SEPARATOR)
                .map<KeyDefs>(keyParser(defs))
                .sort((a, b) => b.priority - a.priority), // high to low
            (key) => key.id,
        ).map(renderKey),
    );
}

function keyParser(defs: PlatformDefs): KeyParser {
    return function (raw) {
        const keyId = getKeyId(defs, raw);
        return {
            raw,
            id: keyId,
            priority: defs.Priority[keyId] ?? 0,
            displayName: defs.DisplayName[keyId],
        };
    };
}

function getKeyId(defs: PlatformDefs, val: string): string {
    val = val.toLowerCase();
    return defs.NormalizeMap[val] ?? val;
}

function renderKey(key: KeyDefs): string {
    return key.displayName ?? capitalize(key.id);
}
