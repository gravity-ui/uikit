import React from 'react';
import block from 'bem-cn-lite';
import {Checkbox} from '../../Checkbox';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {GearIcon} from '../../icons';
import {TextInput} from '../TextInput';
import {TextInputProps} from '../types';
import './TextInputShowcase.scss';

const b = block('text-input-showcase');

const LABEL = 'Label:';
const LONG_LABEL = 'Very very long label is limited by 50% width of the input control size';

const RightContent = (props: {size: TextInputProps['size']; disabled?: boolean}) => {
    const {size, disabled} = props;
    const [selected, setSelected] = React.useState(false);

    const handleClick = () => setSelected(!selected);

    return (
        <Button
            view={selected ? 'normal' : 'flat'}
            size={size}
            selected={selected}
            disabled={disabled}
            onClick={handleClick}
        >
            <Icon data={GearIcon} size={18} />
        </Button>
    );
};

export const TextInputShowcase: React.FC = () => {
    const [value, setValue] = React.useState('');
    const [isErrorMessageVisible, setErrorMessageVisibility] = React.useState(false);

    const textInputProps: TextInputProps = {
        className: b('input'),
        onUpdate: setValue,
        value,
    };

    const textAreaProps: TextInputProps = {
        multiline: true,
        className: b('text-area'),
        onUpdate: setValue,
        value,
    };

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
                            error={isErrorMessageVisible ? 'It happened a validation error' : true}
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
                            error={isErrorMessageVisible ? 'It happened a validation error' : true}
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
                </div>
            </div>

            <div className={b('text-input-examples')}>
                <h2 className={b('title')}>TextInput (with right content)</h2>

                <div className={'size-examples'}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <TextInput
                        {...textInputProps}
                        size="s"
                        placeholder="s"
                        rightContent={<RightContent size="s" />}
                    />
                    <TextInput
                        {...textInputProps}
                        placeholder="m"
                        rightContent={<RightContent size="s" />}
                    />
                    <TextInput
                        {...textInputProps}
                        size="l"
                        placeholder="l"
                        rightContent={<RightContent size="m" />}
                    />
                    <TextInput
                        {...textInputProps}
                        size="xl"
                        placeholder="xl"
                        rightContent={<RightContent size="l" />}
                    />
                </div>

                <div className={b('state-examples')}>
                    <h3 className={b('section-header')}>States:</h3>

                    <div className={b('row')}>
                        <TextInput
                            {...textInputProps}
                            placeholder="error with message"
                            error={isErrorMessageVisible ? 'It happened a validation error' : true}
                            rightContent={<RightContent size="s" />}
                        />
                        <Checkbox
                            onUpdate={setErrorMessageVisibility}
                            checked={isErrorMessageVisible}
                        />
                    </div>
                    <TextInput
                        {...textInputProps}
                        placeholder="disabled"
                        rightContent={<RightContent size="s" disabled />}
                        disabled
                    />
                    <TextInput
                        {...textInputProps}
                        placeholder="clear"
                        rightContent={<RightContent size="s" />}
                        hasClear
                    />
                    <TextInput
                        {...textInputProps}
                        placeholder="default value"
                        value={undefined}
                        defaultValue="defaultValue"
                        rightContent={<RightContent size="s" />}
                    />
                </div>
            </div>

            <div className={b('text-area-examples')}>
                <h2 className={b('title')}>TextInput (multiline)</h2>

                <div className={b('size-examples')}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <TextInput {...textAreaProps} placeholder="dynamic height" />
                    <TextInput
                        {...textAreaProps}
                        placeholder="dynamic height & maxRows = 4"
                        maxRows={4}
                    />
                    <TextInput
                        {...textAreaProps}
                        placeholder="dynamic height & minRows = 2 & maxRows = 4 & clear"
                        minRows={2}
                        maxRows={4}
                        hasClear
                    />
                </div>

                <div className={b('state-examples')}>
                    <h3 className={b('section-header')}>States:</h3>

                    <TextInput {...textAreaProps} placeholder="dynamic height & clear" hasClear />
                    <div className={b('row')}>
                        <TextInput
                            {...textAreaProps}
                            placeholder="error with message"
                            error={isErrorMessageVisible ? 'It happened a validation error' : true}
                        />
                        <Checkbox
                            onUpdate={setErrorMessageVisibility}
                            checked={isErrorMessageVisible}
                        />
                    </div>
                    <TextInput {...textAreaProps} placeholder="disabled" disabled rows={2} />
                    <TextInput
                        {...textAreaProps}
                        placeholder="rows = 4 & clear"
                        hasClear
                        rows={4}
                    />
                    <TextInput
                        {...textAreaProps}
                        placeholder="resize vertical"
                        controlProps={{style: {resize: 'vertical'}}}
                        rows={4}
                    />
                </div>
            </div>
        </div>
    );
};
