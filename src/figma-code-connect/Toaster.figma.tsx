import figma from '@figma/code-connect';

import {ToasterProvider} from '../components/Toaster/Provider/ToasterProvider';
import {Toaster} from '../components/Toaster/Toaster';
import {ToasterComponent} from '../components/Toaster/ToasterComponent/ToasterComponent';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=38993%3A376847';

figma.connect(ToasterComponent, figmaUrl, {
    props: {
        title: figma.boolean('Title', {
            true: figma.string('↳ Title text'),
            false: undefined,
        }),
        description: figma.boolean('Description', {
            true: figma.string('↳ Description text'),
            false: undefined,
        }),
        closeButton: figma.boolean('Close button'),
        theme: figma.enum('Theme', {
            Normal: 'normal',
            Info: 'info',
            Success: 'success',
            Warning: 'warning',
            Danger: 'danger',
            Utility: 'utility',
        }),
    },
    example: (props) => {
        const toaster = new Toaster();
        toaster.add({
            title: props.title,
            content: props.description,
            name: 'name',
            isClosable: props.closeButton,
            theme: props.theme,
        });
        return (
            <ToasterProvider toaster={toaster}>
                <ToasterComponent />
            </ToasterProvider>
        );
    },
});
