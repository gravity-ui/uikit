import figma from '@figma/code-connect';

import {Progress} from '../components/Progress/Progress';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=74026%3A514';

figma.connect(Progress, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            XS: 'xs',
            S: 's',
            M: 'm',
        }),
    },
    example: (props) => <Progress value={20} size={props.size} />,
});
