import React from 'react';
import PropTypes from 'prop-types';
import {block} from '../../../../utils/cn';
import {List} from '../../../../List';
import {Icon} from '../../../../Icon';
import {Popup} from '../../../../Popup';
import {Button} from '../../../../Button';

import tickIcon from '../../../../../../assets/icons/tick.svg';
import gearIcon from '../../../../../../assets/icons/gear.svg';
import lockIcon from '../../../../../../assets/icons/lock.svg';

import './TableColumnSetup.scss';

const b = block('table-column-setup');

export const tableColumnSetupDefaultProps = {
    getItemTitle: (item) => item.title,
    sortable: true,
    filterable: false,
};

export class TableColumnSetup extends React.Component {
    static propTypes = {
        // for Button
        disabled: PropTypes.bool,
        switcher: PropTypes.element,

        // for List
        items: PropTypes.array,
        sortable: PropTypes.bool,
        filterable: PropTypes.bool,

        onUpdate: PropTypes.func.isRequired,
        popupWidth: PropTypes.string,
        popupPlacement: PropTypes.array,
        getItemTitle: PropTypes.func,
        showStatus: PropTypes.bool,
        className: PropTypes.string,
    };

    static defaultProps = tableColumnSetupDefaultProps;

    static getRequiredItems = (items) =>
        items
            .filter(({required}) => required)
            .map((column) => ({
                ...column,
                disabled: true,
            }));
    static getConfigurableItems = (items) => items.filter(({required}) => !required);

    static getDerivedStateFromProps(props, state) {
        const {items} = props;
        if (items !== state.items) {
            const requiredItems = TableColumnSetup.getRequiredItems(items);
            const currentItems = TableColumnSetup.getConfigurableItems(items);

            return {
                items,
                requiredItems,
                currentItems,
            };
        } else {
            return null;
        }
    }

    static LIST_ITEM_HEIGHT = 36;

    static getListHeight = (items) => {
        const itemHeight = TableColumnSetup.LIST_ITEM_HEIGHT;

        return Math.min(5, items.length) * itemHeight + itemHeight / 2;
    };

    static getRequiredListHeight = (items) => {
        return items.length * TableColumnSetup.LIST_ITEM_HEIGHT;
    };

    state = {};
    refControl = React.createRef();
    onUpdate = (value) => {
        this.setState({currentItems: value});
    };

    setInitialState = () => {
        const {items} = this.state;
        const requiredItems = TableColumnSetup.getRequiredItems(items);
        const currentItems = TableColumnSetup.getConfigurableItems(items);

        this.setState({
            focused: false,
            requiredItems,
            currentItems,
        });
    };

    onClosePopup = () => {
        this.setInitialState();
    };

    onControlClick = () => {
        if (this.props.disabled) {
            return;
        }

        const {items, focused} = this.state;
        const requiredItems = TableColumnSetup.getRequiredItems(items);
        const currentItems = TableColumnSetup.getConfigurableItems(items);

        this.setState({
            focused: !focused,
            requiredItems,
            currentItems,
        });
    };

    onApplyClick = () => {
        const {items, currentItems, requiredItems} = this.state;

        this.setInitialState();

        const newItems = requiredItems.concat(currentItems);

        if (items !== newItems) {
            this.props.onUpdate(newItems);
        }
    };

    renderItem = (item) => {
        const {getItemTitle} = this.props;

        return (
            <div className={b('item-content')}>
                {item.required ? (
                    <div className={b('lock-wrap', {visible: item.selected})}>
                        <Icon data={lockIcon} />
                    </div>
                ) : (
                    <div className={b('tick-wrap', {visible: item.selected})}>
                        <Icon data={tickIcon} className={b('tick')} width={10} height={10} />
                    </div>
                )}
                <div className={b('title')}>{getItemTitle(item)}</div>
            </div>
        );
    };

    onItemClick = (value) => {
        const {currentItems} = this.state;

        const newItems = currentItems.map((item) =>
            item === value ? {...item, selected: !item.selected} : item,
        );
        this.onUpdate(newItems);
    };

    makeOnSortEnd =
        (items) =>
        ({oldIndex, newIndex}) => {
            this.onUpdate(List.moveListElement(items.slice(), oldIndex, newIndex));
        };

    getCountSelected = () => {
        const {items} = this.state;

        return items.reduce((acc, cur) => (cur.selected ? acc + 1 : acc), 0);
    };

    renderStatus = () => {
        const {showStatus, items} = this.props;

        if (!showStatus) {
            return null;
        }

        const selected = this.getCountSelected();
        const all = items.length;
        const status = `${selected}/${all}`;

        return <span className={b('status')}>{status}</span>;
    };

    renderRequiredColumns = () => {
        const {filterable} = this.props;
        const {requiredItems} = this.state;
        const hasRequiredColumns = requiredItems.length;

        if (!hasRequiredColumns) {
            return null;
        }

        return (
            <List
                items={requiredItems}
                itemHeight={TableColumnSetup.LIST_ITEM_HEIGHT}
                itemsHeight={TableColumnSetup.getRequiredListHeight}
                filterable={filterable}
                renderItem={this.renderItem}
                itemsClassName={b('items')}
                itemClassName={b('item')}
                virtualized={false}
            />
        );
    };

    renderConfigurableColumns = () => {
        const {sortable, filterable} = this.props;
        const {currentItems} = this.state;

        return (
            <List
                items={currentItems}
                itemHeight={TableColumnSetup.LIST_ITEM_HEIGHT}
                itemsHeight={TableColumnSetup.getListHeight}
                sortable={sortable}
                filterable={filterable}
                sortHandleAlign={'right'}
                onSortEnd={this.makeOnSortEnd(currentItems)}
                onItemClick={this.onItemClick}
                renderItem={this.renderItem}
                itemsClassName={b('items')}
                itemClassName={b('item')}
                virtualized={false}
            />
        );
    };

    render() {
        const {switcher, disabled, popupWidth, popupPlacement, className} = this.props;
        const {focused} = this.state;

        return (
            <div className={b(null, className)}>
                <div className={b('control')} ref={this.refControl} onClick={this.onControlClick}>
                    {switcher || (
                        <Button disabled={disabled}>
                            <Icon data={gearIcon} />
                            Columns
                            {this.renderStatus()}
                        </Button>
                    )}
                </div>
                <Popup
                    anchorRef={this.refControl}
                    placement={
                        popupPlacement || ['bottom-start', 'bottom-end', 'top-start', 'top-end']
                    }
                    open={focused}
                    onClose={this.onClosePopup}
                    className={b('popup')}
                    style={{width: popupWidth}}
                >
                    {this.renderRequiredColumns()}
                    {this.renderConfigurableColumns()}
                    <div className={b('controls')}>
                        <Button view="action" width="max" onClick={this.onApplyClick}>
                            Apply
                        </Button>
                    </div>
                </Popup>
            </div>
        );
    }
}
