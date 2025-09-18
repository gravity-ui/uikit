import figma from '@figma/code-connect';

import {Pagination} from '../components/Pagination/Pagination';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=44622%3A528242';

figma.connect(Pagination, figmaUrl, {
    props: {
        compact: figma.enum('Type', {
            Compact: true,
        }),
        showInput: figma.boolean('Input page number'),
        showPages: figma.boolean('Page numbers'),
    },
    example: (props) => (
        <Pagination
            page={1}
            pageSize={20}
            showPages={props.showPages}
            showInput={props.showInput}
            onUpdate={() => {}}
            compact={props.compact}
        />
    ),
});
