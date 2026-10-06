import * as React from 'react';

import {Plus, TrashBin} from '@gravity-ui/icons';
import type {Decorator, Meta, StoryObj} from '@storybook/react-webpack5';
import {escapeRegExp} from 'es-toolkit';
import {useArgs} from 'storybook/preview-api';

import {Select, getSelectOptionText} from '..';
import type {SelectOptionProps, SelectProps} from '..';
import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {Icon} from '../../Icon';
import {Radio} from '../../Radio';
import {Text} from '../../Text';
import {Tooltip} from '../../Tooltip';
import {ListVirtualizer} from '../../Virtualizer/ListVirtualizer';
import {TextInput} from '../../controls';
import {Flex} from '../../layout';
import {MobileProvider} from '../../mobile';
import {block} from '../../utils/cn';

import {SelectPopupWidthShowcase} from './SelectPopupWidthShowcase';
import {UseSelectOptionsShowcase} from './UseSelectOptionsShowcase';
import {WithActionButtonsShowcase} from './WithActionButtonsShowcase';

import './SelectShowcase.scss';

const b = block('select-showcase');

const meta: Meta<typeof Select> = {
    title: 'Components/Inputs/Select',
    component: Select,
    argTypes: {
        onUpdate: {
            action: 'onUpdate',
        },
    },
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                        selector: '.g-select-control__placeholder', // todo: https://github.com/gravity-ui/uikit/issues/1334
                    },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Select>;
type StoryArgs = Exclude<Story['args'], undefined>;

export const Default = {
    render: (args) => (
        <Flex gap={2}>
            <Select {...args} title="Select sample">
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="Value3" />
                <Select.Option value="val4" content="Value4" />
            </Select>
        </Flex>
    ),
} satisfies Story;

export const PopupWidth = {
    render: (args) => <SelectPopupWidthShowcase {...args} />,
} satisfies Story;

export const UseSelectOptions = {
    render: () => <UseSelectOptionsShowcase />,
    parameters: {
        controls: {
            disabled: true,
        },
    },
} satisfies Story;

export const Form = {
    render: (args) => (
        <form
            id="form"
            onSubmit={(event) => {
                event.preventDefault();
                alert(JSON.stringify([...new FormData(event.currentTarget).entries()]));
            }}
        >
            <label style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                Value: {Default.render({name: 'value', ...args})}
            </label>
            <div style={{marginBlockStart: '1em', display: 'flex', gap: 8}}>
                <Button type="submit" view="action">
                    Submit
                </Button>
                <Button type="reset">Reset</Button>
            </div>
        </form>
    ),
} satisfies Story;

export const WithActionButtons = {
    render: (args) => <WithActionButtonsShowcase {...args} />,
} satisfies Story;

const WithTitle: Decorator<StoryArgs> = (Story, context) => {
    return (
        <React.Fragment>
            <Text as="h3" variant="subheader-3" style={{margin: '0 0 4px'}}>
                {context.name}
            </Text>
            <Story />
        </React.Fragment>
    );
};

const showcaseArgs: StoryArgs = {
    view: 'normal',
    size: 'm',
    multiple: false,
    filterable: false,
    disabled: false,
    placeholder: 'Values',
    label: '',
    hasClear: false,
    title: 'Sample select',
};

export const Simple: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: showcaseArgs,
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        return (
            <Select {...args} value={value} onUpdate={(values) => setArgs({value: values})}>
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="Value3" />
                <Select.Option value="val4" content="Value4" />
            </Select>
        );
    },
};

const LETTER_OPTIONS = [
    {value: 'a', content: 'A'},
    {value: 'b', content: 'B'},
];
const NULLABLE_CASES: {
    title: string;
    options: SelectOptionProps<unknown, unknown>[];
    value: unknown[];
}[] = [
    {
        title: "'' with an option: a value",
        options: [{value: '', content: 'Any'}, ...LETTER_OPTIONS],
        value: [''],
    },
    {title: "'' without an option: no value", options: LETTER_OPTIONS, value: ['']},
    {title: 'null without an option: no value', options: LETTER_OPTIONS, value: [null]},
    {title: '0 without an option: a value', options: LETTER_OPTIONS, value: [0]},
    {title: "['', 'a']: the counter shows 1", options: LETTER_OPTIONS, value: ['', 'a']},
];

export const NullableValues: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: {...showcaseArgs, multiple: true, hasClear: true, hasCounter: true},
    render: function NullableValuesStory({view, size, multiple, hasClear, hasCounter}) {
        return (
            <Flex direction="column" gap={2}>
                {NULLABLE_CASES.map(({title, options, value}) => (
                    <Flex key={title} gap={2} alignItems="center">
                        <Select<unknown, unknown>
                            view={view}
                            size={size}
                            multiple={multiple}
                            hasClear={hasClear}
                            hasCounter={hasCounter}
                            width={200}
                            placeholder="Letter"
                            options={options}
                            defaultValue={value}
                        />
                        <Text color="secondary">{title}</Text>
                    </Flex>
                ))}
            </Flex>
        );
    },
};

export const WithGroups: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: showcaseArgs,
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        return (
            <Select {...args} value={value} onUpdate={(values) => setArgs({value: values})}>
                <Select.OptionGroup label="Group 1">
                    <Select.Option value="val1" content="Value1" />
                    <Select.Option value="val2" content="Value2" />
                </Select.OptionGroup>
                <Select.OptionGroup label="Group 2">
                    <Select.Option value="val3" content="Value3" />
                    <Select.Option value="val4" content="Value4" />
                </Select.OptionGroup>
                <Select.OptionGroup label="Group 3">
                    <Select.Option value="val5" content="Value5" />
                    <Select.Option value="val6" content="Value6" />
                </Select.OptionGroup>
            </Select>
        );
    },
};

export const WithDisabledOptions: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: showcaseArgs,
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        return (
            <Select {...args} value={value} onUpdate={(values) => setArgs({value: values})}>
                <Select.Option value="val1" content="Value1" disabled />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="Value3" disabled />
                <Select.Option value="val4" content="Value4" />
            </Select>
        );
    },
};

export const WithUserOptions: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: showcaseArgs,
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        return (
            <Select<{color: string}>
                {...args}
                options={undefined}
                value={value}
                onUpdate={(values) => setArgs({value: values})}
                renderOption={(option) => {
                    return (
                        <div style={{color: option.data?.color, height: 22, lineHeight: '22px'}}>
                            {option.content}
                        </div>
                    );
                }}
                renderOptionGroup={(optionGroup) => {
                    return <div style={{height: 32, lineHeight: '32px'}}>{optionGroup.label}</div>;
                }}
                getOptionHeight={() => 22}
                getOptionGroupHeight={() => 32}
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
        );
    },
};

const LANGUAGES = [
    {value: 'js', content: 'JavaScript'},
    {value: 'python', content: 'Python'},
    {value: 'ruby', content: 'Ruby'},
    {value: 'rust', content: 'Rust'},
];

function renderControlOption(Control: typeof Radio | typeof Checkbox): SelectProps['renderOption'] {
    return function renderOption(option, {selected}) {
        return (
            <span className={b('control-option')}>
                {/* Decoration: out of focus and the a11y tree (React 19: `inert`) */}
                <span {...{inert: ''}} className={b('control-option-indicator')}>
                    <Control value={option.value} checked={selected} />
                </span>
                {option.content}
            </span>
        );
    };
}

export const WithMobileCustomOptions: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: showcaseArgs,
    render: (args) => {
        const [single, setSingle] = React.useState<string[]>([]);
        const [multiple, setMultiple] = React.useState<string[]>([]);
        const props = {
            ...args,
            label: 'Language',
            options: LANGUAGES,
            selectionStyle: 'none',
            sheetClassName: b('mobile-sheet'),
        } satisfies SelectProps;

        return (
            <MobileProvider mobile>
                <Flex gap={2}>
                    <Select
                        {...props}
                        multiple={false}
                        value={single}
                        onUpdate={setSingle}
                        renderOption={renderControlOption(Radio)}
                    />
                    <Select
                        {...props}
                        multiple
                        value={multiple}
                        onUpdate={setMultiple}
                        renderOption={renderControlOption(Checkbox)}
                    />
                </Flex>
            </MobileProvider>
        );
    },
};

export const WithUserSelectedOptions: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: showcaseArgs,
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        return (
            <Select<{color: string}>
                {...args}
                options={undefined}
                value={value}
                onUpdate={(values) => setArgs({value: values})}
                renderOption={(option) => {
                    return (
                        <div style={{color: option.data?.color, height: 22, lineHeight: '22px'}}>
                            {option.content}
                        </div>
                    );
                }}
                renderSelectedOptions={(options) =>
                    options.map((option) => (
                        <span
                            key={option.value}
                            style={{
                                color: option.data?.color,
                                height: 22,
                                lineHeight: '22px',
                                marginRight: '6px',
                            }}
                        >
                            {option.content}
                        </span>
                    ))
                }
                getOptionHeight={() => 22}
            >
                <Select.Option value="val1" content="Value1" data={{color: 'green'}} />
                <Select.Option value="val2" content="Value2" data={{color: 'red'}} />
                <Select.Option value="val3" content="Value3" data={{color: 'pink'}} />
                <Select.Option value="val4" content="Value4" data={{color: 'purple'}} />
            </Select>
        );
    },
};

export const WithSelectionSummary: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: {...showcaseArgs, multiple: true, placeholder: 'Ticket types'},
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();
        const options = [
            {value: 'bug', content: 'Bug'},
            {value: 'task', content: 'Task'},
            {value: 'epic', content: 'Epic'},
        ];

        return (
            <Select
                {...args}
                options={options}
                value={value}
                onUpdate={(values) => setArgs({value: values})}
                renderSelectedOptions={(selected) =>
                    selected.length === options.length
                        ? 'All ticket types'
                        : selected.map((option) => option.content ?? option.value).join(' and ')
                }
            />
        );
    },
};

export const WithUserControlAndNativeCustomIcon: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: {
        ...showcaseArgs,
        hasClear: true,
        value: ['val2'],
    },
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        return (
            <Select
                {...args}
                value={value}
                onUpdate={(values) => setArgs({value: values})}
                className={b('user-control')}
                renderControl={({
                    ref,
                    renderClear,
                    triggerProps: {onClick, disabled, id, ...extraProps},
                }) => {
                    return (
                        <Flex>
                            <Button
                                id={id}
                                ref={ref as React.Ref<HTMLButtonElement>}
                                view="action"
                                onClick={onClick}
                                disabled={disabled}
                                aria-label={extraProps['aria-label'] || 'User control'}
                                className={b({'has-clear': args.hasClear})}
                                {...extraProps}
                            >
                                <span className={b('text')}>User control</span>
                            </Button>
                            {renderClear({
                                renderIcon: () => <Icon data={TrashBin} />,
                            })}
                        </Flex>
                    );
                }}
            >
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="\" />
                <Select.Option value="val4" content="Value4" />
            </Select>
        );
    },
};

export const WithUserControlAndCustomPlacement: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: showcaseArgs,
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        return (
            <Select
                {...args}
                value={value}
                onUpdate={(values) => setArgs({value: values})}
                className={b('user-control-placement')}
                popupPlacement={['bottom']}
                renderControl={({ref, triggerProps: {onClick, disabled, ...extraProps}}) => {
                    return (
                        <Button
                            ref={ref as React.Ref<HTMLButtonElement>}
                            view="action"
                            onClick={onClick}
                            disabled={disabled}
                            aria-label={extraProps['aria-label'] || 'Add'}
                            {...extraProps}
                        >
                            <Icon data={Plus} />
                        </Button>
                    );
                }}
            >
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="Value3" />
                <Select.Option value="val4" content="Value4" />
                <Select.Option value="val5" content="Some long value" />
            </Select>
        );
    },
};

export const WithVirtualizedList: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: showcaseArgs,
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        // Virtualization is opt-in: the wrapper comes from '@gravity-ui/uikit/virtualizer'
        return (
            <ListVirtualizer>
                <Select
                    {...args}
                    value={value}
                    onUpdate={(values) => setArgs({value: values})}
                    popupWidth={args.multiple ? 120 : undefined}
                >
                    {Array.from(new Array(100)).map((_, index) => (
                        <Select.Option
                            key={index}
                            value={`val${index + 1}`}
                            content={`Value ${index + 1}`}
                        />
                    ))}
                </Select>
            </ListVirtualizer>
        );
    },
};

export const WithCustomRendererAndTooltipAtDisabledItem: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: showcaseArgs,
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        return (
            <Select
                {...args}
                value={value}
                onUpdate={(values) => setArgs({value: values})}
                renderOption={(option) => {
                    return option.disabled ? (
                        <Tooltip content="Tooltip">
                            <span style={{color: option.disabled ? 'gray' : 'inherit'}}>
                                Hover here
                            </span>
                        </Tooltip>
                    ) : (
                        <span>{option.content}</span>
                    );
                }}
                // The disabled option draws something else than its content: the trigger, the
                // filter and the search by the first letters take the text from here
                getOptionText={(option) =>
                    option.disabled ? 'Hover here' : getSelectOptionText(option)
                }
            >
                <Select.Option value="1" content="1" />
                <Select.Option value="2" content="2" disabled />
            </Select>
        );
    },
};

export const WithCustomFilterSection: StoryObj<
    React.ComponentProps<typeof Select> & {matchCase: boolean; matchWholeWord: boolean}
> = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: {
        ...showcaseArgs,
        filterable: true,
        matchCase: false,
        matchWholeWord: false,
    },
    render: (args) => {
        const [{value, matchCase, matchWholeWord}, setArgs] = useArgs<typeof args>();

        return (
            <Select
                {...args}
                value={value}
                onUpdate={(values) => setArgs({value: values})}
                renderFilter={({
                    ref,
                    style,
                    inputProps: {value, onChange, onKeyDown, ...controlProps},
                }) => {
                    return (
                        <div
                            style={{...style, display: 'flex', flexDirection: 'column', rowGap: 4}}
                        >
                            <TextInput
                                controlRef={ref}
                                controlProps={controlProps}
                                value={value}
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                            />
                            <div style={{display: 'flex', columnGap: 2}}>
                                <Button
                                    selected={matchCase}
                                    onClick={() => setArgs({matchCase: !matchCase})}
                                >
                                    Ab
                                </Button>
                                <Button
                                    selected={matchWholeWord}
                                    onClick={() => setArgs({matchWholeWord: !matchWholeWord})}
                                >
                                    <span style={{textDecoration: 'underline'}}>ab</span>
                                </Button>
                            </div>
                        </div>
                    );
                }}
                filterOption={
                    matchCase || matchWholeWord
                        ? (option, filter) => {
                              const flags = matchCase ? '' : 'i';
                              const escapedFilter = escapeRegExp(filter);
                              const resultFilter = matchWholeWord
                                  ? `\\b${escapedFilter}\\b`
                                  : escapedFilter;
                              const regExp = new RegExp(resultFilter, flags);
                              return regExp.test(option.content as string);
                          }
                        : undefined
                }
            >
                <Select.Option value="val1" content="Value 1" />
                <Select.Option value="val2" content="val" />
                <Select.Option value="val3" content="Value" />
                <Select.Option value="val4" content="value" />
            </Select>
        );
    },
};

export const WithCustomPopup: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: {
        ...showcaseArgs,
        filterable: true,
    },
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        return (
            <Select
                {...args}
                value={value}
                onUpdate={(values) => setArgs({value: values})}
                renderPopup={({renderFilter, renderList}) => {
                    return (
                        <React.Fragment>
                            <div>{'---- Before Filter ----'}</div>
                            {renderFilter()}
                            <div>{'---- After Filter, Before List ----'}</div>
                            {renderList()}
                            <div>{'---- After List ----'}</div>
                        </React.Fragment>
                    );
                }}
            >
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="Value3" />
                <Select.Option value="val4" content="Value4" />
            </Select>
        );
    },
};

export const WithOutsideError: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: {
        ...showcaseArgs,
        errorPlacement: 'outside',
        errorMessage: 'A validation error has occurred',
        validationState: 'invalid',
    },
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        return (
            <Select {...args} value={value} onUpdate={(values) => setArgs({value: values})}>
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="Value3" />
                <Select.Option value="val4" content="Value4" />
            </Select>
        );
    },
};

export const WithInsideError: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: {
        ...showcaseArgs,
        errorPlacement: 'inside',
        errorMessage: 'A validation error has occurred',
        validationState: 'invalid',
    },
    render: WithOutsideError.render,
};

export const WithCounter: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: {
        ...showcaseArgs,
        multiple: true,
        hasCounter: true,
        value: ['val1', 'val2'],
    },
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        return (
            <Select {...args} value={value} onUpdate={(values) => setArgs({value: values})}>
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="Value3" />
                <Select.Option value="val4" content="Value4" />
            </Select>
        );
    },
};

export const WithCustomCounter: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    args: {
        ...showcaseArgs,
        multiple: true,
        hasCounter: true,
        value: ['val1', 'val2', 'val3'],
    },
    render: (args) => {
        const [{value}, setArgs] = useArgs<typeof args>();

        return (
            <Select
                {...args}
                value={value}
                onUpdate={(values) => setArgs({value: values})}
                renderCounter={(_, {count, disabled}) => {
                    if (count === 0) {
                        return null;
                    }
                    if (count >= 2) {
                        return (
                            <div
                                style={{
                                    padding: '0 8px',
                                    color: disabled ? '#999' : '#027bf3',
                                    fontWeight: 'bold',
                                }}
                            >
                                +{count}
                            </div>
                        );
                    }
                    return count;
                }}
            >
                <Select.Option value="val1" content="Value1" />
                <Select.Option value="val2" content="Value2" />
                <Select.Option value="val3" content="Value3" />
                <Select.Option value="val4" content="Value4" />
            </Select>
        );
    },
};
