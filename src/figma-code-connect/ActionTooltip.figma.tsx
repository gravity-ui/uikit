import figma from '@figma/code-connect';

import {ActionTooltip} from '../components/ActionTooltip/ActionTooltip';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=77860%3A7235';

figma.connect(ActionTooltip, figmaUrl, {
    variant: {State: 'Full'},
    props: {
        title: figma.string('↳ Title text'),
        description: figma.string('↳ Description text'),
    },
    example: (props) => (
        <ActionTooltip title={props.title} description={props.description}>
            <div>{props.title}</div>
        </ActionTooltip>
    ),
});

figma.connect(ActionTooltip, figmaUrl, {
    variant: {State: 'Minimized'},
    props: {
        title: figma.string('↳ Title text'),
    },
    example: (props) => (
        <ActionTooltip title={props.title}>
            <div>{props.title}</div>
        </ActionTooltip>
    ),
});
