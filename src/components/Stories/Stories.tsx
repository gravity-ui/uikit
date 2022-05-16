import React from 'react';

import {block} from '../utils/cn';
import {Modal, ModalCloseReason} from '../Modal';
import {Button} from '../Button';
import {ButtonClose} from '../Dialog/ButtonClose/ButtonClose';
import {Link} from '../Link';
import {MediaRenderer} from './components';
import {StoriesItem} from './types';
import i18n from './i18n';

import './Stories.scss';

const b = block('stories');

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
    let initialIndex = 0;
    if (
        typeof initialStoryIndex !== 'undefined' &&
        initialStoryIndex >= 0 &&
        initialStoryIndex < items.length
    ) {
        initialIndex = initialStoryIndex;
    }

    const [currentStoryIndex, setCurrentStoryIndex] = React.useState(initialIndex);

    const currentStory = items[currentStoryIndex];
    const isFirstStory = currentStoryIndex === 0;
    const isLastStory = currentStoryIndex === items.length - 1;
    const hasNextStory = !isLastStory;
    const hasPreviousStory = !isFirstStory;

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
        if (currentStoryIndex > 0) {
            const newIndex = currentStoryIndex - 1;
            setCurrentStoryIndex(newIndex);
            onPreviousClick?.(newIndex);
        }
    }, [currentStoryIndex, onPreviousClick]);

    const handleGotoNext = React.useCallback(() => {
        if (currentStoryIndex < items.length - 1) {
            const newIndex = currentStoryIndex + 1;
            setCurrentStoryIndex(newIndex);
            onNextClick?.(newIndex);
        }
    }, [currentStoryIndex, items, onNextClick]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={b()}
            disableOutsideClick={disableOutsideClick}
        >
            <div className={b('wrap-outer')}>
                <div className={b('wrap-inner')}>
                    <div className={b('container')}>
                        {currentStory && (
                            <React.Fragment>
                                <div className={b('left-pane')}>
                                    <div className={b('counter')}>
                                        {i18n('label_counter', {
                                            current: currentStoryIndex + 1,
                                            total: items.length,
                                        })}
                                    </div>
                                    <div className={b('text-block')}>
                                        {currentStory.title ? (
                                            <div className={b('text-header')}>
                                                {currentStory.title}
                                            </div>
                                        ) : null}
                                        {currentStory.description ? (
                                            <div className={b('text-content')}>
                                                {currentStory.description}
                                            </div>
                                        ) : null}
                                        {currentStory.url ? (
                                            <div className={b('story-link-block')}>
                                                <Link href={currentStory.url} target={'_blank'}>
                                                    {i18n('label_more')}
                                                </Link>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className={b('controls-block')}>
                                        {hasPreviousStory && (
                                            <Button
                                                onClick={handleGotoPrevious}
                                                view="outlined"
                                                size="l"
                                            >
                                                {i18n('label_back')}
                                            </Button>
                                        )}
                                        {(isFirstStory || isLastStory) && (
                                            <Button onClick={handleButtonClose} size="l">
                                                {i18n('label_close')}
                                            </Button>
                                        )}
                                        {hasNextStory && (
                                            <Button onClick={handleGotoNext} view="action" size="l">
                                                {i18n('label_next')}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <div className={b('right-pane')}>
                                    <ButtonClose onClose={handleButtonClose} />
                                    {currentStory.media && (
                                        <div className={b('media-block')}>
                                            <MediaRenderer media={currentStory.media} />
                                        </div>
                                    )}
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
