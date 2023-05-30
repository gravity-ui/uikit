import React, {Ref, TransitionEventHandler, useCallback, useRef} from 'react';

import {ControlGroupOption, ControlGroupProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {useRadioGroup} from '../utils/useRadioGroup';

import {RadioButtonOption as Option} from './RadioButtonOption';

import './RadioButton.scss';

const b = block('radio-button');

export type RadioButtonOption = ControlGroupOption;
export type RadioButtonSize = 's' | 'm' | 'l' | 'xl';
export type RadioButtonWidth = 'auto' | 'max';

export interface RadioButtonProps extends ControlGroupProps, DOMProps, QAProps {
    size?: RadioButtonSize;
    width?: RadioButtonWidth;
    children?: React.ReactElement<ControlGroupOption> | React.ReactElement<ControlGroupOption>[];
}

interface RadioButtonComponent
    extends React.ForwardRefExoticComponent<
        RadioButtonProps & React.RefAttributes<HTMLDivElement>
    > {
    Option: React.ComponentType<ControlGroupOption>;
}

export const RadioButton = React.forwardRef<HTMLDivElement, RadioButtonProps>(function RadioButton(
    props,
    ref,
) {
    const {size = 'm', width, style, className, qa, children} = props;
    let options = props.options;

    if (!options) {
        options = (
            React.Children.toArray(children) as React.ReactElement<ControlGroupOption>[]
        ).map(({props}) => ({
            value: props.value,
            content: props.content || props.children,
            disabled: props.disabled,
        }));
    }

    const plateRef = useRef<HTMLDivElement>(null);
    const optionRef = useRef<HTMLLabelElement>();

    const handleCheckedOptionMount: Ref<HTMLLabelElement> = useCallback(
        (checkedOptionNode: HTMLLabelElement | null) => {
            if (!checkedOptionNode) {
                return;
            }

            const plateNode = plateRef.current;

            if (!plateNode) {
                return;
            }

            const uncheckedOptionNode = optionRef.current;

            if (uncheckedOptionNode && uncheckedOptionNode !== checkedOptionNode) {
                const setPlateStyle = (node: HTMLElement) => {
                    plateNode.style.left = `${node.offsetLeft}px`;
                    plateNode.style.width = `${node.offsetWidth}px`;
                };

                setPlateStyle(uncheckedOptionNode);

                plateNode.hidden = false;

                setPlateStyle(checkedOptionNode);
            }

            optionRef.current = checkedOptionNode;
        },
        [],
    );

    const handlePlateTransitionEnd: TransitionEventHandler<HTMLDivElement> = useCallback(
        (event) => {
            event.currentTarget.hidden = true;
        },
        [],
    );

    const {containerProps, optionsProps} = useRadioGroup({...props, options});

    return (
        <div
            {...containerProps}
            ref={ref}
            style={style}
            className={b({size, width}, className)}
            data-qa={qa}
        >
            <div
                ref={plateRef}
                className={b('plate')}
                onTransitionEnd={handlePlateTransitionEnd}
                hidden
            />
            {optionsProps.map((optionProps) => (
                <Option
                    {...optionProps}
                    key={optionProps.value}
                    ref={optionProps.checked ? handleCheckedOptionMount : undefined}
                />
            ))}
        </div>
    );
}) as RadioButtonComponent;

RadioButton.Option = Option;
