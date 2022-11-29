import React from 'react';
import {Icon} from '../../../Icon/Icon';
import {MediaRenderer} from '../../../Stories/components';
import {block} from '../../../utils/cn';
import {StoriesGroupItem} from '../../types';
import {Chevron} from '../../../icons/Chevron';
import './StoriesPreview.scss';
import {Button} from '../../../Button';

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
            {groups.map(({previewMedia, items}, i) => {
                const media = previewMedia || items[0]?.media;

                return (
                    <div
                        key={i}
                        className={b('stories-preview-item', {
                            active: offset + i === groupIndex,
                        })}
                        onClick={() => onGroupSelect(offset + i)}
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
};
const StoriesPreviewWithSlider = ({
    groupIndex,
    groups,
    onGroupSelect,
}: StoriesPreviewWithSliderProps) => {
    const [offset, setOffset] = React.useState(0);

    React.useEffect(() => {
        const currentOffset = 12 * Math.floor(groupIndex / 12);
        setOffset(currentOffset);
    }, [groupIndex]);

    const setPreviewOffset = React.useCallback(() => {
        setOffset((currentOffset) => {
            return currentOffset - 12;
        });
    }, []);

    const setNextOffset = React.useCallback(() => {
        setOffset((currentOffset) => {
            return currentOffset + 12;
        });
    }, []);

    return (
        <div className={b()}>
            {groups.length > 12 && (
                <div className={b('slider-button-wrapper')}>
                    {offset !== 0 && (
                        <Button view="raised" pin="circle-circle" onClick={setPreviewOffset}>
                            <Icon className={b('Icon', {left: true})} data={Chevron} />
                        </Button>
                    )}
                </div>
            )}
            <div className={b('slider-previe-list-wrapper')}>
                <StoriesPreviewList
                    groupIndex={groupIndex}
                    groups={groups.slice(offset, offset + 12)}
                    onGroupSelect={onGroupSelect}
                    offset={offset}
                />
            </div>
            {groups.length > 12 && (
                <div className={b('slider-button-wrapper')}>
                    {offset < groups.length - 12 && (
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
};

export const StoriesPreview = ({groups, groupIndex, onGroupSelect}: StoriesPreviewProps) => {
    if (groups.length < 12) {
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
            groupIndex={groupIndex}
            groups={groups}
            onGroupSelect={onGroupSelect}
        />
    );
};
