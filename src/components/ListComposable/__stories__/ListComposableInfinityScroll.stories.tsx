import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Loader} from '../../Loader';
import {Flex} from '../../layout';
import {ListComposable, ListComposableProps} from '../ListComposable';
import {ListContainer} from '../components/ListContainer/ListContainer';
import {ListActionButton} from '../components/ListControls/ListControls';
import {ListFilter} from '../components/ListFilter/ListFilter';
import type {ListItemType} from '../types';

import {ListResetButton} from './ListResetButton';
import {createRandomizedData} from './makeData';

export default {
    title: 'ListComposable/ListComposableInfinityScroll',
    component: ListComposable,
} as Meta;

const fetchData = (timeout = 1000) =>
    new Promise<ListItemType<string>[]>((res) =>
        setTimeout(() => res(createRandomizedData(20, false)), timeout),
    );

const useInfinityState = () => {
    const [data, setData] = React.useState<ListItemType<string>[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [canFetchMore, setCanFetchMore] = React.useState(true);

    const onFetchMore = React.useCallback(async () => {
        setIsLoading(true);
        setCanFetchMore(false);

        try {
            const newData = await fetchData();
            setData((x) => x.concat(newData));
        } finally {
            setIsLoading(false);
            setCanFetchMore(true);
        }
    }, []);

    React.useEffect(() => {
        onFetchMore();

        // Just fetch on first render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        data,
        onFetchMore,
        canFetchMore,
        isLoading,
    };
};

const ListComposableInfinityScroll: StoryFn<ListComposableProps<unknown>> = () => {
    const {data, onFetchMore, canFetchMore, isLoading} = useInfinityState();

    return (
        <React.StrictMode>
            <Flex gap="5" style={{width: '100%', height: '300px'}}>
                <ListComposable items={data} size="s" selectable="multiple">
                    <Flex direction="column" gap="3" width={400}>
                        <ListFilter />

                        {data.length ? (
                            <ListContainer
                                virtualized
                                onLastItemRender={canFetchMore ? onFetchMore : undefined}
                            />
                        ) : (
                            <Flex grow justifyContent="center" alignItems="center">
                                {isLoading ? 'Loading data' : 'Where is no data'}
                            </Flex>
                        )}

                        {isLoading && data.length > 0 && (
                            <Flex justifyContent="center" alignItems="center">
                                <Loader size={'s'} />
                            </Flex>
                        )}

                        <Flex gap="2">
                            <ListResetButton />
                            <ListActionButton
                                actionText="Accept"
                                onActionClick={(...args) =>
                                    alert(
                                        args.map((arg) => JSON.stringify(arg, null, 2)).join('\n'),
                                    )
                                }
                            />
                        </Flex>
                    </Flex>
                </ListComposable>
            </Flex>
        </React.StrictMode>
    );
};
export const Examples = ListComposableInfinityScroll.bind({});
