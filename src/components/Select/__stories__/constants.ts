export const EXAMPLE_JSON_OPTIONS = `const [value, setValue] = React.useState<string[]>([]);

<Select
    value={value}
    placeholder="Values",
    options={[
        {
            value: 'val1',
            content: 'Value1',
        },
        {
            value: 'val2',
            content: 'Value2',
        },
        {
            value: 'val3',
            content: 'Value3',
        },
        {
            value: 'val4',
            content: 'Value4',
        },
    ]},
    onUpdate={(nextValue) => setValue1(nextValue)}
/>`;

export const EXAMPLE_CHILDREN_OPTIONS = `const [value, setValue] = React.useState<string[]>([]);

<Select
    value={value}
    placeholder="Values",
    onUpdate={(nextValue) => setValue1(nextValue)}
>
    <Select.Option value="val1">Value1</Select.Option>
    <Select.Option value="val2">Value2</Select.Option>
    <Select.Option value="val3" content="Value3" />
    <Select.Option value="val4" content="Value4" />
</Select>
`;

export const EXAMPLE_GROUP_JSON_OPTIONS = `const [value, setValue] = React.useState<string[]>([]);

<Select
    value={value}
    placeholder="Values",
    options: [
        {
            label: 'Group 1',
            options: [
                {
                    value: 'val1',
                    content: 'Value1',
                },
                {
                    value: 'val2',
                    content: 'Value2',
                },
            ],
        },
        {
            label: 'Group 2',
            options: [
                {
                    value: 'val3',
                    content: 'Value3',
                },
                {
                    value: 'val4',
                    content: 'Value4',
                },
            ],
        },
    ],
    onUpdate={(nextValue) => setValue1(nextValue)}
/>`;

export const EXAMPLE_GROUP_CHILDREN_OPTIONS = `const [value, setValue] = React.useState<string[]>([]);

<Select
    value={value}
    placeholder="Values",
    onUpdate={(nextValue) => setValue1(nextValue)}
>
    <Select.OptionGroup label="Group 1">
        <Select.Option value="val1" content="Value1" />
        <Select.Option value="val2" content="Value2" />
    </Select.OptionGroup>
    <Select.OptionGroup label="Group 2">
        <Select.Option value="val3" content="Value3" />
        <Select.Option value="val4" content="Value4" />
    </Select.OptionGroup>
</Select>
`;

export const EXAMPLE_USER_OPTIONS = `const [value, setValue] = React.useState<string[]>([]);

<Select
    value={value}
    placeholder="Values",
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
    onUpdate={(nextValue) => setValue1(nextValue)}
>
    <Select.Option value="val1" content="Value1" data={{color: 'green'}} />
    <Select.Option value="val2" content="Value2" data={{color: 'red'}} />
    <Select.Option value="val3" content="Value3" data={{color: 'pink'}} />
    <Select.Option value="val4" content="Value4" data={{color: 'purple'}} />
</Select>
`;

export const EXAMPLE_USER_CONTROL = `const [value, setValue] = React.useState<string[]>([]);

<Select
    value={value}
    renderControl={({onClick, onKeyDown, ref}) => {
        return (
            <Button
                ref={ref}
                view="action"
                onClick={onClick}
                extraProps={{
                    onKeyDown,
                }}
            >
                User control
            </Button>
        );
    }},
    onUpdate={(nextValue) => setValue1(nextValue)}
>
    <Select.Option value="val1" content="Value1" />
    <Select.Option value="val2" content="Value2" />
    <Select.Option value="val3" content="\\" />
    <Select.Option value="val4" content="Value4" />
</Select>
`;

export const EXAMPLE_CUSTOM_RENDERER_WITH_DISABLED_ITEM = `import {Tooltip} from '@gravity-ui/uikit';

const [value, setValue] = React.useState<string[]>([]);

<Select
  value={value}
  renderOption={(option) => {
    return option.disabled ? (
        <Tooltip content="Tooltip">
            <span style={{color: option.disabled ? 'gray' : 'inherit'}}>
                Hover here
            </span>
        </Tooltip>
    ) : (
        <span>{option.content}</span>
    )}
  }>
    <Select.Option value="1" content="1" />
    <Select.Option value="2" content="2" disabled />
</Select>
`;

export const EXAMPLE_CUSTOM_FILTER_SECTION = `import {Button} from '@gravity-ui/uikit';
import {TextInput} from '@gravity-ui/uikit;

const [value, setValue] = React.useState<string[]>([]);

const renderFilter: SelectProps['renderFilter'] = (props) => {
    const {value, ref, onChange, onKeyDown} = props;

    return (
        <div style={{display: 'flex', flexDirection: 'column', rowGap: 4}}>
            <TextInput
                controlRef={ref}
                controlProps={{size: 1}}
                value={value}
                onUpdate={onChange}
                onKeyDown={onKeyDown}
            />
            <Button>Do smth</Button>
        </div>
    );
};

<Select
    value={value}
    placeholder="Values",
    onUpdate={(nextValue) => setValue1(nextValue)}
    renderFilter={renderFilter}
>
    <Select.Option value="val1" content="Value1" />
    <Select.Option value="val2" content="Value2" />
    <Select.Option value="val3" content="Value3" />
    <Select.Option value="val4" content="Value4" />
</Select>

`;
