import React from 'react';

import {DocsExample} from '../../../../demo/DocsExample/DocsExample';
import {Button} from '../../../Button';
import {ArrowToggle, ArrowToggleProps} from '../../index';

export function ArrowToggleExampleViewDirection() {
    return (
        <DocsExample gap="l" space="l">
            <ArrowToggle direction="right" />
        </DocsExample>
    );
}
ArrowToggleExampleViewDirection.code = `
<ArrowToggle direction="right" />
`.trim();

export function ArrowToggleExampleViewSize() {
    return (
        <DocsExample gap="l" space="l">
            <ArrowToggle size={20} />
        </DocsExample>
    );
}
ArrowToggleExampleViewSize.code = `
<ArrowToggle size={20} />
`.trim();

export function ArrowToggleExampleViewInteractive() {
    const [directionIndex, setDirectionIndex] = React.useState(0);
    const directions = ['top', 'left', 'bottom', 'right'] as Array<ArrowToggleProps['direction']>;
    const direction = directions[directionIndex % directions.length];

    return (
        <DocsExample gap="l" space="l">
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
