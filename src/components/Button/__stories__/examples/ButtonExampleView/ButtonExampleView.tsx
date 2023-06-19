import React from 'react';

import {
    ArrowShapeRight,
    ArrowsRotateRight,
    CirclePlay,
    Copy,
    Paperclip,
    Pencil,
    Plus,
    Xmark,
} from '@gravity-ui/icons';

import {Button} from '../../..';
import {DocsExample} from '../../../../../demo/DocsExample/DocsExample';
import {Icon} from '../../../../Icon';

export function ButtonExampleViewAction() {
    return (
        <DocsExample>
            <Button view="action" size="l">
                Create
            </Button>
            <Button view="action" size="l">
                Connect
                <Icon data={ArrowShapeRight} size={18} />
            </Button>
            <Button view="action" size="l">
                <Icon data={Pencil} size={18} />
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewAction.code = `
<Button view="action" size="l">Create</Button>
<Button view="action" size="l">
    Connect
    <Icon data={ArrowShapeRight} size={18} />
</Button>
<Button view="action" size="l">
    <Icon data={Pencil} size={18} />
</Button>
`.trim();

export function ButtonExampleViewNormal() {
    return (
        <DocsExample>
            <Button view="normal" size="l">
                Add
            </Button>
            <Button view="normal" size="l">
                Start
                <Icon data={CirclePlay} size={18} />
            </Button>
            <Button view="normal" size="l">
                <Icon data={ArrowsRotateRight} size={18} />
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewNormal.code = `
<Button view="normal" size="l">Add</Button>
<Button view="normal" size="l">
    Start
    <Icon data={CirclePlay} size={18} />
</Button>
<Button view="normal" size="l">
    <Icon data={ArrowsRotateRight} size={18} />
</Button>
`.trim();

export function ButtonExampleViewOutlined() {
    return (
        <DocsExample>
            <Button view="outlined" size="l">
                Cancel
            </Button>
            <Button view="outlined" size="l">
                Attach
                <Icon data={Paperclip} size={18} />
            </Button>
            <Button view="outlined" size="l">
                <Icon data={Copy} size={18} />
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewOutlined.code = `
<Button view="outlined" size="l">Cancel</Button>
<Button view="outlined" size="l">
    Attach
    <Icon data={Paperclip} size={18} />
</Button>
<Button view="outlined" size="l">
    <Icon data={Copy} size={18} />
</Button>
`.trim();

export function ButtonExampleViewFlat() {
    return (
        <DocsExample>
            <Button view="flat" size="l">
                Expand
            </Button>
            <Button view="flat" size="l">
                <Icon data={Xmark} size={18} />
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewFlat.code = `
<Button view="flat" size="l">Expand</Button>
<Button view="flat" size="l">
    <Icon data={Xmark} size={18} />
</Button>
`.trim();

export function ButtonExampleViewRaised() {
    return (
        <DocsExample>
            <Button view="raised" size="l">
                Create
            </Button>
            <Button view="raised" size="l">
                <Icon data={Plus} size={18} />
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewRaised.code = `
<Button view="raised" size="l">Create</Button>
<Button view="raised" size="l">
    <Icon data={Plus} size={18} />
</Button>
`.trim();

export function ButtonExampleViewOutlinedInfo() {
    return (
        <DocsExample>
            <Button view="outlined-info" size="l">
                Go
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewOutlinedInfo.code = `
<Button view="outlined-info" size="l">Go</Button>
`.trim();

export function ButtonExampleViewFlatInfo() {
    return (
        <DocsExample>
            <Button view="flat-info" size="l">
                Go
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewFlatInfo.code = `
<Button view="flat-info" size="l">Go</Button>
`.trim();

export function ButtonExampleViewOutlinedDanger() {
    return (
        <DocsExample>
            <Button view="outlined-danger" size="l">
                Stop
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewOutlinedDanger.code = `
<Button view="outlined-danger" size="l">Stop</Button>
`.trim();

export function ButtonExampleViewFlatDanger() {
    return (
        <DocsExample>
            <Button view="flat-danger" size="l">
                Delete
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewFlatDanger.code = `
<Button view="flat-danger" size="l">Delete</Button>
`.trim();

export function ButtonExampleViewFlatSecondary() {
    return (
        <DocsExample>
            <Button view="flat-secondary" size="l">
                Cancel
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewFlatSecondary.code = `
<Button view="flat-secondary" size="l">Cancel</Button>
`.trim();

export function ButtonExampleViewSpecial() {
    return (
        <DocsExample background="var(--yc-color-infographics-info-heavy)">
            <Button view="normal-contrast" size="l">
                Normal
            </Button>
            <Button view="outlined-contrast" size="l">
                Outlined
            </Button>
            <Button view="flat-contrast" size="l">
                Flat
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewSpecial.code = `
<Button view="normal-contrast" size="l">Normal</Button>
<Button view="outlined-contrast" size="l">Outlined</Button>
<Button view="flat-contrast" size="l">Flat</Button>
`.trim();

export function ButtonExampleState() {
    return (
        <DocsExample gap="l" space="l">
            <Button size="l">Default</Button>
            <Button size="l" disabled>
                Disabled
            </Button>
            <Button size="l" loading>
                Loading
            </Button>
            <Button size="l" selected>
                Selected
            </Button>
        </DocsExample>
    );
}

export function ButtonExampleSize() {
    return (
        <DocsExample gap="l" space="l">
            <Button size="xs">XS-size</Button>
            <Button size="s">S-size</Button>
            <Button size="m">M-size</Button>
            <Button size="l">L-size</Button>
            <Button size="xl">XL-size</Button>
        </DocsExample>
    );
}
