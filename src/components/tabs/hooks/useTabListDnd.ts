import * as React from 'react';

import type {DropResult} from '@hello-pangea/dnd';

import {getTabNodePropsFromReactNode} from '../utils';

interface UseTabListDndParams {
    shownChildren: React.ReactNode;
    collapsedChildren?: React.ReactNode;
    onSortStart?: () => void;
    onSortEnd?: (orderedSlugs: string[]) => void;
}

export function useTabListDnd({
    shownChildren,
    collapsedChildren,
    onSortStart,
    onSortEnd,
}: UseTabListDndParams) {
    const handleDragStart = React.useCallback(() => {
        onSortStart?.();
    }, [onSortStart]);

    const handleDragEnd = React.useCallback(
        (result: DropResult) => {
            if (!result.destination) return;
            const {source, destination} = result;
            if (source.index === destination.index) return;

            const shownSlugs =
                React.Children.map(
                    shownChildren,
                    (child) => getTabNodePropsFromReactNode(child)?.value ?? '',
                ) ?? [];

            const collapsedSlugs = collapsedChildren
                ? (React.Children.map(
                      collapsedChildren,
                      (child) => getTabNodePropsFromReactNode(child)?.value ?? '',
                  ) ?? [])
                : [];

            const reordered = [...shownSlugs, ...collapsedSlugs];
            const [moved] = reordered.splice(source.index, 1);
            reordered.splice(destination.index, 0, moved);

            onSortEnd?.(reordered);
        },
        [shownChildren, collapsedChildren, onSortEnd],
    );

    return {handleDragEnd, handleDragStart};
}
