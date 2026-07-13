/// <reference types="@figma/code-connect/figma-types" />
// url=https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=41899-462118
// source=https://github.com/gravity-ui/uikit/blob/main/src/components/Button/Button.tsx
// component=Button
import figma from 'figma';

import type {ButtonProps} from './Button';

export type Props = ButtonProps;

const instance = figma.selectedInstance;
const view = instance.getEnum('View', {
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
} as const);
const size = instance.getEnum('Size', {
    XS: 'xs',
    S: 's',
    M: 'm',
    L: 'l',
    XL: 'xl',
} as const);
const state = instance.getEnum('State', {
    Default: 'default',
    Hover: 'hover',
    Disabled: 'disabled',
    Loading: 'loading',
    Selected: 'selected',
    'Selected hover': 'selected-hover',
} as const);
const iconOnly = instance.getEnum('Icon only', {
    Off: false,
    On: true,
} as const);
const content = iconOnly ? undefined : instance.getString('Content');
const startIconVisible = instance.getBoolean('Start icon');
const endIconVisible = instance.getBoolean('End icon');
const startIcon = startIconVisible ? instance.getInstanceSwap('↳ Start icon') : undefined;
const endIcon = endIconVisible ? instance.getInstanceSwap('↳ End icon') : undefined;
const renderedStartIcon =
    startIcon?.type === 'INSTANCE' && startIcon.hasCodeConnect()
        ? startIcon.executeTemplate().example
        : undefined;
const renderedEndIcon =
    endIcon?.type === 'INSTANCE' && endIcon.hasCodeConnect()
        ? endIcon.executeTemplate().example
        : undefined;
const renderedContent = figma.helpers.react.renderChildren(content);

const viewProp = figma.helpers.react.renderProp('view', view);
const sizeProp = figma.helpers.react.renderProp('size', size);
const disabledProp = figma.helpers.react.renderProp('disabled', state === 'disabled');
const loadingProp = figma.helpers.react.renderProp('loading', state === 'loading');
const selectedProp = figma.helpers.react.renderProp(
    'selected',
    state === 'selected' || state === 'selected-hover',
);

export default {
    id: 'button',
    imports: ["import {Button} from '@gravity-ui/uikit';"],
    example: figma.code`
<Button${viewProp}${sizeProp}${disabledProp}${loadingProp}${selectedProp}>
    ${renderedStartIcon}${renderedContent}${renderedEndIcon}
</Button>`,
    metadata: {nestable: true},
};
