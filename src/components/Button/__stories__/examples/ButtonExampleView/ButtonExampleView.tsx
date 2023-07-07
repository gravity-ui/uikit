import React from 'react';

import {Button} from '../../..';
import {DocsExample} from '../../../../../demo/DocsExample/DocsExample';
import {Icon} from '../../../../Icon';
import {GearIcon} from '../../../../icons';

export function ButtonExampleViewAction() {
    return (
        <DocsExample>
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
        <DocsExample>
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
        <DocsExample>
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
        <DocsExample>
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
        <DocsExample>
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

export function ButtonExampleIcons() {
    return (
        <DocsExample gap="l" space="l">
            <Button view="outlined" size="l">
                <Icon data={Gear} size={18} />
                Left
            </Button>
            <Button view="outlined" size="l">
                Right
                <Icon data={Gear} size={18} />
            </Button>
            <Button view="outlined" size="l">
                <Icon data={Gear} size={18} />
                Both
                <Icon data={Gear} size={18} />
            </Button>
            <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                No text:
                <Button view="outlined" size="l">
                    <Icon data={Gear} size={18} />
                </Button>
            </div>
        </DocsExample>
    );
}
ButtonExampleIcons.code = `
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
    Left
</Button>
<Button view="outlined" size="l">
    Right
    <Icon data={Gear} size={18} />
</Button>
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
    Both
    <Icon data={Gear} size={18} />
</Button>
<Button view="outlined" size="l">
    <Icon data={Gear} size={18} />
</Button>
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

export function ButtonExampleWidth() {
    return (
        <DocsExample gap="l" space="l">
            <div style={{width: 100, border: '2px dashed gray'}}>
                <p>
                    <Button>none</Button>
                </p>
                <p>
                    <Button>none none none</Button>
                </p>
                <p>
                    <Button width="auto">auto</Button>
                </p>
                <p>
                    <Button width="auto">auto auto auto</Button>
                </p>
                <p>
                    <Button width="max">max</Button>
                </p>
                <p>
                    <Button width="max">max max max</Button>
                </p>
            </div>
        </DocsExample>
    );
}

export function ButtonExampleEachPin() {
    return (
        <DocsExample gap="l" space="l">
            <Button view="action" pin="brick-brick">
                brick
            </Button>
            <Button view="action" pin="brick-round">
                round
            </Button>
            <Button view="action" pin="brick-circle">
                circle
            </Button>
            <Button view="outlined-info" pin="brick-clear">
                clear
            </Button>
        </DocsExample>
    );
}

export function ButtonExampleCombinedPins() {
    return (
        <DocsExample gap="l" space="l">
            <div>
                <Button view="outlined-danger" pin="circle-clear">
                    right
                </Button>
                <Button view="outlined-danger" pin="clear-circle">
                    left
                </Button>
            </div>
            <div>
                <Button view="outlined-info" pin="round-clear">
                    right
                </Button>
                <Button view="action" pin="brick-brick">
                    center
                </Button>
                <Button view="outlined-info" pin="clear-round">
                    left
                </Button>
            </div>
            <div>
                <Button view="outlined" pin="brick-clear">
                    1
                </Button>
                <Button view="outlined" pin="clear-clear">
                    2
                </Button>
                <Button view="outlined" pin="clear-clear">
                    3
                </Button>
                <Button view="outlined" pin="clear-brick">
                    4+
                </Button>
            </div>
        </DocsExample>
    );
}
