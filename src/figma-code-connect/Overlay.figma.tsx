import figma from '@figma/code-connect';

import {Overlay} from '../components/Overlay/Overlay';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=68436%3A6845';

figma.connect(Overlay, figmaUrl, {
    props: {
        background: figma.enum('Background', {
            Base: 'base',
            Float: 'float',
        }),
        text: figma.boolean('Text', {
            true: figma.string('↳ Text'),
            false: undefined,
        }),
    },
    example: (props) => <Overlay background={props.background}>{props.text}</Overlay>,
});
