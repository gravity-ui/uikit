import React from 'react';

import {Gear} from '@gravity-ui/icons';
import {Unstyled} from '@storybook/blocks';

import {Label} from '../../..';
import {DocsExample} from '../../../../../demo/DocsExample/DocsExample';
import {Icon} from '../../../../Icon';

export function LabelExampleViewTheme() {
    return (
        <Unstyled>
            <DocsExample>
                <Label theme="normal" size="s">
                    Normal
                </Label>
                <Label theme="info" size="s">
                    Info
                </Label>
                <Label theme="warning" size="s">
                    Warning
                </Label>
                <Label theme="danger" size="s">
                    Danger
                </Label>
                <Label theme="success" size="s">
                    Success
                </Label>
                <Label theme="unknown" size="s">
                    Unknown
                </Label>
                <Label theme="clear" size="s">
                    Clear
                </Label>
            </DocsExample>
        </Unstyled>
    );
}
LabelExampleViewTheme.code = `
<Label theme="normal" size="s">Normal</Label>
<Label theme="info" size="s">Info</Label>
<Label theme="warning" size="s">Warning</Label>
<Label theme="danger" size="s">Danger</Label>
<Label theme="success" size="s">Success</Label>
<Label theme="unknown" size="s">Unknown</Label>
<Label theme="clear" size="s">Clear</Label>
`.trim();

export function LabelExampleViewType() {
    return (
        <Unstyled>
            <DocsExample>
                <Label type="default" onClick={() => alert('On click label')} size="s">
                    Click on label
                </Label>
                <Label type="close" onClose={() => alert('On click close')} size="s">
                    Click on close
                </Label>
                <Label type="copy" copyText="Copy" onCopy={() => alert('On click copy')} size="s">
                    Click on copy
                </Label>
            </DocsExample>
        </Unstyled>
    );
}
LabelExampleViewType.code = `
<Label type="default" onClick={() => alert('On click label')} size="s">Click on label</Label>
<Label type="close" onClose={() => alert('On click close')} size="s">Click on close</Label>
<Label type="copy" copyText="Copy" onCopy={() => alert('On click copy')}  size="s">Click on copy</Label>
`.trim();

export function LabelExampleViewIcon() {
    return (
        <Unstyled>
            <DocsExample>
                <Label size="s" icon={<Icon size={14} data={Gear} />}>
                    Default with Icon
                </Label>
                <Label theme="info" size="s" icon={<Icon size={14} data={Gear} />}>
                    Info with icon
                </Label>
                <Label type="close" size="s" icon={<Icon size={14} data={Gear} />}>
                    Close action and icon
                </Label>
                <Label size="m" icon={<Icon size={16} data={Gear} />}>
                    M-size icon
                </Label>
            </DocsExample>
        </Unstyled>
    );
}
LabelExampleViewIcon.code = `
<Label size="s" icon={<Icon size={14} data={GearIcon} />}>Default with icon</Label>
<Label theme="info" size="s" icon={<Icon size={14} data={GearIcon} />}>Info with icon</Label>
<Label type="close" size="s" icon={<Icon size={14} data={GearIcon} />}>Close action and icon</Label>
<Label size="m" icon={<Icon size={16} data={GearIcon} />}>M-size icon</Label>
`.trim();

export function LabelExampleValue() {
    return (
        <Unstyled>
            <DocsExample>
                <Label size="xs" value="Value">
                    Key
                </Label>
                <Label size="s" value="Value">
                    Key
                </Label>
                <Label size="m" value="Value">
                    Key
                </Label>
            </DocsExample>
        </Unstyled>
    );
}
LabelExampleValue.code = `
<Label size="xs" value="Value">Key</Label>
<Label size="s" value="Value">Key</Label>
<Label size="m" value="Value">Key</Label>
`.trim();

export function LabelExampleState() {
    return (
        <Unstyled>
            <DocsExample>
                <Label size="s">Default</Label>
                <Label size="s" disabled>
                    Disabled
                </Label>
                <Label size="s" interactive>
                    Interactive
                </Label>
            </DocsExample>
        </Unstyled>
    );
}
LabelExampleState.code = `
<Label size="s">Default</Label>
<Label size="s" disabled>Disabled</Label>
<Label size="s" interactive>Interactive</Label>
`.trim();

export function LabelExampleSize() {
    return (
        <Unstyled>
            <DocsExample>
                <Label size="xs">XS-size</Label>
                <Label size="s">S-size</Label>
                <Label size="m">M-size</Label>
            </DocsExample>
        </Unstyled>
    );
}
LabelExampleSize.code = `
<Label size="xs">XS-size</Label>
<Label size="s">S-size</Label>
<Label size="m">M-size</Label>
`.trim();
