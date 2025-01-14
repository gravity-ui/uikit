import * as React from 'react';

import {DocsExample} from '../../../../demo/DocsExample/DocsExample';
import {Button} from '../../../Button';
import {ArrowToggle} from '../../index';
import type {ArrowToggleProps} from '../../index';

export function ArrowToggleExampleViewDirection() {
    return (
        <DocsExample gap="m" space="l">
            <ArrowToggle direction="top" /> top
            <ArrowToggle direction="right" /> right
            <ArrowToggle direction="bottom" /> bottom
            <ArrowToggle direction="left" /> left
        </DocsExample>
    );
}
ArrowToggleExampleViewDirection.code = `
<ArrowToggle direction="top" /> top
<ArrowToggle direction="right" /> right
<ArrowToggle direction="bottom" /> bottom
<ArrowToggle direction="left" /> left
`.trim();

export function ArrowToggleExampleViewSize() {
    return (
        <DocsExample gap="m" space="l">
            <ArrowToggle size={10} /> 10
            <ArrowToggle size={20} /> 20
            <ArrowToggle size={30} /> 30
            <ArrowToggle size={40} /> 40
            <ArrowToggle size={50} /> 50
            <ArrowToggle size={100} /> 100
        </DocsExample>
    );
}
ArrowToggleExampleViewSize.code = `
<ArrowToggle size={10} /> 10
<ArrowToggle size={20} /> 20
<ArrowToggle size={30} /> 30
<ArrowToggle size={40} /> 40
<ArrowToggle size={50} /> 50
<ArrowToggle size={100} /> 100
`.trim();

export function ArrowToggleExampleViewInteractive() {
    const [directionIndex, setDirectionIndex] = React.useState(0);
    const directions = ['top', 'left', 'bottom', 'right'] as Array<ArrowToggleProps['direction']>;
    const direction = directions[directionIndex % directions.length];

    return (
        <DocsExample gap="m" space="l">
            <Button onClick={() => setDirectionIndex(directionIndex + 1)} view="flat">
                <ArrowToggle direction={direction} /> <span>{direction}</span>
            </Button>
        </DocsExample>
    );
}
ArrowToggleExampleViewInteractive.code = `
const [directionIndex, setDirectionIndex] = React.useState(0);
const directions = ['top', 'left', 'bottom', 'right'] as Array<ArrowToggleProps['direction']>;
const direction = directions[directionIndex % directions.length];

return (
    <Button onClick={() => setDirectionIndex(directionIndex + 1)} view="flat">
        <ArrowToggle direction={direction} /> <span>{direction}</span>
    </Button>
);
`.trim();
