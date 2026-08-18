import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Checkbox} from '../../../Checkbox';
import {Label} from '../../../Label';
import {Text} from '../../../Text';
import {Flex} from '../../../layout';
import {Suggest} from '../Suggest';
import type {SuggestOption, SuggestProps} from '../types';

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
type PlanetOption = SuggestOption<PlanetData>;

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
        <Flex direction="column" gap={0.5} spacing={{p: 1}}>
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
                onOptionClick={(option) => {
                    setValue(option.value);
                    return false;
                }}
                renderOption={renderPlanet}
                inputProps={{placeholder: 'Search astronomical bodies…', autoFocus: true}}
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
            <Flex direction="column" gap={4}>
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
        <Flex gap={2} alignItems="center">
            <Text style={{width: 60}}>{`Size: ${size}`}</Text>
            <Suggest<PlanetData>
                value={value}
                onUpdate={setValue}
                options={items}
                onOptionClick={(option) => {
                    setValue(option.value);
                    return false;
                }}
                inputProps={{size, placeholder: 'Search…'}}
            />
        </Flex>
    );
}

export const PopupWidth: Story = {
    render: () => (
        <Flex direction="column" gap={4}>
            <Text variant="subheader-2">{`popupWidth="fit"`}</Text>
            <PopupWidthExample popupWidth="fit" placeholder="Width matches input…" />

            <Text variant="subheader-2">{`popupWidth="auto"`}</Text>
            <PopupWidthExample popupWidth="auto" placeholder="Width is natural…" />

            <Text variant="subheader-2">{`popupWidth={300}`}</Text>
            <PopupWidthExample popupWidth={300} placeholder="Width is 300px…" />
        </Flex>
    ),
};

function PopupWidthExample({
    popupWidth,
    placeholder,
}: {
    popupWidth: SuggestProps<PlanetData>['popupWidth'];
    placeholder: string;
}) {
    const [value, setValue] = React.useState('');
    const items = React.useMemo(() => filterPlanets(value), [value]);

    return (
        <Suggest<PlanetData>
            value={value}
            onUpdate={setValue}
            options={items}
            onOptionClick={(option) => {
                setValue(option.value);
                return false;
            }}
            popupWidth={popupWidth}
            inputProps={{placeholder}}
        />
    );
}

export const Disabled: Story = {
    render: () => (
        <Suggest<PlanetData>
            value="Earth"
            options={[]}
            inputProps={{disabled: true, placeholder: 'Disabled…'}}
        />
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
                onOptionClick={(option) => {
                    setValue(option.value);
                    return false;
                }}
                inputProps={{hasClear: true, placeholder: 'Search…'}}
            />
        );
    },
};

export const WithLoading: Story = {
    render: () => {
        const [value, setValue] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [items, setItems] = React.useState<PlanetOption[]>([]);
        const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

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
            <Flex direction="column" gap={2}>
                <Text color="secondary">
                    Simulates async loading — results appear after 800 ms.
                </Text>
                <Suggest<PlanetData>
                    value={value}
                    onUpdate={handleUpdate}
                    options={items}
                    loading={loading}
                    onOptionClick={(option) => {
                        setValue(option.value);
                        return false;
                    }}
                    renderOption={renderPlanet}
                    inputProps={{placeholder: 'Type to trigger simulated fetch…'}}
                />
            </Flex>
        );
    },
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
                onOptionClick={(option) => {
                    setValue(option.value);
                    return false;
                }}
                renderPopup={({list}) => (
                    <Flex direction="column" gap={1} spacing={{p: 1}}>
                        <Text as="div" variant="subheader-2">
                            Astronomical bodies
                        </Text>
                        {items.length > 0 ? (
                            list
                        ) : (
                            <Text as="div" color="secondary">
                                Nothing matched &ldquo;{value}&rdquo;
                            </Text>
                        )}
                        <Text as="div" variant="caption-2" color="hint">
                            {items.length} result{items.length === 1 ? '' : 's'}
                        </Text>
                    </Flex>
                )}
                inputProps={{placeholder: 'Search with custom popup…'}}
            />
        );
    },
};

export const MultiSelect: Story = {
    render: () => {
        const [value, setValue] = React.useState('');
        const [open, setOpen] = React.useState(false);
        const [selected, setSelected] = React.useState<PlanetOption[]>([]);
        const items = React.useMemo(() => filterPlanets(value), [value]);

        const selectedValues = React.useMemo(
            () => new Set(selected.map((p) => p.value)),
            [selected],
        );

        const handleUpdate = React.useCallback((nextValue: string) => {
            setValue(nextValue);
            setOpen(true);
        }, []);

        const handleOptionClick = React.useCallback((option: PlanetOption) => {
            setSelected((prev) => {
                const next = prev.filter((p) => p.value !== option.value);
                return next.length === prev.length ? [...prev, option] : next;
            });
            return true; // ← keep popup open for multi-select
        }, []);

        const renderSelectableItem = React.useCallback(
            (option: PlanetOption) => (
                <Flex alignItems="center" gap={2} spacing={{p: 1}}>
                    <Checkbox
                        checked={selectedValues.has(option.value)}
                        style={{pointerEvents: 'none'}}
                    />
                    <Flex direction="column" gap={0.5}>
                        <Text>{option.content}</Text>
                        {option.data?.description ? (
                            <Text color="secondary">{option.data.description}</Text>
                        ) : null}
                    </Flex>
                </Flex>
            ),
            [selectedValues],
        );

        const handleRemove = React.useCallback((option: PlanetOption) => {
            setSelected((prev) => prev.filter((p) => p.value !== option.value));
        }, []);

        return (
            <Flex direction="column" gap={2}>
                <Text color="secondary">
                    Click an item to toggle it — selected items stay in the list with a checked box
                    and the popup stays open (
                    <Text as="span" variant="code-inline-3">
                        onOptionClick
                    </Text>{' '}
                    returns{' '}
                    <Text as="span" variant="code-inline-3">
                        true
                    </Text>
                    ). Open state is controlled, so focusing the empty input browses all options.
                </Text>
                <Suggest<PlanetData>
                    value={value}
                    onUpdate={handleUpdate}
                    open={open}
                    onOpenChange={setOpen}
                    options={items}
                    onOptionClick={handleOptionClick}
                    renderOption={renderSelectableItem}
                    inputProps={{
                        onFocus: () => setOpen(true),
                        placeholder: 'Add astronomical bodies…',
                    }}
                />
                {selected.length > 0 && (
                    <Flex gap={1} wrap="wrap">
                        {selected.map((option) => (
                            <Label
                                key={option.value}
                                type="close"
                                onCloseClick={() => handleRemove(option)}
                            >
                                {option.content}
                            </Label>
                        ))}
                    </Flex>
                )}
            </Flex>
        );
    },
};
