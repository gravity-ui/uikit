import * as React from 'react';

import type {FlattenOption} from '../utils';

export function useActiveItemIndex({
    options,
    value,
    open,
}: {
    options: FlattenOption[];
    open: boolean;
    value: string[];
}) {
    const [activeIndex, setActiveIndex] = React.useState<number | undefined>(() => {
        if (open) {
            return getInitialActiveItemIndex(options, value);
        }
        return undefined;
    });
    const [prevOpen, setPrevOpen] = React.useState(open);
    if (prevOpen !== open) {
        setPrevOpen(open);
        if (open) {
            setActiveIndex(getInitialActiveItemIndex(options, value));
        }
    }

    // TODO: save active item if options are changed (e.g. when options are filtered)
    const activeIndexFinal =
        open &&
        activeIndex !== undefined &&
        activeIndex < options.length &&
        !options[activeIndex].disabled
            ? activeIndex
            : undefined;

    return [activeIndexFinal, setActiveIndex] as const;
}

function getInitialActiveItemIndex(options: FlattenOption[], value: string[]) {
    let itemIndex = -1;
    if (value.length > 0) {
        itemIndex = options.findIndex(
            (item) => 'value' in item && value.includes(item.value) && !item.disabled,
        );
    }
    if (itemIndex === -1) {
        itemIndex = options.findIndex((item) => 'value' in item && !item.disabled);
    }
    return itemIndex === -1 ? undefined : itemIndex;
}
