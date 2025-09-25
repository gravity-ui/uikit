import figma from '@figma/code-connect';

import {PasswordInput} from '../components/controls/PasswordInput/PasswordInput';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=83246%3A43505';

figma.connect(PasswordInput, figmaUrl, {
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
        revealValue: figma.boolean('Show password'),
    },
    example: (props) => (
        <PasswordInput
            revealValue={props.revealValue}
            value={props.nestedContent.value}
            size={props.nestedLayout.size}
            disabled={props.nestedState.disabled}
        />
    ),
});
