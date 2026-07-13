import figma from '@figma/code-connect/react';

import {Checkbox} from './Checkbox';
import type {CheckboxProps} from './Checkbox';

type Props = Pick<CheckboxProps, 'size' | 'checked' | 'indeterminate' | 'disabled' | 'content'>;

figma.connect<Props>(
    Checkbox,
    'https://www.figma.com/design/LlrQIz4F2Y06FJRdB4iE9U/Gravity-UI-Design-System--Community-?node-id=53103-9376',
    {
        imports: ["import {Checkbox} from '@gravity-ui/uikit';"],
        props: {
            size: figma.enum('Size', {
                M: 'm',
                L: 'l',
                XL: 'xl',
            }),
            checked: figma.enum('Checked', {
                Off: false,
                On: true,
            }),
            indeterminate: figma.enum('Indeterminate', {
                Off: false,
                On: true,
            }),
            disabled: figma.enum('State', {
                Default: false,
                Hover: false,
                Disabled: true,
            }),
            content: figma.boolean('Content', {
                true: figma.string('↳ Content text'),
                false: undefined,
            }),
        },
        example: ({size, checked, indeterminate, disabled, content}) => (
            <Checkbox
                size={size}
                checked={checked}
                indeterminate={indeterminate}
                disabled={disabled}
                content={content}
            />
        ),
    },
);
