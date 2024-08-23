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

export const EXAMPLE_DISABLED_OPTIONS = `const [value, setValue] = React.useState<string[]>([]);

<Select
    value={value}
    placeholder="Values",
    onUpdate={(nextValue) => setValue1(nextValue)}
>
    <Select.Option value="val1" content="Value1" />
    <Select.Option value="val2" content="Value2" disabled />
    <Select.Option value="val3" content="Value3" disabled />
    <Select.Option value="val4" content="Value4" />
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
    renderOptionGroup: (optionGroup) => {
        return (
            <div style={{height: 32, lineHeight: '32px'}}>{optionGroup.label}</div>
        );
    },
    getOptionHeight: () => 22,
    getOptionGroupHeight: () => 32,
    onUpdate={(nextValue) => setValue1(nextValue)}
>
    <Select.Option value="val1" content="Value1" data={{color: 'green'}} />
    <Select.Option value="val2" content="Value2" data={{color: 'red'}} />
    <Select.Option value="val3" content="Value3" data={{color: 'pink'}} />
    <Select.Option value="val4" content="Value4" data={{color: 'purple'}} />
    <Select.OptionGroup label="Group">
        <Select.Option value="val5" content="Value3" data={{color: 'orange'}} />
        <Select.Option value="val6" content="Value4" data={{color: 'yellow'}} />
    </Select.OptionGroup>
</Select>
`;

export const EXAMPLE_USER_CONTROL = `const [value, setValue] = React.useState<string[]>([]);

<Select
    value={value}
    renderControl={({onClick, onKeyDown, ref, renderClear, disabled}) => {
        return (
            <Button
                ref={ref}
                view="action"
                onClick={onClick}
                disabled={disabled}
                extraProps={{
                    onKeyDown,
                }}
            >
                User control
                {renderClear?.({
                    renderIcon: () => <Icon data={CrossIcon} />,
                })}
            </Button>
        );
    }}
    onUpdate={(nextValue) => setValue(nextValue)}
>
    <Select.Option value="val1" content="Value1" />
    <Select.Option value="val2" content="Value2" />
    <Select.Option value="val3" content="Value3" />
    <Select.Option value="val4" content="Value4" />
</Select>
`;

export const EXAMPLE_USER_CONTROL_WITH_PLACEMENT = `const [value, setValue] = React.useState<string[]>([]);

<Select
    value={value}
    popupPlacement={['bottom']}
    renderControl={({onClick, onKeyDown, ref, disabled}) => {
        return (
            <Button
                ref={ref}
                view="action"
                onClick={onClick}
                disabled={disabled}
                extraProps={{
                    onKeyDown,
                }}
            >
                <Icon data={Plus} />
            </Button>
        );
    }}
    onUpdate={(nextValue) => setValue(nextValue)}
>
    <Select.Option value="val1" content="Value1" />
    <Select.Option value="val2" content="Value2" />
    <Select.Option value="val3" content="Value3" />
    <Select.Option value="val4" content="Value4" />
    <Select.Option value="val5" content="Some long value" />
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
const [matchCase, setMatchCase] = React.useState(false);
const [matchWholeWord, setMatchWholeWord] = React.useState(false);

const getEscapedString = (str: string) => {
    return str.replace(/[-/\\^$*+?.()|[]{}]/g, '\\$&');
};

const getFilterOption = (): SelectProps['filterOption'] | undefined => {
    if (matchCase || matchWholeWord) {
        return (option, filter) => {
            const flags = matchCase ? '' : 'i';
            const escapedFilter = getEscapedString(filter);
            const resultFilter = matchWholeWord ? \`\\b\${escapedFilter}\\b\` : escapedFilter;
            const regExp = new RegExp(resultFilter, flags);
            return regExp.test(option.content as string);
        };
    }

    return undefined;
};

const renderFilter: SelectProps['renderFilter'] = ({value, ref, onChange, onKeyDown}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', rowGap: 4}}>
            <TextInput
                controlRef={ref}
                controlProps={{size: 1}}
                value={value}
                onUpdate={onChange}
                onKeyDown={onKeyDown}
            />
            <div style={{display: 'flex', columnGap: 2}}>
                <Button selected={matchCase} onClick={() => setMatchCase(!matchCase)}>
                    Ab
                </Button>
                <Button
                    selected={matchWholeWord}
                    onClick={() => setMatchWholeWord(!matchWholeWord)}
                >
                    <span style={{textDecoration: 'underline'}}>ab</span>
                </Button>
            </div>
        </div>
    );
};

<Select
    value={value}
    placeholder="Values",
    onUpdate={(nextValue) => setValue1(nextValue)}
    renderFilter={renderFilter}
    filterOption={getFilterOption()}
>
    <Select.Option value="val1" content="Value 1" />
    <Select.Option value="val2" content="val" />
    <Select.Option value="val3" content="Value" />
    <Select.Option value="val4" content="value" />
</Select>

`;

export const EXAMPLE_CUSTOM_POPUP = `const [value, setValue] = React.useState<string[]>([]);

<Select
    value={value}
    placeholder="Values",
    onUpdate={(nextValue) => setValue(nextValue)}
    filterable: true,
    renderPopup: ({renderFilter, renderList}) => {
        return (
            <React.Fragment>
                <div>{'---- Before Filter ----'}</div>
                {renderFilter()}
                <div>{'---- After Filter, Before List ----'}</div>
                {renderList()}
                <div>{'---- After List ----'}</div>
            </React.Fragment>
        );
    },
>
    <Select.Option value="val1" content="Value1" />
    <Select.Option value="val2" content="Value2" />
    <Select.Option value="val3" content="Value3" />
    <Select.Option value="val4" content="Value4" />
</Select>

`;
