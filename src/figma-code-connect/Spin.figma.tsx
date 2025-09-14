import figma from '@figma/code-connect';

import {Spin} from '../components/Spin/Spin';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=43625%3A494110';

figma.connect(Spin, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            XS: 'xs',
            S: 's',
            M: 'm',
            L: 'l',
            XL: 'xl',
        }),
    },
    example: (props) => <Spin size={props.size} />,
});
