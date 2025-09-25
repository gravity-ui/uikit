import figma from '@figma/code-connect';

import {Card} from '../components/Card/Card';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=44798%3A511299';

figma.connect(Card, figmaUrl, {
    variant: {Type: 'With themes'},
    props: {
        nested: figma.nestedProps('Theme', {
            size: figma.enum('Size', {
                M: 'm',
                L: 'l',
            }),
            theme: figma.enum('Theme', {
                Normal: 'normal',
                Danger: 'danger',
                Warning: 'warning',
                Info: 'info',
                Success: 'success',
                Utility: 'utility',
            }),
            view: figma.enum('View', {
                Outlined: 'outlined',
                Filled: 'filled',
            }),
        }),
    },
    example: (props) => (
        <Card size={props.nested.size} theme={props.nested.theme} view={props.nested.view}>
            Content
        </Card>
    ),
});

figma.connect(Card, figmaUrl, {
    variant: {Type: 'Selectable card'},
    props: {
        nested: figma.nestedProps('Selection', {
            size: figma.enum('Size', {
                M: 'm',
                L: 'l',
            }),
            selected: figma.enum('State', {
                Selected: true,
            }),
        }),
    },
    example: (props) => (
        <Card type="selection" selected={props.nested.selected}>
            Content
        </Card>
    ),
});

figma.connect(Card, figmaUrl, {
    variant: {Type: 'Raised'},
    props: {
        nested: figma.nestedProps('Raised', {
            size: figma.enum('Size', {
                M: 'm',
                L: 'l',
            }),
        }),
    },
    example: () => <Card view="raised">Content</Card>,
});

figma.connect(Card, figmaUrl, {
    variant: {Type: 'Raised+Action'},
    props: {
        nested: figma.nestedProps('Raised+Action', {
            size: figma.enum('Size', {
                M: 'm',
                L: 'l',
            }),
        }),
    },
    example: () => (
        <Card view="raised" type="action">
            Content
        </Card>
    ),
});
