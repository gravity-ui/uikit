import figma from '@figma/code-connect';

import {PlaceholderContainer} from '../components/PlaceholderContainer/PlaceholderContainer';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=45769%3A472706';

figma.connect(PlaceholderContainer, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            S: 's',
            M: 'm',
            L: 'l',
        }),
        direction: figma.enum('Direction', {
            Row: 'row',
            Column: 'column',
        }),
        title: figma.boolean('Title', {
            true: figma.string('↳ Title text'),
            false: undefined,
        }),
        description: figma.boolean('Description', {
            true: figma.string('↳ Description text'),
            false: undefined,
        }),
    },
    example: (props) => (
        <PlaceholderContainer
            title={props.title}
            description={props.description}
            size={props.size}
            direction={props.direction}
            image={{src: 'source image'}}
        />
    ),
});
