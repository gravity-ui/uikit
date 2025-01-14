import * as React from 'react';

import type {ListItemType} from '../../../useList';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps} from '../../types';

interface Entity {
    text: string;
    id: string;
}

export interface WithDisabledElementsExampleProps
    extends Omit<TreeSelectProps<Entity>, 'items' | 'mapItemDataToContentProps'> {}

const items: ListItemType<Entity>[] = [
    {
        data: {id: '1', text: 'default disabled'},
        disabled: true,
    },
    {
        data: {id: '2', text: 'two'},
        disabled: true,
    },
    {
        data: {id: '3', text: 'default selected'},
    },
    {
        data: {id: '4', text: 'four'},
        disabled: true,
    },
    {
        data: {id: '5', text: 'five'},
    },
];

export const WithDisabledElementsExample = ({...props}: WithDisabledElementsExampleProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <TreeSelect
            {...props}
            items={items}
            getItemId={({id}) => id}
            containerRef={containerRef}
            mapItemDataToContentProps={({text}) => ({title: text})}
        />
    );
};
