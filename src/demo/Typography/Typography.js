import React from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';
import block from 'bem-cn-lite';

import './Typography.scss';

const b = block('typography-demo');

const sampleText = 'Еще один уровень вложенности';
const textSizes = [
    {name: 'display3'},
    {name: 'display2'},
    {name: 'display1'},
    {name: 'title'},
    {name: 'header'},
    {name: 'body3'},
    {name: 'body2'},
    {name: 'body'},
    {name: 'code-3'},
    {name: 'code-3-inline'},
    {name: 'code-2'},
    {name: 'code-2-inline'},
    {name: 'code-1'},
    {name: 'code-1-inline'},
];

const fontFamilies = ['sans', 'monospace'];

export const Typography = () => (
    <div className={b()}>
        <div className={b('description')}>
            При клике на строку копируются все нужные свойства, по возможности, используйте их все
            вместе.
            <br />
            Переменные code используются для больших кусков кода, а переменные с суффиксом inline —
            для маленьких (вставки в тексте).
        </div>

        <div className={b('block', {type: 'font-sizes'})}>
            <div className={b('header')}>text styles</div>
            <div className={b('content')}>
                {textSizes.map(({name, deprecated}) => {
                    let styleText =
                        `font-size: var(--yc-text-${name}-font-size);\r` +
                        `line-height: var(--yc-text-${name}-line-height);`;

                    if (name.startsWith('code-')) {
                        styleText +=
                            '\rfont-weight: var(--yc-text-code-font-weight);\r' +
                            'font-family: var(--yc-text-code-font-family);';
                    }

                    return (
                        <ReactCopyToClipboard key={name} text={styleText}>
                            <div className={b('item', {name, deprecated})}>
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
                Если возможно, используйте стили приведенные выше, они содержат все нужные свойства.
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
