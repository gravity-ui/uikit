import figma from '@figma/code-connect';

import {Avatar} from '../components/Avatar/Avatar';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=41226%3A428847';

figma.connect(Avatar, figmaUrl, {
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
        theme: figma.enum('Theme', {
            Normal: 'normal',
            Brand: 'brand',
        }),
        view: figma.enum('View', {
            Filled: 'filled',
            Outlined: 'outlined',
        }),
        contentText: figma.string('↳ Content text'),
        type: figma.enum('Type', {
            Image: 'image',
            Icon: 'icon',
            Text: 'text',
        }),
    },
    example: (props) => (
        <Avatar size={props.size} theme={props.theme} view={props.view} text={props.contentText} />
    ),
});
