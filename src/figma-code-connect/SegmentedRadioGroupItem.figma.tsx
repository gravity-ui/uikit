import figma from '@figma/code-connect';

import {SegmentedRadioGroupOption} from '../components/SegmentedRadioGroup/SegmentedRadioGroupOption';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=77841-5618&t=c89FOAFmNJ7g0jit-4';

figma.connect(SegmentedRadioGroupOption, figmaUrl, {
    props: {
        selected: figma.boolean('Selected'),
        disabled: figma.enum('State', {
            Disabled: true,
        }),
        name: figma.boolean('Icon only', {
            false: figma.string('↳ Text'),
            true: undefined,
        }),
    },
    example: (props) => (
        <SegmentedRadioGroupOption
            name={props.name}
            title={props.name}
            disabled={props.disabled}
            checked={props.selected}
            value={'value'}
        />
    ),
});
