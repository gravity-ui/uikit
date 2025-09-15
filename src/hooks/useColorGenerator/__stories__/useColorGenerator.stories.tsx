import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {block} from '../../../components/utils/cn';
import {colorOptions as defaultColorOptions} from '../constants';
import type {ThemeColorSettings} from '../types';

import {ColorOptionsControls} from './ColorOptionsControls';
import {CustomColoredAvatar} from './CustomColoredAvatar';
import {TokenControls} from './TokenControls';
import {DEFAULT_CUSTOM_TOKENS, STATES, VIEWS} from './constants';
import {generateTokens} from './utils';
import type {TokenSource} from './utils';

import './useColorGenerator.stories.scss';

const b = block('color-generator-stories');

interface TemplateProps {
    withText?: boolean;
}

const meta: Meta = {
    title: 'Hooks/useColorGenerator',
    argTypes: {
        withText: {
            control: 'boolean',
            description: 'Show text on avatars',
        },
    },
};

export default meta;

type Story = StoryObj<TemplateProps>;

const Template = ({withText}: TemplateProps) => {
    const [tokenSource, setTokenSource] = React.useState<TokenSource>('random');
    const [tokenCount, setTokenCount] = React.useState(20);
    const [customTokens, setCustomTokens] = React.useState(DEFAULT_CUSTOM_TOKENS);
    const [showTokensList, setShowTokensList] = React.useState(false);
    const [showColorOptions, setShowColorOptions] = React.useState(false);
    const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>('light');
    const [colorOptions, setColorOptions] = React.useState<ThemeColorSettings>(
        defaultColorOptions.light,
    );
    const [regenerateKey, setRegenerateKey] = React.useState(0);

    const tokens = React.useMemo(() => {
        return generateTokens(tokenSource, tokenCount, customTokens);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- regenerateKey is intentionally included to force regeneration
    }, [tokenSource, tokenCount, customTokens, regenerateKey]);

    const handleRegenerateTokens = React.useCallback(() => {
        setRegenerateKey((prev) => prev + 1);
    }, []);

    const handleResetColorOptions = React.useCallback(() => {
        setColorOptions(defaultColorOptions[currentTheme]);
    }, [currentTheme]);

    const handleThemeChange = React.useCallback((theme: 'light' | 'dark') => {
        setCurrentTheme(theme);
        setColorOptions(defaultColorOptions[theme]);
    }, []);

    return (
        <div className={b()}>
            <TokenControls
                tokenSource={tokenSource}
                tokenCount={tokenCount}
                customTokens={customTokens}
                showTokensList={showTokensList}
                showColorOptions={showColorOptions}
                tokens={tokens}
                onTokenSourceChange={setTokenSource}
                onTokenCountChange={setTokenCount}
                onCustomTokensChange={setCustomTokens}
                onRegenerateTokens={handleRegenerateTokens}
                onToggleTokensList={() => setShowTokensList(!showTokensList)}
                onToggleColorOptions={() => setShowColorOptions(!showColorOptions)}
            />

            {showColorOptions && (
                <div className={b('color-options-section')}>
                    <ColorOptionsControls
                        colorOptions={colorOptions}
                        theme={currentTheme}
                        onColorOptionsChange={setColorOptions}
                        onThemeChange={handleThemeChange}
                        onResetToDefaults={handleResetColorOptions}
                    />
                </div>
            )}

            <div className={b('grid')}>
                {VIEWS.map((view) => (
                    <React.Fragment key={view}>
                        <div key={view} className={b('grid-cell', {head: 'left'})}>
                            <strong>{view}</strong>
                        </div>
                        <div key={view} className={b('color-items')}>
                            {tokens.map((token) => (
                                <CustomColoredAvatar
                                    key={token}
                                    seed={token}
                                    intensity={view}
                                    interfaceTheme={currentTheme}
                                    withText={withText || false}
                                    text={withText ? token.slice(0, 2) : ''}
                                    storyAvatarStyle="filled"
                                />
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <div className={b('grid')}>
                {VIEWS.map((view) => (
                    <React.Fragment key={view}>
                        <div key={view} className={b('grid-cell', {head: 'left'})}>
                            <strong>{view}</strong>
                        </div>
                        <div key={view} className={b('color-items')}>
                            {tokens.map((token) => (
                                <CustomColoredAvatar
                                    key={token}
                                    seed={token}
                                    intensity={view}
                                    interfaceTheme={currentTheme}
                                    shape="square"
                                    withText={withText || false}
                                    text={withText ? token.slice(0, 2) : ''}
                                    storyAvatarStyle="outline"
                                />
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </div>

            <div className={b('grid')}>
                <div className={b('grid-cell', {head: 'left'})}>
                    <strong>{'heavy'}</strong>
                </div>
                <div key="heavy" className={b('color-items')}>
                    {tokens.map((token) => (
                        <CustomColoredAvatar
                            key={token}
                            seed={token}
                            intensity="heavy"
                            shape="square"
                            interfaceTheme={currentTheme}
                            withText
                            text={withText ? token.slice(0, 2) : ''}
                            storyAvatarStyle="transparent"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export const Default: Story = {
    render: (args) => {
        return <Template {...args} />;
    },
    args: {
        withText: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Color generator with embedded controls for token configuration. Test different token sources (Random, Usernames, IDs, Mixed, Custom) and see how they affect color generation patterns. Click on any color to view detailed information including the original hash, OKLCH values, and RGB values.',
            },
        },
    },
};
