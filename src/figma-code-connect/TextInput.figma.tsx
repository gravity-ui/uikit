import figma from '@figma/code-connect';

import {TextInput} from '../components/controls/TextInput/TextInput';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=83246-43264&t=c89FOAFmNJ7g0jit-4';

figma.connect(TextInput, figmaUrl, {
    props: {
        nestedLayout: figma.nestedProps('.Size & Layout', {
            size: figma.enum('Size', {
                S: 's',
                M: 'm',
                L: 'l',
                XL: 'xl',
            }),
        }),
        nestedContent: figma.nestedProps('Content', {
            value: figma.string('↳ Content Text'),
        }),
        nestedState: figma.nestedProps('.State & Extra', {
            disabled: figma.enum('State', {
                Disabled: true,
            }),
        }),
    },
    example: (props) => (
        <TextInput
            value={props.nestedContent.value}
            size={props.nestedLayout.size}
            disabled={props.nestedState.disabled}
        />
    ),
});

const figmaUrlLegacy =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=25738%3A55959';

figma.connect(TextInput, figmaUrlLegacy, {
    props: {
        content: figma.boolean('Content', {
            true: figma.string('↳ Content text'),
            false: undefined,
        }),
        label: figma.boolean('Label', {
            true: figma.string('↳ Label text'),
            false: undefined,
        }),
        size: figma.enum('Size', {
            S: 's',
            M: 'm',
            L: 'l',
            XL: 'xl',
        }),
        disabled: figma.enum('State', {
            Disabled: true,
        }),
        view: figma.enum('View', {
            Normal: 'normal',
            Clear: 'clear',
        }),
    },
    example: (props) => (
        <TextInput
            value={props.content}
            size={props.size}
            disabled={props.disabled}
            view={props.view}
            label={props.label}
        />
    ),
});
