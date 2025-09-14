import figma from '@figma/code-connect';

import {BreadcrumbsItem} from '../components/Breadcrumbs/BreadcrumbsItem';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=83220-846292&t=c89FOAFmNJ7g0jit-4';

figma.connect(BreadcrumbsItem, figmaUrl, {
    props: {
        nested: figma.nestedProps('.Page settings', {
            content: figma.string('Content'),
            disabled: figma.enum('State', {
                Disabled: true,
            }),
        }),
    },
    example: (props) => (
        <BreadcrumbsItem disabled={props.nested.disabled}>{props.nested.content}</BreadcrumbsItem>
    ),
});
