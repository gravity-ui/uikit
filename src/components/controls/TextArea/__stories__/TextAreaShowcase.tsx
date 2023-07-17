import React from 'react';

import block from 'bem-cn-lite';

import {Checkbox} from '../../../Checkbox';
import {TextArea} from '../TextArea';
import type {TextAreaProps} from '../TextArea';

import './TextAreaShowcase.scss';

const b = block('text-input-showcase');

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
                </div>

                <div className={b('state-examples')}>
                    <h3 className={b('section-header')}>States:</h3>

                    <TextArea {...textAreaProps} placeholder="dynamic height & clear" hasClear />
                    <div className={b('row')}>
                        <TextArea
                            {...textAreaProps}
                            placeholder="error with message"
                            error={isErrorMessageVisible ? 'It happened a validation error' : true}
                        />
                        <Checkbox
                            onUpdate={setErrorMessageVisibility}
                            checked={isErrorMessageVisible}
                        />
                    </div>
                    <TextArea {...textAreaProps} placeholder="disabled" disabled rows={2} />
                    <TextArea {...textAreaProps} placeholder="rows = 4 & clear" hasClear rows={4} />
                    <TextArea
                        {...textAreaProps}
                        placeholder="resize vertical"
                        controlProps={{style: {resize: 'vertical'}}}
                        rows={4}
                    />
                </div>
            </div>
        </div>
    );
}
