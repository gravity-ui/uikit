import figma from '@figma/code-connect';

import {Tab} from '../components/tabs/Tab';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=39919%3A435589';

figma.connect(Tab, figmaUrl, {
    props: {
        icon: figma.instance('↳ Icon'),
        disabled: figma.enum('State', {
            Disabled: true,
        }),
        text: figma.string('↳ Text'),
    },
    example: (props) => (
        <Tab value={props.text} disabled={props.disabled}>
            {props.text}
        </Tab>
    ),
});
