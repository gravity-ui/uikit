/// <reference types="@figma/code-connect/figma-types" />
// url=https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=48571-15566
// source=https://github.com/gravity-ui/uikit/blob/main/src/components/Checkbox/Checkbox.tsx
// component=Checkbox
import figma from 'figma';

import type {CheckboxProps} from './Checkbox';

export type Props = CheckboxProps;

const instance = figma.selectedInstance;
const size = instance.getEnum('Size', {
    M: 'm',
    L: 'l',
    XL: 'xl',
} as const);
const state = instance.getEnum('State', {
    Default: 'default',
    Hover: 'hover',
    Disabled: 'disabled',
} as const);
const checked = instance.getEnum('Checked', {
    Off: false,
    On: true,
} as const);
const indeterminate = instance.getEnum('Indeterminate', {
    On: true,
    Off: false,
} as const);
const contentVisible = instance.getBoolean('Content');
const contentText = instance.getString('↳ Content text') || 'Checkbox';
const content = contentVisible ? contentText : undefined;
const disabled = state === 'disabled';

const sizeProp = figma.helpers.react.renderProp('size', size);
const checkedProp = figma.helpers.react.renderProp('checked', checked);
const indeterminateProp = figma.helpers.react.renderProp('indeterminate', indeterminate);
const disabledProp = figma.helpers.react.renderProp('disabled', disabled);
const contentProp = figma.helpers.react.renderProp('content', content);

export default {
    id: 'checkbox',
    imports: ["import {Checkbox} from '@gravity-ui/uikit';"],
    example: figma.code`
<Checkbox${sizeProp}${checkedProp}${indeterminateProp}${disabledProp}${contentProp} />`,
    metadata: {nestable: true},
};
