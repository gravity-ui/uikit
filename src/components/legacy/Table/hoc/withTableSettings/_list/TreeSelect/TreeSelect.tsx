'use client';

import * as React from 'react';

import {useFocusWithin, useLayoutEffect, useUniqId} from '../../../../../../../hooks';
import {useOpenState} from '../../../../../../../hooks/useSelect/useOpenState';
import {SelectPopup} from '../../../../../../Select/components/SelectPopup/SelectPopup';
import {useMobile} from '../../../../../../mobile';
import {block} from '../../../../../../utils/cn';
import {TreeList} from '../TreeList/TreeList';
import type {ListItemId, ListOnItemClick} from '../types';
import {useList} from '../useList';

import type {TreeSelectProps} from './types';

import './TreeSelect.scss';

const b = block('tree-select-legacy');

export const TreeSelect = <T extends {id: ListItemId}, P extends {} = {}>({
    className,
    placement,
    slotBeforeListBody,
    open: propsOpen,
    popupWidth,
    items,
    value,
    onOpenChange,
    onUpdate,
    renderControl,
    renderItem,
    renderContainer,
    mapItemDataToContentProps,
}: TreeSelectProps<T, P>) => {
    const mobile = useMobile();
    const treeSelectId = useUniqId();
    const popupId = `tree-select-popup-${treeSelectId}`;

    const controlWrapRef = React.useRef<HTMLDivElement>(null);
    // Never attached: `renderControl` does not take a ref. The popup gets it all the same — with an
    // empty ref floating-ui returns the focus differently than it does by default
    const controlRef = React.useRef<HTMLElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const {toggleOpen, open} = useOpenState({
        onOpenChange,
        open: propsOpen,
    });

    const selectedById = React.useMemo(
        (): Record<ListItemId, boolean> => Object.fromEntries(value.map((id) => [id, true])),
        [value],
    );

    const list = useList({
        items,
        selectedById,
        setSelected: (payload) => {
            const nextValue = typeof payload === 'function' ? payload(selectedById) : payload;

            onUpdate(Object.keys(nextValue).filter((id) => nextValue[id]));
        },
    });

    const handleItemClick: ListOnItemClick = ({id}) => {
        // always activate the clicked item
        list.state.setActiveItemId(id);
        list.state.setSelected((prevState) => ({...prevState, [id]: !prevState[id]}));
    };

    // restoring focus when popup opens
    useLayoutEffect(() => {
        if (open) {
            // for some reason popup position on page may be wrong calculated. `preventScroll` prevent page gap in that cases
            containerRef.current?.focus({preventScroll: true});
        }

        return () => list.state.setActiveItemId(undefined); // reset active item on popup close
        // subscribe only in open event
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleClose = React.useCallback(() => toggleOpen(false), [toggleOpen]);

    const {focusWithinProps} = useFocusWithin({onBlurWithin: handleClose});

    return (
        <div ref={controlWrapRef} {...focusWithinProps} className={b(null, className)}>
            {renderControl({toggleOpen})}
            <SelectPopup
                ref={controlWrapRef}
                className={b('popup')}
                controlRef={controlRef}
                width={popupWidth}
                placement={placement}
                open={open}
                handleClose={handleClose}
                mobile={mobile}
                id={popupId}
            >
                {slotBeforeListBody}

                <TreeList<T, P>
                    list={list}
                    className={b('list')}
                    id={`list-${treeSelectId}`}
                    containerRef={containerRef}
                    onItemClick={handleItemClick}
                    renderContainer={renderContainer}
                    mapItemDataToContentProps={mapItemDataToContentProps}
                    renderItem={renderItem}
                />
            </SelectPopup>
        </div>
    );
};
