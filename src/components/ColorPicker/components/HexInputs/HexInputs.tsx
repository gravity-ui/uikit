import type {HsvaColor} from '@uiw/react-color';

import {Flex} from '../../../layout';

import {HexAlphaInput} from './HexAplhaInput';
import {HexInput} from './HexInput';

type HexInputsProps = {
    inputValue: string;
    hsva: HsvaColor;
    withAlpha: boolean;
    onInputChange: (value: string) => void;
    onInputBlur: () => void;
    onAlphaChange: (alpha: number) => void;
};

export const HexInputs = ({
    inputValue,
    hsva,
    withAlpha,
    onInputChange,
    onInputBlur,
    onAlphaChange,
}: HexInputsProps) => (
    <Flex>
        <HexInput
            value={inputValue}
            withAlpha={withAlpha}
            onChange={onInputChange}
            onBlur={onInputBlur}
        />
        {withAlpha && <HexAlphaInput alpha={hsva.a} onChange={onAlphaChange} />}
    </Flex>
);
