import React from 'react';

import {ArrowShapeUpToLine, Key} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Checkbox} from '../../../Checkbox';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {cn} from '../../../utils/cn';
import {mapTextInputSizeToButtonSize} from '../../common';
import {NumberInput} from '../NumberInput';
import type {NumberInputProps} from '../NumberInput';
import {getNumericInputValidator} from '../utils';

import './NumberInputShowcase.scss';

const b = cn('number-input-showcase');

const LABEL = 'Label:';
const LONG_LABEL = 'Very very long label is limited by 50% width of the input control size';

const CeilButton = (props: {
    size?: NumberInputProps['size'];
    disabled?: boolean;
    onClick: () => void;
}) => {
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
};

export function NumberInputShowcase(args: NumberInputProps) {
    const [value, setValue] = React.useState('');
    const [isErrorMessageVisible, setErrorMessageVisibility] = React.useState(false);

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
        className: b('input'),
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
            <div className={b('number-input-examples')}>
                <h2 className={b('title')}>NumberInput</h2>

                <div className={'size-examples'}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <NumberInput {...numberInputProps} allowMouseWheel size="s" placeholder="s" />
                    <NumberInput {...numberInputProps} placeholder="m" />
                    <NumberInput {...numberInputProps} size="l" placeholder="l" />
                    <NumberInput {...numberInputProps} size="xl" placeholder="xl" />
                </div>

                <div className={b('state-examples')}>
                    <h3 className={b('section-header')}>States:</h3>

                    <div className={b('row')}>
                        <NumberInput
                            {...numberInputProps}
                            placeholder="error with message"
                            validationState="invalid"
                            errorMessage={
                                isErrorMessageVisible ? 'A validation error has occurred' : true
                            }
                        />
                        <Checkbox
                            onUpdate={setErrorMessageVisibility}
                            checked={isErrorMessageVisible}
                        />
                    </div>
                    <NumberInput {...numberInputProps} placeholder="disabled" disabled />
                    <NumberInput {...numberInputProps} placeholder="clear" hasClear />
                    <NumberInput
                        {...numberInputProps}
                        placeholder="default value"
                        value={undefined}
                        defaultValue="123"
                    />
                    <NumberInput
                        {...numberInputProps}
                        value={undefined}
                        placeholder="with note"
                        note={<Text color="secondary">Additional</Text>}
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
                    <NumberInput
                        {...numberInputProps}
                        placeholder="with enabled wheel"
                        allowMouseWheel
                    />
                    <NumberInput
                        {...numberInputProps}
                        controlProps={{step: 0.2}}
                        placeholder="step=0.2"
                    />
                    <NumberInput {...numberInputProps} placeholder="with min/max" {...minMax} />
                    <NumberInput
                        {...numberInputProps}
                        placeholder="with validators"
                        {...validationProps}
                    />
                </div>
            </div>

            <div className={b('number-input-examples')}>
                <h2 className={b('title')}>NumberInput (with additional content)</h2>

                <div className={'size-examples'}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <NumberInput
                        {...numberInputProps}
                        size="s"
                        placeholder="s"
                        startContent={<Icon data={Key} />}
                        endContent={<CeilButton size="s" onClick={handleCeilButtonClick} />}
                    />
                    <NumberInput
                        {...numberInputProps}
                        placeholder="m"
                        startContent={<Icon data={Key} />}
                        endContent={<CeilButton size="m" onClick={handleCeilButtonClick} />}
                    />
                    <NumberInput
                        {...numberInputProps}
                        size="l"
                        placeholder="l"
                        startContent={<Icon data={Key} />}
                        endContent={<CeilButton size="l" onClick={handleCeilButtonClick} />}
                    />
                    <NumberInput
                        {...numberInputProps}
                        size="xl"
                        placeholder="xl"
                        label={LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<CeilButton size="xl" onClick={handleCeilButtonClick} />}
                    />
                </div>

                <div className={b('state-examples')}>
                    <h3 className={b('section-header')}>States:</h3>

                    <div className={b('row')}>
                        <NumberInput
                            {...numberInputProps}
                            placeholder="error with message"
                            validationState="invalid"
                            errorMessage={
                                isErrorMessageVisible ? 'A validation error has occurred' : true
                            }
                            startContent={<Icon data={Key} />}
                            endContent={<CeilButton onClick={handleCeilButtonClick} />}
                        />
                        <Checkbox
                            onUpdate={setErrorMessageVisibility}
                            checked={isErrorMessageVisible}
                        />
                    </div>
                    <NumberInput
                        {...numberInputProps}
                        placeholder="disabled"
                        startContent={<Icon data={Key} />}
                        endContent={<CeilButton disabled onClick={handleCeilButtonClick} />}
                        disabled
                    />
                    <NumberInput
                        {...numberInputProps}
                        placeholder="clear"
                        label={LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<CeilButton onClick={handleCeilButtonClick} />}
                        hasClear
                    />
                    <NumberInput
                        {...numberInputProps}
                        placeholder="default value"
                        value={undefined}
                        defaultValue="123"
                        label={LONG_LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<CeilButton onClick={handleCeilButtonClick} />}
                    />
                    <NumberInput
                        {...numberInputProps}
                        placeholder="with note"
                        label={LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<CeilButton onClick={handleCeilButtonClick} />}
                        note={<Text color="secondary">Additional</Text>}
                        hasClear
                    />
                </div>
            </div>

            <div className={b('number-input-error-examples')}>
                <h2 className={b('title')}>NumberInput (with text error)</h2>

                <div className={'size-examples'}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <NumberInput
                        {...numberInputProps}
                        size="s"
                        placeholder="s"
                        validationState="invalid"
                        errorMessage="A validation error has occurred"
                    />
                    <NumberInput
                        {...numberInputProps}
                        placeholder="m"
                        validationState="invalid"
                        errorMessage="A validation error has occurred"
                    />
                    <NumberInput
                        {...numberInputProps}
                        size="l"
                        placeholder="l"
                        validationState="invalid"
                        errorMessage="A validation error has occurred"
                    />
                    <NumberInput
                        {...numberInputProps}
                        size="xl"
                        placeholder="xl"
                        validationState="invalid"
                        errorMessage="A validation error has occurred"
                    />
                </div>

                <div className={b('additional-content-examples')}>
                    <h3 className={b('section-header')}>With additional content:</h3>
                    <NumberInput
                        {...numberInputProps}
                        validationState="invalid"
                        errorMessage="A validation error has occurred"
                        placeholder="clear"
                        label={LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<CeilButton onClick={handleCeilButtonClick} />}
                        hasClear
                    />
                    <NumberInput
                        {...numberInputProps}
                        validationState="invalid"
                        errorMessage="A validation error has occurred"
                        placeholder="default value"
                        value={undefined}
                        defaultValue="defaultValue"
                        label={LONG_LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<CeilButton onClick={handleCeilButtonClick} />}
                        hasClear
                    />
                </div>
            </div>

            <div className={b('number-input-error-examples')}>
                <h2 className={b('title')}>NumberInput (with inline error)</h2>

                <div className={'size-examples'}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <NumberInput
                        {...numberInputProps}
                        size="s"
                        placeholder="s"
                        validationState="invalid"
                        errorMessage="A validation error has occurred"
                        errorPlacement="inside"
                    />
                    <NumberInput
                        {...numberInputProps}
                        placeholder="m"
                        validationState="invalid"
                        errorMessage="A validation error has occurred"
                        errorPlacement="inside"
                    />
                    <NumberInput
                        {...numberInputProps}
                        size="l"
                        placeholder="l"
                        validationState="invalid"
                        errorMessage="A validation error has occurred"
                        errorPlacement="inside"
                    />
                    <NumberInput
                        {...numberInputProps}
                        size="xl"
                        placeholder="xl"
                        validationState="invalid"
                        errorMessage="A validation error has occurred"
                        errorPlacement="inside"
                    />
                </div>

                <div className={b('additional-content-examples')}>
                    <h3 className={b('section-header')}>With additional content:</h3>
                    <NumberInput
                        {...numberInputProps}
                        validationState="invalid"
                        errorMessage="A validation error has occurred"
                        errorPlacement="inside"
                        placeholder="clear"
                        label={LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<CeilButton onClick={handleCeilButtonClick} />}
                        hasClear
                    />
                    <NumberInput
                        {...numberInputProps}
                        validationState="invalid"
                        errorMessage="A validation error has occurred"
                        errorPlacement="inside"
                        placeholder="default value"
                        value={undefined}
                        defaultValue="defaultValue"
                        label={LONG_LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<CeilButton onClick={handleCeilButtonClick} />}
                        hasClear
                    />
                </div>
            </div>
        </div>
    );
}
