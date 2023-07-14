import React from 'react';

import {Gear} from '@gravity-ui/icons';

import {Button} from '../../..';
import {DocsExample} from '../../../../../demo/DocsExample/DocsExample';
import {Icon} from '../../../../Icon';

export function ButtonExampleViewRegular() {
    return (
        <DocsExample gap="l" space="l">
            <Button view="normal" size="l">
                Normal
            </Button>
            <Button view="action" size="l">
                Action
            </Button>
            <Button view="raised" size="l">
                Raised
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewRegular.code = `
<Button view="normal" size="l">Normal</Button>
<Button view="action" size="l">Action</Button>
<Button view="raised" size="l">Raised</Button>
`.trim();

export function ButtonExampleViewOutlined() {
    return (
        <DocsExample>
            <Button view="outlined" size="l">
                Outlined
            </Button>
            <Button view="outlined-info" size="l">
                Outlined info
            </Button>
            <Button view="outlined-danger" size="l">
                Outlined danger
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewOutlined.code = `
<Button view="outlined" size="l">Outlined</Button>
<Button view="outlined-info" size="l">Outlined info</Button>
<Button view="outlined-danger" size="l">Outlined danger</Button>
`.trim();

export function ButtonExampleViewFlat() {
    return (
        <DocsExample>
            <Button view="flat" size="l">
                Flat
            </Button>
            <Button view="flat-info" size="l">
                Flat info
            </Button>
            <Button view="flat-danger" size="l">
                Flat danger
            </Button>
            <Button view="flat-secondary" size="l">
                Flat secondary
            </Button>
        </DocsExample>
    );
}
ButtonExampleViewFlat.code = `
<Button view="flat" size="l">Flat</Button>
<Button view="flat-info" size="l">Flat info</Button>
<Button view="flat-danger" size="l">Flat danger</Button>
<Button view="flat-secondary" size="l">Flat secondary</Button>
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
ButtonExampleState.code = `
<Button size="l">Default</Button>
<Button size="l" disabled>Disabled</Button>
<Button size="l" loading>Loading</Button>
<Button size="l" selected>Selected</Button>
`.trim();

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
ButtonExampleSize.code = `
<Button size="xs">XS-size</Button>
<Button size="s">S-size</Button>
<Button size="m">M-size</Button>
<Button size="l">L-size</Button>
<Button size="xl">XL-size</Button>
`.trim();

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
ButtonExampleWidth.code = `
<Button>none</Button>
<Button>none none none</Button>
<Button width="auto">auto</Button>
<Button width="auto">auto auto auto</Button>
<Button width="max">max</Button>
<Button width="max">max max max</Button>
`.trim();

export function ButtonExampleEachPin() {
    return (
        <DocsExample gap="l" space="l">
            <Button view="action" pin="brick-brick">
                brick-brick
            </Button>
            <Button view="action" pin="brick-round">
                brick-round
            </Button>
            <Button view="action" pin="brick-circle">
                brick-circle
            </Button>
            <Button view="outlined-info" pin="brick-clear">
                brick-clear
            </Button>
        </DocsExample>
    );
}
ButtonExampleEachPin.code = `
<Button view="action" pin="brick-brick">
    brick-brick  
</Button>
<Button view="action" pin="brick-round">
brick-round
</Button>
<Button view="action" pin="brick-circle">
brick-circle
</Button>
<Button view="outlined-info" pin="brick-clear">
brick-clear
</Button>
`.trim();

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
ButtonExampleCombinedPins.code = `
<div>
    <Button view="outlined-danger" pin="circle-clear">right</Button>
    <Button view="outlined-danger" pin="clear-circle">left</Button>
</div>
<div>
    <Button view="outlined-info" pin="round-clear">right</Button>
    <Button view="action" pin="brick-brick">center</Button>
    <Button view="outlined-info" pin="clear-round">left</Button>
</div>
<div>
    <Button view="outlined" pin="brick-clear">1</Button>
    <Button view="outlined" pin="clear-clear">2</Button>
    <Button view="outlined" pin="clear-clear">3</Button>
    <Button view="outlined" pin="clear-brick">4+</Button>
</div>
`.trim();
