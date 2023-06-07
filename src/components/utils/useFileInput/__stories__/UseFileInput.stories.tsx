import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../../Button';
import {useFileInput} from '../useFileInput';

export default {title: 'Hooks/useFileInput'} as Meta;

const DefaultTemplate: StoryFn = () => {
    const onUpdate = React.useCallback((files: File[]) => console.log(files), []);
    const {controlProps, triggerProps} = useFileInput({onUpdate});

    return (
        <React.Fragment>
            <input {...controlProps} />
            <Button {...triggerProps}>Upload</Button>
        </React.Fragment>
    );
};

export const Default = DefaultTemplate.bind({});
