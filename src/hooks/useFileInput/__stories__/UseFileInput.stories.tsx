import {Fragment, useCallback} from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Button} from '../../../components/Button';
import {useFileInput} from '../useFileInput';

export default {title: 'Hooks/useFileInput'} as Meta;

const DefaultTemplate: StoryFn = () => {
    const onUpdate = useCallback((files: File[]) => console.log(files), []);
    const {controlProps, triggerProps} = useFileInput({onUpdate});

    return (
        <Fragment>
            <input {...controlProps} />
            <Button {...triggerProps}>Upload</Button>
        </Fragment>
    );
};

export const Default = DefaultTemplate.bind({});
