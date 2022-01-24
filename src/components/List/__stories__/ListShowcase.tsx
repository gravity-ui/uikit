import React from 'react';
import block from 'bem-cn-lite';
import _range from 'lodash/range';
import _random from 'lodash/random';
import {Button} from '../../Button';
import {TextInput} from '../../TextInput';
import {List} from '../List';

import './ListShowcase.scss';

const b = block('list-showcase');

function getRandomName(length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function getRandomItems(count: number) {
    return _range(1, count).map((index) => {
        const title = getRandomName(_random(1, 30));

        return {
            title,
            key: `${title}__${index}`,
            value: `val_${title}`,
            meta: `description ${index}`,
        };
    });
}

const ITEMS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

const GROUP_ITEMS = [
    {
        title: 'one',
        group: true,
        disabled: true,
    },
    {
        title: 'two',
    },
    {
        title: 'three',
    },
    {
        title: 'four',
    },
    {
        title: 'five',
        group: true,
        disabled: true,
    },
    {
        title: 'six',
    },
    {
        title: 'seven',
        group: true,
        disabled: true,
    },
    {
        title: 'eight',
    },
];

export function ListShowcase() {
    const firstListRef = React.useRef<List<string>>(null);
    const [activeItemIndex, setActiveItemIndex] = React.useState<number>();
    const [selectedItemIndex, setSelectedItemIndex] = React.useState<number>();
    const [sortableListItems, setSortableListItems] = React.useState(ITEMS);
    const [virtualizedListItems, setVirtualizedListItems] = React.useState(getRandomItems(1000));

    return (
        <div className={b()}>
            <div className={b('title')}>{'List'}</div>
            <div className={b('main-container')}>
                <div className={b('row')}>
                    <div className={b('sample')}>
                        <div className={b('subtitle')}>{'Simple list'}</div>
                        <div className={b('list-wrap')} style={{marginBottom: 20}}>
                            <List
                                ref={firstListRef}
                                items={ITEMS}
                                onItemClick={(_, index) => setActiveItemIndex(index)}
                                activeItemIndex={activeItemIndex}
                                filterable={false}
                            />
                        </div>
                        <div>
                            <p>Some random input. Typing disabled, controlling the list above.</p>
                            <TextInput
                                value="Hello!"
                                onKeyDown={(...props) => firstListRef.current?.onKeyDown(...props)}
                            />
                        </div>
                    </div>
                    <div className={b('sample')}>
                        <div className={b('subtitle')}>{'Sortable list'}</div>
                        <div className={b('list-wrap')}>
                            <List
                                items={sortableListItems}
                                itemHeight={36}
                                itemsHeight={(items) => Math.min(5, items.length) * 36}
                                filterPlaceholder="Filter list"
                                emptyPlaceholder="Nobody left here"
                                sortable={true}
                                onSortEnd={({oldIndex, newIndex}) => {
                                    setSortableListItems((items) =>
                                        List.moveListElement(items.slice(), oldIndex, newIndex),
                                    );
                                }}
                                onItemClick={(value) => console.log(value)}
                            />
                        </div>
                    </div>
                    <div
                        className={b('sample')}
                        style={{
                            position: 'relative',
                            zIndex: 2000,
                            background: 'var(--yc-color-base)',
                        }}
                    >
                        <div className={b('subtitle')}>{'Non virtualized sortable list'}</div>
                        <div className={b('list-wrap')}>
                            <List
                                items={sortableListItems}
                                itemHeight={36}
                                filterPlaceholder="Filter list"
                                emptyPlaceholder="Nobody left here"
                                sortable={true}
                                virtualized={false}
                                onSortEnd={({oldIndex, newIndex}) => {
                                    setSortableListItems((items) =>
                                        List.moveListElement(items.slice(), oldIndex, newIndex),
                                    );
                                }}
                                onItemClick={(value) => console.log(value)}
                            />
                        </div>
                    </div>
                    <div className={b('sample')}>
                        <div className={b('subtitle')}>{'Sortable virtualized list'}</div>
                        <div className={b('list-wrap')}>
                            <List
                                items={virtualizedListItems}
                                sortable={true}
                                onSortEnd={({oldIndex, newIndex}) => {
                                    setVirtualizedListItems((items) =>
                                        List.moveListElement(items.slice(), oldIndex, newIndex),
                                    );
                                }}
                                selectedItemIndex={selectedItemIndex}
                                onItemClick={(value) => console.log(value)}
                                renderItem={(item, _isActive, index) => {
                                    return (
                                        <div className={b('select')}>
                                            <div className={b('select-text')}>{item.title}</div>
                                            <Button
                                                view="flat"
                                                size="s"
                                                onClick={() => {
                                                    setSelectedItemIndex(index);
                                                    alert(`You're the chosen one, ${item.title}!`);
                                                }}
                                            >
                                                Select
                                            </Button>
                                        </div>
                                    );
                                }}
                                filterItem={(filter) => (item) => item.title.includes(filter)}
                            />
                        </div>
                    </div>
                    <div className={b('sample')}>
                        <div className={b('subtitle')}>{'Sortable virtualized list'}</div>
                        <div className={b('list-wrap')}>
                            <List
                                items={GROUP_ITEMS}
                                onItemClick={(value) => console.log(value)}
                                renderItem={(item) => {
                                    if (item.group) {
                                        return (
                                            <div className={b('group')}>
                                                <div className={b('select-text')}>{item.title}</div>
                                            </div>
                                        );
                                    }
                                    return (
                                        <div className={b('select')}>
                                            <div className={b('select-text')}>{item.title}</div>
                                            <Button
                                                view="flat"
                                                size="s"
                                                onClick={() =>
                                                    alert(`You're the chosen one, ${item.title}!`)
                                                }
                                            >
                                                Select
                                            </Button>
                                        </div>
                                    );
                                }}
                                itemHeight={(item) => (item.group ? 24 : 36)}
                                filterItem={(filter) => (item) => item.title.includes(filter)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
