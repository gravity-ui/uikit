import figma from '@figma/code-connect';

import {SegmentedRadioGroup} from '../components/SegmentedRadioGroup/SegmentedRadioGroup';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=77841-4892&t=c89FOAFmNJ7g0jit-4';

figma.connect(SegmentedRadioGroup, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            S: 's',
            M: 'm',
            L: 'l',
            XL: 'xl',
        }),
        width: figma.enum('Width', {
            Auto: 'auto',
            Max: 'max',
        }),
        children: figma.children('*'),
    },
    example: (props) => (
        <SegmentedRadioGroup width={props.width} size={props.size}>
            {props.children}
        </SegmentedRadioGroup>
    ),
});
