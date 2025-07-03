import * as React from 'react';

import {Checkbox} from '../../../Checkbox';
import {Text} from '../../../Text';
import {cn} from '../../../utils/cn';
import {TextArea} from '../TextArea';
import type {TextAreaProps} from '../TextArea';

import './TextAreaShowcase.scss';

const b = cn('text-input-showcase');

export function TextAreaShowcase() {
    const [value, setValue] = React.useState('');
    const [isErrorMessageVisible, setErrorMessageVisibility] = React.useState(false);

    const textAreaProps: TextAreaProps = {
        className: b('text-area'),
        onUpdate: setValue,
        value,
    };

    return (
        <div className={b()}>
            <div className={b('text-area-examples')}>
                <div className={b('size-examples')}>
                    <h3 className={b('section-header')}>Sizes:</h3>

                    <TextArea {...textAreaProps} placeholder="dynamic height" />
                    <TextArea
                        {...textAreaProps}
                        placeholder="dynamic height & maxRows = 4"
                        maxRows={4}
                    />
                    <TextArea
                        {...textAreaProps}
                        placeholder="dynamic height & minRows = 2 & maxRows = 4 & clear"
                        minRows={2}
                        maxRows={4}
                        hasClear
                    />
                    <TextArea
                        {...textAreaProps}
                        rows={1}
                        placeholder="333px height from className"
                        className={b('custom-height')}
                    />
                </div>

                <div className={b('state-examples')}>
                    <h3 className={b('section-header')}>States:</h3>

                    <TextArea {...textAreaProps} placeholder="dynamic height & clear" hasClear />
                    <div className={b('row')}>
                        <TextArea
                            {...textAreaProps}
                            placeholder="error with message"
                            validationState={isErrorMessageVisible ? 'invalid' : undefined}
                            errorMessage={'A validation error has occurred'}
                        />
                        <Checkbox
                            onUpdate={setErrorMessageVisibility}
                            checked={isErrorMessageVisible}
                        />
                    </div>
                    <TextArea {...textAreaProps} placeholder="disabled" disabled rows={2} />
                    <TextArea
                        {...textAreaProps}
                        placeholder="readonly"
                        value="readonly value"
                        readOnly
                        rows={2}
                    />
                    <TextArea {...textAreaProps} placeholder="rows = 4 & clear" hasClear rows={4} />
                    <TextArea
                        {...textAreaProps}
                        placeholder="resize vertical"
                        controlProps={{style: {resize: 'vertical'}}}
                        rows={4}
                    />
                    <TextArea
                        {...textAreaProps}
                        placeholder="with note"
                        rows={4}
                        note={<Text color="secondary">Additional</Text>}
                    />
                    <TextArea
                        {...textAreaProps}
                        placeholder="with counter and long error message"
                        rows={4}
                        note={<Text color="secondary">Additional</Text>}
                        validationState="invalid"
                        errorMessage={
                            'It happened a very very very very very very very very very very very very very very very very very very very very very long validation error'
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export function TextAreaCustomShowcase() {
    const [value, setValue] = React.useState('');

    const textAreaProps: TextAreaProps = {
        className: b('text-area'),
        onUpdate: setValue,
        value,
        placeholder: 'placeholder',
    };
    return (
        <div className={b('text-area-examples')}>
            <div>
                <h3 className={b('section-header')}>Normal</h3>
                <TextArea
                    {...textAreaProps}
                    value={undefined}
                    defaultValue={`
multi
line
value`.trim()}
                />
                <TextArea {...textAreaProps} />
                <TextArea {...textAreaProps} value={undefined} defaultValue="has clear" hasClear />
                <TextArea {...textAreaProps} disabled />
                <TextArea
                    {...textAreaProps}
                    placeholder="readonly"
                    value="readonly value"
                    readOnly
                    rows={2}
                />
                <TextArea
                    {...textAreaProps}
                    validationState="invalid"
                    errorMessage="Error message"
                />
            </div>
            <div className={b('custom-theme')}>
                <h3 className={b('section-header')}>Custom theme</h3>
                <TextArea
                    {...textAreaProps}
                    value={undefined}
                    defaultValue={`
multi
line
value`.trim()}
                />
                <TextArea {...textAreaProps} />
                <TextArea {...textAreaProps} value={undefined} defaultValue="has clear" hasClear />
                <TextArea {...textAreaProps} disabled />
                <TextArea
                    {...textAreaProps}
                    placeholder="readonly"
                    value="readonly value"
                    readOnly
                    rows={2}
                />
                <TextArea
                    {...textAreaProps}
                    validationState="invalid"
                    errorMessage="Error message"
                />
            </div>
        </div>
    );
}
