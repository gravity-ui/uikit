import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {ArrowToggle} from '../ArrowToggle';
import type {ArrowToggleProps} from '../ArrowToggle';

const directions = ['top', 'left', 'bottom', 'right'] as Array<ArrowToggleProps['direction']>;

const meta: Meta<typeof ArrowToggle> = {
    title: 'Components/Utils/ArrowToggle',
    id: 'components/utils/ArrowToggle',
    args: {
        direction: 'bottom',
        size: 16,
    },
    argTypes: {
        direction: {
            options: directions,
            control: {type: 'select'},
        },
        size: {
            control: {type: 'number'},
        },
    },
};

export default meta;

export const Playground: StoryFn = (args: ArrowToggleProps) => {
    return <ArrowToggle size={args.size} direction={args.direction} />;
};
Playground.storyName = 'ArrowToggle';
