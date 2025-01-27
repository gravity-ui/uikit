import * as React from 'react';

import {Checkbox} from '../../../Checkbox';
import {Text} from '../../../Text';
import {cn} from '../../../utils/cn';
import {TextInput} from '../TextInput';
import type {TextInputProps} from '../TextInput';

import './TextInputShowcase.scss';

const b = cn('text-input-showcase');

export const CustomThemeShowcase = () => {
    const [value, setValue] = React.useState('');
    const [isErrorMessageVisible, setErrorMessageVisibility] = React.useState(false);

    const textInputProps: TextInputProps = {
        className: b('input'),
        onUpdate: setValue,
        value,
    };
    return (
        <div className={b('text-input-custom-css')}>
            <h2 className={b('title')}>TextInput (with custom theme)</h2>

            <div className={'state-examples'}>
                <h3 className={b('section-header')}>Default:</h3>

                <TextInput {...textInputProps} placeholder="default" />
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
                <TextInput
                    {...textInputProps}
                    placeholder="inline error"
                    error="A validation error has occurred"
                    errorPlacement="inside"
                />
                <TextInput {...textInputProps} placeholder="disabled" disabled />
                <TextInput
                    {...textInputProps}
                    placeholder="disabled"
                    value="readonlyValue"
                    readOnly
                />
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

            <div className={b('custom-theme-examples')}>
                <h3 className={b('section-header')}>Themed:</h3>

                <TextInput {...textInputProps} placeholder="default" />
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
                <TextInput
                    {...textInputProps}
                    placeholder="inline error"
                    error="A validation error has occurred"
                    errorPlacement="inside"
                />
                <TextInput {...textInputProps} placeholder="disabled" disabled />
                <TextInput
                    {...textInputProps}
                    placeholder="disabled"
                    value="readonlyValue"
                    readOnly
                />
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
    );
};
