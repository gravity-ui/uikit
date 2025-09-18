import figma from '@figma/code-connect';

import {Radio} from '../components/Radio/Radio';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=17215%3A9861';

figma.connect(Radio, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            M: 'm',
            L: 'l',
        }),
        checked: figma.boolean('Checked'),
        disabled: figma.enum('State', {
            Disabled: true,
        }),
        content: figma.boolean('Content', {
            true: figma.string('↳ Content text'),
            false: undefined,
        }),
    },
    example: (props) => (
        <Radio
            size={props.size}
            checked={props.checked}
            disabled={props.disabled}
            content={props.content}
            value={'value'}
        />
    ),
});
