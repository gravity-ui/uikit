import figma from '@figma/code-connect';

import {List} from '../components/List/List';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=41710%3A426867';

figma.connect(List, figmaUrl, {
    props: {
        sortable: figma.enum('Type', {
            Sortable: true,
        }),
    },
    example: (props) => <List items={['Item', 'Item', 'Item']} sortable={props.sortable} />,
});
