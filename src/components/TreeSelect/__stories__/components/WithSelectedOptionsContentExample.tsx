import * as React from 'react';

import {Label} from '../../../Label';
import {Text} from '../../../Text';
import {Flex} from '../../../layout';
import type {ListItemType} from '../../../useList';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps} from '../../types';

interface Entity {
    id: string;
    text: string;
    theme: 'info' | 'warning' | 'danger';
}

export interface WithSelectedOptionsContentExampleProps
    extends Omit<TreeSelectProps<Entity>, 'items' | 'mapItemDataToContentProps'> {}

const items: ListItemType<Entity>[] = [
    {data: {id: '1', text: 'plain title', theme: 'info'}},
    {data: {id: '2', text: 'node title', theme: 'warning'}},
    {data: {id: '3', text: 'one more node title', theme: 'danger'}},
];

const textColors = {
    info: 'info',
    warning: 'warning',
    danger: 'danger',
} as const;

export const WithSelectedOptionsContentExample = ({
    ...props
}: WithSelectedOptionsContentExampleProps) => {
    return (
        <Flex gap="5" alignItems="flex-start">
            {/* Default content: `title` is a ReactNode for every item except the first one */}
            <TreeSelect
                {...props}
                items={items}
                getItemId={({id}) => id}
                placeholder="-"
                defaultValue={['1', '2', '3']}
                multiple
                hasClear
                mapItemDataToContentProps={({id, text, theme}) => ({
                    title: id === '1' ? text : <Text color={textColors[theme]}>{text}</Text>,
                })}
            />
            {/* Custom content with own separators */}
            <TreeSelect
                {...props}
                items={items}
                getItemId={({id}) => id}
                placeholder="-"
                defaultValue={['1', '2', '3']}
                multiple
                hasClear
                mapItemDataToContentProps={({text}) => ({title: text})}
                renderSelectedOption={({id, data}, index) => (
                    <React.Fragment>
                        {index > 0 ? ' / ' : null}
                        <Label theme={data?.theme ?? 'unknown'} size="xs">
                            {data?.text ?? id}
                        </Label>
                    </React.Fragment>
                )}
            />
        </Flex>
    );
};
