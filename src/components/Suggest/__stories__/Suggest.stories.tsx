import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Checkbox} from '../../Checkbox';
import {Label} from '../../Label';
import {Text} from '../../Text';
import {Flex} from '../../layout';
import {Suggest} from '../Suggest';
import type {SuggestProps} from '../types';

const meta: Meta<typeof Suggest> = {
    title: 'Components/Inputs/Suggest',
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

type Planet = {value: string; content: string; description?: string};

const ALL_PLANETS: Planet[] = [
    {value: 'earth', content: 'Earth', description: 'Our home planet'},
    {value: 'europa', content: 'Europa', description: 'Icy moon of Jupiter'},
    {value: 'jupiter', content: 'Jupiter', description: 'Largest planet in the Solar System'},
    {value: 'mars', content: 'Mars', description: 'The red planet'},
    {value: 'mercury', content: 'Mercury', description: 'Closest planet to the Sun'},
    {value: 'moon', content: 'Moon', description: "Earth's natural satellite"},
    {value: 'neptune', content: 'Neptune', description: 'Farthest known planet'},
    {value: 'pluto', content: 'Pluto', description: 'Dwarf planet in the Kuiper belt'},
    {value: 'saturn', content: 'Saturn', description: 'Famous for its ring system'},
    {value: 'sun', content: 'Sun', description: 'G-type main-sequence star'},
    {value: 'uranus', content: 'Uranus', description: 'Ice giant with tilted axis'},
    {value: 'venus', content: 'Venus', description: 'Hottest planet in the Solar System'},
];

function filterPlanets(query: string): Planet[] {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_PLANETS;
    return ALL_PLANETS.filter(
        (p) =>
            p.content.toLowerCase().includes(q) ||
            p.value.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q),
    );
}

function renderPlanet(item: Planet) {
    return (
        <Flex direction="column" gap={0.5} spacing={{p: 1}}>
            <Text>{item.content}</Text>
            {item.description ? <Text color="secondary">{item.description}</Text> : null}
        </Flex>
    );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

export const Default: Story = {
    render: () => {
        const [value, setValue] = React.useState('');
        const items = React.useMemo(() => filterPlanets(value), [value]);

        return (
            <Suggest<Planet>
                value={value}
                onUpdate={setValue}
                items={items}
                onItemClick={(item) => {
                    setValue(item.content);
                    return false;
                }}
                renderItem={renderPlanet}
                inputProps={{placeholder: 'Search astronomical bodies…', autoFocus: true}}
            />
        );
    },
};

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
            <Suggest<Planet>
                value={value}
                onUpdate={setValue}
                items={items}
                onItemClick={(item) => {
                    setValue(item.content);
                    return false;
                }}
                renderItem={(item) => <div>{item.content}</div>}
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
    popupWidth: SuggestProps<Planet>['popupWidth'];
    placeholder: string;
}) {
    const [value, setValue] = React.useState('');
    const items = React.useMemo(() => filterPlanets(value), [value]);

    return (
        <Suggest<Planet>
            value={value}
            onUpdate={setValue}
            items={items}
            onItemClick={(item) => {
                setValue(item.content);
                return false;
            }}
            renderItem={(item) => <div>{item.content}</div>}
            popupWidth={popupWidth}
            inputProps={{placeholder}}
        />
    );
}

export const Disabled: Story = {
    render: () => (
        <Suggest<Planet>
            value="Earth"
            items={[]}
            inputProps={{disabled: true, placeholder: 'Disabled…'}}
        />
    ),
};

export const WithClearButton: Story = {
    render: () => {
        const [value, setValue] = React.useState('Earth');
        const items = React.useMemo(() => filterPlanets(value), [value]);

        return (
            <Suggest<Planet>
                value={value}
                onUpdate={setValue}
                items={items}
                onItemClick={(item) => {
                    setValue(item.content);
                    return false;
                }}
                renderItem={(item) => <div>{item.content}</div>}
                inputProps={{hasClear: true, placeholder: 'Search…'}}
            />
        );
    },
};

export const WithLoading: Story = {
    render: () => {
        const [value, setValue] = React.useState('');
        const [loading, setLoading] = React.useState(false);
        const [items, setItems] = React.useState<Planet[]>([]);
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
                <Suggest<Planet>
                    value={value}
                    onUpdate={handleUpdate}
                    items={items}
                    loading={loading}
                    onItemClick={(item) => {
                        setValue(item.content);
                        return false;
                    }}
                    renderItem={renderPlanet}
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
            <Suggest<Planet>
                value={value}
                onUpdate={setValue}
                items={items}
                onItemClick={(item) => {
                    setValue(item.content);
                    return false;
                }}
                renderItem={(item) => <div>{item.content}</div>}
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
        const [selected, setSelected] = React.useState<Planet[]>([]);
        const items = React.useMemo(() => filterPlanets(value), [value]);

        const selectedValues = React.useMemo(
            () => new Set(selected.map((p) => p.value)),
            [selected],
        );

        const handleUpdate = React.useCallback((nextValue: string) => {
            setValue(nextValue);
            setOpen(true);
        }, []);

        const handleItemClick = React.useCallback((item: Planet) => {
            setSelected((prev) => {
                const next = prev.filter((p) => p.value !== item.value);
                return next.length === prev.length ? [...prev, item] : next;
            });
            return true; // ← keep popup open for multi-select
        }, []);

        const renderSelectableItem = React.useCallback(
            (item: Planet) => (
                <Flex alignItems="center" gap={2} spacing={{p: 1}}>
                    <Checkbox
                        checked={selectedValues.has(item.value)}
                        style={{pointerEvents: 'none'}}
                    />
                    <Flex direction="column" gap={0.5}>
                        <Text>{item.content}</Text>
                        {item.description ? (
                            <Text color="secondary">{item.description}</Text>
                        ) : null}
                    </Flex>
                </Flex>
            ),
            [selectedValues],
        );

        const handleRemove = React.useCallback((planet: Planet) => {
            setSelected((prev) => prev.filter((p) => p.value !== planet.value));
        }, []);

        return (
            <Flex direction="column" gap={2}>
                <Text color="secondary">
                    Click an item to toggle it — selected items stay in the list with a checked box
                    and the popup stays open (
                    <Text as="span" variant="code-inline-3">
                        onItemClick
                    </Text>{' '}
                    returns{' '}
                    <Text as="span" variant="code-inline-3">
                        true
                    </Text>
                    ). Open state is controlled, so focusing the empty input browses all options.
                </Text>
                <Suggest<Planet>
                    value={value}
                    onUpdate={handleUpdate}
                    open={open}
                    onOpenChange={setOpen}
                    items={items}
                    onItemClick={handleItemClick}
                    renderItem={renderSelectableItem}
                    inputProps={{
                        onFocus: () => setOpen(true),
                        placeholder: 'Add astronomical bodies…',
                    }}
                />
                {selected.length > 0 && (
                    <Flex gap={1} wrap="wrap">
                        {selected.map((planet) => (
                            <Label
                                key={planet.value}
                                type="close"
                                onCloseClick={() => handleRemove(planet)}
                            >
                                {planet.content}
                            </Label>
                        ))}
                    </Flex>
                )}
            </Flex>
        );
    },
};
