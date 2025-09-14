import figma from '@figma/code-connect';

import {NumberInput} from '../components/NumberInput/NumberInput';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=83246%3A43465';

figma.connect(NumberInput, figmaUrl, {
    props: {
        nestedLayout: figma.nestedProps('.Size & Layout', {
            size: figma.enum('Size', {
                S: 's',
                M: 'm',
                L: 'l',
                XL: 'xl',
            }),
        }),
        nestedState: figma.nestedProps('.State & Extra', {
            disabled: figma.enum('State', {
                Disabled: true,
            }),
        }),
    },
    example: (props) => (
        <NumberInput size={props.nestedLayout.size} disabled={props.nestedState.disabled} />
    ),
});
