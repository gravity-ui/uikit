import figma from '@figma/code-connect';

import {TabList} from '../components/tabs/TabList';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=39919%3A436982';

figma.connect(TabList, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            M: 'm',
            L: 'l',
            XL: 'xl',
        }),
        children: figma.children('↳ Tab*'),
    },
    example: (props) => <TabList size={props.size}>{props.children}</TabList>,
});
