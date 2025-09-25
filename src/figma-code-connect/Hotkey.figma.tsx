import figma from '@figma/code-connect';

import {Hotkey} from '../components/Hotkey/Hotkey';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=77863-7673&m=dev';

figma.connect(Hotkey, figmaUrl, {
    example: () => <Hotkey value="ctrl+c" />,
});
