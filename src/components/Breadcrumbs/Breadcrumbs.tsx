import * as React from 'react';
import _throttle from 'lodash/throttle';
import ResizeObserver from 'resize-observer-polyfill';
import {block} from '../utils/cn';
import {PopupPlacement} from '../Popup';
import {Link} from '../Link';
import {DropdownMenu} from '../DropdownMenu';

import './Breadcrumbs.scss';

export interface BreadcrumbsItem {
    text: string;
    action: (evt: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    href?: string;
}

export interface BreadcrumbsProps {
    items: BreadcrumbsItem[];
    className?: string;
    renderRootContent?: (item: BreadcrumbsItem, isCurrent: boolean) => React.ReactNode;
    renderItemContent?: (
        item: BreadcrumbsItem,
        isCurrent: boolean,
        isPrevCurrent: boolean,
    ) => React.ReactNode;
    renderItemDivider?: () => React.ReactNode;
    lastDisplayedItemsCount: LastDisplayedItemsCount;
    firstDisplayedItemsCount: FirstDisplayedItemsCount;
    popupStyle?: 'staircase';
    popupPlacement?: PopupPlacement;
}

interface BreadcrumbsState {
    calculated: boolean;
    rootItem: BreadcrumbsItem | undefined;
    visibleItems: BreadcrumbsItem[];
    hiddenItems: BreadcrumbsItem[];
    allItems: BreadcrumbsItem[];
}

const RESIZE_THROTTLE = 200;
const MORE_ITEM_WIDTH = 34;
const DEFAULT_POPUP_PLACEMENT = ['bottom', 'top'];

const b = block('breadcrumbs');

export enum LastDisplayedItemsCount {
    One = 1,
    Two = 2,
}

export enum FirstDisplayedItemsCount {
    Zero = 0,
    One = 1,
}

export class Breadcrumbs extends React.Component<BreadcrumbsProps, BreadcrumbsState> {
    static defaultProps = {
        popupPlacement: DEFAULT_POPUP_PLACEMENT,
    };

    static prepareInitialState(props: BreadcrumbsProps) {
        const {firstDisplayedItemsCount} = props;

        return {
            calculated: false,
            rootItem: firstDisplayedItemsCount ? props.items[0] : undefined,
            visibleItems: props.items.slice(firstDisplayedItemsCount),
            hiddenItems: [],
            allItems: props.items,
        };
    }

    static getDerivedStateFromProps(props: BreadcrumbsProps, state: BreadcrumbsState) {
        if (state.allItems !== props.items) {
            return Breadcrumbs.prepareInitialState(props);
        }

        return null;
    }

    private container: React.RefObject<HTMLDivElement>;
    private resizeObserver: ResizeObserver;

    constructor(props: BreadcrumbsProps) {
        super(props);

        this.handleResize = _throttle(this.handleResize, RESIZE_THROTTLE);
        this.resizeObserver = new ResizeObserver(this.handleResize);
        this.container = React.createRef();
        this.state = Breadcrumbs.prepareInitialState(props);
    }

    componentDidMount() {
        this.recalculate();
        this.resizeObserver.observe(this.container.current as Element);
    }

    componentDidUpdate(prevProps: BreadcrumbsProps) {
        if (prevProps.items !== this.state.allItems) {
            this.recalculate();
        }
    }

    componentWillUnmount() {
        this.resizeObserver.disconnect();
    }

    render() {
        const {className} = this.props;
        const {calculated} = this.state;

        const rootItem = this.renderRootItem();

        return (
            <div className={b({calculated: calculated ? 'yes' : 'no'}, className)}>
                <div className={b('inner')} ref={this.container}>
                    {rootItem}
                    {this.renderMoreItem()}
                    {this.renderVisibleItems()}
                </div>
            </div>
        );
    }

    renderItem(data: BreadcrumbsItem, isCurrent: boolean, isPrevCurrent: boolean) {
        const {renderItemContent} = this.props;

        if (isPrevCurrent) {
            return (
                <Link
                    key={data.text}
                    view="secondary"
                    href={data.href}
                    title={data.text}
                    onClick={data.action}
                    className={b('item', {'prev-current': true})}
                >
                    {renderItemContent
                        ? renderItemContent(data, isCurrent, isPrevCurrent)
                        : data.text}
                </Link>
            );
        }

        if (isCurrent) {
            return (
                <div title={data.text} className={b('item', {current: true})}>
                    {renderItemContent
                        ? renderItemContent(data, isCurrent, isPrevCurrent)
                        : data.text}
                </div>
            );
        }

        return (
            <Link
                key={data.text}
                view="secondary"
                href={data.href}
                title={data.text}
                onClick={data.action}
                className={b('item')}
            >
                {renderItemContent ? renderItemContent(data, isCurrent, isPrevCurrent) : data.text}
            </Link>
        );
    }

    renderItemDivider() {
        const {renderItemDivider} = this.props;

        return renderItemDivider ? (
            <div className={b('divider')}>{renderItemDivider()}</div>
        ) : (
            <span className={b('divider')}>/</span>
        );
    }

    renderRootItem() {
        const {renderRootContent} = this.props;
        const {rootItem, visibleItems} = this.state;
        const isCurrent = visibleItems.length === 0;

        if (!rootItem) {
            return null;
        }

        if (renderRootContent) {
            return isCurrent ? (
                <div title={rootItem.text} className={b('item', {current: true})}>
                    {renderRootContent(rootItem, isCurrent)}
                </div>
            ) : (
                <Link
                    key={rootItem.text}
                    view="secondary"
                    href={rootItem.href}
                    title={rootItem.text}
                    onClick={rootItem.action}
                    className={b('item')}
                >
                    {renderRootContent(rootItem, isCurrent)}
                </Link>
            );
        }

        return this.renderItem(rootItem, isCurrent, false);
    }

    renderVisibleItems() {
        const {visibleItems} = this.state;

        return visibleItems.map((item, index, items) => {
            const isCurrent = index === items.length - 1;
            const isPrevCurrent = index === items.length - 2;

            return (
                <React.Fragment key={index}>
                    {this.renderItemDivider()}
                    {this.renderItem(item, isCurrent, isPrevCurrent)}
                </React.Fragment>
            );
        });
    }

    renderMoreItem() {
        const {popupStyle, popupPlacement} = this.props;
        const {hiddenItems} = this.state;

        if (hiddenItems.length > 0) {
            return (
                <React.Fragment>
                    {this.renderItemDivider()}
                    <DropdownMenu
                        items={hiddenItems}
                        popupClassName={b('popup', {
                            staircase: popupStyle === 'staircase',
                        })}
                        popupPlacement={popupPlacement}
                        switcher={
                            <Link
                                view="secondary"
                                title="Show more"
                                className={b('item', {more: true})}
                            >
                                ...
                            </Link>
                        }
                    />
                </React.Fragment>
            );
        }

        return null;
    }

    private recalculate() {
        const {items: allItems, lastDisplayedItemsCount, firstDisplayedItemsCount} = this.props;

        if (this.container.current) {
            const dividers: HTMLElement[] = Array.from(
                this.container.current.querySelectorAll(`.${b('divider')}`),
            );
            const items: HTMLElement[] = Array.from(
                this.container.current.querySelectorAll(`.${b('item')}`),
            );

            const availableWidth = this.container.current.offsetWidth;
            const itemsWidths = items.map((elem) => elem.scrollWidth);
            const dividersWidths = dividers.map((elem) => elem.offsetWidth);
            const buttonsWidth = itemsWidths.reduce((total, width, index, widths) => {
                const isLastItem = widths.length - 1 === index;
                const isItemBeforeLast =
                    lastDisplayedItemsCount === LastDisplayedItemsCount.Two &&
                    widths.length - 2 === index;

                if (isLastItem || isItemBeforeLast) {
                    return total + Math.min(width, 200);
                }

                return total + width;
            }, 0);
            const dividersWidth = dividersWidths.reduce((total, width) => total + width, 0);
            let totalWidth = buttonsWidth + dividersWidth;
            let visibleItemsStartIndex = 1;
            while (
                totalWidth > availableWidth &&
                visibleItemsStartIndex < items.length - lastDisplayedItemsCount
            ) {
                if (visibleItemsStartIndex === 1) {
                    totalWidth += MORE_ITEM_WIDTH + dividersWidths[visibleItemsStartIndex];
                }

                totalWidth -=
                    itemsWidths[visibleItemsStartIndex] + dividersWidths[visibleItemsStartIndex];
                visibleItemsStartIndex++;
            }

            this.setState({
                calculated: true,
                visibleItems: allItems.slice(
                    visibleItemsStartIndex - (1 - firstDisplayedItemsCount),
                ),
                hiddenItems: allItems.slice(
                    firstDisplayedItemsCount,
                    visibleItemsStartIndex - (1 - firstDisplayedItemsCount),
                ),
            });
        }
    }

    private handleResize = () => {
        const state = Breadcrumbs.prepareInitialState(this.props);
        this.setState(state, this.recalculate);
    };
}
