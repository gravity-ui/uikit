import figma from '@figma/code-connect/react';

import {Button} from './Button';
import type {ButtonProps} from './Button';

type Props = Pick<ButtonProps, 'view' | 'size' | 'disabled' | 'loading' | 'selected' | 'children'>;

figma.connect<Props>(
    Button,
    'https://www.figma.com/design/LlrQIz4F2Y06FJRdB4iE9U/Gravity-UI-Design-System--Community-?node-id=53098-497062',
    {
        imports: ["import {Button} from '@gravity-ui/uikit';"],
        props: {
            view: figma.enum('View', {
                Normal: 'normal',
                Action: 'action',
                Outline: 'outlined',
                'Outline-info': 'outlined-info',
                'Outlined-success': 'outlined-success',
                'Outlined-warning': 'outlined-warning',
                'Outline-danger': 'outlined-danger',
                'Outline-utility': 'outlined-utility',
                'Outlined-action': 'outlined-action',
                Flat: 'flat',
                'Flat-info': 'flat-info',
                'Flat-success': 'flat-success',
                'Flat-warning': 'flat-warning',
                'Flat-danger': 'flat-danger',
                'Flat-utility': 'flat-utility',
                'Flat-action': 'flat-action',
                'Flat-secondary': 'flat-secondary',
                Raised: 'raised',
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
            disabled: figma.enum('State', {
                Default: false,
                Hover: false,
                Disabled: true,
                Loading: false,
                Selected: false,
            }),
            loading: figma.enum('State', {
                Default: false,
                Hover: false,
                Disabled: false,
                Loading: true,
                Selected: false,
            }),
            selected: figma.enum('State', {
                Default: false,
                Hover: false,
                Disabled: false,
                Loading: false,
                Selected: true,
            }),
            children: figma.string('Content'),
        },
        example: ({view, size, disabled, loading, selected, children}) => (
            <Button
                view={view}
                size={size}
                disabled={disabled}
                loading={loading}
                selected={selected}
            >
                {children}
            </Button>
        ),
    },
);
