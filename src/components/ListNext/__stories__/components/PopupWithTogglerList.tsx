import React from 'react';

import identity from 'lodash/identity';

import {Button} from '../../../Button';
import {Popup} from '../../../Popup';
import {Flex} from '../../../layout';
import {ItemRenderer} from '../../components/ItemRenderer/ItemRenderer';
import {defaultItemRendererBuilder} from '../../components/ItemRenderer/defaultItemRendererBuilder';
import {ListContainerView} from '../../components/ListContainerView/ListContainerView';
import {ListItemRecursiveRenderer} from '../../components/ListRecursiveRenderer/ListRecursiveRenderer';
import {bListRadiuses} from '../../constants';
import {useList} from '../../hooks/useList';
import {useListKeydown} from '../../hooks/useListKeydown';
import type {ListItemId, ListSizeTypes} from '../../types';
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
        () => createRandomizedData<{title: string}>(itemsCount),
        [itemsCount],
    );

    const [listParsedState, listState] = useList({
        items,
    });

    const [selectedId] = React.useMemo(() => Object.keys(listState.selected), [listState.selected]);

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
                style={{width: COMPONENT_WIDTH}}
                contentClassName={bListRadiuses({size})}
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
                            expanded={listState.expanded}
                        >
                            {(id) => (
                                <ItemRenderer
                                    id={id}
                                    size={size}
                                    onItemClick={onItemClick}
                                    {...listParsedState}
                                    {...listState}
                                    renderItem={defaultItemRendererBuilder({
                                        getItemContent: identity,
                                    })}
                                />
                            )}
                        </ListItemRecursiveRenderer>
                    ))}
                </ListContainerView>
            </Popup>
        </Flex>
    );
};
