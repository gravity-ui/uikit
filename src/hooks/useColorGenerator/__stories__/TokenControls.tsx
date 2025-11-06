import * as React from 'react';

import {Button} from '../../../components/Button';
import {Card} from '../../../components/Card';
import {Select} from '../../../components/Select';
import {Switch} from '../../../components/Switch';
import {Text} from '../../../components/Text';
import {TextArea} from '../../../components/controls/TextArea';
import {block} from '../../../components/utils/cn';

import {TOKEN_SOURCE_OPTIONS} from './constants';
import type {TokenSource} from './utils';

const b = block('color-generator-stories');

interface TokenControlsProps {
    tokenSource: TokenSource;
    tokenCount: number;
    customTokens: string;
    showTokensList: boolean;
    tokens: string[];
    onTokenSourceChange: (source: TokenSource) => void;
    onTokenCountChange: (count: number) => void;
    onCustomTokensChange: (tokens: string) => void;
    onRegenerateTokens: () => void;
    onToggleTokensList: () => void;
}

export const TokenControls = ({
    tokenSource,
    tokenCount,
    customTokens,
    showTokensList,
    tokens,
    onTokenSourceChange,
    onTokenCountChange,
    onCustomTokensChange,
    onRegenerateTokens,
    onToggleTokensList,
}: TokenControlsProps) => {
    return (
        <React.Fragment>
            <div className={b('color-generator-controls')}>
                <Card>
                    <div className={b('controls-grid')}>
                        <div className={b('control-group')}>
                            <Text variant="body-2" className={b('control-label')}>
                                Token Source:
                            </Text>
                            <Select
                                value={[tokenSource]}
                                onUpdate={(value) => {
                                    const newSource = value[0] as TokenSource;
                                    if (newSource === 'custom' && tokenSource !== 'custom') {
                                        onCustomTokensChange(tokens.join('\n'));
                                    }
                                    onTokenSourceChange(newSource);
                                }}
                                options={TOKEN_SOURCE_OPTIONS}
                                size="m"
                                width="max"
                            />
                        </div>

                        <div className={b('control-group')}>
                            <Text variant="body-2" className={b('control-label')}>
                                Token Count: {tokenCount}
                            </Text>
                            <input
                                type="range"
                                min="5"
                                max="50"
                                step="1"
                                value={tokenCount}
                                onChange={(e) => onTokenCountChange(Number(e.target.value))}
                                className={b('range-input')}
                            />
                        </div>

                        <div className={b('control-group')}>
                            <Button
                                onClick={onRegenerateTokens}
                                size="m"
                                view="outlined"
                                className={b('regenerate-button')}
                            >
                                Regenerate Tokens
                            </Button>
                        </div>

                        <div className={b('control-group')}>
                            <Switch
                                checked={showTokensList}
                                onUpdate={onToggleTokensList}
                                size="m"
                                className={b('toggle-list-switch')}
                            >
                                Show Tokens List
                            </Switch>
                        </div>

                        {(tokenSource === 'custom' || showTokensList) && (
                            <div className={b('tokens-content')}>
                                <TextArea
                                    value={
                                        tokenSource === 'custom' ? customTokens : tokens.join('\n')
                                    }
                                    onUpdate={
                                        tokenSource === 'custom' ? onCustomTokensChange : undefined
                                    }
                                    readOnly={tokenSource !== 'custom'}
                                    size="m"
                                    className={b('tokens-textarea')}
                                    placeholder={
                                        tokenSource === 'custom'
                                            ? 'Enter custom tokens, one per line...'
                                            : undefined
                                    }
                                    controlProps={{
                                        style: {
                                            overflowY: 'auto',
                                            height: '300px',
                                            resize: 'none',
                                        },
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </React.Fragment>
    );
};
