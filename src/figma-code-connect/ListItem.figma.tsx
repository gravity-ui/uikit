import figma from '@figma/code-connect';

import {ListItem} from '../components/List/components/ListItem';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=42389%3A566564';

figma.connect(ListItem, figmaUrl, {
    props: {
        selected: figma.enum('State', {
            Active: true,
        }),
        active: figma.enum('State', {
            Hover: true,
        }),
        sortable: figma.boolean('Sortable'),
        height: figma.enum('Size', {
            S: 24,
            M: 28,
            L: 36,
            XL: 44,
        }),
    },
    example: (props) => (
        <ListItem
            item={'Content'}
            itemIndex={0}
            active={props.active}
            selected={props.selected}
            sortable={props.sortable}
            height={props.height}
            onActivate={() => {}}
        />
    ),
});
