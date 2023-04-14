import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Button} from '../../../Button';
import {useFileInput} from '../useFileInput';

export default {title: 'Hooks/useFileInput'} as Meta;

const DefaultTemplate: Story = () => {
    const ref = React.useRef<HTMLInputElement>(null);
    const onUpdate = (files: File[]) => console.log(files);
    const {controlProps, openDeviceStorage} = useFileInput({ref, onUpdate});

    return (
        <React.Fragment>
            <input ref={ref} {...controlProps} />
            <Button onClick={openDeviceStorage}>Upload</Button>
        </React.Fragment>
    );
};

export const Default = DefaultTemplate.bind({});
