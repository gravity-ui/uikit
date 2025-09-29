import figma from '@figma/code-connect';

import {TextArea} from '../components/controls/TextArea/TextArea';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=83246%3A43345';

figma.connect(TextArea, figmaUrl, {
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
        <TextArea
            size={props.nestedLayout.size}
            value={props.nestedContent.value}
            disabled={props.nestedState.disabled}
        />
    ),
});
