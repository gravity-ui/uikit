import figma from '@figma/code-connect';

import {FilePreview} from '../components/FilePreview/FilePreview';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=72043%3A4558';
figma.connect(FilePreview, figmaUrl, {
    props: {
        file: figma.nestedProps('.Attach-file-icons', {
            type: figma.enum('Type', {
                Excel: 'table',
                Doc: 'text',
                Archive: 'archive',
                Code: 'code',
                Video: 'video',
                Image: 'image',
                PDF: 'pdf',
                Music: 'music',
                Unkown: 'default',
            }),
        }),
        name: figma.textContent('title'),
        description: figma.string('Description'),
    },
    example: (props) => (
        <FilePreview
            file={{name: props.name, type: props.file.type} as File}
            description={props.description}
        />
    ),
});
