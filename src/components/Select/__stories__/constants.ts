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
    renderControl: () => {
        return <Button view="action">User control</Button>;
    },
    onUpdate={(nextValue) => setValue1(nextValue)}
>
    <Select.Option value="val1" content="Value1" />
    <Select.Option value="val2" content="Value2" />
    <Select.Option value="val3" content="\\" />
    <Select.Option value="val4" content="Value4" />
</Select>
`;
