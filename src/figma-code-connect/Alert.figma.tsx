import figma from '@figma/code-connect';

import {Alert} from '../components/Alert/Alert';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=42150%3A523906';

figma.connect(Alert, figmaUrl, {
    props: {
        theme: figma.enum('Theme', {
            Normal: 'normal',
            Info: 'info',
            Success: 'success',
            Warning: 'warning',
            Danger: 'danger',
            Utility: 'utility',
        }),
        corners: figma.enum('Corners', {
            Rounded: 'rounded',
            Squared: 'square',
        }),
        view: figma.enum('View', {
            Filled: 'filled',
            Outlined: 'outlined',
        }),
        nested: figma.nestedProps('Content', {
            text: figma.string('Content text'),
            title: figma.boolean('Title', {
                true: figma.nestedProps('Content', {
                    titleText: figma.string('↳ Title text'),
                }),
                false: {titleText: undefined},
            }),
        }),
    },
    example: (props) => (
        <Alert
            title={props.nested.title.titleText}
            theme={props.theme}
            corners={props.corners}
            view={props.view}
            message={props.nested.text}
        />
    ),
});
