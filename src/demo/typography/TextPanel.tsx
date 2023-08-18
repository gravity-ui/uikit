import React from 'react';

import ReactCopyToClipboard from 'react-copy-to-clipboard';

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
}

const b = cn('text-panel');
const SAMPLE_TEXT = 'Yet another sample text';

export function TextPanel(props: TextPanelProps) {
    function renderTextItems(items: TextItemInfo[]) {
        return items.map((item) => {
            const varName = props.variant ? item.name : `--g-${item.name}`;
            const copyText = props.variant ? `@include ${varName}();` : varName;
            return (
                <div className={b('card')} key={item.name}>
                    <div className={b('card-texts')}>
                        <div className={b('card-headline')}>
                            <div className={b('card-title')}>{item.title}</div>
                            <ReactCopyToClipboard text={copyText}>
                                <div className={b('card-var')}>{varName}</div>
                            </ReactCopyToClipboard>
                        </div>
                        {item.description && (
                            <div className={b('card-description')}>{item.description}</div>
                        )}
                        {props.variant && (
                            <ReactCopyToClipboard text={copyText}>
                                <div
                                    className={b('card-sample', {variant: varName})}
                                    style={
                                        props.variant ? undefined : {fontFamily: `var(${varName})`}
                                    }
                                >
                                    {SAMPLE_TEXT}
                                </div>
                            </ReactCopyToClipboard>
                        )}
                    </div>
                </div>
            );
        });
    }

    return (
        <div className={b()}>
            <div className={b('title')}>{props.title}</div>
            <div className={b('description')}>{props.description}</div>
            <div className={b('variants')}>{renderTextItems(props.items)}</div>
        </div>
    );
}
