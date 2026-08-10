// url=https://www.figma.com/design/LlrQIz4F2Y06FJRdB4iE9U/Gravity-UI-Design-System--Community-?node-id=53348-563633
// source=https://github.com/gravity-ui/uikit/blob/main/src/components/Avatar/Avatar.tsx
// component=Avatar

import figma from 'figma';

import type {AvatarProps} from './types/main';

type AvatarImageProps = Extract<AvatarProps, {imgUrl: string}>;
type AvatarTextProps = Extract<AvatarProps, {text: string}>;
type AvatarType = 'icon' | 'image' | 'text';

const type = figma.selectedInstance.getEnum('Type', {
    Image: 'image',
    Icon: 'icon',
    Text: 'text',
} satisfies Record<string, AvatarType>);
const size = figma.selectedInstance.getEnum('Size', {
    '3XS': '3xs',
    '2XS': '2xs',
    XS: 'xs',
    S: 's',
    M: 'm',
    L: 'l',
    XL: 'xl',
} satisfies Record<string, NonNullable<AvatarProps['size']>>);
const view = figma.selectedInstance.getEnum('View', {
    Filled: 'filled',
    Outlined: 'outlined',
} satisfies Record<string, NonNullable<AvatarProps['view']>>);
const theme = figma.selectedInstance.getEnum('Theme', {
    Brand: 'brand',
    Normal: 'normal',
} satisfies Record<string, NonNullable<AvatarProps['theme']>>);
const text = figma.selectedInstance.getString('↳ Content text') satisfies AvatarTextProps['text'];
const imageUrl = '/path/to/avatar.png' satisfies AvatarImageProps['imgUrl'];

let template;
if (type === 'text') {
    template = {
        example: figma.code`<Avatar${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp('view', view)}${figma.helpers.react.renderProp('theme', theme)}${figma.helpers.react.renderProp('text', text)} />`,
        imports: ["import {Avatar} from '@gravity-ui/uikit';"],
        id: 'Avatar',
        metadata: {nestable: true},
    };
} else if (type === 'image') {
    template = {
        example: figma.code`<Avatar${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp('view', view)}${figma.helpers.react.renderProp('theme', theme)}${figma.helpers.react.renderProp('imgUrl', imageUrl)} />`,
        imports: ["import {Avatar} from '@gravity-ui/uikit';"],
        id: 'Avatar',
        metadata: {nestable: true},
    };
} else {
    template = {
        example: figma.code`/* Avatar Type=Icon is deferred until @gravity-ui/icons has Code Connect mappings. */`,
        imports: ["import {Avatar} from '@gravity-ui/uikit';"],
        id: 'Avatar',
        metadata: {nestable: true},
    };
}

export default template;
