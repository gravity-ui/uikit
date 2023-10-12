import React from 'react';

import {TextInput, TextInputProps} from '../TextInput';

export const TextInputWrapper = (props: TextInputProps) => {
    return (
        <div style={{padding: 20}}>
            <TextInput {...props} />
        </div>
    );
};

export const TextInputNote = () => {
    return <TextInputWrapper note={<div>Additional</div>} />;
};
