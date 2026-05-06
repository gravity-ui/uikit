import type {ListItemData} from '../../List';
import {Suggest} from '../Suggest';
import type {SuggestProps} from '../types';

export type TestItem = {
    value: string;
    content: string;
    description?: string;
    disabled?: boolean;
};

export const ITEMS: ListItemData<TestItem>[] = [
    {value: 'earth', content: 'Earth', description: 'Our home planet'},
    {value: 'mars', content: 'Mars', description: 'The red planet'},
    {value: 'jupiter', content: 'Jupiter', description: 'Largest planet'},
    {value: 'venus', content: 'Venus', description: 'Thick atmosphere'},
    {value: 'saturn', content: 'Saturn', description: 'Prominent ring system'},
];

export interface TestSuggestProps extends Partial<SuggestProps<TestItem>> {
    items?: ListItemData<TestItem>[];
}

export const TestSuggest = ({
    items = ITEMS,
    renderOption = (item) => <div>{item.content}</div>,
    getOptions: getOptionsProp,
    ...props
}: TestSuggestProps) => {
    // If getOptions is provided, use it; otherwise create one from items
    const getOptions = getOptionsProp || (() => items);

    return <Suggest<TestItem> getOptions={getOptions} renderOption={renderOption} {...props} />;
};
