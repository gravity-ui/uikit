import React from 'react';

import {Eye, EyeSlash, Key} from '@gravity-ui/icons';

import {Button} from '../../../Button';
import {Checkbox} from '../../../Checkbox';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {cn} from '../../../utils/cn';
import {mapTextInputSizeToButtonSize} from '../../common';
import {TextInput} from '../TextInput';
import type {TextInputProps} from '../TextInput';

import './TextInputShowcase.scss';

const b = cn('text-input-showcase');

const LABEL = 'Label:';
const LONG_LABEL = 'Very very long label is limited by 50% width of the input control size';
const showLabel = 'Show';
const hideLabel = 'Hide';

const EyeButton = (props: {
    size?: TextInputProps['size'];
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
            extraProps={{'aria-label': opened ? showLabel : hideLabel}}
        >
            <Icon data={opened ? Eye : EyeSlash} />
        </Button>
    );
};

export function TextInputShowcase() {
    const [value, setValue] = React.useState('');
    const [isErrorMessageVisible, setErrorMessageVisibility] = React.useState(false);
    const [hideValue, setHideValue] = React.useState(false);
    const additionalContentExmpleInputType = hideValue ? 'password' : undefined;

    const textInputProps: TextInputProps = {
        className: b('input'),
        onUpdate: setValue,
        value,
    };

    const handleEyeButtonClick = () => setHideValue(!hideValue);

    return (
        <div className={b()}>
            <div className={b('text-input-examples')}>
                <h2 className={b('title')}>TextInput</h2>

                <div className={'size-examples'}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <TextInput {...textInputProps} size="s" placeholder="s" />
                    <TextInput {...textInputProps} placeholder="m" />
                    <TextInput {...textInputProps} size="l" placeholder="l" />
                    <TextInput {...textInputProps} size="xl" placeholder="xl" />
                </div>

                <div className={b('state-examples')}>
                    <h3 className={b('section-header')}>States:</h3>

                    <div className={b('row')}>
                        <TextInput
                            {...textInputProps}
                            placeholder="error with message"
                            error={isErrorMessageVisible ? 'A validation error has occurred' : true}
                        />
                        <Checkbox
                            onUpdate={setErrorMessageVisibility}
                            checked={isErrorMessageVisible}
                        />
                    </div>
                    <TextInput {...textInputProps} placeholder="disabled" disabled />
                    <TextInput {...textInputProps} placeholder="clear" hasClear />
                    <TextInput
                        {...textInputProps}
                        placeholder="default value"
                        value={undefined}
                        defaultValue="defaultValue"
                    />
                    <TextInput
                        {...textInputProps}
                        value={undefined}
                        placeholder="with note"
                        note={<Text color="secondary">Additional</Text>}
                    />
                </div>
            </div>

            <div className={b('text-input-label-examples')}>
                <h2 className={b('title')}>TextInput (label)</h2>

                <div className={'size-examples'}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <TextInput {...textInputProps} size="s" placeholder="s" label={LABEL} />
                    <TextInput {...textInputProps} placeholder="m" label={LABEL} />
                    <TextInput {...textInputProps} size="l" placeholder="l" label={LABEL} />
                    <TextInput {...textInputProps} size="xl" placeholder="xl" label={LABEL} />
                </div>

                <div className={b('state-examples')}>
                    <h3 className={b('section-header')}>States:</h3>

                    <div className={b('row')}>
                        <TextInput
                            {...textInputProps}
                            placeholder="error with message"
                            label={LABEL}
                            error={isErrorMessageVisible ? 'A validation error has occurred' : true}
                        />
                        <Checkbox
                            onUpdate={setErrorMessageVisibility}
                            checked={isErrorMessageVisible}
                        />
                    </div>
                    <TextInput {...textInputProps} placeholder="disabled" label={LABEL} disabled />
                    <TextInput {...textInputProps} placeholder="clear" label={LABEL} hasClear />
                    <TextInput
                        {...textInputProps}
                        placeholder="default value"
                        label={LABEL}
                        value={undefined}
                        defaultValue="defaultValue"
                    />
                    <TextInput
                        {...textInputProps}
                        placeholder="default value"
                        label={LONG_LABEL}
                        value={undefined}
                        defaultValue="defaultValue"
                    />
                    <TextInput
                        {...textInputProps}
                        placeholder="with note"
                        label={LABEL}
                        note={<Text color="secondary">Additional</Text>}
                        hasClear
                    />
                </div>
            </div>

            <div className={b('text-input-examples')}>
                <h2 className={b('title')}>TextInput (with additional content)</h2>

                <div className={'size-examples'}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <TextInput
                        {...textInputProps}
                        size="s"
                        placeholder="s"
                        type={additionalContentExmpleInputType}
                        leftContent={<Icon data={Key} />}
                        rightContent={
                            <EyeButton size="s" opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                    />
                    <TextInput
                        {...textInputProps}
                        placeholder="m"
                        type={additionalContentExmpleInputType}
                        leftContent={<Icon data={Key} />}
                        rightContent={
                            <EyeButton size="m" opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                    />
                    <TextInput
                        {...textInputProps}
                        size="l"
                        placeholder="l"
                        type={additionalContentExmpleInputType}
                        leftContent={<Icon data={Key} />}
                        rightContent={
                            <EyeButton size="l" opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                    />
                    <TextInput
                        {...textInputProps}
                        size="xl"
                        placeholder="xl"
                        type={additionalContentExmpleInputType}
                        label={LABEL}
                        leftContent={<Icon data={Key} />}
                        rightContent={
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
                        <TextInput
                            {...textInputProps}
                            placeholder="error with message"
                            error={isErrorMessageVisible ? 'A validation error has occurred' : true}
                            type={additionalContentExmpleInputType}
                            leftContent={<Icon data={Key} />}
                            rightContent={
                                <EyeButton opened={hideValue} onClick={handleEyeButtonClick} />
                            }
                        />
                        <Checkbox
                            onUpdate={setErrorMessageVisibility}
                            checked={isErrorMessageVisible}
                        />
                    </div>
                    <TextInput
                        {...textInputProps}
                        placeholder="disabled"
                        type={additionalContentExmpleInputType}
                        leftContent={<Icon data={Key} />}
                        rightContent={
                            <EyeButton opened={hideValue} disabled onClick={handleEyeButtonClick} />
                        }
                        disabled
                    />
                    <TextInput
                        {...textInputProps}
                        placeholder="clear"
                        type={additionalContentExmpleInputType}
                        label={LABEL}
                        leftContent={<Icon data={Key} />}
                        rightContent={
                            <EyeButton opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                        hasClear
                    />
                    <TextInput
                        {...textInputProps}
                        placeholder="default value"
                        value={undefined}
                        defaultValue="defaultValue"
                        type={additionalContentExmpleInputType}
                        label={LONG_LABEL}
                        leftContent={<Icon data={Key} />}
                        rightContent={
                            <EyeButton opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                    />
                    <TextInput
                        {...textInputProps}
                        placeholder="with note"
                        type={additionalContentExmpleInputType}
                        label={LABEL}
                        leftContent={<Icon data={Key} />}
                        rightContent={
                            <EyeButton opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                        note={<Text color="secondary">Additional</Text>}
                        hasClear
                    />
                </div>
            </div>

            <div className={b('text-input-error-examples')}>
                <h2 className={b('title')}>TextInput (with text error)</h2>

                <div className={'size-examples'}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <TextInput
                        {...textInputProps}
                        size="s"
                        placeholder="s"
                        error={'A validation error has occurred'}
                    />
                    <TextInput
                        {...textInputProps}
                        placeholder="m"
                        errorMessage={'A validation error has occurred'}
                    />
                    <TextInput
                        {...textInputProps}
                        size="l"
                        placeholder="l"
                        errorMessage={'A validation error has occurred'}
                    />
                    <TextInput
                        {...textInputProps}
                        size="xl"
                        placeholder="xl"
                        errorMessage={'A validation error has occurred'}
                    />
                </div>

                <div className={b('additional-content-examples')}>
                    <h3 className={b('section-header')}>With additional content:</h3>
                    <TextInput
                        {...textInputProps}
                        errorMessage={'A validation error has occurred'}
                        placeholder="clear"
                        type={additionalContentExmpleInputType}
                        label={LABEL}
                        leftContent={<Icon data={Key} />}
                        rightContent={
                            <EyeButton opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                        hasClear
                    />
                    <TextInput
                        {...textInputProps}
                        errorMessage={'A validation error has occurred'}
                        placeholder="default value"
                        value={undefined}
                        defaultValue="defaultValue"
                        type={additionalContentExmpleInputType}
                        label={LONG_LABEL}
                        leftContent={<Icon data={Key} />}
                        rightContent={
                            <EyeButton opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                        hasClear
                    />
                </div>
            </div>

            <div className={b('text-input-error-examples')}>
                <h2 className={b('title')}>TextInput (with inline error)</h2>

                <div className={'size-examples'}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <TextInput
                        {...textInputProps}
                        size="s"
                        placeholder="s"
                        error={'A validation error has occurred'}
                        errorPlacement="inside"
                    />
                    <TextInput
                        {...textInputProps}
                        placeholder="m"
                        errorMessage={'A validation error has occurred'}
                        errorPlacement="inside"
                    />
                    <TextInput
                        {...textInputProps}
                        size="l"
                        placeholder="l"
                        errorMessage={'A validation error has occurred'}
                        errorPlacement="inside"
                    />
                    <TextInput
                        {...textInputProps}
                        size="xl"
                        placeholder="xl"
                        errorMessage={'A validation error has occurred'}
                        errorPlacement="inside"
                    />
                </div>

                <div className={b('additional-content-examples')}>
                    <h3 className={b('section-header')}>With additional content:</h3>
                    <TextInput
                        {...textInputProps}
                        errorMessage={'A validation error has occurred'}
                        errorPlacement="inside"
                        placeholder="clear"
                        type={additionalContentExmpleInputType}
                        label={LABEL}
                        leftContent={<Icon data={Key} />}
                        rightContent={
                            <EyeButton opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                        hasClear
                    />
                    <TextInput
                        {...textInputProps}
                        errorMessage={'A validation error has occurred'}
                        errorPlacement="inside"
                        placeholder="default value"
                        value={undefined}
                        defaultValue="defaultValue"
                        type={additionalContentExmpleInputType}
                        label={LONG_LABEL}
                        leftContent={<Icon data={Key} />}
                        rightContent={
                            <EyeButton opened={hideValue} onClick={handleEyeButtonClick} />
                        }
                        hasClear
                    />
                </div>
            </div>
        </div>
    );
}
