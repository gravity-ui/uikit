import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import type {AvatarSize} from '../../../components/Avatar';
import {block} from '../../../components/utils/cn';

import {CustomColoredAvatar} from './CustomColoredAvatar';
import {TokenControls} from './TokenControls';
import {DEFAULT_CUSTOM_TOKENS} from './constants';
import {generateTokens} from './utils';
import type {TokenSource} from './utils';

import './useColorGenerator.stories.scss';

const b = block('color-generator-stories');

interface TemplateProps {
    content?: 'text' | 'icon' | 'empty';
    avatarSize?: AvatarSize;
    avatarShape?: 'circle' | 'square';
}

const meta: Meta = {
    title: 'Hooks/useColorGenerator',
    argTypes: {
        content: {
            control: 'select',
            options: ['text', 'icon', 'empty'],
            description: 'Content of avatar',
        },
        avatarSize: {
            control: 'select',
            options: ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl'],
            description: 'Avatar size',
        },
        avatarShape: {
            control: 'select',
            options: ['square', 'circle'],
            description: 'Avatar shape',
        },
    },
};

export default meta;

type Story = StoryObj<TemplateProps>;

const Template = ({content = 'text', avatarSize = 'l', avatarShape = 'circle'}: TemplateProps) => {
    const [tokenSource, setTokenSource] = React.useState<TokenSource>('random');
    const [tokenCount, setTokenCount] = React.useState(20);
    const [customTokens, setCustomTokens] = React.useState(DEFAULT_CUSTOM_TOKENS);
    const [showTokensList, setShowTokensList] = React.useState(false);
    const [regenerateKey, setRegenerateKey] = React.useState(0);

    const tokens = React.useMemo(() => {
        return generateTokens(tokenSource, tokenCount, customTokens);
        // eslint-disable-next-line react-hooks/exhaustive-deps -- regenerateKey is intentionally included to force regeneration
    }, [tokenSource, tokenCount, customTokens, regenerateKey]);

    const handleRegenerateTokens = React.useCallback(() => {
        setRegenerateKey((prev) => prev + 1);
    }, []);

    return (
        <div className={b()}>
            <TokenControls
                tokenSource={tokenSource}
                tokenCount={tokenCount}
                customTokens={customTokens}
                showTokensList={showTokensList}
                tokens={tokens}
                onTokenSourceChange={setTokenSource}
                onTokenCountChange={setTokenCount}
                onCustomTokensChange={setCustomTokens}
                onRegenerateTokens={handleRegenerateTokens}
                onToggleTokensList={() => setShowTokensList(!showTokensList)}
            />

            <div>
                <strong>{'Normal'}</strong>
            </div>
            <div className={b('color-items')}>
                {tokens.map((token) => (
                    <CustomColoredAvatar
                        key={token}
                        seed={token}
                        shape={avatarShape}
                        content={content}
                        text={token.slice(0, 2)}
                        storyAvatarStyle="transparent"
                        size={avatarSize}
                    />
                ))}
            </div>

            <div>
                <strong>{'Outlined'}</strong>
            </div>
            <div className={b('color-items')}>
                {tokens.map((token) => (
                    <CustomColoredAvatar
                        key={token}
                        seed={token}
                        shape={avatarShape}
                        content={content}
                        text={token.slice(0, 2)}
                        storyAvatarStyle="outline"
                        size={avatarSize}
                    />
                ))}
            </div>

            <div>
                <strong>{'Filled'}</strong>
            </div>
            <div className={b('color-items')}>
                {tokens.map((token) => (
                    <CustomColoredAvatar
                        key={token}
                        seed={token}
                        content={content}
                        text={token.slice(0, 2)}
                        storyAvatarStyle="filled"
                        size={avatarSize}
                        shape={avatarShape}
                    />
                ))}
            </div>
        </div>
    );
};

export const Default: Story = {
    render: (args) => {
        return <Template {...args} />;
    },
    args: {
        content: 'text',
        avatarSize: 'l',
        avatarShape: 'circle',
    },
    parameters: {
        docs: {
            description: {
                story: 'Color generator with embedded controls for token configuration. Test different token sources (Random, Usernames, IDs, Mixed, Custom) and see how they affect color generation patterns. Click on any color to view detailed information including the original hash, OKLCH values, and RGB values.',
            },
        },
    },
};
