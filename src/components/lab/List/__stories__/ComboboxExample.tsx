/**
 * A miniature combobox — the focus strategy axis: a filtering input plus a
 * popup of options. DOM focus NEVER leaves the input, and the active row is
 * exposed through `aria-activedescendant`:
 *
 * - `useListFocusOwner()` creates the channel of an external focus owner. It
 *   gives the input `getInputProps()` (role="combobox", aria-expanded,
 *   aria-controls, aria-activedescendant, the onKeyDown of the list), and the
 *   list gets the object itself through the `focusOwner` prop;
 * - the keyboard machinery of the list does not change:
 *   `↑`/`↓`/`Home`/`End`/`Enter` work from the input exactly as they do from
 *   the rows in the roving mode. Only step "b" changes — instead of calling
 *   `.focus()` on a row, the core sets `aria-activedescendant` on the owner
 *   and scrolls the active row into view;
 * - character keys go to the consumer: in this mode typeahead gives way to
 *   the filter (typing narrows `items` down instead of jumping around the
 *   list);
 * - the overrides of `getInputProps` are composed as everywhere else: a custom
 *   `onKeyDown` is called AFTER the machinery of the list — here it opens the
 *   popup with an arrow key and closes it on Escape.
 *
 * In an application the list is imported from the package:
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
    // The activity is controlled: null means "nothing is active" (undefined
    // would mean uncontrolled)
    const [activeItemId, setActiveItemId] = React.useState<string | null>(frameworks[0].id);
    const focusOwner = useListFocusOwner();

    const items = React.useMemo(() => filterFrameworks(query), [query]);

    const handleQueryUpdate = (value: string) => {
        setQuery(value);
        setOpen(true);
        // Typing is filtering rather than typeahead: the activity moves to the
        // first match (or is reset — Enter with an empty filter applies
        // nothing), so that Enter always applies what is visible
        setActiveItemId(filterFrameworks(value)[0]?.id ?? null);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setOpen(false);
            return;
        }
        // The machinery of the list has already run (its handler is the base
        // one in the composition): here an arrow key only opens a closed popup
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
                // TextInput sets its own onKeyDown AFTER spreading
                // controlProps (it would overwrite the handler of the list
                // with undefined) — so the keyboard is handed to it through a
                // separate prop
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
                        onActiveItemUpdate={setActiveItemId}
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
