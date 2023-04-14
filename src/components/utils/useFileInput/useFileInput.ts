/* eslint-disable valid-jsdoc */
import React from 'react';

export type UseFileInputProps = {
    onUpdate?: (files: File[]) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type UseFileInputOutput = {
    controlProps: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >;
    triggerProps: {
        onClick: () => void;
    };
};

/**
 * Used to shape props for input with type "file".
 * 
 * Usage example:
 ```tsx
    import {Button, useFileInput} from '@gravity-ui/uikit';
    
    const Component = () => {
        const onUpdate = (files: File[]) => {
            // do some staff here
        }
        const {controlProps, triggerProps} = useFileInput({onUpdate});

        return (
            <React.Fragment>
                <input {...controlProps} />
                <Button {...triggerProps}>Upload</Button>
            </React.Fragment>
        );
    };
```
*/
export function useFileInput({onUpdate, onChange}: UseFileInputProps): UseFileInputOutput {
    const ref = React.useRef<HTMLInputElement>(null);

    const handleChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(event);
            onUpdate?.(Array.from(event.target.files || []));
            // https://stackoverflow.com/a/12102992
            event.target.value = '';
        },
        [onChange, onUpdate],
    );

    const openDeviceStorage = React.useCallback(() => {
        ref.current?.click();
    }, []);

    const result: UseFileInputOutput = React.useMemo(
        () => ({
            controlProps: {
                ref,
                type: 'file',
                tabIndex: -1,
                style: {opacity: 0, position: 'absolute', width: 1, height: 1},
                onChange: handleChange,
            },
            triggerProps: {
                onClick: openDeviceStorage,
            },
        }),
        [handleChange, openDeviceStorage],
    );

    return result;
}
