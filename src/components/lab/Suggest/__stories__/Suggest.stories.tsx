import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {ListVirtualizer} from '../../../../virtualizer';
import {Text} from '../../../Text';
import {Flex} from '../../../layout';
import {Suggest} from '../Suggest';
import type {SuggestOptionProps, SuggestProps} from '../types';

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
                    <Text as="div" color="secondary" role="status">
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
