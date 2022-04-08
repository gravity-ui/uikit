import React from 'react';
import {range} from 'lodash';
import {block} from '../../utils/cn';
import {ClipboardButton} from '../../ClipboardButton';
import {RadioButton, RadioButtonOption} from '../../RadioButton';
import {Select, SelectProps, SelectOption} from '..';
import {
    EXAMPLE_JSON_OPTIONS,
    EXAMPLE_CHILDREN_OPTIONS,
    EXAMPLE_GROUP_JSON_OPTIONS,
    EXAMPLE_GROUP_CHILDREN_OPTIONS,
    EXAMPLE_CUSTOM_OPTIONS,
} from './constants';

import './SelectShowcase.scss';

const b = block('select-showcase');
const Mode = {
    CODE: 'code',
    VIEW: 'view',
};

const generateItems = (count: number): SelectOption[] => {
    return range(0, count).map((i) => ({
        value: `val${i + 1}`,
        content: `Value ${i + 1}`,
    }));
};

const radioButtonOptions: RadioButtonOption[] = [
    {value: Mode.VIEW, content: 'View'},
    {value: Mode.CODE, content: 'Code'},
];

const ExampleItem = (props: {
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
                    onUpdate={(nextValue) => setValue(nextValue)}
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

export const SelectShowcase = (props: SelectProps) => {
    return (
        <div className={b()}>
            <ExampleItem
                title="Simple select"
                code={[EXAMPLE_JSON_OPTIONS, EXAMPLE_CHILDREN_OPTIONS]}
                selectProps={props}
            >
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="Value3" />
                <Select.Option value="val4" content="Value4" />
            </ExampleItem>
            <ExampleItem
                title="Select with groups"
                code={[EXAMPLE_GROUP_JSON_OPTIONS, EXAMPLE_GROUP_CHILDREN_OPTIONS]}
                selectProps={props}
            >
                <Select.OptionGroup label="Group 1">
                    <Select.Option value="val1" content="Value1" />
                    <Select.Option value="val2" content="Value2" />
                </Select.OptionGroup>
                <Select.OptionGroup label="Group 2">
                    <Select.Option value="val3" content="Value3" />
                    <Select.Option value="val4" content="Value4" />
                </Select.OptionGroup>
            </ExampleItem>
            <ExampleItem
                title="Select with custom options"
                code={[EXAMPLE_CUSTOM_OPTIONS]}
                selectProps={{
                    ...props,
                    renderOption: (option) => {
                        return (
                            <div
                                style={{color: option.data?.color, height: 22, lineHeight: '22px'}}
                            >
                                {option.content}
                            </div>
                        );
                    },
                    getOptionHeight: () => 22,
                }}
            >
                <Select.Option value="val1" content="Value1" data={{color: 'green'}} />
                <Select.Option value="val2" content="Value2" data={{color: 'red'}} />
                <Select.Option value="val3" content="Value3" data={{color: 'pink'}} />
                <Select.Option value="val4" content="Value4" data={{color: 'purple'}} />
            </ExampleItem>
            <ExampleItem
                title="Select with virtualized list"
                selectProps={{
                    ...props,
                    options: generateItems(1000),
                }}
            />
        </div>
    );
};
