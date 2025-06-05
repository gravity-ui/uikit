import {ChevronDown, Globe} from '@gravity-ui/icons';
import {composeStories} from '@storybook/react-webpack5';

import {Button} from '..';
import {Showcase} from '../../../demo/Showcase';
import {Icon} from '../../Icon';
import * as DefaultButtonStories from '../__stories__/Button.stories';

export const ButtonStories = composeStories(DefaultButtonStories);

export const CustomIconSizeButton = () => (
    <Showcase>
        <Button size="xs">
            <Icon size={16} data={Globe} />
            Both bigger icons
            <Icon size={16} data={ChevronDown} />
        </Button>
        <Button size="s">
            <Icon size={20} data={Globe} />
            Both bigger icons
            <Icon size={20} data={ChevronDown} />
        </Button>
        <Button size="m">
            <Icon size={20} data={Globe} />
            Both bigger icons
            <Icon size={20} data={ChevronDown} />
        </Button>
        <Button size="l">
            <Icon size={20} data={Globe} />
            Both bigger icons
            <Icon size={20} data={ChevronDown} />
        </Button>
        <Button size="xl">
            <Icon size={24} data={Globe} />
            Both bigger icons
            <Icon size={24} data={ChevronDown} />
        </Button>
    </Showcase>
);
