import React from 'react';
import {Modal, ModalCloseReason} from '../Modal';
import {IndexType, StoriesLayout} from '../Stories/components/StoriesLayout/StoriesLayout';
import {StoriesPreview} from './components';

import {block} from '../utils/cn';
import './StoriesGroup.scss';
import {StoriesGroupItem} from './types';

const DEFAULT_MAX_SLIDER_ITEMS_COUNT = 12;

const b = block('stories-group');

export interface StoriesGroupProps {
    open: boolean;
    groups: StoriesGroupItem[];
    initialStoryIndex?: [groupIndex: number, itemIndex: number];
    disableOutsideClick?: boolean;
    maxSliderItemsCount?: number;
    onClose?: (
        event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>,
        reason: ModalCloseReason | 'closeButtonClick',
    ) => void;
    onItemSelect?: (
        itemIndexes: [groupIndex: number, itemIndex: number],
        selectedFromThumbnail: boolean,
    ) => void;
}

export const StoriesGroup = ({
    open,
    groups,
    onItemSelect,
    disableOutsideClick,
    initialStoryIndex = [0, 0],
    maxSliderItemsCount = DEFAULT_MAX_SLIDER_ITEMS_COUNT,
    onClose,
}: StoriesGroupProps) => {
    const [[groupIndex, itemIndex], setStoryIndex] = React.useState(initialStoryIndex);

    const handleClose = React.useCallback<NonNullable<StoriesGroupProps['onClose']>>(
        (event, reason) => {
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
            const [currentGroupIndex, currentItemIndex] = prevState;

            if (currentItemIndex > 0) {
                const newState: [number, number] = [currentGroupIndex, currentItemIndex - 1];

                onItemSelect?.(newState, false);
                return newState;
            }

            // try to find previous valid group
            for (let i = currentGroupIndex - 1; i >= 0; --i) {
                if (groups[i].items.length !== 0) {
                    const newState: [number, number] = [i, groups[i].items.length - 1];

                    onItemSelect?.(newState, false);
                    return newState;
                }
            }

            return prevState;
        });
    }, [groups, onItemSelect]);

    const handleGotoNext = React.useCallback(() => {
        setStoryIndex((prevState) => {
            const [currentGroupIndex, currentItemIndex] = prevState;

            if (currentItemIndex < groups[currentGroupIndex]?.items.length - 1) {
                const newState: [number, number] = [currentGroupIndex, currentItemIndex + 1];
                onItemSelect?.(newState, false);
                return newState;
            }

            // try to find next valid group
            for (let i = currentGroupIndex + 1; i < groups.length; ++i) {
                if (groups[i].items.length !== 0) {
                    const newState: [number, number] = [i, 0];
                    onItemSelect?.(newState, false);
                    return newState;
                }
            }

            return prevState;
        });
    }, [groups, onItemSelect]);

    const onGroupSelect = React.useCallback(
        (newGroupIndex: number) => {
            setStoryIndex([newGroupIndex, 0]);
            onItemSelect?.([newGroupIndex, 0], true);
        },
        [onItemSelect],
    );

    if (groups.length === 0) {
        return null;
    }

    const currentGroup = groups[groupIndex];
    const currentItems = currentGroup?.items || [];

    // case when groups has changed and indexs has ceased to be valid
    if (currentGroup === undefined || currentItems[itemIndex] === undefined) {
        if (
            groups[initialStoryIndex[0]] &&
            groups[initialStoryIndex[0]].items[initialStoryIndex[1]]
        ) {
            setStoryIndex(initialStoryIndex);
        } else {
            // try to find first valid index
            for (let i = 0; i < groups.length; ++i) {
                if (groups[i] && groups[i].items.length !== 0) {
                    setStoryIndex([i, 0]);
                    break;
                }
            }
        }

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
                maxSliderItemsCount={maxSliderItemsCount > 0 ? maxSliderItemsCount : 1}
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
