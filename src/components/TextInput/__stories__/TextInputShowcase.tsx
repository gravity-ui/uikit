import React from 'react';
import block from 'bem-cn-lite';
import {Checkbox} from '../../Checkbox';
import {TextInput} from '../TextInput';
import {TextInputProps} from '../types';
import './TextInputShowcase.scss';

const b = block('text-input-showcase');

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
                    <h3 className={b('section-header')}>Размеры:</h3>

                    <TextInput {...textInputProps} size="s" placeholder="s" />
                    <TextInput {...textInputProps} placeholder="m" />
                    <TextInput {...textInputProps} size="l" placeholder="l" />
                    <TextInput {...textInputProps} size="xl" placeholder="xl" />
                </div>

                <div className={b('state-examples')}>
                    <h3 className={b('section-header')}>Состояния:</h3>

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

            <div className={b('text-area-examples')}>
                <h2 className={b('title')}>TextInput (multiline)</h2>

                <div className={b('size-examples')}>
                    <h3 className={b('section-header')}>Размеры:</h3>

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
                    <h3 className={b('section-header')}>Состояния:</h3>

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
                </div>
            </div>
        </div>
    );
};
