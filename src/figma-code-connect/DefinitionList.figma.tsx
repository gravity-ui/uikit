import figma from '@figma/code-connect';

import {DefinitionListItem} from '../components/DefinitionList/components/DefinitionListItem';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=70904%3A2127';

figma.connect(DefinitionListItem, figmaUrl, {
    props: {
        name: figma.string('Title'),
        nested: figma.nestedProps('.Content', {
            value: figma.string('Value'),
        }),
    },
    example: (props) => <DefinitionListItem name={props.name}>Content</DefinitionListItem>,
});
