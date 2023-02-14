import React, {useCallback, useRef, ChangeEvent} from 'react';
import {Button, ButtonProps} from '../Button/Button';

import {block, CnBlock} from '../utils/cn';
import './ButtonAttach.scss';

export type ButtonAttachProps = Omit<ButtonProps, 'onClick'> & {
    onUpdate?: (files: File[]) => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    multiple?: boolean;
};

const cnButtonAttach: CnBlock = block('button-attach');

export const ButtonAttach = React.forwardRef<HTMLButtonElement, ButtonAttachProps>(
    ({onUpdate, onChange, accept, multiple = false, ...props}, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const handleClick = useCallback(() => {
            inputRef.current?.click();
        }, []);

        const handleInputChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                onChange?.(event);

                if (event.defaultPrevented) {
                    return;
                }

                onUpdate?.(Array.from(event.target.files || []));

                // If you will try to select the same file twice, so ChangeEvent will not happen without this if statement
                if (event.target.value !== '') {
                    event.target.value = '';
                }
            },
            [onChange, onUpdate],
        );

        return (
            <div className={cnButtonAttach()}>
                <Button {...props} ref={ref} onClick={handleClick} />
                <input
                    accept={accept}
                    multiple={multiple}
                    autoComplete="off"
                    className={cnButtonAttach('input')}
                    disabled={props.disabled}
                    onChange={handleInputChange}
                    ref={inputRef}
                    tabIndex={-1}
                    type="file"
                />
            </div>
        );
    },
);

ButtonAttach.displayName = 'ButtonAttach';
