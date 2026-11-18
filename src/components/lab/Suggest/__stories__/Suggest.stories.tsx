import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {useForkRef, useLayoutEffect} from '../../../../hooks';
import {ListVirtualizer} from '../../../../virtualizer';
import {Text} from '../../../Text';
import {TextArea} from '../../../controls';
import {Flex} from '../../../layout';
import {Suggest} from '../Suggest';
import type {SuggestOptionProps, SuggestProps, SuggestRenderInputProps} from '../types';

const meta: Meta<typeof Suggest> = {
    title: 'Lab/Suggest',
    component: Suggest,
    parameters: {
        docs: {
            canvas: {sourceState: 'hidden'},
        },
    },
};

export default meta;

type Story = StoryObj<typeof Suggest>;

// ─── Shared data ─────────────────────────────────────────────────────────────

type PlanetData = {description: string};
type PlanetOption = SuggestOptionProps<PlanetData>;

const ALL_PLANETS: PlanetOption[] = [
    {value: 'Earth', content: 'Earth', data: {description: 'Our home planet'}},
    {value: 'Europa', content: 'Europa', data: {description: 'Icy moon of Jupiter'}},
    {
        value: 'Jupiter',
        content: 'Jupiter',
        data: {description: 'Largest planet in the Solar System'},
    },
    {value: 'Mars', content: 'Mars', data: {description: 'The red planet'}},
    {value: 'Mercury', content: 'Mercury', data: {description: 'Closest planet to the Sun'}},
    {value: 'Moon', content: 'Moon', data: {description: "Earth's natural satellite"}},
    {value: 'Neptune', content: 'Neptune', data: {description: 'Farthest known planet'}},
    {value: 'Pluto', content: 'Pluto', data: {description: 'Dwarf planet in the Kuiper belt'}},
    {value: 'Saturn', content: 'Saturn', data: {description: 'Famous for its ring system'}},
    {value: 'Sun', content: 'Sun', data: {description: 'G-type main-sequence star'}},
    {value: 'Uranus', content: 'Uranus', data: {description: 'Ice giant with tilted axis'}},
    {value: 'Venus', content: 'Venus', data: {description: 'Hottest planet in the Solar System'}},
];

function filterPlanets(query: string): PlanetOption[] {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_PLANETS;
    return ALL_PLANETS.filter((p) =>
        `${p.value} ${p.data?.description ?? ''}`.toLowerCase().includes(q),
    );
}

function renderPlanet(option: PlanetOption) {
    return (
        <Flex direction="column" gap="spacing-half" padding="spacing-1">
            <Text>{option.content}</Text>
            {option.data?.description ? (
                <Text color="secondary">{option.data.description}</Text>
            ) : null}
        </Flex>
    );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
    render: () => {
        const [value, setValue] = React.useState('');
        const items = React.useMemo(() => filterPlanets(value), [value]);

        return (
            <Suggest<PlanetData>
                value={value}
                onUpdate={setValue}
                options={items}
                onOptionAction={(_value, option) => {
                    setValue(option.value);
                }}
                renderOption={renderPlanet}
                placeholder="Search astronomical bodies…"
                autoFocus
            />
        );
    },
};

// Relies on the default option renderer (no `renderOption`) — the option's
// `content` is rendered automatically.
export const Sizes: Story = {
    render: () => {
        const sizes = ['s', 'm', 'l', 'xl'] as const;

        return (
            <Flex direction="column" gap="spacing-4">
                {sizes.map((size) => (
                    <SizeExample key={size} size={size} />
                ))}
            </Flex>
        );
    },
};

function SizeExample({size}: {size: 's' | 'm' | 'l' | 'xl'}) {
    const [value, setValue] = React.useState('');
    const items = React.useMemo(() => filterPlanets(value), [value]);

    return (
        <Flex gap="spacing-2" alignItems="center">
            <Text style={{width: 60}}>{`Size: ${size}`}</Text>
            <Suggest<PlanetData>
                value={value}
                onUpdate={setValue}
                options={items}
                onOptionAction={(_value, option) => {
                    setValue(option.value);
                }}
                size={size}
                placeholder="Search…"
            />
        </Flex>
    );
}

export const PopupWidth: Story = {
    render: () => (
        <Flex direction="column" gap="spacing-4">
            <Text variant="subheader-2">{`popupWidth="fit"`}</Text>
            <PopupWidthExample popupWidth="fit" placeholder="Width matches input…" />

            <Text variant="subheader-2">Default popup width</Text>
            <PopupWidthExample placeholder="Width is natural…" />

            <Text variant="subheader-2">{`popupWidth={300}`}</Text>
            <PopupWidthExample popupWidth={300} placeholder="Width is 300px…" />
        </Flex>
    ),
};

function PopupWidthExample({
    popupWidth,
    placeholder,
}: {
    popupWidth?: SuggestProps<PlanetData>['popupWidth'];
    placeholder: string;
}) {
    const [value, setValue] = React.useState('');
    const items = React.useMemo(() => filterPlanets(value), [value]);

    return (
        <Suggest<PlanetData>
            value={value}
            onUpdate={setValue}
            options={items}
            onOptionAction={(_value, option) => {
                setValue(option.value);
            }}
            popupWidth={popupWidth}
            placeholder={placeholder}
        />
    );
}

export const Disabled: Story = {
    render: () => (
        <Suggest<PlanetData> value="Earth" options={[]} disabled placeholder="Disabled…" />
    ),
};

export const WithClearButton: Story = {
    render: () => {
        const [value, setValue] = React.useState('Earth');
        const items = React.useMemo(() => filterPlanets(value), [value]);

        return (
            <Suggest<PlanetData>
                value={value}
                onUpdate={setValue}
                options={items}
                onOptionAction={(_value, option) => {
                    setValue(option.value);
                }}
                hasClear
                placeholder="Search…"
            />
        );
    },
};

export const WithLoading: Story = {
    render: () => {
        const [value, setValue] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [items, setItems] = React.useState<PlanetOption[]>([]);
        const timerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

        const handleUpdate = React.useCallback((newValue: string) => {
            setValue(newValue);
            setLoading(true);
            setItems([]);
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setItems(filterPlanets(newValue));
                setLoading(false);
            }, 800);
        }, []);

        React.useEffect(() => () => clearTimeout(timerRef.current), []);

        return (
            <Flex direction="column" gap="spacing-2">
                <Text color="secondary">
                    Simulates async loading — results appear after 800 ms.
                </Text>
                <Suggest<PlanetData>
                    value={value}
                    onUpdate={handleUpdate}
                    options={items}
                    loading={loading}
                    onOptionAction={(_value, option) => {
                        setValue(option.value);
                    }}
                    renderOption={renderPlanet}
                    placeholder="Type to trigger simulated fetch…"
                />
            </Flex>
        );
    },
};

export const LoadingStates: Story = {
    render: () => (
        <Flex gap="spacing-6" style={{minHeight: 260}}>
            <Flex direction="column" gap="spacing-2" style={{width: 280}}>
                <Text>Initial loading: no options yet</Text>
                <Suggest open loading options={[]} aria-label="Initial loading" />
            </Flex>
            <Flex direction="column" gap="spacing-2" style={{width: 280}}>
                <Text>Loading more: existing options stay visible</Text>
                <Suggest open loading options={ALL_PLANETS.slice(0, 3)} aria-label="Loading more" />
            </Flex>
        </Flex>
    ),
};

export const CustomPopupContent: Story = {
    render: () => {
        const [value, setValue] = React.useState('');
        const items = React.useMemo(() => filterPlanets(value), [value]);

        return (
            <Suggest<PlanetData>
                value={value}
                onUpdate={setValue}
                options={items}
                onOptionAction={(_value, option) => {
                    setValue(option.value);
                }}
                renderEmptyOptions={({filter}) => (
                    <Text as="div" color="secondary">
                        Nothing matched &ldquo;{filter}&rdquo;
                    </Text>
                )}
                renderPopup={({renderList}) => (
                    <Flex
                        direction="column"
                        gap="spacing-1"
                        padding="spacing-1"
                        style={{minHeight: 0}}
                    >
                        <Text as="div" variant="subheader-2">
                            Astronomical bodies
                        </Text>
                        {renderList()}
                        <Text as="div" variant="caption-2" color="hint">
                            {items.length} result{items.length === 1 ? '' : 's'}
                        </Text>
                    </Flex>
                )}
                placeholder="Search with custom popup…"
            />
        );
    },
};

const MANY_OPTIONS = Array.from({length: 10000}, (_, index) => ({
    value: String(index),
    content: `Option ${index}`,
}));

export const Virtualized: Story = {
    render: () => {
        const [value, setValue] = React.useState('');
        const [open, setOpen] = React.useState(false);
        const options = React.useMemo(
            () =>
                MANY_OPTIONS.filter((option) =>
                    option.content.toLowerCase().includes(value.toLowerCase()),
                ),
            [value],
        );
        return (
            <ListVirtualizer>
                <Suggest
                    value={value}
                    onUpdate={(nextValue) => {
                        setValue(nextValue);
                        setOpen(true);
                    }}
                    options={options}
                    open={open}
                    onOpenChange={setOpen}
                    onOptionAction={(_value, option) => {
                        setValue(String(option.content));
                    }}
                    placeholder="Search 10,000 options…"
                    onFocus={() => setOpen(true)}
                />
            </ListVirtualizer>
        );
    },
};

const TEXT_OPTIONS = [
    {
        value: 'follow-up',
        content:
            'Thank you for the detailed description. We will review the information and get back to you with the next steps.\n\nPlease let us know if anything changes in the meantime.',
    },
    {
        value: 'resolved',
        content:
            'The issue has been resolved. Please try again and let us know whether everything works as expected.',
    },
];

export const LongOptions: Story = {
    render: () => (
        <Flex gap="spacing-4" wrap="wrap">
            <LongOptionsExample title="Default: wrap at spaces" />
            <LongOptionsExample
                title="Custom: single line with ellipsis"
                renderOption={(option) => <Text ellipsis>{option.content}</Text>}
            />
            <LongOptionsExample
                title="Custom: preserve paragraphs and wrap long words"
                renderOption={(option) => (
                    <Text style={{whiteSpace: 'pre-wrap', overflowWrap: 'anywhere'}}>
                        {option.content}
                    </Text>
                )}
            />
        </Flex>
    ),
};

function LongOptionsExample({
    title,
    renderOption,
}: {
    title: string;
    renderOption?: SuggestProps['renderOption'];
}) {
    const [value, setValue] = React.useState('');

    return (
        <Flex direction="column" gap="spacing-2" style={{width: 320, maxWidth: '100%'}}>
            <Text>{title}</Text>
            <Suggest
                aria-label={title}
                placeholder="Click to compare long options"
                value={value}
                onUpdate={setValue}
                options={TEXT_OPTIONS}
                popupWidth="fit"
                renderOption={renderOption}
                onOptionAction={(_id, option) => setValue(String(option.content))}
            />
        </Flex>
    );
}

function CustomTextArea({
    inputProps,
    textareaRef,
    onOpen,
}: {
    inputProps: SuggestRenderInputProps;
    textareaRef: React.Ref<HTMLTextAreaElement>;
    onOpen: () => void;
}) {
    const {
        ref,
        controlRef,
        anchorRef: _anchorRef,
        onKeyDown,
        onClick: _onClick,
        controlProps,
        open,
        ...props
    } = inputProps;
    const handleControlRef = useForkRef(controlRef, textareaRef);

    return (
        <TextArea
            {...props}
            ref={ref}
            controlRef={handleControlRef}
            minRows={4}
            maxRows={12}
            controlProps={{
                ...controlProps,
                role: undefined,
                'aria-expanded': undefined,
            }}
            onKeyDown={(event) => {
                if (event.nativeEvent.isComposing || event.keyCode === 229) return;
                if (event.ctrlKey && event.key === 'Enter') {
                    event.preventDefault();
                    onOpen();
                } else if (
                    open &&
                    event.altKey &&
                    ['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)
                ) {
                    onKeyDown(event);
                    // Keep Alt+Enter from inserting a newline when no option is active.
                    if (event.key === 'Enter') event.preventDefault();
                }
            }}
        />
    );
}

export const CustomInput: Story = {
    render: () => {
        const [value, setValue] = React.useState('');
        const [open, setOpen] = React.useState(false);
        const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
        const cursorRef = React.useRef<number | null>(null);

        // Restore the caret even when selecting an option doesn't change the value.
        useLayoutEffect(() => {
            if (cursorRef.current !== null) {
                textareaRef.current?.setSelectionRange(cursorRef.current, cursorRef.current);
                cursorRef.current = null;
            }
        }, [open, value]);

        return (
            <Flex direction="column" gap="spacing-2" style={{width: 480, maxWidth: '100%'}}>
                <Text>
                    Ctrl+Enter (Mac: Control+Return): open suggestions. While open, Alt+↑/↓ (Mac:
                    Option+↑/↓): navigate. Alt+Enter (Mac: Option+Return): insert at the cursor.
                    Plain arrows and Enter/Return edit the text. Escape closes suggestions.
                </Text>
                <Suggest
                    aria-label="Reply"
                    value={value}
                    onUpdate={setValue}
                    open={open}
                    onOpenChange={(nextOpen, _event, reason) => {
                        if (reason !== 'input-change' && reason !== 'click') {
                            setOpen(nextOpen);
                        }
                    }}
                    options={TEXT_OPTIONS}
                    popupWidth="fit"
                    renderOption={(option) => (
                        <Text style={{whiteSpace: 'pre-wrap', overflowWrap: 'anywhere'}}>
                            {option.content}
                        </Text>
                    )}
                    onOptionAction={(_id, option) => {
                        const control = textareaRef.current;
                        if (!control) return;
                        const start = control.selectionStart;
                        const end = control.selectionEnd;
                        const text = String(option.content);
                        cursorRef.current = start + text.length;
                        setValue(value.slice(0, start) + text + value.slice(end));
                    }}
                    renderInput={(inputProps) => (
                        <CustomTextArea
                            inputProps={inputProps}
                            textareaRef={textareaRef}
                            onOpen={() => setOpen(true)}
                        />
                    )}
                />
            </Flex>
        );
    },
};
