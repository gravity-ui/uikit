import * as React from 'react';

import type {TextProps} from '../../components';
import {ClipboardButton, SegmentedRadioGroup, Text} from '../../components';
import {cn} from '../../components/utils/cn';

import './TextPanel.scss';

interface TextItemInfo {
    name: string;
    title: string;
    description?: string;
}

interface TextPanelProps {
    title: string;
    description: string;
    items: TextItemInfo[];
    variant?: boolean;
    font?: boolean;
}

type CodeFormat = 'css' | 'scss';

const b = cn('text-panel');
const SAMPLE_TEXT = 'The quick brown fox jumps over the lazy dog';
const codeFormatOptions: Array<{value: CodeFormat; content: string}> = [
    {value: 'css', content: 'CSS'},
    {value: 'scss', content: 'SCSS'},
];

function getTextVariant(name: string): TextProps['variant'] {
    return name.replace('text-', '') as TextProps['variant'];
}

function getVariantGroupName(name: string) {
    const variantName = getTextVariant(name);

    if (variantName?.startsWith('code-inline')) {
        return 'code';
    }

    return variantName?.split('-')[0];
}

function getCssCode(name: string) {
    const groupName = getVariantGroupName(name);

    return [
        `font-family: var(--g-text-${groupName}-font-family);`,
        `font-weight: var(--g-text-${groupName}-font-weight);`,
        `font-size: var(--g-${name}-font-size);`,
        `line-height: var(--g-${name}-line-height);`,
    ].join('\n');
}

function getScssCode(name: string) {
    return [
        "@use '~@gravity-ui/uikit/styles/mixins' as *;",
        '',
        '.text-container {',
        `  @include ${name}();`,
        '}',
    ].join('\n');
}

function getCode(name: string, format: CodeFormat) {
    return format === 'css' ? getCssCode(name) : getScssCode(name);
}

function getFontCode(name: string) {
    return `font-family: var(--g-${name});`;
}

export function TextPanel(props: TextPanelProps) {
    const [codeFormatByItem, setCodeFormatByItem] = React.useState<Record<string, CodeFormat>>({});

    function renderTextItems(items: TextItemInfo[]) {
        return items.map((item) => {
            const varName = props.variant ? item.name : `--g-${item.name}`;
            const textVariant = getTextVariant(item.name);
            const codeFormat = codeFormatByItem[item.name] ?? 'css';
            const code = props.variant ? getCode(item.name, codeFormat) : varName;
            const copyText = props.variant ? code : varName;

            if (props.font) {
                const fontCode = getFontCode(item.name);

                return (
                    <div className={b('variant')} key={item.name}>
                        <Text as="div" variant="subheader-2" className={b('variant-title')}>
                            {item.title}
                        </Text>
                        {item.description && (
                            <Text as="div" variant="body-1" className={b('item-description')}>
                                {item.description}
                            </Text>
                        )}
                        <div className={b('sample')}>
                            <Text
                                as="div"
                                variant="body-2"
                                className={b('sample-text')}
                                style={{fontFamily: `var(--g-${item.name})`}}
                            >
                                {SAMPLE_TEXT}
                            </Text>
                        </div>
                        <div className={b('code-block')}>
                            <pre className={b('code')}>{fontCode}</pre>
                            <ClipboardButton
                                text={fontCode}
                                view="flat"
                                size="xs"
                                className={b('copy-button')}
                            />
                        </div>
                    </div>
                );
            }

            if (!props.variant) {
                return (
                    <div className={b('card')} key={item.name}>
                        <div className={b('card-texts')}>
                            <div className={b('card-headline')}>
                                <div className={b('card-title')}>{item.title}</div>
                                <ClipboardButton text={copyText} view="flat" size="xs" />
                            </div>
                            <div className={b('card-var')}>{varName}</div>
                            {item.description && (
                                <div className={b('card-description')}>{item.description}</div>
                            )}
                        </div>
                    </div>
                );
            }

            return (
                <div className={b('variant')} key={item.name}>
                    <Text as="div" variant="subheader-2" className={b('variant-title')}>
                        {item.title}
                    </Text>
                    <div className={b('sample')}>
                        <Text as="div" variant={textVariant} className={b('sample-text')}>
                            {SAMPLE_TEXT}
                        </Text>
                    </div>
                    <div className={b('code-section')}>
                        <SegmentedRadioGroup<CodeFormat>
                            value={codeFormat}
                            onUpdate={(value) => {
                                setCodeFormatByItem((current) => ({
                                    ...current,
                                    [item.name]: value,
                                }));
                            }}
                            options={codeFormatOptions}
                            size="s"
                        />
                        <div className={b('code-block')}>
                            <pre className={b('code')}>{code}</pre>
                            <ClipboardButton
                                text={copyText}
                                view="flat"
                                size="xs"
                                className={b('copy-button')}
                            />
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className={b({variant: props.variant || props.font})}>
            <div className={b('header')}>
                <Text as="div" variant="header-1" className={b('title')}>
                    {props.title}
                </Text>
                {props.description && (
                    <Text as="div" variant="body-1" className={b('description')}>
                        {props.description}
                    </Text>
                )}
            </div>
            <div className={b('variants')}>{renderTextItems(props.items)}</div>
        </div>
    );
}
