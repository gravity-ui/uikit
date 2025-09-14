import figma from '@figma/code-connect';

import {Tooltip} from '../components/Tooltip/Tooltip';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=62752%3A9440';

figma.connect(Tooltip, figmaUrl, {
    props: {
        content: figma.string('Content text'),
    },
    example: (props) => (
        <Tooltip content={props.content}>
            <div>{props.content}</div>
        </Tooltip>
    ),
});
