import React from 'react';

import type {SelectProps} from '..';
import {Select} from '..';
import {useSelectAllFilter} from '../../../hooks';
import {ClipboardButton} from '../../ClipboardButton';
import {RadioButton} from '../../RadioButton';
import {block} from '../../utils/cn';
import {generateOptions} from '../__tests__/utils';

import {Mode, radioButtonOptions} from './SelectShowcase';
import {EXAMPLE_JSON_OPTIONS} from './constants';

const b = block('select-showcase');

const ExampleSelectAllItem = (props: {
    title: string;
    selectProps: SelectProps;
    code?: string[];
    children?: SelectProps['children'];
}) => {
    const {title, selectProps, children, code = []} = props;
    const multiple = props.selectProps.multiple;
    const [mode, setMode] = React.useState(Mode.VIEW);
    const [value, setValue] = React.useState<string[]>([]);

    React.useEffect(() => {
        if (!multiple) {
            setValue([]);
        }
    }, [multiple]);

    const onUpdate = (nextValue: string[]) => setValue(nextValue);

    const {renderFilter} = useSelectAllFilter({
        value: value,
        options: selectProps.options,
        onUpdate: onUpdate,
        hasClear: true,
        buttonPosition: 'right',
    });

    return (
        <div className={b('example-item')}>
            <h3>
                {title}
                {Boolean(code.length) && (
                    <RadioButton
                        className={b('example-item-radio')}
                        size="s"
                        value={mode}
                        onUpdate={(nextMode) => setMode(nextMode)}
                    >
                        <RadioButton.Option {...radioButtonOptions[0]} />
                        <RadioButton.Option {...radioButtonOptions[1]} />
                    </RadioButton>
                )}
            </h3>
            {mode === Mode.VIEW ? (
                <Select
                    {...selectProps}
                    value={value}
                    onUpdate={onUpdate}
                    renderFilter={renderFilter}
                    filterable
                    multiple
                >
                    {children}
                </Select>
            ) : (
                code.map((codeItem, i) => {
                    return (
                        <React.Fragment key={`${title}-${i}`}>
                            <pre>
                                {codeItem}
                                <ClipboardButton
                                    className={b('copy-button')}
                                    size={16}
                                    text={codeItem}
                                />
                            </pre>
                        </React.Fragment>
                    );
                })
            )}
        </div>
    );
};

export const SelectHooks = (props: SelectProps) => {
    return (
        <div className={b()}>
            <ExampleSelectAllItem
                title="Select with select all hook"
                code={[EXAMPLE_JSON_OPTIONS]}
                selectProps={{
                    ...props,
                    options: generateOptions([
                        ['val1', 'val1'],
                        ['val11', 'val11'],
                        ['val2', 'val2'],
                        ['val3', 'val3'],
                    ]),
                }}
            />
        </div>
    );
};
