import React from 'react';

import _throttle from 'lodash/throttle';

import type {PopupPlacement} from '../Popup';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import {BreadcrumbsItem as Item} from './BreadcrumbsItem';
import {BreadcrumbsMore} from './BreadcrumbsMore';
import {BreadcrumbsSeparator} from './BreadcrumbsSeparator';

import './Breadcrumbs.scss';

type BaseBreadcrumbsItem = {
    text: string;
    items?: BreadcrumbsItem[];
    title?: string;
};

type LinkBreadcrumbsItem = {
    href: string;
    action?: (event: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => void;
} & BaseBreadcrumbsItem;

type ButtonBreadcrumbsItem = {
    href?: undefined;
    action: (event: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => void;
} & BaseBreadcrumbsItem;

export type BreadcrumbsItem = LinkBreadcrumbsItem | ButtonBreadcrumbsItem;

export interface BreadcrumbsProps<T extends BreadcrumbsItem = BreadcrumbsItem> extends QAProps {
    items: T[];
    className?: string;
    renderRootContent?: (item: T, isCurrent: boolean) => React.ReactNode;
    renderItemContent?: (item: T, isCurrent: boolean, isPrevCurrent: boolean) => React.ReactNode;
    renderItemDivider?: () => React.ReactNode;
    lastDisplayedItemsCount: LastDisplayedItemsCount;
    firstDisplayedItemsCount: FirstDisplayedItemsCount;
    popupStyle?: 'staircase';
    popupPlacement?: PopupPlacement;
}

interface BreadcrumbsState<T extends BreadcrumbsItem> {
    calculated: boolean;
    rootItem: T | undefined;
    visibleItems: T[];
    hiddenItems: T[];
    allItems: T[];
}

const RESIZE_THROTTLE = 200;
const MORE_ITEM_WIDTH = 34;
const DEFAULT_POPUP_PLACEMENT = ['bottom', 'top'];
const GAP_WIDTH = 4;

const b = block('breadcrumbs');

export enum LastDisplayedItemsCount {
    One = 1,
    Two = 2,
}

export enum FirstDisplayedItemsCount {
    Zero = 0,
    One = 1,
}

export class Breadcrumbs<T extends BreadcrumbsItem = BreadcrumbsItem> extends React.Component<
    BreadcrumbsProps<T>,
    BreadcrumbsState<T>
> {
    static defaultProps = {
        popupPlacement: DEFAULT_POPUP_PLACEMENT,
    };

    static prepareInitialState<T extends BreadcrumbsItem>(props: BreadcrumbsProps<T>) {
        const {firstDisplayedItemsCount} = props;

        return {
            calculated: false,
            rootItem: firstDisplayedItemsCount ? props.items[0] : undefined,
            visibleItems: props.items.slice(firstDisplayedItemsCount),
            hiddenItems: [],
            allItems: props.items,
        };
    }

    static getDerivedStateFromProps<T extends BreadcrumbsItem>(
        props: BreadcrumbsProps<T>,
        state: BreadcrumbsState<T>,
    ) {
        if (state.allItems !== props.items) {
            return Breadcrumbs.prepareInitialState(props);
        }

        return null;
    }

    private container: React.RefObject<HTMLDivElement>;
    private resizeObserver?: ResizeObserver;

    constructor(props: BreadcrumbsProps<T>) {
        super(props);

        this.handleResize = _throttle(this.handleResize, RESIZE_THROTTLE);
        if (typeof window !== 'undefined') {
            this.resizeObserver = new ResizeObserver(this.handleResize);
        }
        this.container = React.createRef();
        this.state = Breadcrumbs.prepareInitialState(props);
    }

    componentDidMount() {
        this.recalculate();
        this.resizeObserver?.observe(this.container.current as Element);
    }

    componentDidUpdate(prevProps: BreadcrumbsProps<T>) {
        if (prevProps.items !== this.state.allItems) {
            this.recalculate();
        }
    }

    componentWillUnmount() {
        this.resizeObserver?.disconnect();
    }

    render() {
        const {className, qa} = this.props;
        const {calculated} = this.state;

        const rootItem = this.renderRootItem();

        return (
            <div className={b({calculated: calculated ? 'yes' : 'no'}, className)} data-qa={qa}>
                <div className={b('inner')} ref={this.container}>
                    {rootItem}
                    {this.renderMoreItem()}
                    {this.renderVisibleItems()}
                </div>
            </div>
        );
    }

    renderItem(data: T, isCurrent: boolean, isPrevCurrent: boolean) {
        const {renderItemContent} = this.props;

        return (
            <Item
                data={data}
                isCurrent={isCurrent}
                isPrevCurrent={isPrevCurrent}
                renderItem={renderItemContent}
            />
        );
    }

    renderItemDivider() {
        const {renderItemDivider} = this.props;

        return <BreadcrumbsSeparator renderItemDivider={renderItemDivider} />;
    }

    renderRootItem() {
        const {renderRootContent, renderItemContent} = this.props;
        const {rootItem, visibleItems} = this.state;
        const isCurrent = visibleItems.length === 0;

        if (!rootItem) {
            return null;
        }

        return (
            <Item
                data={rootItem}
                isCurrent={isCurrent}
                isPrevCurrent={false}
                renderItem={renderRootContent || renderItemContent}
            />
        );
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
        const {hiddenItems} = this.state;
        if (hiddenItems.length === 0) {
            return null;
        }

        const {popupStyle, popupPlacement, renderItemDivider} = this.props;
        return (
            <React.Fragment>
                <BreadcrumbsSeparator renderItemDivider={renderItemDivider} />
                <BreadcrumbsMore
                    items={hiddenItems}
                    popupPlacement={popupPlacement}
                    popupStyle={popupStyle}
                />
            </React.Fragment>
        );
    }

    private recalculate() {
        const {items: allItems, lastDisplayedItemsCount, firstDisplayedItemsCount} = this.props;

        if (this.container.current) {
            const dividers: HTMLElement[] = Array.from(
                this.container.current.querySelectorAll(`.${b('divider')}`),
            );
            const items: HTMLElement[] = [
                ...(Array.from(
                    this.container.current.querySelectorAll(`.${b('switcher')}`),
                ) as HTMLElement[]),
                ...(Array.from(
                    this.container.current.querySelectorAll(`.${b('item')}`),
                ) as HTMLElement[]),
            ];

            const availableWidth = this.container.current.offsetWidth;
            const itemsWidths = items.map(
                (elem, i) =>
                    elem.scrollWidth + (i === items.length - 1 ? GAP_WIDTH : GAP_WIDTH * 2),
            );
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
