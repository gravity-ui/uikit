import figma from '@figma/code-connect';

import {Loader} from '../components/Loader/Loader';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=41187%3A433363';

figma.connect(Loader, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            S: 's',
            M: 'm',
            L: 'l',
        }),
    },
    example: (props) => <Loader size={props.size} />,
});
