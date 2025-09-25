import figma from '@figma/code-connect';

import {Dialog} from '../components/Dialog/Dialog';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=73949%3A4998';

figma.connect(Dialog, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            S: 's',
            M: 'm',
            L: 'l',
        }),
    },
    example: (props) => (
        <Dialog open={true} onClose={() => {}} size={props.size}>
            Content
        </Dialog>
    ),
});
