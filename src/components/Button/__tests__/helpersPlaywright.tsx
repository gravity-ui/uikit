import React from 'react';

import {ChevronDown, Globe, Xmark} from '@gravity-ui/icons';
import {composeStories} from '@storybook/react';

import {Button} from '..';
import {Showcase} from '../../../demo/Showcase';
import {Icon} from '../../Icon';
import {cn} from '../../utils/cn';
import * as DefaultButtonStories from '../__stories__/Button.stories';

import './helpersPlaywright.scss';

const b = cn('button-view-showcase-container');

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

export const SingleIconButtonInShrinkedContainer = () => (
    <Showcase className={b()}>
        <div className={b('shrinked-container')}>
            <Button size="xl">
                <Icon size={24} data={Xmark} />
            </Button>
        </div>
        <div className={b('shrinked-container', {max: true})}>
            <Button size="xl" width="max">
                <Icon size={24} data={Xmark} />
            </Button>
        </div>
    </Showcase>
);
