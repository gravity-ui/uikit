import * as React from 'react';

import {Button} from '../../../Button';
import {Popup} from '../../../Popup';
import {Flex} from '../../../layout';
import {ListContainer} from '../../components/ListContainer';
import {ListItemView} from '../../components/ListItemView';
import {useList} from '../../hooks/useList';
import {useListKeydown} from '../../hooks/useListKeydown';
import type {ListItemSize} from '../../types';
import {getItemRenderState} from '../../utils/getItemRenderState';
import {getListItemClickHandler} from '../../utils/getListItemClickHandler';
import {scrollToListItem} from '../../utils/scrollToListItem';
import {createRandomizedData} from '../utils/makeData';

export interface PopupWithTogglerListProps {
    itemsCount: number;
    size: ListItemSize;
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

    const list = useList({items});

    const onItemClick = getListItemClickHandler({list});

    const [selectedId] = React.useMemo(
        () => Object.keys(list.state.selectedById),
        [list.state.selectedById],
    );

    // restoring focus when popup opens
    React.useLayoutEffect(() => {
        if (open) {
            containerRef.current?.focus();
            list.state.setActiveItemId(selectedId ?? list.structure.visibleFlattenIds[0]);

            if (selectedId) {
                scrollToListItem(selectedId, containerRef.current);
            }
        }
        // subscribe only in open event
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    useListKeydown({
        containerRef,
        onItemClick,
        list,
    });

    return (
        <Flex direction="column" gap="5" width={COMPONENT_WIDTH} ref={controlWrapRef}>
            <Button ref={controlRef} onClick={() => setOpen((x) => !x)} width="max">
                {selectedId ? list.structure.itemsById[selectedId]?.title : 'Select person'}
            </Button>
            <Popup
                style={{width: COMPONENT_WIDTH, height: '80vh', overflow: 'auto', borderRadius: 6}}
                anchorRef={controlWrapRef as React.RefObject<HTMLDivElement>}
                placement={['bottom-start', 'bottom-end', 'top-start', 'top-end']}
                offset={10}
                open={open}
                onClose={() => setOpen(false)}
                disablePortal
                returnFocus={controlRef}
            >
                <ListContainer
                    containerRef={containerRef}
                    list={list}
                    renderItem={(id) => {
                        const {props, context} = getItemRenderState({
                            id,
                            size,
                            onItemClick,
                            mapItemDataToContentProps: (x) => x,
                            list,
                        });

                        return (
                            <ListItemView
                                {...props}
                                selectionViewType={context.childrenIds ? 'single' : 'multiple'}
                            />
                        );
                    }}
                />
            </Popup>
        </Flex>
    );
};
