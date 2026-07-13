/// <reference types="@figma/code-connect/figma-types" />
// url=https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=41226-428847
// source=https://github.com/gravity-ui/uikit/blob/main/src/components/Avatar/Avatar.tsx
// component=Avatar
import figma from 'figma';

import type {AvatarProps} from './types/main';

export type Props = AvatarProps;

const instance = figma.selectedInstance;
const avatarType = instance.getEnum('Type', {
    Image: 'image',
    Icon: 'icon',
    Text: 'text',
} as const);
const size = instance.getEnum('Size', {
    '3XS': '3xs',
    '2XS': '2xs',
    XS: 'xs',
    S: 's',
    M: 'm',
    L: 'l',
    XL: 'xl',
} as const);
const view = instance.getEnum('View', {
    Filled: 'filled',
    Outlined: 'outlined',
} as const);
const theme = instance.getEnum('Theme', {
    Brand: 'brand',
    Normal: 'normal',
} as const);

const text = avatarType === 'text' ? instance.getString('↳ Content text') || 'AB' : undefined;
const icon = avatarType === 'icon' ? figma.helpers.react.identifier('FaceRobot') : undefined;
// Template files cannot read image fills, so image variants use UIKit's documented example URL.
const imgUrl =
    avatarType === 'image'
        ? 'https://loremflickr.com/640/480/cats?lock=8610182282084352'
        : undefined;

const sizeProp = figma.helpers.react.renderProp('size', size);
const viewProp = figma.helpers.react.renderProp('view', view);
const themeProp = figma.helpers.react.renderProp('theme', theme);
const textProp = figma.helpers.react.renderProp('text', text);
const iconProp = figma.helpers.react.renderProp('icon', icon);
const imgUrlProp = figma.helpers.react.renderProp('imgUrl', imgUrl);

let example;
if (avatarType === 'text') {
    example = figma.code`
<Avatar${sizeProp}${viewProp}${themeProp}${textProp} />`;
} else if (avatarType === 'icon') {
    example = figma.code`
<Avatar${sizeProp}${viewProp}${themeProp}${iconProp} />`;
} else {
    example = figma.code`
<Avatar${sizeProp}${viewProp}${themeProp}${imgUrlProp} />`;
}

export default {
    id: 'avatar',
    imports: [
        "import {Avatar} from '@gravity-ui/uikit';",
        "import {FaceRobot} from '@gravity-ui/icons';",
    ],
    example,
    metadata: {nestable: true},
};
