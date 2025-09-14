import figma from '@figma/code-connect';

import {Label} from '../components/Label/Label';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=77305%3A21930';

figma.connect(Label, figmaUrl, {
    props: {
        theme: figma.enum('Theme', {
            Success: 'success',
            Normal: 'normal',
            Info: 'info',
            Danger: 'danger',
            Warning: 'warning',
            Utility: 'utility',
            Unknown: 'unknown',
            Clear: 'clear',
        }),
        size: figma.enum('Size', {
            XS: 'xs',
            S: 's',
            M: 'm',
        }),
        value: figma.boolean('Value', {
            true: figma.string('↳ Value text'),
            false: undefined,
        }),
        keyText: figma.string('Key text'),
    },
    example: (props) => (
        <Label theme={props.theme} size={props.size} value={props.value}>
            {props.keyText}
        </Label>
    ),
});
