import figma from '@figma/code-connect';

import {DropdownMenu} from '../components/DropdownMenu/DropdownMenu';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=62804%3A63251';

figma.connect(DropdownMenu, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            S: 's',
            M: 'm',
            L: 'l',
            XL: 'xl',
        }),
    },
    example: (props) => <DropdownMenu size={props.size} />,
});
