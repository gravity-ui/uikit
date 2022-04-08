import React from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';
import block from 'bem-cn-lite';

import './Typography.scss';

const b = block('typography-demo');

const sampleText = 'Yet another nesting level';
const textVariants = [
    {name: 'display-4'},
    {name: 'display-3'},
    {name: 'display-2'},
    {name: 'display-1'},
    {name: 'header-2'},
    {name: 'header-1'},
    {name: 'subheader-3'},
    {name: 'subheader-2'},
    {name: 'subheader-1'},
    {name: 'body-3'},
    {name: 'body-2'},
    {name: 'body-1'},
    {name: 'body-short'},
    {name: 'caption-2'},
    {name: 'caption-1'},
    {name: 'code-3'},
    {name: 'code-inline-3'},
    {name: 'code-2'},
    {name: 'code-inline-2'},
    {name: 'code-1'},
    {name: 'code-inline-1'},
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
                {textVariants.map(({name}) => {
                    const copyText = `@include text-${name}()`;

                    return (
                        <ReactCopyToClipboard key={name} text={copyText}>
                            <div className={b('item', {name})}>
                                <div className={b('caption')}>{name}</div>
                                <div className={b('value')}>{sampleText}</div>
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
