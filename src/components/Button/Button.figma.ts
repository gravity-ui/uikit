// url=https://www.figma.com/design/LlrQIz4F2Y06FJRdB4iE9U/Gravity-UI-Design-System--Community-?node-id=53098-497062
// source=https://github.com/gravity-ui/uikit/blob/main/src/components/Button/Button.tsx
// component=Button

import figma from 'figma';

import type {ButtonProps} from './Button';

type ButtonStateMapping = Pick<ButtonProps, 'disabled' | 'loading' | 'selected'> & {
    note: string | undefined;
};

const view = figma.selectedInstance.getEnum('View', {
    Normal: 'normal',
    Action: 'action',
    Outline: 'outlined',
    'Outline-info': 'outlined-info',
    'Outlined-success': 'outlined-success',
    'Outlined-warning': 'outlined-warning',
    'Outline-danger': 'outlined-danger',
    'Outline-utility': 'outlined-utility',
    'Outlined-action': 'outlined-action',
    Flat: 'flat',
    'Flat-info': 'flat-info',
    'Flat-success': 'flat-success',
    'Flat-warning': 'flat-warning',
    'Flat-danger': 'flat-danger',
    'Flat-utility': 'flat-utility',
    'Flat-action': 'flat-action',
    'Flat-secondary': 'flat-secondary',
    Raised: 'raised',
    'Normal-contrast': 'normal-contrast',
    'Outline-contrast': 'outlined-contrast',
    'Flat-contrast': 'flat-contrast',
} satisfies Record<string, NonNullable<ButtonProps['view']>>);
const size = figma.selectedInstance.getEnum('Size', {
    XS: 'xs',
    S: 's',
    M: 'm',
    L: 'l',
    XL: 'xl',
} satisfies Record<string, NonNullable<ButtonProps['size']>>);
const state = figma.selectedInstance.getEnum('State', {
    Default: {disabled: undefined, loading: undefined, selected: undefined, note: ''},
    Hover: {
        disabled: undefined,
        loading: undefined,
        selected: undefined,
        note: '/* Hover is represented by the Figma state and has no separate Button prop. */',
    },
    Disabled: {disabled: true, loading: undefined, selected: undefined, note: ''},
    Loading: {disabled: undefined, loading: true, selected: undefined, note: ''},
    Selected: {disabled: undefined, loading: undefined, selected: true, note: ''},
} satisfies Record<string, ButtonStateMapping>);
const content = figma.selectedInstance.getString('Content');
const startIcon = figma.selectedInstance.getBoolean('Start icon');
const endIcon = figma.selectedInstance.getBoolean('End icon');
const iconOnly = figma.selectedInstance.getEnum('Icon only', {
    Off: false,
    On: true,
} satisfies Record<string, boolean>);

const iconNote =
    startIcon || endIcon || iconOnly
        ? '/* Icon rendering is deferred until @gravity-ui/icons has Code Connect mappings. */'
        : '';

export default {
    example: figma.code`<Button${figma.helpers.react.renderProp('view', view)}${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp('disabled', state?.disabled)}${figma.helpers.react.renderProp('loading', state?.loading)}${figma.helpers.react.renderProp('selected', state?.selected)}>${content}</Button>
${state?.note}${iconNote}`,
    imports: ["import {Button} from '@gravity-ui/uikit';"],
    id: 'Button',
    metadata: {nestable: true},
};
