import React from 'react';

import {Eye, EyeSlash, Key} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Checkbox} from '../../../Checkbox';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {cn} from '../../../utils/cn';
import {mapTextInputSizeToButtonSize} from '../../common';
import {NumberInput} from '../NumberInput';
import type {NumberInputProps} from '../NumberInput';

import './NumberInputShowcase.scss';

const b = cn('number-input-showcase');

const LABEL = 'Label:';
const LONG_LABEL = 'Very very long label is limited by 50% width of the input control size';

const EyeButton = (props: {
    size?: NumberInputProps['size'];
    opened?: boolean;
    disabled?: boolean;
    onClick: () => void;
}) => {
    const {size = 'm', disabled, opened, onClick} = props;

    return (
        <Button
            size={mapTextInputSizeToButtonSize(size)}
            view="flat"
            disabled={disabled}
            onClick={onClick}
        >
            <Icon data={opened ? Eye : EyeSlash} />
        </Button>
    );
};

export function NumberInputShowcase() {
    const [value, setValue] = React.useState('');
    const [isErrorMessageVisible, setErrorMessageVisibility] = React.useState(false);
    const [hideValue, setHideValue] = React.useState(false);
    const additionalContentExampleInputType = hideValue ? 'password' : undefined;

    const NumberInputProps: NumberInputProps = {
        className: b('input'),
        onUpdate: setValue,
        value,
    };

    const handleEyeButtonClick = () => setHideValue(!hideValue);

    return (
        <div className={b()}>
            <div className={b('number-input-examples')}>
                <h2 className={b('title')}>NumberInput</h2>

                <div className={b('size-examples')}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <NumberInput {...NumberInputProps} size="s" placeholder="s" />
                    <NumberInput {...NumberInputProps} placeholder="m" />
                    <NumberInput {...NumberInputProps} size="l" placeholder="l" />
                    <NumberInput {...NumberInputProps} size="xl" placeholder="xl" />
                </div>

                <div className={b('state-examples')}>
                    <h3 className={b('section-header')}>States:</h3>

                    <div className={b('row')}>
                        <NumberInput
                            {...NumberInputProps}
                            placeholder="error with message"
                            error={isErrorMessageVisible ? 'A validation error has occurred' : true}
                        />
                        <Checkbox
                            onUpdate={setErrorMessageVisibility}
                            checked={isErrorMessageVisible}
                        />
                    </div>
                    <NumberInput {...NumberInputProps} placeholder="disabled" disabled />
                    <NumberInput {...NumberInputProps} placeholder="clear" hasClear />
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="default value"
                        value={undefined}
                        defaultValue="defaultValue"
                    />
                    <NumberInput
                        {...NumberInputProps}
                        value={undefined}
                        placeholder="with note"
                        note={<Text color="secondary">Additional</Text>}
                    />
                </div>
            </div>

            <div className={b('number-input-label-examples')}>
                <h2 className={b('title')}>NumberInput (label)</h2>

                <div className={b('size-examples')}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <NumberInput {...NumberInputProps} size="s" placeholder="s" label={LABEL} />
                    <NumberInput {...NumberInputProps} placeholder="m" label={LABEL} />
                    <NumberInput {...NumberInputProps} size="l" placeholder="l" label={LABEL} />
                    <NumberInput {...NumberInputProps} size="xl" placeholder="xl" label={LABEL} />
                </div>

                <div className={b('state-examples')}>
                    <h3 className={b('section-header')}>States:</h3>

                    <div className={b('row')}>
                        <NumberInput
                            {...NumberInputProps}
                            placeholder="error with message"
                            label={LABEL}
                            error={
                                isErrorMessageVisible
                                    ? 'A validation error has occurred'
                                    : undefined
                            }
                        />
                        <Checkbox
                            onUpdate={setErrorMessageVisibility}
                            checked={isErrorMessageVisible}
                        />
                    </div>
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="disabled"
                        label={LABEL}
                        disabled
                    />
                    <NumberInput {...NumberInputProps} placeholder="clear" label={LABEL} hasClear />
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="default value"
                        label={LABEL}
                        value={undefined}
                        defaultValue="defaultValue"
                    />
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="default value"
                        label={LONG_LABEL}
                        value={undefined}
                        defaultValue="defaultValue"
                    />
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="with note"
                        label={LABEL}
                        note={<Text color="secondary">Additional</Text>}
                        hasClear
                    />
                </div>
            </div>

            <div className={b('number-input-examples')}>
                <h2 className={b('title')}>NumberInput (with additional content)</h2>

                <div className={b('size-examples')}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <NumberInput
                        {...NumberInputProps}
                        size="s"
                        placeholder="s"
                        type={additionalContentExampleInputType}
                        startContent={<Icon data={Key} />}
                        endContent={
                            <EyeButton size="s" opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                    />
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="m"
                        type={additionalContentExampleInputType}
                        startContent={<Icon data={Key} />}
                        endContent={
                            <EyeButton size="m" opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                    />
                    <NumberInput
                        {...NumberInputProps}
                        size="l"
                        placeholder="l"
                        type={additionalContentExampleInputType}
                        startContent={<Icon data={Key} />}
                        endContent={
                            <EyeButton size="l" opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                    />
                    <NumberInput
                        {...NumberInputProps}
                        size="xl"
                        placeholder="xl"
                        type={additionalContentExampleInputType}
                        label={LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={
                            <EyeButton
                                size="xl"
                                opened={hideValue}
                                onClick={handleEyeButtonClick}
                            />
                        }
                    />
                </div>

                <div className={b('state-examples')}>
                    <h3 className={b('section-header')}>States:</h3>

                    <div className={b('row')}>
                        <NumberInput
                            {...NumberInputProps}
                            placeholder="error with message"
                            error={
                                isErrorMessageVisible
                                    ? 'A validation error has occurred'
                                    : undefined
                            }
                            type={additionalContentExampleInputType}
                            startContent={<Icon data={Key} />}
                            endContent={
                                <EyeButton opened={hideValue} onClick={handleEyeButtonClick} />
                            }
                        />
                        <Checkbox
                            onUpdate={setErrorMessageVisibility}
                            checked={isErrorMessageVisible}
                        />
                    </div>
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="disabled"
                        type={additionalContentExampleInputType}
                        startContent={<Icon data={Key} />}
                        endContent={
                            <EyeButton opened={hideValue} disabled onClick={handleEyeButtonClick} />
                        }
                        disabled
                    />
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="clear"
                        type={additionalContentExampleInputType}
                        label={LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<EyeButton opened={hideValue} onClick={handleEyeButtonClick} />}
                        hasClear
                    />
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="default value"
                        value={undefined}
                        defaultValue="defaultValue"
                        type={additionalContentExampleInputType}
                        label={LONG_LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<EyeButton opened={hideValue} onClick={handleEyeButtonClick} />}
                    />
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="with note"
                        type={additionalContentExampleInputType}
                        label={LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<EyeButton opened={hideValue} onClick={handleEyeButtonClick} />}
                        note={<Text color="secondary">Additional</Text>}
                        hasClear
                    />
                </div>
            </div>

            <div className={b('number-input-error-examples')}>
                <h2 className={b('title')}>NumberInput (with text error)</h2>

                <div className={b('size-examples')}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <NumberInput
                        {...NumberInputProps}
                        size="s"
                        placeholder="s"
                        error="A validation error has occurred"
                    />
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="m"
                        error="A validation error has occurred"
                    />
                    <NumberInput
                        {...NumberInputProps}
                        size="l"
                        placeholder="l"
                        error="A validation error has occurred"
                    />
                    <NumberInput
                        {...NumberInputProps}
                        size="xl"
                        placeholder="xl"
                        error="A validation error has occurred"
                    />
                </div>

                <div className={b('additional-content-examples')}>
                    <h3 className={b('section-header')}>With additional content:</h3>
                    <NumberInput
                        {...NumberInputProps}
                        error="A validation error has occurred"
                        placeholder="clear"
                        type={additionalContentExampleInputType}
                        label={LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<EyeButton opened={hideValue} onClick={handleEyeButtonClick} />}
                        hasClear
                    />
                    <NumberInput
                        {...NumberInputProps}
                        error="A validation error has occurred"
                        placeholder="default value"
                        value={undefined}
                        defaultValue="defaultValue"
                        type={additionalContentExampleInputType}
                        label={LONG_LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<EyeButton opened={hideValue} onClick={handleEyeButtonClick} />}
                        hasClear
                    />
                </div>
            </div>

            <div className={b('number-input-error-examples')}>
                <h2 className={b('title')}>NumberInput (with inline error)</h2>

                <div className={b('size-examples')}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <NumberInput
                        {...NumberInputProps}
                        size="s"
                        placeholder="s"
                        error="A validation error has occurred"
                        errorPlacement="inside"
                    />
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="m"
                        error="A validation error has occurred"
                        errorPlacement="inside"
                    />
                    <NumberInput
                        {...NumberInputProps}
                        size="l"
                        placeholder="l"
                        error="A validation error has occurred"
                        errorPlacement="inside"
                    />
                    <NumberInput
                        {...NumberInputProps}
                        size="xl"
                        placeholder="xl"
                        error="A validation error has occurred"
                        errorPlacement="inside"
                    />
                </div>

                <div className={b('additional-content-examples')}>
                    <h3 className={b('section-header')}>With additional content:</h3>
                    <NumberInput
                        {...NumberInputProps}
                        error="A validation error has occurred"
                        errorPlacement="inside"
                        placeholder="clear"
                        type={additionalContentExampleInputType}
                        label={LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<EyeButton opened={hideValue} onClick={handleEyeButtonClick} />}
                        hasClear
                    />
                    <NumberInput
                        {...NumberInputProps}
                        error="A validation error has occurred"
                        errorPlacement="inside"
                        placeholder="default value"
                        value={undefined}
                        defaultValue="defaultValue"
                        type={additionalContentExampleInputType}
                        label={LONG_LABEL}
                        startContent={<Icon data={Key} />}
                        endContent={<EyeButton opened={hideValue} onClick={handleEyeButtonClick} />}
                        hasClear
                    />
                </div>
            </div>
        </div>
    );
}
