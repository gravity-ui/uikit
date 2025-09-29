import figma from '@figma/code-connect';

import {Toc} from '../components/Toc/Toc';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=55391%3A74641';

figma.connect(Toc, figmaUrl, {
    props: {},
    example: () => <Toc items={[{}]} />,
});
