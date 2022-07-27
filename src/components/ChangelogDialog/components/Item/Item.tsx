import React from 'react';

import {block} from '../../../utils/cn';
import {Label} from '../../../Label';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {PlayIcon} from '../../../icons/PlayIcon';
import {Picture} from '../Picture/Picture';
import {ChangelogItem, OnStoryClick} from '../../types';
import i18n from '../../i18n';

import './Item.scss';

const b = block('changelog-dialog-item');

export interface ItemProps {
    className?: string;
    data: ChangelogItem;
    onStoryClick?: OnStoryClick;
}

export function Item({className, data, onStoryClick}: ItemProps) {
    return (
        <article className={b(null, className)}>
            <div className={b('meta')}>
                <div className={b('date')}>{data.date}</div>
                {data.isNew ? (
                    <Label className={b('label-new')} theme="info">
                        {i18n('label_new')}
                    </Label>
                ) : null}
            </div>
            <div className={b('content')}>
                <h3 className={b('title')}>{data.title}</h3>
                {data.image && data.image.src && data.image.ratio ? (
                    <Picture className={b('image')} src={data.image.src} ratio={data.image.ratio} />
                ) : null}
                {data.description ? (
                    <div className={b('description')}>{data.description}</div>
                ) : null}
                {data.storyId ? (
                    <Button
                        className={b('story-button')}
                        view="outlined-info"
                        onClick={() => {
                            if (data.storyId && onStoryClick) {
                                onStoryClick(data.storyId);
                            }
                        }}
                    >
                        <span className={b('story-button-text')}>{i18n('button_view_story')}</span>
                        <Icon data={PlayIcon} size={14} />
                    </Button>
                ) : null}
            </div>
        </article>
    );
}
