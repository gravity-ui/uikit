import figma from '@figma/code-connect';

import {Button} from '../components/Button/Button';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=83215%3A23801';

figma.connect(Button, figmaUrl, {
    props: {
        view: figma.enum('View', {
            Action: 'action',
            Normal: 'normal',
            'Outline-danger': 'outlined-danger',
            'Outline-info': 'outlined-info',
            'Outlined-success': 'outlined-success',
            'Outlined-warning': 'outlined-warning',
            'Outline-utility': 'outlined-utility',
            'Outlined-action': 'outlined-action',
            Raised: 'raised',
            Flat: 'flat',
            'Flat-secondary': 'flat-secondary',
            'Flat-info': 'flat-info',
            'Flat-success': 'flat-success',
            'Flat-warning': 'flat-warning',
            'Flat-danger': 'flat-danger',
            'Flat-utility': 'flat-utility',
            'Flat-action': 'flat-action',
            'Normal-contrast': 'normal-contrast',
            'Outline-contrast': 'outlined-contrast',
            'Flat-contrast': 'flat-contrast',
        }),
        selected: figma.enum('State', {
            Selected: true,
        }),
        disabled: figma.enum('State', {
            Disabled: true,
        }),
        loading: figma.enum('State', {
            Loading: true,
        }),
        nested: figma.nestedProps('ButtonInner', {
            size: figma.enum('Size', {
                XS: 'xs',
                S: 's',
                M: 'm',
                L: 'l',
                XL: 'xl',
            }),
            content: figma.string('Content'),
        }),
    },
    example: (props) => (
        <Button
            view={props.view}
            selected={props.selected}
            disabled={props.disabled}
            loading={props.loading}
            size={props.nested.size}
        >
            {props.nested.content}
        </Button>
    ),
});

const legacyFigmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?m=auto&node-id=41899-462118&t=iTZavQykln8KQlhx-1';

figma.connect(Button, legacyFigmaUrl, {
    props: {
        view: figma.enum('View', {
            Action: 'action',
            Normal: 'normal',
            'Outline-danger': 'outlined-danger',
            'Outline-info': 'outlined-info',
            'Outlined-success': 'outlined-success',
            'Outlined-warning': 'outlined-warning',
            'Outline-utility': 'outlined-utility',
            'Outlined-action': 'outlined-action',
            Raised: 'raised',
            Flat: 'flat',
            'Flat-secondary': 'flat-secondary',
            'Flat-info': 'flat-info',
            'Flat-success': 'flat-success',
            'Flat-warning': 'flat-warning',
            'Flat-danger': 'flat-danger',
            'Flat-utility': 'flat-utility',
            'Flat-action': 'flat-action',
            'Normal-contrast': 'normal-contrast',
            'Outline-contrast': 'outlined-contrast',
            'Flat-contrast': 'flat-contrast',
        }),
        size: figma.enum('Size', {
            XS: 'xs',
            S: 's',
            M: 'm',
            L: 'l',
            XL: 'xl',
        }),
        selected: figma.enum('State', {
            Selected: true,
        }),
        disabled: figma.enum('State', {
            Disabled: true,
        }),
        loading: figma.enum('State', {
            Loading: true,
        }),
        content: figma.string('Content'),
        startIcon: figma.boolean('Start icon', {
            true: figma.instance('↳ Start icon'),
            false: undefined,
        }),
        endIcon: figma.boolean('End icon', {
            true: figma.instance('↳ End icon'),
            false: undefined,
        }),
    },
    example: (props) => (
        <Button
            view={props.view}
            selected={props.selected}
            disabled={props.disabled}
            loading={props.loading}
            size={props.size}
        >
            {props.startIcon}
            {props.content}
            {props.endIcon}
        </Button>
    ),
});
