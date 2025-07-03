import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Flex} from '../../layout';

import {PopupWithTogglerList} from './components/PopupWithTogglerList';
import type {PopupWithTogglerListProps} from './components/PopupWithTogglerList';

export default {
    title: 'Lab/useList/PopupWithToggler',
    component: PopupWithTogglerList,
} as Meta;

const PopupWithTogglerTemplate: StoryFn<PopupWithTogglerListProps> = (props) => {
    return (
        <Flex>
            <PopupWithTogglerList {...props} />
        </Flex>
    );
};
export const PopupWithToggler = PopupWithTogglerTemplate.bind({});
PopupWithToggler.args = {
    itemsCount: 10,
    size: 'm',
};
