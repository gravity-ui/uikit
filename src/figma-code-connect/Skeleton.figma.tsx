import figma from '@figma/code-connect';

import {Skeleton} from '../components/Skeleton/Skeleton';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=41819%3A444863';

figma.connect(Skeleton, figmaUrl, {
    example: () => <Skeleton />,
});
