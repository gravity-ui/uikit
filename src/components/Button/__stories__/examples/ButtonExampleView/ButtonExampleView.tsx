import React from 'react';

import {Button} from '../../..';
import {Icon} from '../../../../Icon';
import {GearIcon} from '../../../../icons';
import {DocsExample} from '../../../../../demo/DocsExample/DocsExample';

export function ButtonExampleViewAction() {
    return (
        <DocsExample gap="m">
            <Button view="action" size="l">
                Create
            </Button>
            <Button view="action" size="l">
                Connect
                {/* TODO ConnectIcon */}
                <Icon data={GearIcon} size={18} />
            </Button>
            <Button view="action" size="l">
                {/* TODO EditIcon */}
                <Icon data={GearIcon} size={18} />
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewAction.code = `
<Button view="action" size="l">Create</Button>
<Button view="action" size="l">
    Connect
    <Icon data={GearIcon} size={18} />
</Button>
<Button view="action" size="l">
    <Icon data={GearIcon} size={18} />
</Button>
`.trim();

export function ButtonExampleViewNormal() {
    return (
        <DocsExample gap="m">
            <Button view="normal" size="l">
                Add
            </Button>
            <Button view="normal" size="l">
                Start
                {/* TODO RunIcon */}
                <Icon data={GearIcon} size={18} />
            </Button>
            <Button view="normal" size="l">
                {/* TODO RefreshIcon */}
                <Icon data={GearIcon} size={18} />
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewNormal.code = `
<Button view="normal" size="l">Add</Button>
<Button view="normal" size="l">
    Start
    <Icon data={GearIcon} size={18} />
</Button>
<Button view="normal" size="l">
    <Icon data={GearIcon} size={18} />
</Button>
`.trim();

export function ButtonExampleViewOutlined() {
    return (
        <DocsExample gap="m">
            <Button view="outlined" size="l">
                Cancel
            </Button>
            <Button view="outlined" size="l">
                Attach
                {/* TODO AttachIcon */}
                <Icon data={GearIcon} size={18} />
            </Button>
            <Button view="outlined" size="l">
                {/* TODO CopyIcon */}
                <Icon data={GearIcon} size={18} />
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewOutlined.code = `
<Button view="outlined" size="l">Cancel</Button>
<Button view="outlined" size="l">
    Attach
    <Icon data={GearIcon} size={18} />
</Button>
<Button view="outlined" size="l">
    <Icon data={GearIcon} size={18} />
</Button>
`.trim();

export function ButtonExampleViewFlat() {
    return (
        <DocsExample gap="m">
            <Button view="flat" size="l">
                Expand
            </Button>
            <Button view="flat" size="l">
                {/* TODO CloseIcon */}
                <Icon data={GearIcon} size={18} />
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewFlat.code = `
<Button view="flat" size="l">Expand</Button>
<Button view="flat" size="l">
    <Icon data={GearIcon} size={18} />
</Button>
`.trim();

export function ButtonExampleViewRaised() {
    return (
        <DocsExample gap="m">
            <Button view="raised" size="l">
                Create
            </Button>
            <Button view="raised" size="l">
                {/* TODO PlusIcon */}
                <Icon data={GearIcon} size={18} />
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewRaised.code = `
<Button view="raised" size="l">Create</Button>
<Button view="raised" size="l">
    <Icon data={GearIcon} size={18} />
</Button>
`.trim();

export function ButtonExampleViewOutlinedInfo() {
    return (
        <DocsExample gap="m">
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
        <DocsExample gap="m">
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
        <DocsExample gap="m">
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
        <DocsExample gap="m">
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
        <DocsExample gap="m">
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
        <DocsExample gap="m" space="m" background="rgba(82, 130, 255, 1)" rounded>
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
        <DocsExample gap="l" space="l" background="rgba(246, 247, 249, 1)" rounded>
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
        <DocsExample gap="l" space="l" background="rgba(246, 247, 249, 1)" rounded>
            <Button size="s">S-size</Button>
            <Button size="m">M-size</Button>
            <Button size="l">L-size</Button>
            <Button size="xl">XL-size</Button>
        </DocsExample>
    );
}
