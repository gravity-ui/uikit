import figma from '@figma/code-connect';

import {Checkbox} from '../components/Checkbox/Checkbox';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=48571%3A15566';

figma.connect(Checkbox, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            M: 'm',
            L: 'l',
        }),
        indeterminate: figma.boolean('Indeterminate'),
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
        <Checkbox
            size={props.size}
            indeterminate={props.indeterminate}
            checked={props.checked}
            disabled={props.disabled}
            content={props.content}
        />
    ),
});
