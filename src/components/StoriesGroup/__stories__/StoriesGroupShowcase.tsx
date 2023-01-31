import React from 'react';

import {Button} from '../../Button';
import {StoriesGroup, StoriesGroupProps} from '../StoriesGroup';
import {StoriesGroupIndex} from '../types';

export const StoriesGroupShowcase = (props: StoriesGroupProps) => {
    const [state, setState] = React.useState<{open: boolean; index?: StoriesGroupIndex}>({
        open: false,
        index: {groupIndex: 0, itemIndex: 0},
    });
    const openStories = React.useCallback((index?: StoriesGroupIndex) => {
        setState({open: true, index});
    }, []);

    const closeStories = React.useCallback(() => {
        setState({open: false});
    }, []);

    React.useEffect(() => {
        setState((prevState) => ({...prevState, open: props.open}));
    }, [props.open]);

    React.useEffect(() => {
        setState({
            open: false,
            index: props.index && {
                groupIndex: props.index.groupIndex,
                itemIndex: props.index.itemIndex,
            },
        });
    }, [props.index?.itemIndex, props.index?.groupIndex]);

    return (
        <React.Fragment>
            <div style={{display: 'flex', gap: '16px'}}>
                <Button onClick={() => openStories()}>Last User Story</Button>
                {props.groups.map((_, i) => (
                    <Button
                        key={i}
                        onClick={() => openStories({groupIndex: i, itemIndex: 0})}
                    >{`Open Story ${i + 1}`}</Button>
                ))}
            </div>
            <StoriesGroup {...props} index={state.index} open={state.open} onClose={closeStories} />
        </React.Fragment>
    );
};
