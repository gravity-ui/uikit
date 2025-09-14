import figma from '@figma/code-connect';

import {Switch} from '../components/Switch/Switch';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=17215%3A9968';

figma.connect(Switch, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            M: 'm',
            L: 'l',
        }),
        disabled: figma.boolean('Disabled'),
        checked: figma.boolean('Selected'),
        content: figma.boolean('Content', {
            true: figma.string('Content text'),
            false: undefined,
        }),
    },
    example: (props) => (
        <Switch
            size={props.size}
            disabled={props.disabled}
            checked={props.checked}
            content={props.content}
        />
    ),
});
