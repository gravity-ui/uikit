import React from 'react';

import {MediaRenderer} from '..';
import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';
import {ButtonClose} from '../../../Dialog/ButtonClose/ButtonClose';
import {Link} from '../../../Link';
import {block} from '../../../utils/cn';
import i18n from '../../i18n';
import type {StoriesItem} from '../../types';

import './StoriesLayout.scss';

const b = block('stories-layout');

export enum IndexType {
    Start = 1,
    End,
    InProccess,
    Single,
}

export type StoriesLayoutProps = {
    items: StoriesItem[];
    storyIndex: number;
    indexType: IndexType;

    handleButtonClose: (
        event: MouseEvent | KeyboardEvent | React.MouseEvent<HTMLElement, MouseEvent>,
    ) => void;
    handleGotoPrevious: () => void;
    handleGotoNext: () => void;
    action?: ButtonProps;
};

// StoriesGroup component also use it
export const StoriesLayout = (props: StoriesLayoutProps) => {
    const currentStory = props.items[props.storyIndex];

    return (
        <div className={b('wrap-outer')}>
            <div className={b('wrap-inner')}>
                <div className={b('container')}>
                    <div className={b('left-pane')}>
                        {props.items.length > 1 && (
                            <div className={b('counter')}>
                                {i18n('label_counter', {
                                    current: props.storyIndex + 1,
                                    total: props.items.length,
                                })}
                            </div>
                        )}
                        <div className={b('text-block')}>
                            {currentStory && (
                                <React.Fragment>
                                    {currentStory.title && (
                                        <div className={b('text-header')}>{currentStory.title}</div>
                                    )}
                                    {currentStory.description && (
                                        <div className={b('text-content')}>
                                            {currentStory.description}
                                        </div>
                                    )}
                                    {currentStory.url && (
                                        <div className={b('story-link-block')}>
                                            <Link href={currentStory.url} target={'_blank'}>
                                                {i18n('label_more')}
                                            </Link>
                                        </div>
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                        <div className={b('controls-block')}>
                            {IndexType.Single === props.indexType ? (
                                <Button onClick={props.handleButtonClose} size="l" width="max">
                                    {i18n('label_close')}
                                </Button>
                            ) : (
                                <React.Fragment>
                                    {IndexType.Start !== props.indexType && (
                                        <Button
                                            onClick={props.handleGotoPrevious}
                                            view="outlined"
                                            size="l"
                                            width="max"
                                        >
                                            {i18n('label_back')}
                                        </Button>
                                    )}
                                    {IndexType.InProccess !== props.indexType && (
                                        <Button
                                            onClick={props.handleButtonClose}
                                            size="l"
                                            width="max"
                                        >
                                            {i18n('label_close')}
                                        </Button>
                                    )}
                                    {IndexType.End !== props.indexType && (
                                        <Button
                                            onClick={props.handleGotoNext}
                                            view="action"
                                            size="l"
                                            width="max"
                                        >
                                            {i18n('label_next')}
                                        </Button>
                                    )}
                                </React.Fragment>
                            )}
                            {props.action && <Button size="l" width="max" {...props.action} />}
                        </div>
                    </div>
                    <div className={b('right-pane')}>
                        <ButtonClose onClose={props.handleButtonClose} />
                        {currentStory?.media && (
                            <div className={b('media-block')}>
                                <MediaRenderer media={currentStory.media} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
