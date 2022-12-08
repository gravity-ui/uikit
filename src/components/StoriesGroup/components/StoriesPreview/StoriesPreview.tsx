import React from 'react';
import {Icon} from '../../../Icon/Icon';
import {MediaRenderer} from '../../../Stories/components';

import {StoriesGroupItem} from '../../types';
import {Chevron} from '../../../icons/Chevron';
import {Button} from '../../../Button';

import {block} from '../../../utils/cn';
import './StoriesPreview.scss';

const b = block('stories-group-preview');

type StoriesPreviewListProps = {
    groups: StoriesGroupItem[];
    groupIndex: number;
    onGroupSelect: (groupIndex: number) => void;
    offset?: number;
};
const StoriesPreviewList = ({
    groupIndex,
    groups,
    onGroupSelect,
    offset = 0,
}: StoriesPreviewListProps) => {
    return (
        <React.Fragment>
            {groups.map(({thumbnailMedia, items}, i) => {
                const media = thumbnailMedia || items[0]?.media;

                return (
                    <div
                        key={i}
                        className={b('stories-preview-item', {
                            active: offset + i === groupIndex,
                            disabled: items.length === 0,
                        })}
                        onClick={items.length === 0 ? undefined : () => onGroupSelect(offset + i)}
                    >
                        {media && <MediaRenderer media={media} />}
                    </div>
                );
            })}
        </React.Fragment>
    );
};

type StoriesPreviewWithSliderProps = {
    groups: StoriesGroupItem[];
    groupIndex: number;
    onGroupSelect: (groupIndex: number) => void;
    maxSliderItemsCount: number;
};
const StoriesPreviewWithSlider = ({
    groupIndex,
    groups,
    onGroupSelect,
    maxSliderItemsCount,
}: StoriesPreviewWithSliderProps) => {
    const [offset, setOffset] = React.useState(0);

    React.useEffect(() => {
        const currentOffset = maxSliderItemsCount * Math.floor(groupIndex / maxSliderItemsCount);
        setOffset(currentOffset);
    }, [groupIndex, maxSliderItemsCount]);

    const setPreviewOffset = React.useCallback(() => {
        setOffset((currentOffset) => {
            return currentOffset - maxSliderItemsCount;
        });
    }, [maxSliderItemsCount]);

    const setNextOffset = React.useCallback(() => {
        setOffset((currentOffset) => {
            return currentOffset + maxSliderItemsCount;
        });
    }, [maxSliderItemsCount]);

    return (
        <div className={b()}>
            {groups.length > maxSliderItemsCount && (
                <div className={b('slider-button-wrapper')}>
                    {offset !== 0 && (
                        <Button view="raised" pin="circle-circle" onClick={setPreviewOffset}>
                            <Icon className={b('Icon', {left: true})} data={Chevron} />
                        </Button>
                    )}
                </div>
            )}
            <div
                className={b('slider-preview-list-wrapper')}
                style={{width: `${40 * maxSliderItemsCount + 8 * (maxSliderItemsCount - 1)}px`}}
            >
                <StoriesPreviewList
                    groupIndex={groupIndex}
                    groups={groups.slice(offset, offset + maxSliderItemsCount)}
                    onGroupSelect={onGroupSelect}
                    offset={offset}
                />
            </div>
            {groups.length > maxSliderItemsCount && (
                <div className={b('slider-button-wrapper')}>
                    {offset < groups.length - maxSliderItemsCount && (
                        <Button view="raised" pin="circle-circle" onClick={setNextOffset}>
                            <Icon className={b('Icon', {right: true})} data={Chevron} />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export type StoriesPreviewProps = {
    groups: StoriesGroupItem[];
    groupIndex: number;
    onGroupSelect: (groupIndex: number) => void;
    maxSliderItemsCount: number;
};

export const StoriesPreview = ({
    groups,
    groupIndex,
    onGroupSelect,
    maxSliderItemsCount,
}: StoriesPreviewProps) => {
    if (groups.length < maxSliderItemsCount) {
        return (
            <div className={b()}>
                <StoriesPreviewList
                    groupIndex={groupIndex}
                    groups={groups}
                    onGroupSelect={onGroupSelect}
                />
            </div>
        );
    }

    return (
        <StoriesPreviewWithSlider
            maxSliderItemsCount={maxSliderItemsCount}
            groupIndex={groupIndex}
            groups={groups}
            onGroupSelect={onGroupSelect}
        />
    );
};
