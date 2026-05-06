import * as React from 'react';

import {CircleExclamation, Cloud, FolderOpen, Magnifier} from '@gravity-ui/icons';
import type {Decorator, Meta, StoryObj} from '@storybook/react-webpack5';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import type {ListItemData} from '../../List';
import {Popup} from '../../Popup';
import {Text} from '../../Text';
import {Flex} from '../../layout';
import {Suggest} from '../Suggest';

import './Suggest.stories.scss';

const meta: Meta<typeof Suggest> = {
    title: 'Components/Inputs/Suggest',
    component: Suggest,
    argTypes: {
        onUpdate: {
            action: 'onUpdate',
        },
        onOptionClick: {
            action: 'onOptionClick',
        },
        onBlur: {
            action: 'onBlur',
        },
        onOpenChange: {
            action: 'onOpenChange',
        },
    },
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'aria-required-children',
                        enabled: false,
                    },
                    {
                        id: 'nested-interactive',
                        enabled: false,
                    },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Suggest>;

type Item = {
    value: string;
    content: string;
    description?: string;
    disabled?: boolean;
};

const worldCities: Item[] = [
    // "New" prefix - demonstrates shared prefix filtering
    {value: 'new-york', content: 'New York', description: 'United States'},
    {value: 'new-delhi', content: 'New Delhi', description: 'India'},
    {value: 'new-orleans', content: 'New Orleans', description: 'United States'},

    // "San" prefix - demonstrates progressive filtering
    {value: 'san-francisco', content: 'San Francisco', description: 'United States'},
    {value: 'san-diego', content: 'San Diego', description: 'United States'},
    {value: 'san-jose', content: 'San Jose', description: 'United States'},
    {value: 'santiago', content: 'Santiago', description: 'Chile'},
    {value: 'san-antonio', content: 'San Antonio', description: 'United States'},
    {value: 'san-salvador', content: 'San Salvador', description: 'El Salvador'},

    // Other Americas
    {value: 'los-angeles', content: 'Los Angeles', description: 'United States'},
    {value: 'boston', content: 'Boston', description: 'United States'},
    {value: 'toronto', content: 'Toronto', description: 'Canada'},
    {value: 'vancouver', content: 'Vancouver', description: 'Canada'},
    {value: 'montreal', content: 'Montreal', description: 'Canada'},
    {value: 'buenos-aires', content: 'Buenos Aires', description: 'Argentina'},
    {value: 'bogota', content: 'Bogotá', description: 'Colombia'},

    // Europe - "B" cities
    {value: 'barcelona', content: 'Barcelona', description: 'Spain'},
    {value: 'berlin', content: 'Berlin', description: 'Germany'},
    {value: 'budapest', content: 'Budapest', description: 'Hungary'},
    {value: 'brussels', content: 'Brussels', description: 'Belgium'},

    // Europe - Major cities
    {value: 'london', content: 'London', description: 'United Kingdom'},
    {value: 'paris', content: 'Paris', description: 'France'},
    {value: 'rome', content: 'Rome', description: 'Italy'},
    {value: 'milan', content: 'Milan', description: 'Italy'},
    {value: 'madrid', content: 'Madrid', description: 'Spain'},
    {value: 'lisbon', content: 'Lisbon', description: 'Portugal'},
    {value: 'vienna', content: 'Vienna', description: 'Austria'},
    {value: 'prague', content: 'Prague', description: 'Czech Republic'},
    {value: 'warsaw', content: 'Warsaw', description: 'Poland'},
    {value: 'amsterdam', content: 'Amsterdam', description: 'Netherlands'},
    {value: 'zurich', content: 'Zurich', description: 'Switzerland'},
    {value: 'copenhagen', content: 'Copenhagen', description: 'Denmark'},
    {value: 'oslo', content: 'Oslo', description: 'Norway'},
    {value: 'helsinki', content: 'Helsinki', description: 'Finland'},
    {value: 'athens', content: 'Athens', description: 'Greece'},
    {value: 'stockholm', content: 'Stockholm', description: 'Sweden'},
    {value: 'stuttgart', content: 'Stuttgart', description: 'Germany'},

    // Europe/Asia border
    {value: 'istanbul', content: 'Istanbul', description: 'Turkey'},
    {value: 'moscow', content: 'Moscow', description: 'Russia'},
    {value: 'saint-petersburg', content: 'Saint Petersburg', description: 'Russia'},

    // Asia
    {value: 'tokyo', content: 'Tokyo', description: 'Japan'},
    {value: 'beijing', content: 'Beijing', description: 'China'},
    {value: 'shanghai', content: 'Shanghai', description: 'China'},
    {value: 'hong-kong', content: 'Hong Kong', description: 'China'},
    {value: 'seoul', content: 'Seoul', description: 'South Korea'},
    {value: 'singapore', content: 'Singapore', description: 'Singapore'},
    {value: 'bangkok', content: 'Bangkok', description: 'Thailand'},
    {value: 'mumbai', content: 'Mumbai', description: 'India'},
    {value: 'dubai', content: 'Dubai', description: 'United Arab Emirates'},

    // Oceania
    {value: 'sydney', content: 'Sydney', description: 'Australia'},
    {value: 'melbourne', content: 'Melbourne', description: 'Australia'},
    {value: 'auckland', content: 'Auckland', description: 'New Zealand'},

    // Africa
    {value: 'cairo', content: 'Cairo', description: 'Egypt'},
    {value: 'cape-town', content: 'Cape Town', description: 'South Africa'},
    {value: 'nairobi', content: 'Nairobi', description: 'Kenya'},
];

// Helper to filter items
const filterItems = (items: Item[], filter: string): ListItemData<Item>[] => {
    const normalizedFilter = filter.trim().toLowerCase();
    if (!normalizedFilter) return items;

    return items.filter((item) => {
        return (
            item.value.toLowerCase().includes(normalizedFilter) ||
            item.content.toLowerCase().includes(normalizedFilter) ||
            item.description?.toLowerCase().includes(normalizedFilter)
        );
    });
};

// Default args for interactive stories
const defaultArgs = {
    placeholder: 'Search cities...',
    size: 'm' as const,
    disabled: false,
    hasClear: false,
    showOptionsOnEmptyValue: false,
    showNoOptionsMessage: true,
    debounce: 0,
    popupWidth: 'fit' as const,
};

export const Default: Story = {
    args: defaultArgs,
    render: function DefaultStory(args) {
        const [value, setValue] = React.useState('');

        const getOptions = React.useCallback((searchValue: string) => {
            return filterItems(worldCities, searchValue);
        }, []);

        const renderOption = React.useCallback(
            (item: Item) => (
                <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                    <Text color={item.disabled ? 'hint' : 'primary'}>{item.content}</Text>
                    {item.description && (
                        <Text variant="caption-2" color="secondary">
                            {item.description}
                        </Text>
                    )}
                </Flex>
            ),
            [],
        );

        const onOptionClick = React.useCallback((item: Item) => {
            setValue(item.content);
        }, []);

        return (
            <div style={{width: '100%', maxWidth: 600}}>
                <Suggest<Item>
                    placeholder={args.placeholder}
                    size={args.size}
                    disabled={args.disabled}
                    hasClear={args.hasClear}
                    showOptionsOnEmptyValue={args.showOptionsOnEmptyValue}
                    showNoOptionsMessage={args.showNoOptionsMessage}
                    debounce={args.debounce}
                    popupWidth={args.popupWidth}
                    value={value}
                    onUpdate={setValue}
                    getOptions={getOptions}
                    onOptionClick={onOptionClick}
                    renderOption={renderOption}
                    className="suggest-stories-full-width"
                />
            </div>
        );
    },
};

const WithTitle: Decorator = (Story, context) => {
    return (
        <React.Fragment>
            <Text as="h3" variant="subheader-3" style={{margin: '0 0 4px'}}>
                {context.name}
            </Text>
            <Story />
        </React.Fragment>
    );
};

const makeSourceParameters = (code: string) => ({
    docs: {
        source: {
            language: 'tsx',
            code,
        },
    },
});

export const BasicUsage: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    parameters: makeSourceParameters(`const [value, setValue] = React.useState('');

const getOptions = (searchValue: string) => {
    return cities.filter((item) =>
        item.content.toLowerCase().includes(searchValue.toLowerCase()),
    );
};

return (
    <Suggest<Item>
        value={value}
        onUpdate={setValue}
        getOptions={getOptions}
        onOptionClick={(item) => setValue(item.content)}
        placeholder="Type to search..."
        renderOption={(item) => (
            <Flex direction="column" gap={0.5} spacing={{p: 1}}>
                <Text>{item.content}</Text>
                {item.description && (
                    <Text variant="caption-2" color="secondary">
                        {item.description}
                    </Text>
                )}
            </Flex>
        )}
    />
);`),
    render: () => <BasicExample />,
};

export const Sizes: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    parameters: makeSourceParameters(`<Flex direction="column" gap={3}>
    {(['s', 'm', 'l', 'xl'] as const).map((size) => (
        <Suggest<Item>
            key={size}
            value={value}
            onUpdate={setValue}
            getOptions={getOptions}
            size={size}
            placeholder={\`Size \${size}\`}
        />
    ))}
</Flex>`),
    render: () => <SizesExample />,
};

export const WithAsyncFetch: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    parameters: makeSourceParameters(`const getOptions = async (searchValue: string) => {
    // Simulate async API call (800ms delay)
    await new Promise((resolve) => setTimeout(resolve, 800));
    return await fetchOptionsFromApi(searchValue);
};

return (
    <Suggest<Item>
        value={value}
        onUpdate={setValue}
        getOptions={getOptions}
        onOptionClick={(item) => setValue(item.content)}
        placeholder="Type to trigger async fetch..."
    />
);`),
    render: () => <AsyncFetchExample />,
};

export const WithDebounce: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    parameters: makeSourceParameters(`<Suggest<Item>
    value={value}
    onUpdate={setValue}
    getOptions={getOptions}
    onOptionClick={(item) => setValue(item.content)}
    debounce={500}
    placeholder="Type to see debounce in action..."
/>`),
    render: () => <DebounceExample />,
};

export const WithErrorHandling: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    parameters: makeSourceParameters(`const getOptions = async (searchValue: string) => {
    const response = await fetch(\`/api/search?q=\${searchValue}\`);
    if (!response.ok) {
        throw new Error('Network request failed');
    }
    return response.json();
};

return (
    <Suggest<Item>
        value={value}
        onUpdate={setValue}
        getOptions={getOptions}
        onOptionClick={(item) => setValue(item.content)}
        placeholder="Type to trigger error..."
    />
);`),
    render: () => <ErrorExample />,
};

export const CustomEmptyState: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    parameters: makeSourceParameters(`<Suggest<Item>
    value={value}
    onUpdate={setValue}
    getOptions={getOptions}
    onOptionClick={(item) => setValue(item.content)}
    placeholder="Try typing 'xyz' to see empty state..."
    renderEmptyOptions={() => (
        <Flex direction="column" gap={1} alignItems="center" spacing={{py: 4}}>
            <Text variant="subheader-1" color="secondary">
                🔍 No matches found
            </Text>
            <Text variant="caption-2" color="hint">
                Try a different search term
            </Text>
        </Flex>
    )}
/>`),
    render: () => <EmptyStateExample />,
};

export const Disabled: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    parameters: makeSourceParameters(`<Suggest<Item>
    value="Earth"
    onUpdate={() => {}}
    getOptions={getOptions}
    disabled
    placeholder="Disabled input"
/>`),
    render: () => <DisabledExample />,
};

export const WithClearButton: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    parameters: makeSourceParameters(`<Suggest<Item>
    value={value}
    onUpdate={setValue}
    getOptions={getOptions}
    onOptionClick={(item) => setValue(item.content)}
    hasClear
    placeholder="With clear button..."
/>`),
    render: () => <ClearButtonExample />,
};

export const InlineRenderStyle: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    parameters:
        makeSourceParameters(`// renderStyle="inline" renders options directly under the input,
// no portal/popup. Useful inside cards, sidebars, multi-step forms.

<Suggest<Item>
    value={value}
    onUpdate={setValue}
    getOptions={getOptions}
    onOptionClick={(item) => setValue(item.content)}
    renderStyle="inline"
    showOptionsOnEmptyValue
    placeholder="Inline mode — options expand the page flow"
    renderOption={(item) => <div>{item.content}</div>}
/>`),
    render: () => <InlineRenderStyleExample />,
};

export const CustomChildrenLayout: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    parameters: makeSourceParameters(`// Use the children render-prop to fully control the layout.
// You receive (input, options, loading) and return any JSX.

<Suggest<Item>
    value={value}
    onUpdate={setValue}
    getOptions={getOptions}
    onOptionClick={(item) => setValue(item.content)}
    placeholder="Search and pick a city"
>
    {(input, options, loading) => (
        <Flex direction="column" gap={2}>
            {input}
            <div className="results-panel">
                {loading
                    ? <Loader />
                    : options.map((opt) => (
                        <Card key={opt.value} item={opt} />
                    ))}
            </div>
        </Flex>
    )}
</Suggest>`),
    render: () => <CustomChildrenLayoutExample />,
};

export const SyncPopupOnResize: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    parameters:
        makeSourceParameters(`// syncPopupOnResize re-measures the input width on window resize.
// Useful when the surrounding layout can resize (responsive sidebars,
// drawers, etc.) without re-mounting the component.

<Suggest<Item>
    value={value}
    onUpdate={setValue}
    getOptions={getOptions}
    onOptionClick={(item) => setValue(item.content)}
    syncPopupOnResize
    placeholder="Open me, then resize the window"
/>`),
    render: () => <SyncPopupOnResizeExample />,
};

export const WithControlRef: Story = {
    tags: ['!dev'],
    decorators: [WithTitle],
    parameters:
        makeSourceParameters(`// controlRef gives you direct access to the underlying <input> DOM node,
// while the component still manages focus/keyboard internally.

const inputRef = React.useRef<HTMLInputElement>(null);

return (
    <Flex direction="column" gap={2}>
        <Flex gap={2}>
            <Button onClick={() => inputRef.current?.focus()}>Focus input</Button>
            <Button onClick={() => inputRef.current?.select()}>Select all</Button>
        </Flex>
        <Suggest<Item>
            value={value}
            onUpdate={setValue}
            getOptions={getOptions}
            controlRef={inputRef}
            placeholder="Use the buttons above to drive the input"
        />
    </Flex>
);`),
    render: () => <ControlRefExample />,
};

function BasicExample() {
    const [value, setValue] = React.useState('');

    const getOptions = React.useCallback((searchValue: string) => {
        return filterItems(worldCities, searchValue);
    }, []);

    return (
        <div style={{width: 350}}>
            <Suggest<Item>
                value={value}
                onUpdate={setValue}
                getOptions={getOptions}
                onOptionClick={(item) => setValue(item.content)}
                placeholder="Type to search..."
                renderOption={(item) => (
                    <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                        <Text>{item.content}</Text>
                        {item.description && (
                            <Text variant="caption-2" color="secondary">
                                {item.description}
                            </Text>
                        )}
                    </Flex>
                )}
            />
        </div>
    );
}

function SizesExample() {
    const [value, setValue] = React.useState('');

    const getOptions = React.useCallback((searchValue: string) => {
        return filterItems(worldCities, searchValue);
    }, []);

    return (
        <Flex direction="column" gap={3} style={{width: 350}}>
            {(['s', 'm', 'l', 'xl'] as const).map((size) => (
                <Flex key={size} direction="column" gap={1}>
                    <Text variant="caption-2" color="secondary">
                        Size: {size}
                    </Text>
                    <Suggest<Item>
                        value={value}
                        onUpdate={setValue}
                        getOptions={getOptions}
                        onOptionClick={(item) => setValue(item.content)}
                        size={size}
                        placeholder={`Size ${size}`}
                        renderOption={(item) => <div style={{padding: '8px'}}>{item.content}</div>}
                    />
                </Flex>
            ))}
        </Flex>
    );
}

function AsyncFetchExample() {
    const [value, setValue] = React.useState('');

    const getItems = React.useCallback(async (searchValue: string) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return filterItems(worldCities, searchValue);
    }, []);

    return (
        <div style={{width: 350}}>
            <Suggest<Item>
                value={value}
                onUpdate={setValue}
                getOptions={getItems}
                onOptionClick={(item) => setValue(item.content)}
                placeholder="Type to trigger async fetch..."
                renderOption={(item) => (
                    <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                        <Text>{item.content}</Text>
                        {item.description && (
                            <Text variant="caption-2" color="secondary">
                                {item.description}
                            </Text>
                        )}
                    </Flex>
                )}
            />
        </div>
    );
}

function DebounceExample() {
    const [value, setValue] = React.useState('');

    const getItems = React.useCallback(async (searchValue: string) => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return filterItems(worldCities, searchValue);
    }, []);

    return (
        <Flex direction="column" gap={1} style={{width: 350}}>
            <Text variant="caption-1" color="secondary">
                Debounce: 500ms (typing won&apos;t trigger fetch until you stop)
            </Text>
            <Suggest<Item>
                value={value}
                onUpdate={setValue}
                getOptions={getItems}
                onOptionClick={(item) => setValue(item.content)}
                debounce={500}
                placeholder="Type to see debounce in action..."
                renderOption={(item) => (
                    <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                        <Text>{item.content}</Text>
                        {item.description && (
                            <Text variant="caption-2" color="secondary">
                                {item.description}
                            </Text>
                        )}
                    </Flex>
                )}
            />
        </Flex>
    );
}

function ErrorExample() {
    const [value, setValue] = React.useState('');
    const [shouldError, setShouldError] = React.useState(true);

    const getItems = React.useCallback(
        async (searchValue: string) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            if (shouldError && searchValue) {
                throw new Error('Network request failed');
            }
            return filterItems(worldCities, searchValue);
        },
        [shouldError],
    );

    return (
        <Flex direction="column" gap={2} style={{width: 350}}>
            <Button
                view="outlined"
                size="s"
                onClick={() => setShouldError(!shouldError)}
                style={{alignSelf: 'flex-start'}}
            >
                {shouldError ? 'Disable Error' : 'Enable Error'}
            </Button>
            <Suggest<Item>
                value={value}
                onUpdate={setValue}
                getOptions={getItems}
                onOptionClick={(item) => setValue(item.content)}
                placeholder="Type to trigger error..."
                renderOption={(item) => (
                    <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                        <Text>{item.content}</Text>
                        {item.description && (
                            <Text variant="caption-2" color="secondary">
                                {item.description}
                            </Text>
                        )}
                    </Flex>
                )}
            />
        </Flex>
    );
}

function EmptyStateExample() {
    const [value, setValue] = React.useState('');

    const getOptions = React.useCallback((searchValue: string) => {
        return filterItems(worldCities, searchValue);
    }, []);

    return (
        <div style={{width: 350}}>
            <Suggest<Item>
                value={value}
                onUpdate={setValue}
                getOptions={getOptions}
                onOptionClick={(item) => setValue(item.content)}
                placeholder="Try typing 'xyz' to see empty state..."
                renderEmptyOptions={() => (
                    <Flex
                        direction="column"
                        gap={1}
                        alignItems="center"
                        spacing={{py: 4}}
                        style={{minHeight: 100}}
                    >
                        <Text variant="subheader-1" color="secondary">
                            🔍 No matches found
                        </Text>
                        <Text variant="caption-2" color="hint">
                            Try a different search term
                        </Text>
                    </Flex>
                )}
                renderOption={(item) => (
                    <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                        <Text>{item.content}</Text>
                        {item.description && (
                            <Text variant="caption-2" color="secondary">
                                {item.description}
                            </Text>
                        )}
                    </Flex>
                )}
            />
        </div>
    );
}

function DisabledExample() {
    const getOptions = React.useCallback(() => {
        return worldCities;
    }, []);

    return (
        <div style={{width: 350}}>
            <Suggest<Item>
                value="Earth"
                onUpdate={() => {}}
                getOptions={getOptions}
                disabled
                placeholder="Disabled input"
                renderOption={(item) => (
                    <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                        <Text>{item.content}</Text>
                    </Flex>
                )}
            />
        </div>
    );
}

function ClearButtonExample() {
    const [value, setValue] = React.useState('Earth');

    const getOptions = React.useCallback((searchValue: string) => {
        return filterItems(worldCities, searchValue);
    }, []);

    return (
        <div style={{width: 350}}>
            <Suggest<Item>
                value={value}
                onUpdate={setValue}
                getOptions={getOptions}
                onOptionClick={(item) => setValue(item.content)}
                hasClear
                placeholder="With clear button..."
                renderOption={(item) => (
                    <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                        <Text>{item.content}</Text>
                    </Flex>
                )}
            />
        </div>
    );
}

function InlineRenderStyleExample() {
    const [value, setValue] = React.useState('');

    const getOptions = React.useCallback((searchValue: string) => {
        return filterItems(worldCities, searchValue);
    }, []);

    return (
        <Flex direction="column" gap={2} style={{width: 350}}>
            <Text variant="caption-2" color="secondary">
                Options expand the document flow (no portal). The inline content has a
                <code> max-height: 40vh </code> with internal scroll, so when the list is long you
                can scroll inside it without the surrounding page jumping.
            </Text>
            <div
                style={{
                    padding: 16,
                    border: '1px solid var(--g-color-line-generic)',
                    borderRadius: 8,
                    background: 'var(--g-color-base-background)',
                }}
            >
                <Suggest<Item>
                    value={value}
                    onUpdate={setValue}
                    getOptions={getOptions}
                    onOptionClick={(item) => setValue(item.content)}
                    renderStyle="inline"
                    showOptionsOnEmptyValue
                    placeholder="Inline mode — start typing"
                    renderOption={(item) => (
                        <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                            <Text>{item.content}</Text>
                            {item.description && (
                                <Text variant="caption-2" color="secondary">
                                    {item.description}
                                </Text>
                            )}
                        </Flex>
                    )}
                />
                <Text variant="caption-2" color="hint" style={{marginTop: 12, display: 'block'}}>
                    ↑ The text below moves down as the list grows.
                </Text>
            </div>
        </Flex>
    );
}

function CustomChildrenLayoutExample() {
    const [value, setValue] = React.useState('');

    const getOptions = React.useCallback(async (searchValue: string) => {
        await new Promise((resolve) => setTimeout(resolve, 250));
        return filterItems(worldCities, searchValue).slice(0, 8);
    }, []);

    return (
        <Flex direction="column" gap={2} style={{width: 520}}>
            <Text variant="caption-2" color="secondary">
                The children render-prop replaces the default popup-based layout. Here we render the
                input on top and a custom results panel below — entirely styled by the consumer.
            </Text>
            <Suggest<Item>
                value={value}
                onUpdate={setValue}
                getOptions={getOptions}
                onOptionClick={(item) => setValue(item.content)}
                placeholder="Search a city — the panel below is fully custom"
            >
                {(input, options, loading) => (
                    <Flex direction="column" gap={2}>
                        {input}
                        <div
                            style={{
                                minHeight: 120,
                                padding: 12,
                                border: '1px dashed var(--g-color-line-generic)',
                                borderRadius: 8,
                            }}
                        >
                            {loading && (
                                <Text variant="caption-2" color="secondary">
                                    Loading…
                                </Text>
                            )}
                            {!loading && options.length === 0 && (
                                <Text variant="caption-2" color="hint">
                                    Type something to populate this panel.
                                </Text>
                            )}
                            {!loading && options.length > 0 && (
                                <Flex wrap="wrap" gap={1}>
                                    {options.map((opt) => (
                                        <Button
                                            key={opt.value}
                                            view="outlined"
                                            size="s"
                                            onClick={() => setValue(opt.content as string)}
                                        >
                                            {opt.content}
                                        </Button>
                                    ))}
                                </Flex>
                            )}
                        </div>
                    </Flex>
                )}
            </Suggest>
        </Flex>
    );
}

function SyncPopupOnResizeExample() {
    const [valueA, setValueA] = React.useState('');
    const [valueB, setValueB] = React.useState('');

    const getOptions = React.useCallback((searchValue: string) => {
        return filterItems(worldCities, searchValue).slice(0, 6);
    }, []);

    const renderOption = React.useCallback(
        (item: ListItemData<Item>) => (
            <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                <Text>{item.content}</Text>
            </Flex>
        ),
        [],
    );

    return (
        <Flex direction="column" gap={3}>
            <Text variant="caption-2" color="secondary">
                Focus either input to open its popup, then{' '}
                <strong>resize the browser window</strong> (drag the corner). The left popup has{' '}
                <code>syncPopupOnResize</code> enabled and its width re-measures the input on every
                window-resize event. The right popup keeps the width it had when it first opened.
            </Text>
            <Flex gap={3} style={{width: '100%'}}>
                <Flex direction="column" gap={1} style={{flex: 1, minWidth: 0}}>
                    <Text variant="caption-1">
                        With <code>syncPopupOnResize</code>
                    </Text>
                    <Suggest<Item>
                        value={valueA}
                        onUpdate={setValueA}
                        getOptions={getOptions}
                        onOptionClick={(item) => setValueA(item.content)}
                        syncPopupOnResize
                        showOptionsOnEmptyValue
                        placeholder="Focus me, then resize the window"
                        renderOption={renderOption}
                    />
                </Flex>
                <Flex direction="column" gap={1} style={{flex: 1, minWidth: 0}}>
                    <Text variant="caption-1">
                        Without <code>syncPopupOnResize</code>
                    </Text>
                    <Suggest<Item>
                        value={valueB}
                        onUpdate={setValueB}
                        getOptions={getOptions}
                        onOptionClick={(item) => setValueB(item.content)}
                        showOptionsOnEmptyValue
                        placeholder="Focus me, then resize the window"
                        renderOption={renderOption}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}

function ControlRefExample() {
    const [value, setValue] = React.useState('');
    const [info, setInfo] = React.useState('Click a button to interact with the input ref.');
    const inputRef = React.useRef<HTMLInputElement>(null);

    const getOptions = React.useCallback((searchValue: string) => {
        return filterItems(worldCities, searchValue);
    }, []);

    return (
        <Flex direction="column" gap={2} style={{width: 420}}>
            <Text variant="caption-2" color="secondary">
                <code>controlRef</code> exposes the underlying <code>&lt;input&gt;</code> DOM
                element so parents can drive focus, selection, or read DOM state — without losing
                the component&apos;s built-in keyboard / popup behavior.
            </Text>
            <Flex gap={1} wrap="wrap">
                <Button
                    view="outlined"
                    size="s"
                    onClick={() => {
                        inputRef.current?.focus();
                        setInfo('Called inputRef.current.focus()');
                    }}
                >
                    Focus input
                </Button>
                <Button
                    view="outlined"
                    size="s"
                    onClick={() => {
                        inputRef.current?.select();
                        setInfo('Called inputRef.current.select()');
                    }}
                >
                    Select all
                </Button>
                <Button
                    view="outlined"
                    size="s"
                    onClick={() => {
                        const node = inputRef.current;
                        if (!node) {
                            setInfo('Ref not attached yet');
                            return;
                        }
                        setInfo(
                            `value="${node.value}", caret=${node.selectionStart}, ` +
                                `width=${node.offsetWidth}px`,
                        );
                    }}
                >
                    Read state
                </Button>
            </Flex>
            <Suggest<Item>
                value={value}
                onUpdate={setValue}
                getOptions={getOptions}
                onOptionClick={(item) => setValue(item.content)}
                controlRef={inputRef}
                placeholder="Use the buttons above to drive the input"
                renderOption={(item) => (
                    <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                        <Text>{item.content}</Text>
                    </Flex>
                )}
            />
            <Text variant="caption-2" color="hint">
                {info}
            </Text>
        </Flex>
    );
}

// Generate large list for popup positioning test
const generateLargeList = () => {
    const items: Item[] = [];
    for (let i = 0; i < 1000; i++) {
        items.push({
            value: `item-${i}`,
            content: `Item ${i}`,
        });
    }
    return items;
};

const largeItems = generateLargeList();

export const PopupPosition: Story = {
    render: () => {
        const [value, setValue] = React.useState('');

        const getOptions = React.useCallback((searchValue: string) => {
            return largeItems.filter((item) =>
                item.content.toLowerCase().includes(searchValue.toLowerCase()),
            );
        }, []);

        return (
            <div className="suggest-stories-popup-position">
                <Text variant="caption-1" color="secondary" style={{marginBottom: 8}}>
                    This input is positioned at the bottom of the viewport to test popup positioning
                    (should open upward)
                </Text>
                <Suggest<Item>
                    value={value}
                    onUpdate={setValue}
                    getOptions={getOptions}
                    onOptionClick={(item) => setValue(item.content)}
                    placeholder="Type to see large list..."
                    popupClassName="suggest-stories-popup-position__popup"
                    className="suggest-stories-popup-position__input"
                    renderOption={(item) => <div style={{padding: '8px'}}>{item.content}</div>}
                />
            </div>
        );
    },
};

export const PopupStates: Story = {
    render: () => {
        type SuggestedItemType = {
            title: string;
            description: string;
        };

        const LOREM_WORDS = [
            'Lorem',
            'ipsum',
            'dolor',
            'sit',
            'amet',
            'consectetur',
            'adipiscing',
            'elit',
            'Vivamus',
            'nisi',
            'orci',
            'consequat',
            'ut',
            'feugiat',
            'in',
            'sapien',
        ];

        const getOptionsLocal = (text: string): SuggestedItemType[] => {
            const suggestedItems: SuggestedItemType[] = [];

            LOREM_WORDS.forEach((word, index) => {
                if (word.toLowerCase().includes(text.toLowerCase())) {
                    let description = '';

                    if (index === 0) {
                        description = LOREM_WORDS.slice(0, 3).join(' ');
                    } else if (index === LOREM_WORDS.length - 1) {
                        description = LOREM_WORDS.slice(-3).join(' ');
                    } else {
                        description = LOREM_WORDS.slice(index - 1, index + 2).join(' ');
                    }

                    suggestedItems.push({title: word, description});
                }
            });

            return suggestedItems;
        };

        const renderSuggestedItem = (item: SuggestedItemType) => (
            <div style={{padding: '8px 12px'}} title={item.description}>
                <div style={{fontSize: '13px', lineHeight: '18px', fontWeight: 500}}>
                    {item.title}
                </div>
                <div
                    style={{
                        fontSize: '11px',
                        lineHeight: '16px',
                        color: 'var(--g-color-text-secondary)',
                    }}
                >
                    {item.description}
                </div>
            </div>
        );

        // 1. Data fetch error (Default error)
        const DefaultErrorExample = () => {
            const [value1, setValue1] = React.useState('e');

            return (
                <div style={{marginBottom: '40px', width: '800px'}}>
                    <div style={{marginBottom: '8px'}}>Data fetch error</div>
                    <Suggest<SuggestedItemType>
                        value={value1}
                        onUpdate={setValue1}
                        getOptions={async () => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            throw new Error('Failed to fetch data');
                        }}
                        onOptionClick={(item) => setValue1(item.title)}
                        placeholder="e"
                        renderOption={renderSuggestedItem}
                        style={{width: '100%'}}
                    />
                </div>
            );
        };

        // 2. Data fetch error (Custom)
        const CustomErrorExample = () => {
            const [value2, setValue2] = React.useState('f');

            return (
                <div style={{marginBottom: '40px', width: '800px'}}>
                    <div style={{marginBottom: '8px'}}>Data fetch error (Custom)</div>
                    <Suggest<SuggestedItemType>
                        value={value2}
                        onUpdate={setValue2}
                        getOptions={async () => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            throw new Error('Custom error occurred');
                        }}
                        onOptionClick={(item) => setValue2(item.title)}
                        placeholder="f"
                        renderOption={renderSuggestedItem}
                        renderFetchOptionsError={({value, error}) => (
                            <div style={{padding: '24px 16px', textAlign: 'center'}}>
                                <div
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 600,
                                        marginBottom: '8px',
                                        color: 'var(--g-color-text-danger)',
                                    }}
                                >
                                    An error occurred
                                </div>
                                <div
                                    style={{
                                        fontSize: '13px',
                                        color: 'var(--g-color-text-secondary)',
                                        marginBottom: '8px',
                                    }}
                                >
                                    Failed to load data for query &quot;{value}&quot;
                                </div>
                                <div style={{fontSize: '12px', color: 'var(--g-color-text-hint)'}}>
                                    {error?.message}
                                </div>
                            </div>
                        )}
                        style={{width: '100%'}}
                    />
                </div>
            );
        };

        // 3. Nothing found (Default)
        const DefaultEmptyExample = () => {
            const [value3, setValue3] = React.useState('ee');

            return (
                <div style={{marginBottom: '40px', width: '800px'}}>
                    <div style={{marginBottom: '8px'}}>Nothing found</div>
                    <Suggest<SuggestedItemType>
                        value={value3}
                        onUpdate={setValue3}
                        getOptions={getOptionsLocal}
                        onOptionClick={(item) => setValue3(item.title)}
                        placeholder="e"
                        renderOption={renderSuggestedItem}
                        style={{width: '100%'}}
                    />
                </div>
            );
        };

        // 4. Nothing found (Custom)
        const CustomEmptyExample = () => {
            const [value4, setValue4] = React.useState('');

            return (
                <div style={{marginBottom: '40px', width: '800px'}}>
                    <div style={{marginBottom: '8px'}}>Nothing found (Custom)</div>
                    <div
                        style={{
                            fontSize: '13px',
                            color: 'var(--g-color-text-secondary)',
                            marginBottom: '8px',
                        }}
                    >
                        Enter any text to see the message
                    </div>
                    <Suggest<SuggestedItemType>
                        value={value4}
                        onUpdate={setValue4}
                        getOptions={getOptionsLocal}
                        onOptionClick={(item) => setValue4(item.title)}
                        placeholder="Enter text..."
                        renderOption={renderSuggestedItem}
                        renderEmptyOptions={({value}) => (
                            <div style={{padding: '24px 16px', textAlign: 'center'}}>
                                <div
                                    style={{fontSize: '15px', fontWeight: 600, marginBottom: '8px'}}
                                >
                                    Nothing found
                                </div>
                                <div
                                    style={{
                                        fontSize: '13px',
                                        color: 'var(--g-color-text-secondary)',
                                    }}
                                >
                                    No results found for query &quot;{value}&quot;. Try rephrasing
                                    your query.
                                </div>
                            </div>
                        )}
                        style={{width: '100%'}}
                    />
                </div>
            );
        };

        // 5. Nothing found (with optional icon)
        const EmptyWithIconExample = () => {
            const [valueIcon, setValueIcon] = React.useState('xyz');

            return (
                <div style={{marginBottom: '40px', width: '800px'}}>
                    <div style={{marginBottom: '8px'}}>Nothing found (with optional icon)</div>
                    <Suggest<SuggestedItemType>
                        value={valueIcon}
                        onUpdate={setValueIcon}
                        getOptions={getOptionsLocal}
                        onOptionClick={(item) => setValueIcon(item.title)}
                        placeholder="xyz"
                        renderOption={renderSuggestedItem}
                        emptyIcon={Magnifier}
                        style={{width: '100%'}}
                    />
                </div>
            );
        };

        // 6. Data fetch error (with optional icon)
        const ErrorWithIconExample = () => {
            const [valueErrIcon, setValueErrIcon] = React.useState('e');

            return (
                <div style={{marginBottom: '40px', width: '800px'}}>
                    <div style={{marginBottom: '8px'}}>Data fetch error (with optional icon)</div>
                    <Suggest<SuggestedItemType>
                        value={valueErrIcon}
                        onUpdate={setValueErrIcon}
                        getOptions={async () => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            throw new Error('Failed to fetch data');
                        }}
                        onOptionClick={(item) => setValueErrIcon(item.title)}
                        placeholder="e"
                        renderOption={renderSuggestedItem}
                        errorIcon={CircleExclamation}
                        style={{width: '100%'}}
                    />
                </div>
            );
        };

        return (
            <div style={{padding: '20px'}}>
                <Text variant="header-2" style={{marginBottom: '24px'}}>
                    Popup States
                </Text>
                <DefaultErrorExample />
                <CustomErrorExample />
                <DefaultEmptyExample />
                <CustomEmptyExample />
                <EmptyWithIconExample />
                <ErrorWithIconExample />
            </div>
        );
    },
};

// Individual popup state stories for visual testing
export const ShowOptionsOnEmptyValue: Story = {
    tags: ['!dev'],
    render: () => <ShowOptionsOnEmptyExample />,
};

export const PrefetchedOptions: Story = {
    render: () => <PrefetchedOptionsExample />,
};

export const PopupWidth: Story = {
    render: () => <PopupWidthExample />,
};

export const CustomPopupContent: Story = {
    tags: ['!dev'],
    render: () => {
        const [value, setValue] = React.useState('');

        return (
            <Suggest<Item>
                value={value}
                onUpdate={setValue}
                getOptions={async (searchValue) => {
                    await new Promise((resolve) => setTimeout(resolve, 300));
                    return filterItems(worldCities, searchValue);
                }}
                onOptionClick={(item) => setValue(item.content)}
                placeholder="Type to see custom popup..."
                renderPopup={({list, loading, error}) => (
                    <div style={{padding: '16px', background: '#f0f0f0'}}>
                        {loading && <Text>⏳ Searching...</Text>}
                        {error && <Text color="danger">❌ {error.message}</Text>}
                        {!loading && !error && list}
                    </div>
                )}
                renderOption={(item) => <div style={{padding: '8px'}}>{item.content}</div>}
            />
        );
    },
};

function ShowOptionsOnEmptyExample() {
    const [value, setValue] = React.useState('');

    const getOptions = React.useCallback((searchValue: string) => {
        return filterItems(worldCities, searchValue);
    }, []);

    return (
        <Flex direction="column" gap={1} style={{maxWidth: 400}}>
            <Text variant="caption-1" color="secondary">
                Click input to see all options (even when empty)
            </Text>
            <Suggest<Item>
                value={value}
                onUpdate={setValue}
                getOptions={getOptions}
                onOptionClick={(item) => setValue(item.content)}
                showOptionsOnEmptyValue
                placeholder="Click to see all options..."
                renderOption={(item) => (
                    <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                        <Text>{item.content}</Text>
                    </Flex>
                )}
            />
        </Flex>
    );
}

function PrefetchedOptionsExample() {
    const [value, setValue] = React.useState('');

    // Simulate async fetch
    const getOptions = React.useCallback(async (searchValue: string) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 300));

        // If empty and showOptionsOnEmptyValue is true, return all items
        if (!searchValue) {
            return worldCities;
        }

        return filterItems(worldCities, searchValue);
    }, []);

    return (
        <Flex direction="column" gap={1} style={{maxWidth: 400}}>
            <Text variant="subheader-2">Prefetched Options</Text>
            <Text variant="caption-1" color="secondary">
                Uses getOptions with getOptionsOnMount flag. Fetches data automatically on mount.
                Click input or type to search.
            </Text>
            <Suggest<Item>
                value={value}
                onUpdate={setValue}
                getOptions={getOptions}
                getOptionsOnMount={true}
                showOptionsOnEmptyValue={true}
                onOptionClick={(item) => setValue(item.content)}
                placeholder="Fetches on mount..."
                popupWidth="fit"
                renderOption={(item) => (
                    <Flex width="100%" direction="column" gap={0.5} spacing={{p: 1}}>
                        <Text>{item.content}</Text>
                        {item.description && (
                            <Text variant="caption-2" color="secondary">
                                {item.description}
                            </Text>
                        )}
                    </Flex>
                )}
            />
        </Flex>
    );
}

function PopupWidthExample() {
    const [valueFit, setValueFit] = React.useState('');
    const [valueAuto, setValueAuto] = React.useState('');
    const [valueFixed, setValueFixed] = React.useState('');

    // Return all items when empty, filtered items when searching
    const getOptionsFit = React.useCallback((searchValue: string) => {
        return filterItems(worldCities, searchValue);
    }, []);

    const getOptionsAuto = React.useCallback((searchValue: string) => {
        return filterItems(worldCities, searchValue);
    }, []);

    const getOptionsFixed = React.useCallback((searchValue: string) => {
        return filterItems(worldCities, searchValue);
    }, []);

    return (
        <Flex direction="column" gap={4}>
            <Flex direction="column" gap={1}>
                <Text variant="subheader-2">popupWidth=&quot;fit&quot; (matches input width)</Text>
                <Suggest<Item>
                    value={valueFit}
                    onUpdate={setValueFit}
                    getOptions={getOptionsFit}
                    getOptionsOnMount={true}
                    showOptionsOnEmptyValue={true}
                    onOptionClick={(item) => setValueFit(item.content)}
                    popupWidth="fit"
                    popupPlacement="bottom-start"
                    placeholder="Click to see popup width..."
                    renderOption={(item) => <div>{item.content}</div>}
                />
            </Flex>

            <Flex direction="column" gap={1}>
                <Text variant="subheader-2">popupWidth=&quot;auto&quot; (fits content)</Text>
                <Suggest<Item>
                    value={valueAuto}
                    onUpdate={setValueAuto}
                    getOptions={getOptionsAuto}
                    getOptionsOnMount={true}
                    showOptionsOnEmptyValue={true}
                    onOptionClick={(item) => setValueAuto(item.content)}
                    popupWidth="auto"
                    popupPlacement="bottom-start"
                    placeholder="Click to see popup width..."
                    renderOption={(item) => <div>{item.content}</div>}
                />
            </Flex>

            <Flex direction="column" gap={1}>
                <Text variant="subheader-2">popupWidth=240 (fixed 240px)</Text>
                <Suggest<Item>
                    value={valueFixed}
                    onUpdate={setValueFixed}
                    getOptions={getOptionsFixed}
                    getOptionsOnMount={true}
                    showOptionsOnEmptyValue={true}
                    onOptionClick={(item) => setValueFixed(item.content)}
                    popupWidth={240}
                    popupPlacement="bottom-start"
                    placeholder="Click to see popup width..."
                    renderOption={(item) => <div>{item.content}</div>}
                />
            </Flex>
        </Flex>
    );
}

// Advanced Stories

type HierarchicalNode = {
    path: string;
    type: 'folder' | 'item';
    items?: Record<string, HierarchicalNode>;
};

// Generate hierarchical structure from Lorem Ipsum text
function listToNestedFolders(
    input: string[],
    maxItemsPerFolder = 6,
): Record<string, HierarchicalNode> {
    function rec(array: string[], root = ''): Record<string, HierarchicalNode> {
        if (array.length === 0) return {};

        const chunkSize = Math.ceil(array.length / maxItemsPerFolder);
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }

        const result: Record<string, HierarchicalNode> = {};
        for (const chunk of chunks) {
            const [key, ...rest] = chunk;
            if (!key) continue;

            const path = root ? `${root}/${key}` : key;
            const childNodes = rec(rest, path);

            if (Object.keys(childNodes).length > 0) {
                result[key] = {
                    path,
                    type: 'folder',
                    items: childNodes,
                };
            } else {
                result[key] = {
                    path,
                    type: 'item',
                };
            }
        }
        return result;
    }

    return rec(input);
}

// Lorem Ipsum sample text used to populate hierarchical demo data
const LOREM_IPSUM_TEXT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nisi orci, consequat ut feugiat sit amet, feugiat in sapien. Curabitur nec ornare dui, nec bibendum enim. Aenean eros velit, lacinia at erat vel, rutrum fermentum enim. Nulla facilisi. Proin nisi urna, porttitor ut nibh quis, consectetur dictum diam. Aenean hendrerit tellus arcu, in ultricies est posuere id. Pellentesque non erat ac lacus dignissim elementum. Vestibulum rhoncus, diam ut rhoncus aliquam, ipsum arcu rhoncus dui, eu scelerisque velit velit ac lectus. Sed placerat lorem eu lacus elementum, ut luctus arcu porta. Praesent efficitur, turpis ut pretium feugiat, libero eros tristique turpis, sit amet elementum ipsum metus eget nisi. In lobortis volutpat tristique. Donec scelerisque maximus varius. Curabitur tincidunt magna tellus, quis volutpat sapien faucibus eget. Donec at lacus et lorem porta ornare. Vivamus porta aliquet orci, tincidunt fringilla dolor dignissim a. Vestibulum quam lorem, pharetra eu interdum eu, dignissim non metus. Donec ac massa non turpis fringilla tempor. In nec nibh vulputate, vulputate mi quis, rutrum tortor. Sed semper orci tortor, vel pellentesque massa euismod ut. Vivamus at purus ut turpis dictum lacinia. Sed id dui maximus, auctor ante non, congue lacus. Maecenas accumsan vitae nunc eu mollis. Donec ullamcorper vulputate nisi sit amet condimentum. Ut venenatis velit sem, vitae porttitor lorem dignissim vitae. Nam nec aliquet erat, in suscipit sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Praesent imperdiet consequat sapien, convallis vulputate ligula interdum et. Morbi laoreet, arcu quis commodo iaculis, nisl odio interdum nibh, a iaculis orci erat a leo. Curabitur dignissim tincidunt metus sit amet aliquet. Proin vitae metus eu libero accumsan venenatis. Maecenas dapibus felis eget eros tempor, eu sollicitudin diam posuere. Mauris dictum aliquam ex, sit amet dignissim sem ullamcorper in. Etiam ut ligula efficitur, iaculis elit in, pellentesque nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut mattis vel sem non tincidunt. Duis consectetur nulla eget tortor sollicitudin semper. Aenean tristique lacus dui, a pellentesque dolor hendrerit quis. Suspendisse sagittis ligula dui, a mattis erat pharetra sit amet. Nunc iaculis sollicitudin semper. Vivamus malesuada lorem a volutpat semper. Sed tortor turpis, dictum id nisi a, sollicitudin consequat libero. Aliquam suscipit ipsum ac justo convallis lacinia. Ut eu arcu felis. Aliquam nec varius ex. Nulla non ligula risus. Donec fermentum ante nec ex commodo viverra. Fusce eu nisl vel felis viverra blandit ut eu sapien. Phasellus odio purus, vehicula et dolor sed, dignissim sagittis ipsum. Nam euismod auctor turpis, sed egestas libero feugiat non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc et rutrum sem. Suspendisse pharetra leo eu risus egestas, id lacinia lorem euismod.';

const MOCK_WORDS = LOREM_IPSUM_TEXT.replace(/[.,;]/g, '').split(' ');
const MOCK_NESTED_ITEMS = listToNestedFolders(MOCK_WORDS);

type HierarchicalItem = {
    path: string;
    type: 'folder' | 'item';
};

export const NestedItemsWithInitialLoad: Story = {
    render: () => {
        const [value, setValue] = React.useState<HierarchicalItem>({path: '', type: 'folder'});
        const [partialPath, setPartialPath] = React.useState('');

        // Get folder path (remove last segment after /)
        const getFolderPath = (path: string): string => {
            const parts = path.split('/');
            return parts.slice(0, -1).join('/');
        };

        // Navigate through the tree structure based on path
        const getItemsAtPath = (path: string): Record<string, HierarchicalNode> => {
            if (!path) return MOCK_NESTED_ITEMS;

            let items = MOCK_NESTED_ITEMS;
            const pathParts = path.split('/').filter(Boolean);

            for (const part of pathParts) {
                const node = items[part];
                if (node && node.type === 'folder' && node.items) {
                    items = node.items;
                } else {
                    return {};
                }
            }

            return items;
        };

        const getOptions = React.useCallback(
            async (searchValue: string): Promise<HierarchicalItem[]> => {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 400));

                const folderPath = getFolderPath(value.path);
                const items = getItemsAtPath(folderPath);

                // Extract search term (last part after /)
                const searchTerm = searchValue.split('/').pop() || '';

                // Convert to array and filter
                const itemsArray = Object.values(items)
                    .map(({path, type}) => ({path, type}))
                    .sort((a, b) => a.path.localeCompare(b.path));

                if (searchTerm.trim()) {
                    return itemsArray.filter((item) =>
                        item.path.toLowerCase().includes(searchTerm.toLowerCase()),
                    );
                }

                return itemsArray;
            },
            [value.path],
        );

        const handleOptionClick = React.useCallback((item: HierarchicalItem) => {
            const isFolder = item.type === 'folder';
            let itemPath = item.path;

            // Add trailing slash for folders
            if (itemPath && isFolder && !itemPath.endsWith('/')) {
                itemPath += '/';
            }

            setPartialPath(itemPath);
            setValue({path: itemPath, type: item.type});

            // Return true to keep popup open for folders
            return isFolder;
        }, []);

        const handleTextUpdate = (text: string) => {
            const pathParts = text.split('/');
            const prevPathParts = partialPath.split('/');

            // If user changed directory level (added or removed /), update the value
            if (pathParts.length !== prevPathParts.length) {
                setValue({
                    path: getFolderPath(text),
                    type: 'folder',
                });
            }

            setPartialPath(text);
        };

        const handleClear = () => {
            setValue({path: '', type: 'folder'});
            setPartialPath('');
        };

        const getNoItemsMessage = (text: string) => {
            if (text.endsWith('/')) {
                return `Folder '${text}' is empty or you do not have access to its contents.`;
            }
            return `Path '${text}' does not exist.`;
        };

        return (
            <Flex direction="column" gap={2} style={{maxWidth: 600}}>
                <Text variant="header-2">Async Nested Items with Hierarchical Navigation</Text>
                <Text variant="body-1" color="secondary">
                    Demonstrates file/folder-like navigation through nested Lorem Ipsum words. Click
                    on a folder (marked with &quot;📁&quot;) to navigate into it. Click on a file to
                    select it. Example paths: &quot;Lorem/ipsum/dolor/&quot;,
                    &quot;Donec/scelerisque/&quot;, &quot;Sed/placerat/&quot;.
                </Text>
                {value.path && (
                    <Flex gap={1} alignItems="center">
                        <Text variant="caption-1" color="secondary">
                            Current: {value.path || '(root)'}
                        </Text>
                        <Button view="flat" size="xs" onClick={handleClear}>
                            Reset
                        </Button>
                    </Flex>
                )}
                <Suggest<HierarchicalItem>
                    value={partialPath}
                    onUpdate={handleTextUpdate}
                    getOptions={getOptions}
                    getOptionsOnMount={true}
                    showOptionsOnEmptyValue={true}
                    hasClear={true}
                    onOptionClick={handleOptionClick}
                    placeholder="Start typing or click to browse..."
                    renderOption={(item) => (
                        <Flex width="100%" alignItems="center" gap={2} spacing={{p: 1}}>
                            <Text variant="caption-1">{item.type === 'folder' ? '📁' : '📄'}</Text>
                            <Flex direction="column" gap={0.5}>
                                <Text>{item.path.split('/').pop()}</Text>
                                <Text variant="caption-2" color="secondary">
                                    {item.type}
                                </Text>
                            </Flex>
                        </Flex>
                    )}
                    renderEmptyOptions={({value: searchValue}) => (
                        <Flex spacing={{p: 3}} justifyContent="center">
                            <Text color="secondary">{getNoItemsMessage(searchValue)}</Text>
                        </Flex>
                    )}
                />
            </Flex>
        );
    },
};

export const TabAutocomplete: Story = {
    render: () => {
        const [value, setValue] = React.useState<HierarchicalItem>({path: '', type: 'folder'});
        const [partialPath, setPartialPath] = React.useState('');

        // Get folder path (remove last segment after /)
        const getFolderPath = (path: string): string => {
            const parts = path.split('/');
            return parts.slice(0, -1).join('/');
        };

        // Navigate through the tree structure based on path
        const getItemsAtPath = (path: string): Record<string, HierarchicalNode> => {
            if (!path) return MOCK_NESTED_ITEMS;

            let items = MOCK_NESTED_ITEMS;
            const pathParts = path.split('/').filter(Boolean);

            for (const part of pathParts) {
                const node = items[part];
                if (node && node.type === 'folder' && node.items) {
                    items = node.items;
                } else {
                    return {};
                }
            }

            return items;
        };

        const getOptions = React.useCallback(
            async (searchValue: string): Promise<HierarchicalItem[]> => {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 400));

                const folderPath = getFolderPath(value.path);
                const items = getItemsAtPath(folderPath);

                // Extract search term (last part after /)
                const searchTerm = searchValue.split('/').pop() || '';

                // Convert to array and filter
                const itemsArray = Object.values(items)
                    .map(({path, type}) => ({path, type}))
                    .sort((a, b) => a.path.localeCompare(b.path));

                if (searchTerm.trim()) {
                    return itemsArray.filter((item) =>
                        item.path.toLowerCase().includes(searchTerm.toLowerCase()),
                    );
                }

                return itemsArray;
            },
            [value.path],
        );

        const handleOptionClick = React.useCallback((item: HierarchicalItem) => {
            const isFolder = item.type === 'folder';
            let itemPath = item.path;

            // Add trailing slash for folders
            if (itemPath && isFolder && !itemPath.endsWith('/')) {
                itemPath += '/';
            }

            setPartialPath(itemPath);
            setValue({path: itemPath, type: item.type});

            // Return true to keep popup open for folders
            return isFolder;
        }, []);

        const handleTextUpdate = (text: string) => {
            const pathParts = text.split('/');
            const prevPathParts = partialPath.split('/');

            // If user changed directory level (added or removed /), update the value
            if (pathParts.length !== prevPathParts.length) {
                setValue({
                    path: getFolderPath(text),
                    type: 'folder',
                });
            }

            setPartialPath(text);
        };

        // Tab autocomplete handler
        const handleTabKeyDown = React.useCallback(
            (
                _currentValue: string,
                event: React.KeyboardEvent,
                extra: {items: ListItemData<HierarchicalItem>[]; activeIndex?: number},
            ) => {
                // Get active item or default to first item (index 0)
                const activeIndex = typeof extra.activeIndex === 'number' ? extra.activeIndex : 0;
                const activeItem = extra.items[activeIndex];

                if (activeItem) {
                    event.preventDefault();

                    const isFolder = activeItem.type === 'folder';
                    let itemPath = activeItem.path;

                    // Add trailing slash for folders
                    if (itemPath && isFolder && !itemPath.endsWith('/')) {
                        itemPath += '/';
                    }

                    setPartialPath(itemPath);
                    setValue({path: itemPath, type: activeItem.type});

                    // Return true to keep popup open for folders, false for files
                    return isFolder;
                }

                return undefined;
            },
            [],
        );

        const handleClear = () => {
            setValue({path: '', type: 'folder'});
            setPartialPath('');
        };

        return (
            <Flex direction="column" gap={2} style={{maxWidth: 600}}>
                <Text variant="header-2">Tab Autocomplete with Nested Navigation</Text>
                <Text variant="body-1" color="secondary">
                    Press Tab to autocomplete with the active item (or first item if none active).
                    For folders (📁), it keeps the popup open to continue navigation. For files
                    (📄), it closes the popup. Navigate with arrow keys, then press Tab.
                </Text>
                {value.path && (
                    <Flex gap={1} alignItems="center">
                        <Text variant="caption-1" color="secondary">
                            Current: {value.path || '(root)'}
                        </Text>
                        <Button view="flat" size="xs" onClick={handleClear}>
                            Reset
                        </Button>
                    </Flex>
                )}
                <Suggest<HierarchicalItem>
                    value={partialPath}
                    onUpdate={handleTextUpdate}
                    getOptions={getOptions}
                    getOptionsOnMount={true}
                    showOptionsOnEmptyValue={true}
                    hasClear={true}
                    onOptionClick={handleOptionClick}
                    onTabKeyDown={handleTabKeyDown}
                    placeholder="Type or use Tab to autocomplete..."
                    renderOption={(item) => (
                        <Flex width="100%" alignItems="center" gap={2} spacing={{p: 1}}>
                            <Text variant="caption-1">{item.type === 'folder' ? '📁' : '📄'}</Text>
                            <Flex direction="column" gap={0.5}>
                                <Text>{item.path.split('/').pop()}</Text>
                                <Text variant="caption-2" color="secondary">
                                    {item.type}
                                </Text>
                            </Flex>
                        </Flex>
                    )}
                />
                <Text variant="caption-1" color="hint">
                    💡 Tip: Press Tab to autocomplete, Arrow keys to navigate, Enter to select
                </Text>
            </Flex>
        );
    },
};

type SuggestedItem = {
    title: string;
    description: string;
};

// Filter Lorem Ipsum words and create contextual descriptions
function getItemsLocal(text: string): SuggestedItem[] {
    const suggestedItems: SuggestedItem[] = [];

    MOCK_WORDS.forEach((word, index) => {
        if (word.toLowerCase().includes(text.toLowerCase())) {
            let description = '';

            // Create description from surrounding words
            if (index === 0) {
                description = MOCK_WORDS.slice(0, 3).join(' ');
            } else if (index === MOCK_WORDS.length - 1) {
                description = MOCK_WORDS.slice(-3).join(' ');
            } else {
                description = MOCK_WORDS.slice(index - 1, index + 2).join(' ');
            }

            suggestedItems.push({title: word, description});
        }
    });

    return suggestedItems;
}

// Simulates a slow API for the loading-state demo
async function getItemsRemote(text: string): Promise<SuggestedItem[]> {
    const timeout = 2000; // 2 second delay
    console.log('Suggest fetch start:', text, `${timeout}ms`);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Suggest fetch resolved:', text);
            resolve(getItemsLocal(text));
        }, timeout);
    });
}

export const DebounceWithEnterSelect: Story = {
    render: () => {
        const [value, setValue] = React.useState('');
        const [selectedItems, setSelectedItems] = React.useState<SuggestedItem[]>([]);

        const handleOptionClick = React.useCallback((item: SuggestedItem) => {
            setSelectedItems((prev) => [...prev, item]);
            // Clear input after selection
            setValue('');
        }, []);

        return (
            <Flex direction="column" gap={3} style={{maxWidth: 600}}>
                <Text variant="header-2">Async Suggest + Debounce + Enter Key</Text>
                <Text variant="body-1" color="secondary">
                    Demonstrates: debounce (500ms), slow async API (2000ms delay), and Enter key
                    behavior. The 4th item (index 3) is pre-activated. Press Enter to select it, or
                    use arrow keys to navigate and select different items.
                </Text>

                <Suggest<SuggestedItem>
                    value={value}
                    onUpdate={setValue}
                    getOptions={getItemsRemote}
                    onOptionClick={handleOptionClick}
                    debounce={500}
                    getInitialActiveItemIndex={() => 3}
                    placeholder="Type to search Lorem Ipsum words..."
                    renderOption={(item) => (
                        <Flex direction="column" gap={0.5} spacing={{p: 1}}>
                            <Text variant="subheader-2">{item.title}</Text>
                            <Text variant="caption-2" color="secondary">
                                {item.description}
                            </Text>
                        </Flex>
                    )}
                />

                {selectedItems.length > 0 && (
                    <Flex direction="column" gap={1}>
                        <Text variant="subheader-2">Selected Items:</Text>
                        {selectedItems.map((item, index) => (
                            <Text key={index} variant="body-2" color="positive">
                                • {item.title}
                            </Text>
                        ))}
                    </Flex>
                )}

                <Text variant="caption-1" color="hint">
                    💡 Notice: With 500ms debounce + 2000ms API delay, results appear 2.5s after you
                    stop typing. The 4th item is automatically active. Press Enter to select it
                    immediately without arrow navigation.
                </Text>
            </Flex>
        );
    },
};

export const VirtualizedWithApplicableInput: Story = {
    render: () => {
        const [value, setValue] = React.useState('');
        const [appliedValue, setAppliedValue] = React.useState<string>('');

        const getOptions = React.useCallback(
            async (searchValue: string): Promise<SuggestedItem[]> => {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 200));

                // Return Lorem Ipsum words that match the search
                // Empty string returns ALL 448 words - perfect for testing virtualization!
                return getItemsLocal(searchValue);
            },
            [],
        );

        const handleInputEnterKeyDown = React.useCallback((inputValue: string) => {
            // Apply whatever is typed in the input (not from list)
            setAppliedValue(inputValue);
            setValue(inputValue);
        }, []);

        return (
            <Flex direction="column" gap={2} style={{maxWidth: 600}}>
                <Text variant="header-2">Virtualized + Applicable Input Value</Text>
                <Text variant="body-1" color="secondary">
                    Demonstrates true DOM virtualization with Lorem Ipsum words (448 total).
                    Auto-focus enabled, &quot;no items&quot; message hidden. Press Enter to apply
                    typed value (doesn&apos;t select from list). Only visible items are rendered to
                    the DOM using react-window.
                </Text>

                <Suggest<SuggestedItem>
                    value={value}
                    onUpdate={setValue}
                    getOptions={getOptions}
                    onOptionClick={(item) => {
                        setValue(item.title);
                        setAppliedValue(item.title);
                    }}
                    virtualized={true}
                    itemHeight={36}
                    autoFocus={true}
                    applicableInputValue={true}
                    showNoOptionsMessage={false}
                    showOptionsOnEmptyValue={true}
                    getOptionsOnMount={true}
                    onInputEnterKeyDown={handleInputEnterKeyDown}
                    placeholder="Click or type to see virtualized list..."
                    renderOption={(item) => (
                        <Flex direction="column" gap={0.5} spacing={{px: 2, py: 0.5}}>
                            <Text variant="subheader-2">{item.title}</Text>
                            <Text variant="caption-2" color="secondary">
                                {item.description}
                            </Text>
                        </Flex>
                    )}
                />

                {appliedValue && (
                    <Text variant="body-2" color="positive">
                        ✓ Applied value: {appliedValue}
                    </Text>
                )}

                <Flex direction="column" gap={1}>
                    <Text variant="subheader-1">Test true virtualization:</Text>
                    <Text variant="caption-1" color="hint">
                        • Click input (empty) → Only ~10-15 visible items rendered in DOM (inspect
                        to verify)
                    </Text>
                    <Text variant="caption-1" color="hint">
                        • Scroll the list → New items render as you scroll, old ones unmount
                    </Text>
                    <Text variant="caption-1" color="hint">
                        • Type &quot;e&quot; → 209 words, &quot;i&quot; → 215 words, &quot;a&quot; →
                        163 words (still virtualized)
                    </Text>
                    <Text variant="caption-1" color="hint">
                        • Type any text and press Enter → Applies typed value (not from list)
                    </Text>
                    <Text variant="caption-1" color="hint">
                        • Click any word → Selects that word
                    </Text>
                </Flex>
            </Flex>
        );
    },
};

export const GroupedOptions: Story = {
    render: () => {
        const [value, setValue] = React.useState('');

        type GroupItemType = {
            title: string;
            subtitle?: string;
            icon?: typeof Cloud;
            group?: boolean;
            delimiter?: boolean;
            disabled?: boolean;
        };

        const GROUP_ITEMS: GroupItemType[] = [
            {
                title: 'Products',
                group: true,
                disabled: true,
            },
            {
                title: 'Compute Cloud',
                subtitle: 'Virtual machines and disks',
                icon: Cloud,
            },
            {
                title: 'Container Registry',
                subtitle: 'Manage Docker images',
                icon: FolderOpen,
            },
            {
                delimiter: true,
                disabled: true,
                title: '',
            },
            {
                title: 'Documentation',
                group: true,
                disabled: true,
            },
            {
                title: 'Creating a Compute Cloud virtual machine',
            },
            {
                title: 'Cost calculation for Compute Cloud',
            },
        ];

        const getOptions = React.useCallback(
            (searchValue: string): GroupItemType[] => {
                // Only show options when user types exactly "co"
                return searchValue.toLowerCase() === 'co' ? GROUP_ITEMS : [];
            },
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [],
        );

        const renderGroupItem = (item: GroupItemType) => {
            // Group header
            if (item.group) {
                return (
                    <div
                        style={{
                            padding: '8px 12px',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: 'var(--g-color-text-secondary)',
                            textTransform: 'uppercase',
                        }}
                    >
                        {item.title}
                    </div>
                );
            }

            // Delimiter
            if (item.delimiter) {
                return (
                    <div
                        style={{
                            height: '1px',
                            margin: '4px 0',
                            background: 'var(--g-color-line-generic)',
                        }}
                    />
                );
            }

            // Item with icon and subtitle
            if (item.subtitle && item.icon) {
                return (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 12px',
                            gap: '12px',
                        }}
                    >
                        <Icon data={item.icon} size={20} />
                        <div style={{flex: 1}}>
                            <div style={{fontSize: '13px', lineHeight: '18px'}}>{item.title}</div>
                            <div
                                style={{
                                    fontSize: '11px',
                                    lineHeight: '16px',
                                    color: 'var(--g-color-text-secondary)',
                                }}
                            >
                                {item.subtitle}
                            </div>
                        </div>
                    </div>
                );
            }

            // Simple text item
            return <div style={{padding: '8px 12px', fontSize: '13px'}}>{item.title}</div>;
        };

        return (
            <Flex direction="column" gap={2} style={{maxWidth: 600}}>
                <Text variant="header-2">Groups (type &quot;co&quot;)</Text>
                <Text variant="body-1" color="secondary">
                    Demonstrates grouped options with group headers, delimiters, and different item
                    types. Type &quot;co&quot; to see the grouped list.
                </Text>
                <Suggest<GroupItemType>
                    value={value}
                    onUpdate={setValue}
                    getOptions={getOptions}
                    onOptionClick={(item) => {
                        if (!item.disabled) {
                            setValue(item.title);
                        }
                    }}
                    placeholder='Type "co" to see grouped options...'
                    renderOption={renderGroupItem}
                />
            </Flex>
        );
    },
};

type SuggestInPopupItem = {
    title: string;
    description: string;
};

// Generate suggested items from Lorem Ipsum text
const SUGGEST_IN_POPUP_LOREM_WORDS = [
    'Lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'Vivamus',
    'nisi',
    'orci',
    'consequat',
    'ut',
    'feugiat',
    'in',
    'sapien',
    'Curabitur',
    'nec',
    'ornare',
    'dui',
    'bibendum',
    'enim',
    'Aenean',
    'eros',
    'velit',
    'lacinia',
    'at',
    'erat',
    'vel',
    'rutrum',
    'fermentum',
    'Nulla',
    'facilisi',
    'Proin',
    'urna',
    'porttitor',
    'nibh',
    'quis',
    'dictum',
    'diam',
];

const getSuggestInPopupOptionsLocal = (text: string): SuggestInPopupItem[] => {
    const suggestedItems: SuggestInPopupItem[] = [];

    SUGGEST_IN_POPUP_LOREM_WORDS.forEach((word, index) => {
        if (word.toLowerCase().includes(text.toLowerCase())) {
            let description = '';

            if (index === 0) {
                description = SUGGEST_IN_POPUP_LOREM_WORDS.slice(0, 3).join(' ');
            } else if (index === SUGGEST_IN_POPUP_LOREM_WORDS.length - 1) {
                description = SUGGEST_IN_POPUP_LOREM_WORDS.slice(-3).join(' ');
            } else {
                description = SUGGEST_IN_POPUP_LOREM_WORDS.slice(index - 1, index + 2).join(' ');
            }

            suggestedItems.push({title: word, description});
        }
    });

    return suggestedItems;
};

export const SuggestInPopup: Story = {
    render: () => {
        const [outerPopupOpen, setOuterPopupOpen] = React.useState(false);
        const [value, setValue] = React.useState('');
        const anchorRef = React.useRef<HTMLButtonElement>(null);

        const getOptions = React.useCallback(async (searchValue: string) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return getSuggestInPopupOptionsLocal(searchValue);
        }, []);

        const getInitialActiveItemIndex = React.useCallback(
            (items: SuggestInPopupItem[]) => (items.length > 1 ? 1 : 0),
            [],
        );

        return (
            <Flex direction="column" gap={2} style={{maxWidth: 600}}>
                <Text variant="header-2">Suggest Inside Another Popup</Text>
                <Text variant="body-1" color="secondary">
                    Demonstrates Suggest component placed inside another Popup. Click the button to
                    open the outer popup, then use the Suggest inside. The Suggest popup will
                    properly layer above the outer popup.
                </Text>

                <Button
                    ref={anchorRef}
                    view="outlined"
                    size="m"
                    onClick={() => setOuterPopupOpen(!outerPopupOpen)}
                >
                    {outerPopupOpen ? 'Close' : 'Open'} Popup with Suggest
                </Button>

                <Popup
                    anchorRef={anchorRef}
                    open={outerPopupOpen}
                    onOutsideClick={() => setOuterPopupOpen(false)}
                    placement="bottom-start"
                >
                    <div
                        style={{
                            padding: '24px',
                            background: 'var(--g-color-base-background)',
                            border: '1px solid var(--g-color-line-generic)',
                            borderRadius: '8px',
                            minWidth: '400px',
                        }}
                    >
                        <Flex direction="column" gap={3}>
                            <Text variant="subheader-2">Search Form</Text>
                            <Text variant="body-1" color="secondary">
                                This Suggest is inside a popup. Its dropdown will properly layer
                                above this container.
                            </Text>
                            <Suggest<SuggestInPopupItem>
                                value={value}
                                onUpdate={setValue}
                                getOptions={getOptions}
                                autoFocus
                                onOptionClick={(item) => {
                                    setValue(item.title);
                                    alert(JSON.stringify(item, null, 2));
                                }}
                                placeholder="Search inside popup..."
                                getInitialActiveItemIndex={getInitialActiveItemIndex}
                                renderOption={(item) => (
                                    <div
                                        style={{
                                            padding: '8px 12px',
                                        }}
                                        title={item.description}
                                    >
                                        <div
                                            style={{
                                                fontSize: '13px',
                                                lineHeight: '18px',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {item.title}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '11px',
                                                lineHeight: '16px',
                                                color: 'var(--g-color-text-secondary)',
                                            }}
                                        >
                                            {item.description}
                                        </div>
                                    </div>
                                )}
                            />
                            {value && (
                                <Text variant="body-2" color="positive">
                                    Selected: {value}
                                </Text>
                            )}
                        </Flex>
                    </div>
                </Popup>
            </Flex>
        );
    },
};
