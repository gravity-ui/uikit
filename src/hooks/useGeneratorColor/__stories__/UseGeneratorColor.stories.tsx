import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../../components/Button';
import {Checkbox} from '../../../components/Checkbox';
import {Select} from '../../../components/Select';
import {block} from '../../../components/utils/cn';
import type {UseGeneratorColorProps} from '../types';

import {Color} from './Color';
import {colorModes} from './constants';
import {randomString} from './utils/randomString';

import './GeneratorColor.scss';

const b = block('generator-color');

export default {title: 'Hooks/useGeneratorColor'} as Meta;

const DefaultTemplate: StoryFn = () => {
    const [tokens, setTokens] = React.useState<string[]>([]);
    const [mode, setMode] = React.useState<string[]>(['unsaturated']);
    const [withText, setWithText] = React.useState(false);

    const onClick = React.useCallback(() => {
        const newToken = randomString(16);
        setTokens((prev) => [newToken, ...prev]);
    }, []);

    return (
        <React.Fragment>
            <div className={b('actions')}>
                <Button title="generate color" onClick={onClick}>
                    Generate color
                </Button>
                <Select title="select mode" value={mode} options={colorModes} onUpdate={setMode} />
                <Checkbox checked={withText} onUpdate={setWithText}>
                    with text
                </Checkbox>
            </div>

            <div className={b('color-items')}>
                {tokens.map((token) => (
                    <Color
                        key={token}
                        token={token}
                        mode={mode[0] as UseGeneratorColorProps['mode']}
                        withText={withText}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};

export const Default = DefaultTemplate.bind({});
