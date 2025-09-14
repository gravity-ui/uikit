import figma from '@figma/code-connect';

import {Popup} from '../components/Popup/Popup';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=44960%3A528197';

figma.connect(Popup, figmaUrl, {
    props: {
        content: figma.textContent('Detach the component to change the content'),
        hasArrow: figma.enum('Pin', {
            None: false,
            Up: true,
            Down: true,
            Left: true,
            Right: true,
        }),
        placement: figma.enum('Pin', {
            None: undefined,
            Up: 'top',
            Down: 'bottom',
            Left: 'left',
            Right: 'right',
        }),
    },
    example: (props) => (
        <Popup hasArrow={props.hasArrow} placement={props.placement}>
            {props.content}
        </Popup>
    ),
});
