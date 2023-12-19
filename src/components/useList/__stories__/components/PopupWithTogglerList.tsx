import React from 'react';

import {Button} from '../../../Button';
import {Popup} from '../../../Popup';
import {borderRadius} from '../../../borderRadius';
import {Flex} from '../../../layout';
import {ListContainerView} from '../../components/ListContainerView/ListContainerView';
import {ListItemView} from '../../components/ListItemView/ListItemView';
import {ListItemRecursiveRenderer} from '../../components/ListRecursiveRenderer/ListRecursiveRenderer';
import {useList} from '../../hooks/useList';
import {useListKeydown} from '../../hooks/useListKeydown';
import {useListState} from '../../hooks/useListState';
import type {ListItemId, ListSizeTypes} from '../../types';
import {getItemRenderState} from '../../utils/getItemRenderState';
import {scrollToListItem} from '../../utils/scrollToListItem';
import {createRandomizedData} from '../utils/makeData';

export interface PopupWithTogglerListProps {
    itemsCount: number;
    size: ListSizeTypes;
}

const COMPONENT_WIDTH = 300;

export const PopupWithTogglerList = ({size, itemsCount}: PopupWithTogglerListProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const controlWrapRef = React.useRef(null);
    const controlRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const items = React.useMemo(
        () => createRandomizedData<{title: string}>({num: itemsCount}),
        [itemsCount],
    );

    const listState = useListState();

    const listParsedState = useList({
        items,
        expandedById: listState.expandedById,
    });

    const [selectedId] = React.useMemo(
        () => Object.keys(listState.selectedById),
        [listState.selectedById],
    );

    // restoring focus when popup opens
    React.useLayoutEffect(() => {
        if (open) {
            containerRef.current?.focus();
            listState.setActiveItemId(selectedId ?? listParsedState.flattenIdsOrder[0]);

            if (selectedId) {
                scrollToListItem(selectedId, containerRef.current);
            }
        }
        // subscribe only in open event
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const onItemClick = (id: ListItemId) => {
        if (id in listParsedState.groupsState) {
            listState.setExpanded((state) => ({
                ...state,
                [id]: id in state ? !state[id] : false,
            }));
            listState.setActiveItemId(id);
        } else {
            // only one item active
            listState.setSelected((state) => ({
                [id]: !state[id],
            }));
            setOpen(false);
            listState.setActiveItemId(undefined);
        }
    };

    useListKeydown({
        containerRef,
        onItemClick,
        ...listParsedState,
        ...listState,
    });

    return (
        <Flex direction="column" gap="5" width={COMPONENT_WIDTH} ref={controlWrapRef}>
            <Button ref={controlRef} onClick={() => setOpen((x) => !x)} width="max">
                {selectedId ? listParsedState.byId[selectedId]?.title : 'Select person'}
            </Button>
            <Popup
                style={{width: COMPONENT_WIDTH, height: '80vh', overflow: 'auto'}}
                contentClassName={borderRadius({size})}
                anchorRef={controlWrapRef as React.RefObject<HTMLDivElement>}
                placement={['bottom-start', 'bottom-end', 'top-start', 'top-end']}
                offset={[0, 10]}
                open={open}
                onClose={() => setOpen(false)}
                disablePortal
                restoreFocus
                restoreFocusRef={controlRef}
            >
                <ListContainerView ref={containerRef}>
                    {items.map((item, index) => (
                        <ListItemRecursiveRenderer
                            itemSchema={item}
                            key={index}
                            index={index}
                            expandedById={listState.expandedById}
                        >
                            {(id) => {
                                const [data, state, listContext] = getItemRenderState({
                                    id,
                                    size,
                                    onItemClick,
                                    ...listParsedState,
                                    ...listState,
                                });

                                return (
                                    <ListItemView
                                        {...state}
                                        {...data}
                                        selectable={!listContext.groupState}
                                    />
                                );
                            }}
                        </ListItemRecursiveRenderer>
                    ))}
                </ListContainerView>
            </Popup>
        </Flex>
    );
};
