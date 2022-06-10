import React from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';
import block from 'bem-cn-lite';
import {Text, TYPOGRAPHY_VARIANTS} from '../../components/Text';

import './Typography.scss';

const b = block('typography-demo');

const sampleText = 'Yet another nesting level';

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
                {TYPOGRAPHY_VARIANTS.map((typography) => {
                    const copyText = `@include text-${typography}()`;

                    return (
                        <ReactCopyToClipboard key={typography} text={copyText}>
                            <div className={b('item', {typography})}>
                                <div className={b('caption')}>{typography}</div>

                                <Text typography={typography}>{sampleText}</Text>
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
