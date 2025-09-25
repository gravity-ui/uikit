import figma from '@figma/code-connect';

import {Stepper} from '../components/Stepper/Stepper';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=82872%3A770';

figma.connect(Stepper, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            S: 's',
            M: 'm',
            L: 'l',
        }),
    },
    example: (props) => (
        <Stepper size={props.size}>
            <Stepper.Item>Step</Stepper.Item>
        </Stepper>
    ),
});
