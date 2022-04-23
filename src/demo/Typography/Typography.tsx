import React from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';
import block from 'bem-cn-lite';
import {Text, TextProps} from '../../components/Text/Text';

import './Typography.scss';

const b = block('typography-demo');

const sampleText = 'Yet another nesting level';
const textVariants = [
    ['display4', 'display-4'],
    ['display3', 'display-3'],
    ['display2', 'display-2'],
    ['display1', 'display-1'],
    ['header2', 'header-2'],
    ['header1', 'header-1'],
    ['subheader3', 'subheader-3'],
    ['subheader2', 'subheader-2'],
    ['subheader1', 'subheader-1'],
    ['body3', 'body-3'],
    ['body2', 'body-2'],
    ['body1', 'body-1'],
    ['bodyShort', 'body-short'],
    ['caption2', 'caption-2'],
    ['caption1', 'caption-1'],
    ['code3', 'code-3'],
    ['codeInline3', 'code-inline-3'],
    ['code2', 'code-2'],
    ['codeInline2', 'code-inline-2'],
    ['code1', 'code-1'],
    ['codeInline1', 'code-inline-1'],
];

const fontFamilies = ['sans', 'monospace'];

export const Typography = () => (
    <div className={b()}>
        <div className={b('description')}>
            All properties will have been copied to clipboard by clicking on the text.
            <br />
            &apos;code&apos; variables is used for big chunks of code and variables with
            &apos;inline&apos; suffix for small chunks
        </div>

        <div className={b('block', {type: 'font-sizes'})}>
            <div className={b('header')}>text variants</div>
            <div className={b('content')}>
                {textVariants.map(([type, name]) => {
                    const copyText = `@include text-${name}()`;

                    return (
                        <ReactCopyToClipboard key={name} text={copyText}>
                            <div className={b('item', {name})}>
                                <div className={b('caption')}>{name}</div>

                                <Text type={type as TextProps['type']}>{sampleText}</Text>
                            </div>
                        </ReactCopyToClipboard>
                    );
                })}
            </div>
        </div>

        <div className={b('block', {type: 'font-families'})}>
            <div className={b('header')}>font families</div>
            <div className={b('description')}>
                Use the styles above for any situation if possible.
            </div>
            <div className={b('content')}>
                {fontFamilies.map((name) => {
                    return (
                        <ReactCopyToClipboard
                            key={`family-${name}`}
                            text={`font-family: var(--yc-font-family-${name});`}
                        >
                            <div className={b('item', {name})}>
                                <div className={b('caption')}>{name}</div>
                                <div className={b('value')}>{sampleText}</div>
                            </div>
                        </ReactCopyToClipboard>
                    );
                })}
            </div>
        </div>
    </div>
);
