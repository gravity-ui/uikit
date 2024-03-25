import React from 'react';

import {Checkbox} from '../../../Checkbox';
import {Text} from '../../../Text';
import {cn} from '../../../utils/cn';
import {NumberInput} from '../NumberInput';
import type {NumberInputProps} from '../NumberInput';

import './NumberInputShowcase.scss';

const b = cn('number-input-showcase');

export const CustomThemeShowcase = () => {
    const [value, setValue] = React.useState('');
    const [isErrorMessageVisible, setErrorMessageVisibility] = React.useState(false);

    const NumberInputProps: NumberInputProps = {
        className: b('input'),
        onUpdate: setValue,
        value,
    };
    return (
        <div className={b('number-input-custom-css')}>
            <h2 className={b('title')}>NumberInput (with custom theme)</h2>

            <div className={'state-examples'}>
                <h3 className={b('section-header')}>Default:</h3>

                <NumberInput {...NumberInputProps} placeholder="default" />
                <div className={b('row')}>
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="error with message"
                        error={
                            isErrorMessageVisible ? 'A validation error has occurred' : undefined
                        }
                    />
                    <Checkbox
                        onUpdate={setErrorMessageVisibility}
                        checked={isErrorMessageVisible}
                    />
                </div>
                <NumberInput
                    {...NumberInputProps}
                    placeholder="inline error"
                    error="A validation error has occurred"
                    errorPlacement="inside"
                />
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

            <div className={b('custom-theme-examples')}>
                <h3 className={b('section-header')}>Themed:</h3>

                <NumberInput {...NumberInputProps} placeholder="default" />
                <div className={b('row')}>
                    <NumberInput
                        {...NumberInputProps}
                        placeholder="error with message"
                        error={
                            isErrorMessageVisible ? 'A validation error has occurred' : undefined
                        }
                    />
                    <Checkbox
                        onUpdate={setErrorMessageVisibility}
                        checked={isErrorMessageVisible}
                    />
                </div>
                <NumberInput
                    {...NumberInputProps}
                    placeholder="inline error"
                    error={'A validation error has occurred'}
                    errorPlacement="inside"
                />
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
    );
};
