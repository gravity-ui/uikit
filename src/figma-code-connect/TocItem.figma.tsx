import figma from '@figma/code-connect';

import {TocItem} from '../components/Toc/TocItem/TocItem';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=55391%3A56546';

figma.connect(TocItem, figmaUrl, {
    props: {
        text: figma.string('Text'),
        active: figma.enum('State', {
            Selected: true,
        }),
    },
    example: (props) => <TocItem active={props.active} depth={1} content={props.text} />,
});
