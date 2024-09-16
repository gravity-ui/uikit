import React from 'react';

import {ArrowShapeUpToLine, CircleDollar} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {Flex} from '../../../layout';
import {cn} from '../../../utils/cn';
import {mapTextInputSizeToButtonSize} from '../../common';
import {NumberInput} from '../NumberInput';
import type {NumberInputProps} from '../NumberInput';
import {getNumericInputValidator} from '../utils';

import './NumberInputShowcase.scss';

const b = cn('number-input-showcase');

const LABEL = 'Label:';
const LONG_LABEL = 'Very very long label is limited by 50% width of the input control size';

export function NumberInputShowcase(args: NumberInputProps) {
    const [value, setValue] = React.useState('');

    const minMax = {
        min: -10000,
        max: 1000000,
    };

    const {pattern, validator} = getNumericInputValidator({
        positiveOnly: false,
        withoutFraction: true,
        ...minMax,
    });

    const numberInputProps: NumberInputProps = {
        ...args,
        onUpdate: setValue,
        value,
        allowMouseWheel: false,
    };

    const validationProps = {
        validationState: validator(value) ? ('invalid' as const) : undefined,
        errorMessage: validator(value),
        controlProps: {pattern},
    };

    const handleCeilButtonClick = () => {
        if (value) {
            setValue(String(Math.ceil(Number(value))));
        }
    };

    return (
        <div className={b()}>
            <Flex direction="column" gap={5}>
                <NumberInput {...numberInputProps} placeholder="disabled" disabled />
                <NumberInput {...numberInputProps} placeholder="has clear" value="123" hasClear />
                <NumberInput
                    {...numberInputProps}
                    placeholder="default value"
                    value={undefined}
                    defaultValue="123"
                />
                <NumberInput
                    {...numberInputProps}
                    placeholder="without controls"
                    hasControls={false}
                />
                <NumberInput
                    {...numberInputProps}
                    placeholder="with enabled wheel"
                    allowMouseWheel
                />
                <NumberInput {...numberInputProps} step={2} placeholder="step=2" />
                <NumberInput
                    {...numberInputProps}
                    shiftMultiplier={30}
                    allowDecimal
                    placeholder="shiftMultiplier=30"
                />
                <NumberInput {...numberInputProps} placeholder="with min/max" {...minMax} />
                <NumberInput
                    {...numberInputProps}
                    placeholder="with validators"
                    {...validationProps}
                />
                <NumberInput {...numberInputProps} allowDecimal placeholder="allow decimal" />
            </Flex>
            <Flex direction="column" gap={5}>
                <NumberInput
                    {...numberInputProps}
                    placeholder="with note"
                    note={<Text color="secondary">Additional</Text>}
                />
                <NumberInput
                    {...numberInputProps}
                    placeholder="error with message"
                    validationState="invalid"
                    errorMessage="A validation error has occurred"
                />
                <NumberInput
                    {...numberInputProps}
                    placeholder="error highlighting"
                    validationState="invalid"
                    errorMessage={true}
                />
                <NumberInput
                    {...numberInputProps}
                    placeholder="with start & end content"
                    startContent={<Icon data={CircleDollar} />}
                    endContent={<CeilButton onClick={handleCeilButtonClick} />}
                    hasClear
                />
                <NumberInput {...numberInputProps} placeholder="with label" label={LABEL} />
                <NumberInput
                    {...numberInputProps}
                    placeholder="with long label"
                    label={LONG_LABEL}
                />
                <NumberInput
                    {...numberInputProps}
                    validationState="invalid"
                    errorMessage="A validation error has occurred"
                    errorPlacement="inside"
                    placeholder="with everything and inside error"
                    label={LABEL}
                    startContent={<Icon data={CircleDollar} />}
                    endContent={<CeilButton onClick={handleCeilButtonClick} />}
                    note={<Text color="secondary">Additional</Text>}
                    hasClear
                />
                <NumberInput
                    {...numberInputProps}
                    validationState="invalid"
                    errorMessage="A validation error has occurred"
                    errorPlacement="outside"
                    placeholder="with everything and outside error"
                    label={LABEL}
                    startContent={<Icon data={CircleDollar} />}
                    endContent={<CeilButton onClick={handleCeilButtonClick} />}
                    note={<Text color="secondary">Additional</Text>}
                    hasClear
                />
            </Flex>
        </div>
    );
}

function CeilButton(props: {
    size?: NumberInputProps['size'];
    disabled?: boolean;
    onClick: () => void;
}) {
    const {size = 'm', disabled, onClick} = props;

    return (
        <Button
            size={mapTextInputSizeToButtonSize(size)}
            view="flat"
            disabled={disabled}
            onClick={onClick}
            extraProps={{'aria-label': 'Ceil value'}}
        >
            <Icon data={ArrowShapeUpToLine} />
        </Button>
    );
}
