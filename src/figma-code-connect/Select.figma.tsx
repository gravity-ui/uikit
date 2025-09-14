import figma from '@figma/code-connect';

import {Select} from '../components/Select/Select';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=83246%3A43308';

figma.connect(Select, figmaUrl, {
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
        <Select
            label={props.nestedContent.value}
            size={props.nestedLayout.size}
            disabled={props.nestedState.disabled}
        />
    ),
});
