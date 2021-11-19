import React from 'react';
import block from 'bem-cn-lite';
import _range from 'lodash/range';
import _random from 'lodash/random';
import {Button} from '../../Button';
import {TextInput} from '../../TextInput';
import {List} from '../List';

import './ListShowcase.scss';

const b = block('list-showcase');

const getRandomName = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

const getRandomItems = (itemsCount) => {
    return _range(1, itemsCount).map((index) => {
        const title = getRandomName(_random(1, 30));

        return {
            title,
            key: `${title}__${index}`,
            value: `val_${title}`,
            meta: `description ${index}`,
        };
    });
};

const ITEMS = ['на', 'златом', 'крыльце', 'сидели', 'царь', 'царевич', 'король', 'королевич'];

const GROUP_ITEMS = [
    {
        title: 'на',
        group: true,
        disabled: true,
    },
    {
        title: 'златом',
    },
    {
        title: 'крыльце',
    },
    {
        title: 'сидели',
    },
    {
        title: 'царь',
        group: true,
        disabled: true,
    },
    {
        title: 'царевич',
    },
    {
        title: 'король',
        group: true,
        disabled: true,
    },
    {
        title: 'королевич',
    },
];

export class ListShowcase extends React.PureComponent {
    state = {
        sortableListItems: ITEMS,
        virtualizedListItems: getRandomItems(1000),
        selectedItemIndex: null,
    };
    firstListRef = React.createRef();
    render() {
        const {disabled} = this.state;

        return (
            <div className={b()}>
                <div className={b('title')}>{'List'}</div>
                <div className={b('main-container')}>
                    <div className={b('row')}>
                        <div className={b('sample')}>
                            <div className={b('subtitle')}>{'Simple list'}</div>
                            <div className={b('list-wrap')} style={{marginBottom: 20}}>
                                <List
                                    ref={this.firstListRef}
                                    items={ITEMS}
                                    onItemClick={(item, index) =>
                                        this.setState({activeItemIndex: index})
                                    }
                                    activeItemIndex={this.state.activeItemIndex}
                                    disabled={disabled}
                                    filterable={false}
                                />
                            </div>
                            <div>
                                <p>
                                    Совершенно посторонний инпут. Ввести ничего нельзя, зато можно
                                    поуправлять списком сверху.
                                </p>
                                <TextInput
                                    value="Привет!"
                                    onKeyDown={(...props) =>
                                        this.firstListRef.current.onKeyDown(...props)
                                    }
                                />
                            </div>
                        </div>
                        <div className={b('sample')}>
                            <div className={b('subtitle')}>{'Sortable list'}</div>
                            <div className={b('list-wrap')}>
                                <List
                                    items={this.state.sortableListItems}
                                    itemHeight={36}
                                    itemsHeight={(items) => Math.min(5, items.length) * 36}
                                    filterPlaceholder="Filter list"
                                    emptyPlaceholder="Nobody left here"
                                    sortable={true}
                                    onSortEnd={({oldIndex, newIndex}) => {
                                        const items = this.state.sortableListItems.slice();
                                        this.setState({
                                            sortableListItems: List.moveListElement(
                                                items,
                                                oldIndex,
                                                newIndex,
                                            ),
                                        });
                                    }}
                                    onItemClick={(value) => console.log(value)}
                                    disabled={disabled}
                                    withSortIcon={false}
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
                                    items={this.state.sortableListItems}
                                    itemHeight={36}
                                    filterPlaceholder="Filter list"
                                    emptyPlaceholder="Nobody left here"
                                    sortable={true}
                                    virtualized={false}
                                    onSortEnd={({oldIndex, newIndex}) => {
                                        const items = this.state.sortableListItems.slice();
                                        this.setState({
                                            sortableListItems: List.moveListElement(
                                                items,
                                                oldIndex,
                                                newIndex,
                                            ),
                                        });
                                    }}
                                    onItemClick={(value) => console.log(value)}
                                    disabled={disabled}
                                    withSortIcon={false}
                                />
                            </div>
                        </div>
                        <div className={b('sample')}>
                            <div className={b('subtitle')}>{'Sortable virtualized list'}</div>
                            <div className={b('list-wrap')}>
                                <List
                                    items={this.state.virtualizedListItems}
                                    sortable={true}
                                    onSortEnd={({oldIndex, newIndex}) => {
                                        const items = this.state.virtualizedListItems.slice();
                                        this.setState({
                                            virtualizedListItems: List.moveListElement(
                                                items,
                                                oldIndex,
                                                newIndex,
                                            ),
                                        });
                                    }}
                                    selectedItemIndex={this.state.selectedItemIndex}
                                    onItemClick={(value) => console.log(value)}
                                    disabled={disabled}
                                    renderItem={(item, isActive, index) => {
                                        return (
                                            <div className={b('select')}>
                                                <div className={b('select-text')}>{item.title}</div>
                                                <Button
                                                    view="flat"
                                                    size="s"
                                                    onClick={() => {
                                                        this.setState({selectedItemIndex: index});
                                                        alert(
                                                            `You're the chosen one, ${item.title}!`,
                                                        );
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
                                                    <div className={b('select-text')}>
                                                        {item.title}
                                                    </div>
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
                                                        alert(
                                                            `You're the chosen one, ${item.title}!`,
                                                        )
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
}
