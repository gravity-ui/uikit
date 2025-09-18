import figma from '@figma/code-connect';

import {Popover} from '../components/Popover/Popover';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=62970%3A6255';

figma.connect(Popover, figmaUrl, {
    props: {
        content: figma.textContent('desc'),
    },
    example: (props) => (
        <Popover>
            <div>{props.content}</div>
        </Popover>
    ),
});
