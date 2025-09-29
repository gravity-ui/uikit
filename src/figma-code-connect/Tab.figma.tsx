import figma from '@figma/code-connect';

import {Tab} from '../components/tabs/Tab';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=39919%3A435589';

figma.connect(Tab, figmaUrl, {
    props: {
        disabled: figma.enum('State', {
            Disabled: true,
        }),
        text: figma.string('↳ Text'),
        icon: figma.boolean('Start icon', {
            true: figma.instance('↳ Icon'),
            false: undefined,
        }),
    },
    example: (props) => (
        <Tab value={props.text} disabled={props.disabled} icon={props.icon}>
            {props.text}
        </Tab>
    ),
});
