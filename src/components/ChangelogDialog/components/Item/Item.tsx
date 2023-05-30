import React from 'react';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Label} from '../../../Label';
import {PlayIcon} from '../../../icons/PlayIcon';
import {block} from '../../../utils/cn';
import i18n from '../../i18n';
import {ChangelogItem, ChangelogStoryClickHandler} from '../../types';
import {Picture} from '../Picture/Picture';

import './Item.scss';

const b = block('changelog-dialog-item');

export interface ItemProps {
    className?: string;
    data: ChangelogItem;
    onStoryClick?: ChangelogStoryClickHandler;
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
                {data.image && data.image.src ? (
                    <Picture
                        className={b('image')}
                        src={data.image.src}
                        ratio={data.image.ratio}
                        alt={data.image.alt}
                    />
                ) : null}
                {data.description ? (
                    <div className={b('description')}>{data.description}</div>
                ) : null}
                {data.storyId && onStoryClick ? (
                    <Button
                        className={b('story-button')}
                        view="outlined-info"
                        onClick={() => {
                            if (data.storyId) {
                                onStoryClick(data.storyId);
                            }
                        }}
                    >
                        {i18n('button_view_story')}
                        <Icon data={PlayIcon} size={14} />
                    </Button>
                ) : null}
            </div>
        </article>
    );
}
