import {Rocket} from '@gravity-ui/icons';
import {composeStories} from '@storybook/react-webpack5';

import {Icon} from '../../Icon';
import type {LabelProps} from '../Label';
import {Label} from '../Label';
import * as DefaultLabelStories from '../__stories__/Label.stories';

export const LabelStories = composeStories(DefaultLabelStories);

export const TestLabelWithIcon = (props: Partial<LabelProps>) => {
    return <Label icon={<Icon data={Rocket} />} {...props} />;
};
