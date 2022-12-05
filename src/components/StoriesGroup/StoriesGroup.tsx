import React from 'react';
import {Modal, ModalCloseReason} from '../Modal';
import {IndexType, StoriesLayout} from '../Stories/components/StoriesLayout/StoriesLayout';
import {StoriesPreview} from './components';
import {StoriesGroupItem} from './types';

import {block} from '../utils/cn';
import './StoriesGroup.scss';

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
    maxSliderItemsCount = 12,
    onClose,
}: StoriesGroupProps) => {
    const [[groupIndex, itemIndex], setCurrentStoryIndex] = React.useState(initialStoryIndex);

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
        setCurrentStoryIndex(([currentGroupIndex, currentItemIndex]) => {
            if (currentItemIndex > 0) {
                const newState: [number, number] = [currentGroupIndex, currentItemIndex - 1];

                onItemSelect?.(newState, false);
                return newState;
            } else {
                const newState: [number, number] = [
                    currentGroupIndex - 1,
                    groups[currentGroupIndex - 1].items.length - 1,
                ];

                onItemSelect?.(newState, false);
                return newState;
            }
        });
    }, [groups, onItemSelect]);

    const handleGotoNext = React.useCallback(() => {
        setCurrentStoryIndex(([currentGroupIndex, currentItemIndex]) => {
            if (currentItemIndex < groups[currentGroupIndex].items.length - 1) {
                const newState: [number, number] = [currentGroupIndex, currentItemIndex + 1];
                onItemSelect?.(newState, false);
                return newState;
            } else {
                const newState: [number, number] = [currentGroupIndex + 1, 0];
                onItemSelect?.(newState, false);
                return newState;
            }
        });
    }, [groups, onItemSelect]);

    const onGroupSelect = React.useCallback(
        (newGroupIndex: number) => {
            setCurrentStoryIndex([newGroupIndex, 0]);
            onItemSelect?.([newGroupIndex, 0], true);
        },
        [onItemSelect],
    );

    const currentGroup = groups[groupIndex];
    const currentItems = currentGroup?.items || [];

    const indexType =
        ((currentGroup === undefined || currentItems[itemIndex] === undefined) &&
            IndexType.Invalid) ||
        (groupIndex === 0 && itemIndex === 0 && IndexType.Start) ||
        (groupIndex >= groups.length - 1 &&
            itemIndex >= currentItems.length - 1 &&
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
