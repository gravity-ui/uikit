import figma from '@figma/code-connect/react';
import {FaceRobot} from '@gravity-ui/icons';

import {Avatar} from './Avatar';
import type {AvatarProps} from './types/main';

const figmaNode =
    'https://www.figma.com/design/LlrQIz4F2Y06FJRdB4iE9U/Gravity-UI-Design-System--Community-?node-id=53348-563633';

type CommonProps = Pick<AvatarProps, 'size' | 'view' | 'theme'>;
type TextProps = CommonProps & Pick<Extract<AvatarProps, {text: string}>, 'text'>;

figma.connect<TextProps>(Avatar, figmaNode, {
    variant: {Type: 'Text'},
    imports: ["import {Avatar} from '@gravity-ui/uikit';"],
    props: {
        size: figma.enum('Size', {
            '3XS': '3xs',
            '2XS': '2xs',
            XS: 'xs',
            S: 's',
            M: 'm',
            L: 'l',
            XL: 'xl',
        }),
        view: figma.enum('View', {
            Filled: 'filled',
            Outlined: 'outlined',
        }),
        theme: figma.enum('Theme', {
            Brand: 'brand',
            Normal: 'normal',
        }),
        text: figma.string('↳ Content text'),
    },
    example: ({size, view, theme, text}) => (
        <Avatar size={size} view={view} theme={theme} text={text} />
    ),
});

figma.connect<CommonProps>(Avatar, figmaNode, {
    variant: {Type: 'Icon'},
    imports: [
        "import {Avatar} from '@gravity-ui/uikit';",
        "import {FaceRobot} from '@gravity-ui/icons';",
    ],
    props: {
        size: figma.enum('Size', {
            '3XS': '3xs',
            '2XS': '2xs',
            XS: 'xs',
            S: 's',
            M: 'm',
            L: 'l',
            XL: 'xl',
        }),
        view: figma.enum('View', {
            Filled: 'filled',
            Outlined: 'outlined',
        }),
        theme: figma.enum('Theme', {
            Brand: 'brand',
            Normal: 'normal',
        }),
    },
    example: ({size, view, theme}) => (
        <Avatar size={size} view={view} theme={theme} icon={FaceRobot} />
    ),
});

figma.connect<CommonProps>(Avatar, figmaNode, {
    variant: {Type: 'Image'},
    imports: ["import {Avatar} from '@gravity-ui/uikit';"],
    props: {
        size: figma.enum('Size', {
            '3XS': '3xs',
            '2XS': '2xs',
            XS: 'xs',
            S: 's',
            M: 'm',
            L: 'l',
            XL: 'xl',
        }),
        view: figma.enum('View', {
            Filled: 'filled',
            Outlined: 'outlined',
        }),
        theme: figma.enum('Theme', {
            Brand: 'brand',
            Normal: 'normal',
        }),
    },
    example: ({size, view, theme}) => (
        <Avatar
            size={size}
            view={view}
            theme={theme}
            imgUrl="https://loremflickr.com/640/480/cats?lock=8610182282084352"
        />
    ),
});
