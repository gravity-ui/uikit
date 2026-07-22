/**
 * Мини-комбобокс — ось стратегии фокуса (§15 плана): инпут-фильтр + попап
 * опций. DOM-фокус НИКОГДА не уходит из инпута, активную строку показывает
 * `aria-activedescendant`:
 *
 * - `useListFocusOwner()` создаёт канал внешнего владельца фокуса. Инпуту он
 *   отдаёт `getInputProps()` (role="combobox", aria-expanded, aria-controls,
 *   aria-activedescendant, onKeyDown листа), списку — сам объект пропом
 *   `focusOwner`;
 * - клавиатурная машина списка не меняется: `↑`/`↓`/`Home`/`End`/`Enter`
 *   работают из инпута ровно так же, как из строк в roving-режиме. Меняется
 *   только шаг «б» — вместо `.focus()` строки ядро выставляет владельцу
 *   `aria-activedescendant` и доскролливает к активной строке;
 * - символьные клавиши уходят потребителю: typeahead в этом режиме уступает
 *   фильтру (печать сужает `items`, а не прыгает по списку);
 * - оверрайды `getInputProps` компонуются, как и везде: свой `onKeyDown`
 *   вызывается ПОСЛЕ машины списка — здесь он открывает попап стрелкой и
 *   закрывает его по Escape.
 *
 * В приложении импорты листа — из пакета:
 * `import {unstable_List as List} from '@gravity-ui/uikit/unstable'`
 */
import * as React from 'react';

import {TextInput} from '../../../controls';
import {List} from '../List';
import {useListFocusOwner} from '../useListFocusOwner';

interface FrameworkRecord {
    id: string;
    name: string;
    description: string;
}

const frameworks: FrameworkRecord[] = [
    {id: 'react', name: 'React', description: 'A library for web and native UI'},
    {id: 'vue', name: 'Vue', description: 'The progressive framework'},
    {id: 'svelte', name: 'Svelte', description: 'Cybernetically enhanced apps'},
    {id: 'solid', name: 'Solid', description: 'Simple and performant reactivity'},
    {id: 'angular', name: 'Angular', description: 'The web development platform'},
    {id: 'qwik', name: 'Qwik', description: 'Instant-loading web apps'},
    {id: 'preact', name: 'Preact', description: 'Fast 3kB alternative to React'},
];

function filterFrameworks(query: string) {
    const normalized = query.trim().toLowerCase();
    return normalized
        ? frameworks.filter((item) => item.name.toLowerCase().includes(normalized))
        : frameworks;
}

export function ComboboxExample() {
    const [query, setQuery] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
    // Активность controlled с первого рендера: `undefined` для
    // useControlledState — это uncontrolled, а не «нет активного»
    const [activeItemId, setActiveItemId] = React.useState(frameworks[0].id);
    const focusOwner = useListFocusOwner();

    const items = React.useMemo(() => filterFrameworks(query), [query]);

    const handleQueryUpdate = (value: string) => {
        setQuery(value);
        setOpen(true);
        // Печать — это фильтр, а не typeahead: активность переезжает на
        // первое совпадение, чтобы Enter всегда применял видимое
        setActiveItemId((prev) => filterFrameworks(value)[0]?.id ?? prev);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setOpen(false);
            return;
        }
        // Машина списка отработала первой (её обработчик — базовый в
        // композиции): здесь стрелка только открывает закрытый попап
        if (!open && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
            setOpen(true);
        }
    };

    const {onKeyDown, ...inputProps} = focusOwner.getInputProps({
        'aria-label': 'Framework',
        'aria-autocomplete': 'list',
        onKeyDown: handleKeyDown,
    });

    return (
        <div style={{position: 'relative', width: 320}}>
            <TextInput
                value={query}
                onUpdate={handleQueryUpdate}
                onFocus={() => setOpen(true)}
                placeholder="Pick a framework"
                controlProps={inputProps}
                // TextInput ставит свой onKeyDown ПОСЛЕ спреда controlProps
                // (перетёр бы обработчик списка undefined'ом) — клавиатуру
                // отдаём ему отдельным пропом
                onKeyDown={onKeyDown}
            />
            {open ? (
                <div
                    style={{
                        position: 'absolute',
                        insetInlineStart: 0,
                        insetBlockStart: '100%',
                        zIndex: 1,
                        width: '100%',
                        marginBlockStart: 'var(--g-spacing-1)',
                        padding: 'var(--g-spacing-1)',
                        borderRadius: 'var(--g-border-radius-l)',
                        background: 'var(--g-color-base-float)',
                        boxShadow: '0 8px 20px var(--g-color-sfx-shadow)',
                    }}
                >
                    <List<FrameworkRecord>
                        focusOwner={focusOwner}
                        aria-label="Frameworks"
                        items={items}
                        style={{maxHeight: 200, overflow: 'auto'}}
                        getItemContent={(item) => item.name}
                        selectionMode="single"
                        selectedIds={selectedIds}
                        onSelectedUpdate={setSelectedIds}
                        activeItemId={activeItemId}
                        // `undefined` из колбэка не пишем: для
                        // useControlledState это переход в uncontrolled
                        onActiveItemUpdate={(id) => setActiveItemId((prev) => id ?? prev)}
                        onItemAction={(_id, item) => {
                            setQuery(item.name);
                            setOpen(false);
                        }}
                        renderItem={(ctx, {getItemProps, getItemViewProps}) => (
                            <List.ItemView
                                {...getItemProps()}
                                {...getItemViewProps()}
                                description={ctx.item.description}
                            >
                                {ctx.item.name}
                            </List.ItemView>
                        )}
                    />
                    {items.length === 0 ? (
                        <div
                            style={{
                                padding: 'var(--g-spacing-2)',
                                color: 'var(--g-color-text-secondary)',
                            }}
                        >
                            Nothing found
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
