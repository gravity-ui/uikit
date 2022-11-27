import React from 'react';

import {Modal, ModalCloseReason} from '../Modal';
import {StoriesItem} from './types';

import {IndexType, StoriesLayout} from './components/StoriesLayout/StoriesLayout';

import {block} from '../utils/cn';
import './Stories.scss';

const b = block('stories');
const modalContentCn = b('modal-content');

export interface StoriesProps {
    open: boolean;
    items: StoriesItem[];
    onClose?: (
        event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>,
        reason: ModalCloseReason | 'closeButtonClick',
    ) => void;
    initialStoryIndex?: number;
    onPreviousClick?: (storyIndex: number) => void;
    onNextClick?: (storyIndex: number) => void;
    disableOutsideClick?: boolean;
}

export function Stories({
    open,
    onClose,
    items,
    onPreviousClick,
    onNextClick,
    initialStoryIndex,
    disableOutsideClick = true,
}: StoriesProps) {
    const [storyIndex, setStoryIndex] = React.useState(() => {
        if (
            typeof initialStoryIndex !== 'undefined' &&
            initialStoryIndex >= 0 &&
            initialStoryIndex < items.length
        ) {
            return initialStoryIndex;
        }

        return 0;
    });

    const handleClose = React.useCallback<NonNullable<StoriesProps['onClose']>>(
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
        setStoryIndex((currentStoryIndex) => {
            if (currentStoryIndex <= 0) {
                return 0;
            }

            const newIndex = currentStoryIndex - 1;
            onPreviousClick?.(newIndex);
            return newIndex;
        });
    }, [onPreviousClick]);

    const handleGotoNext = React.useCallback(() => {
        setStoryIndex((currentStoryIndex) => {
            if (currentStoryIndex >= items.length - 1) {
                return items.length - 1;
            }

            const newIndex = currentStoryIndex + 1;
            onNextClick?.(newIndex);
            return newIndex;
        });
    }, [items, onNextClick]);

    const indexType =
        (storyIndex === 0 && IndexType.Start) ||
        (storyIndex >= items.length - 1 && IndexType.End) ||
        IndexType.InProccess;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            disableOutsideClick={disableOutsideClick}
            contentClassName={modalContentCn}
        >
            <StoriesLayout
                items={items}
                storyIndex={storyIndex}
                indexType={indexType}
                handleButtonClose={handleButtonClose}
                handleGotoNext={handleGotoNext}
                handleGotoPrevious={handleGotoPrevious}
            />
        </Modal>
    );
}
