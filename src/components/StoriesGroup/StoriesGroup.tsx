import React from 'react';
import {Modal, ModalCloseReason} from '../Modal';
import {IndexType, StoriesLayout} from '../Stories/components/StoriesLayout/StoriesLayout';
import {StoriesPreview} from './components';

import {block} from '../utils/cn';
import './StoriesGroup.scss';
import {StoriesGroupIndex, StoriesGroupItem} from './types';

const DEFAULT_MAX_SLIDER_ITEMS_COUNT = 12;
const DEFAULT_INDEX = {groupIndex: 0, itemIndex: 0};

const b = block('stories-group');

type EventType = MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>;
type ReasonType = ModalCloseReason | 'closeButtonClick';

export interface StoriesGroupProps {
    open: boolean;
    groups: StoriesGroupItem[];

    /** @deprecated  Will be deleted in te next major. Use `index` instead */
    initialStoryIndex?: [groupIndex: number, itemIndex: number];

    index?: StoriesGroupIndex;
    disableOutsideClick?: boolean;
    maxSliderItemsCount?: number;
    onClose?: (event: EventType, reason: ReasonType) => void;

    onItemSelect?: (
        itemIndexes: [groupIndex: number, itemIndex: number],
        selectedFromThumbnail: boolean,
    ) => void;
}

export const StoriesGroup = ({
    open,
    groups,
    onItemSelect,
    disableOutsideClick = true,
    initialStoryIndex,
    index,
    maxSliderItemsCount = DEFAULT_MAX_SLIDER_ITEMS_COUNT,
    onClose,
}: StoriesGroupProps) => {
    const [{groupIndex, itemIndex}, setStoryIndex] = React.useState(
        initialStoryIndex
            ? {
                  groupIndex: initialStoryIndex[0],
                  itemIndex: initialStoryIndex[1],
              }
            : index || {...DEFAULT_INDEX},
    );

    const handleClose = React.useCallback(
        (event: EventType, reason: ReasonType) => {
            onClose?.(event, reason);
        },
        [onClose],
    );

    const handleButtonClose = React.useCallback<
        (event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>) => void
    >(
        (event) => {
            handleClose(event, 'closeButtonClick');
        },
        [handleClose],
    );

    const handleGotoPrevious = React.useCallback(() => {
        setStoryIndex((prevState) => {
            const {groupIndex: currentGroupIndex, itemIndex: currentItemIndex} = prevState;

            if (currentItemIndex > 0) {
                const newState: StoriesGroupIndex = {
                    groupIndex: currentGroupIndex,
                    itemIndex: currentItemIndex - 1,
                };

                onItemSelect?.([newState.groupIndex, newState.itemIndex], false);
                return newState;
            }

            // try to find previous valid group
            for (let i = currentGroupIndex - 1; i >= 0; --i) {
                if (groups[i].items.length !== 0) {
                    const newState: StoriesGroupIndex = {
                        groupIndex: i,
                        itemIndex: groups[i].items.length - 1,
                    };

                    onItemSelect?.([newState.groupIndex, newState.itemIndex], false);
                    return newState;
                }
            }

            return prevState;
        });
    }, [groups, onItemSelect]);

    const handleGotoNext = React.useCallback(() => {
        setStoryIndex((prevState) => {
            const {groupIndex: currentGroupIndex, itemIndex: currentItemIndex} = prevState;

            if (currentItemIndex < groups[currentGroupIndex]?.items.length - 1) {
                const newState: StoriesGroupIndex = {
                    groupIndex: currentGroupIndex,
                    itemIndex: currentItemIndex + 1,
                };

                onItemSelect?.([newState.groupIndex, newState.itemIndex], false);
                return newState;
            }

            // try to find next valid group
            for (let i = currentGroupIndex + 1; i < groups.length; ++i) {
                if (groups[i].items.length !== 0) {
                    const newState: StoriesGroupIndex = {
                        groupIndex: i,
                        itemIndex: 0,
                    };

                    onItemSelect?.([newState.groupIndex, newState.itemIndex], false);
                    return newState;
                }
            }

            return prevState;
        });
    }, [groups, onItemSelect]);

    const onGroupSelect = React.useCallback(
        (newGroupIndex: number) => {
            setStoryIndex({groupIndex: newGroupIndex, itemIndex: 0});
            onItemSelect?.([newGroupIndex, 0], true);
        },
        [onItemSelect],
    );

    React.useEffect(() => {
        if (index === undefined || !open) {
            return;
        }

        const externalGroupIndex = index.groupIndex;
        const externalItemIndex = index.itemIndex;

        if (groupIndex !== externalGroupIndex || itemIndex !== externalItemIndex) {
            setStoryIndex({
                groupIndex: externalGroupIndex,
                itemIndex: externalItemIndex,
            });
        }
    }, [open]);

    const currentGroup = groups[groupIndex];
    const currentItems = currentGroup?.items || [];

    if (
        groups.length === 0 ||
        currentGroup === undefined ||
        currentItems[itemIndex] === undefined
    ) {
        return null;
    }

    const indexType =
        (groupIndex === 0 && itemIndex === 0 && IndexType.Start) ||
        (groupIndex === groups.length - 1 &&
            itemIndex === currentItems.length - 1 &&
            IndexType.End) ||
        IndexType.InProccess;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            disableOutsideClick={disableOutsideClick}
            contentClassName={b('modal-content')}
        >
            <StoriesPreview
                maxSliderItemsCount={
                    maxSliderItemsCount > 0 ? maxSliderItemsCount : DEFAULT_MAX_SLIDER_ITEMS_COUNT
                }
                groups={groups}
                groupIndex={groupIndex}
                onGroupSelect={onGroupSelect}
                onClose={disableOutsideClick ? undefined : handleClose}
            />
            <StoriesLayout
                storyIndex={itemIndex}
                items={currentItems}
                indexType={indexType}
                handleButtonClose={handleButtonClose}
                handleGotoNext={handleGotoNext}
                handleGotoPrevious={handleGotoPrevious}
            />
        </Modal>
    );
};
