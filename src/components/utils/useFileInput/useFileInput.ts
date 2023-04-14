/* eslint-disable valid-jsdoc */
import React from 'react';

export type UseFileInputProps = {
    ref: React.RefObject<HTMLInputElement>;
    onUpdate?: (files: File[]) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type UseFileInputOutput = {
    controlProps: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >;
    openDeviceStorage: () => void;
};

/**
 * Used to shape props for input with type "file".
 * 
 * Usage example:
 ```tsx
    import {Button, useFileInput} from '@gravity-ui/uikit';
    
    const Component = () => {
        const ref = React.useRef<HTMLInputElement>(null);
        const onUpdate = (files: File[]) => {
            // do some staff here
        }
        const {controlProps, openDeviceStorage} = useFileInput({ref, onUpdate});

        return (
            <React.Fragment>
                <input ref={ref} {...controlProps} />
                <Button onClick={openDeviceStorage}>Upload</Button>
            </React.Fragment>
        );
    };
```
*/
export function useFileInput({ref, onUpdate, onChange}: UseFileInputProps): UseFileInputOutput {
    const openDeviceStorage = React.useCallback(() => {
        ref.current?.click();
    }, [ref]);

    const handleChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(event);
            onUpdate?.(Array.from(event.target.files || []));
            // https://stackoverflow.com/a/12102992
            event.target.value = '';
        },
        [onChange, onUpdate],
    );

    return {
        controlProps: {
            type: 'file',
            tabIndex: -1,
            style: {opacity: 0, position: 'absolute', width: 1, height: 1},
            onChange: handleChange,
        },
        openDeviceStorage,
    };
}
