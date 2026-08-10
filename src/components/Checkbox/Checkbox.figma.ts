// url=https://www.figma.com/design/LlrQIz4F2Y06FJRdB4iE9U/Gravity-UI-Design-System--Community-?node-id=53103-9376
// source=https://github.com/gravity-ui/uikit/blob/main/src/components/Checkbox/Checkbox.tsx
// component=Checkbox

import figma from 'figma';

import type {CheckboxProps} from './Checkbox';

type CheckboxStateMapping = Pick<CheckboxProps, 'disabled'> & {note: string | undefined};

const size = figma.selectedInstance.getEnum('Size', {
    M: 'm',
    L: 'l',
    XL: 'xl',
} satisfies Record<string, NonNullable<CheckboxProps['size']>>);
const checked = figma.selectedInstance.getEnum('Checked', {
    Off: false,
    On: true,
} satisfies Record<string, NonNullable<CheckboxProps['checked']>>);
const indeterminate = figma.selectedInstance.getEnum('Indeterminate', {
    On: true,
    Off: false,
} satisfies Record<string, NonNullable<CheckboxProps['indeterminate']>>);
const state = figma.selectedInstance.getEnum('State', {
    Default: {disabled: undefined, note: ''},
    Hover: {
        disabled: undefined,
        note: '/* Hover is represented by the Figma state and has no separate Checkbox prop. */',
    },
    Disabled: {disabled: true, note: ''},
} satisfies Record<string, CheckboxStateMapping>);
const hasContent = figma.selectedInstance.getBoolean('Content');
const contentText = figma.selectedInstance.getString('↳ Content text');
const content = hasContent ? contentText : undefined;

export default {
    example: figma.code`<Checkbox${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp('checked', checked)}${figma.helpers.react.renderProp('indeterminate', indeterminate)}${figma.helpers.react.renderProp('disabled', state?.disabled)}${figma.helpers.react.renderProp('content', content)} />
${state?.note}`,
    imports: ["import {Checkbox} from '@gravity-ui/uikit';"],
    id: 'Checkbox',
    metadata: {nestable: true},
};
