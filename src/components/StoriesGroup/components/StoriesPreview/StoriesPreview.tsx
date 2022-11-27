import React from 'react';
import {MediaRenderer} from '../../../Stories/components';
import {block} from '../../../utils/cn';
import {StoriesGroupItem} from '../../types';

import './StoriesPreview.scss';
const b = block('stories-group-preview');
const bCn = b();

export type StoriesPreviewProps = {
    groups: StoriesGroupItem[];
    groupIndex: number;
    onGroupSelect: (groupIndex: number) => void;
};
export const StoriesPreview = ({groups, groupIndex, onGroupSelect}: StoriesPreviewProps) => {
    return (
        <div className={bCn}>
            {groups.map(({previewMedia, items}, i) => {
                const media = previewMedia || items[0]?.media;

                return (
                    <div
                        key={i}
                        className={b('stories-preview-item', {active: i === groupIndex})}
                        onClick={() => onGroupSelect(i)}
                    >
                        {media && <MediaRenderer media={media} />}
                    </div>
                );
            })}
        </div>
    );
};
