import figma from '@figma/code-connect';

import {RadioGroup} from '../components/RadioGroup/RadioGroup';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=41365%3A431719';

figma.connect(RadioGroup, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            M: 'm',
            L: 'l',
        }),
        direction: figma.enum('Direction', {
            Vertical: 'vertical',
            Horizontal: 'horizontal',
        }),
    },
    example: (props) => <RadioGroup size={props.size} direction={props.direction} />,
});
