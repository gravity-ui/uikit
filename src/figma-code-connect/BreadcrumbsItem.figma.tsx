import figma from '@figma/code-connect';

import {BreadcrumbsItem} from '../components/Breadcrumbs/BreadcrumbsItem';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=83220-846292&t=c89FOAFmNJ7g0jit-4';

figma.connect(BreadcrumbsItem, figmaUrl, {
    props: {
        nested: figma.nestedProps('.Page settings', {
            icon: figma.boolean('Start icon', {
                true: figma.instance('↳ Icon'),
                false: undefined,
            }),
            content: figma.string('Content'),
            disabled: figma.enum('State', {
                Disabled: true,
            }),
        }),
    },
    example: (props) => (
        <BreadcrumbsItem disabled={props.nested.disabled}>
            {props.nested.icon}
            {props.nested.content}
        </BreadcrumbsItem>
    ),
});

const figmaUrlCurrent =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=83220-846267&t=jICbwJPiAvFzYTnw-4';

figma.connect(BreadcrumbsItem, figmaUrlCurrent, {
    props: {
        icon: figma.boolean('Start icon', {
            true: figma.instance('↳ Icon'),
            false: undefined,
        }),
        content: figma.string('Content'),
    },
    example: (props) => (
        <BreadcrumbsItem>
            {props.icon}
            {props.content}
        </BreadcrumbsItem>
    ),
});
