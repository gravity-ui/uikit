import * as React from 'react';

import {Flex} from '../../../layout';
import type {ListItemType} from '../../../useList';
import {TreeSelect} from '../../TreeSelect';
import type {TreeSelectProps} from '../../types';

type Entity = string;

export interface ErrorStateExampleProps
    extends Omit<TreeSelectProps<Entity>, 'items' | 'mapItemDataToContentProps'> {}

const items: ListItemType<Entity>[] = ['one', 'two', 'free'];
const errorMessage = 'A validation error has occurred';

export const ErrorStateExample = ({...props}: ErrorStateExampleProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <Flex gap="5">
            <TreeSelect
                {...props}
                items={items}
                getItemId={(id) => id}
                placeholder="-"
                containerRef={containerRef}
                mapItemDataToContentProps={(title) => ({title})}
                errorMessage={errorMessage}
                errorPlacement="outside"
                validationState="invalid"
                hasClear
            />
            <TreeSelect
                {...props}
                items={items}
                getItemId={(id) => id}
                placeholder="-"
                containerRef={containerRef}
                mapItemDataToContentProps={(title) => ({title})}
                errorMessage={errorMessage}
                errorPlacement="inside"
                validationState="invalid"
                hasClear
            />
        </Flex>
    );
};
