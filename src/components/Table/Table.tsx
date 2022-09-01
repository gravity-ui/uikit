import React from 'react';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _isNumber from 'lodash/isNumber';
import ResizeObserver from 'resize-observer-polyfill';
import {block} from '../utils/cn';
import i18n from './i18n';
import './Table.scss';

const DASH = '\u2014';

export interface TableDataItem {
    [key: string]: any;
}

type ActiveScrollElementType = 'scrollBar' | 'scrollContainer';

interface TableState {
    // activeScrollElement is required so listener on table scroll won't fire when scrollbar will appear (and vice-versa)
    // without that page will wobble on scrolling
    activeScrollElement: ActiveScrollElementType;
    columnsStyles: React.CSSProperties[];
    columnHeaderRefs: React.RefObject<HTMLTableCellElement>[];
}

export interface TableColumnConfig<I> {
    /** ID колонки */
    id: string;
    /** Имя колонки (заголовок). По умолчанию: ID колонки */
    name?: string | (() => React.ReactNode);
    /** Класс, который будет добавлен всем ячейкам в этой колонке */
    className?: string;
    /** Заглушка при отсутствии данных в ячейке. По умолчанию: — (&mdash;) */
    placeholder?: string | ((item: I, index: number) => React.ReactNode);
    /** Содержимое ячейки. Если передать строку, то содержимое ячейки будет значением поля с именем равным этой строке. По умолчанию: Значение поля с именем равным ID колонки */
    template?: string | ((item: I, index: number) => React.ReactNode);
    /** Выравнивание содержимого. */
    align?: 'left' | 'center' | 'right';
    /** "Прилипание" колонки. */
    sticky?: 'left' | 'right';
    /** Выделяет колонку среди остальных. */
    primary?: boolean;
    /** Ширина колонки в px или строка в %. Width в таблице может вести себя не так, как ожидаете (как min-width у block-элементов). Возможно, нужно будет использовать `table-layout: fixed;` */
    width?: number | string;
    /** Различные данные, настройки для HOC-ов. */
    meta?: Record<string, any>;
}

// TODO: Заменить @default в описании пропсов на defaultProps, чтобы сторибук мог автоматом подхватить.
export interface TableProps<I> {
    /** Данные */
    data: I[];
    /** Параметры колонок */
    columns: TableColumnConfig<I>[];
    /** Выравнивание содержимого по вертикали  */
    verticalAlign?: 'top' | 'middle';
    /**
     * Горизонтальный sticky scroll у таблицы.
     * Note: таблица не может быть одновременно с фиксированной высотой и со sticky scroll.
     * Sticky scroll не будет работать, если у таблицы будет overflow.
     *
     * @default false
     */
    stickyHorizontalScroll?: boolean;
    /**
     * Порог, который должен пересечь родительский блок, чтобы скролл "приклеился".
     * Полезно, например, в консоли, когда плашка от groupActions закрывает скролл.
     *
     * @default 0
     */
    stickyHorizontalScrollBreakpoint?: number;
    /**
     * ID строки.
     * Используется при выборе строк и сортировке. Если передать строку,
     * то ID будет значение поля в данных строки с именем равным ID колонки.
     */
    getRowId?: string | ((item: I, index: number) => string);
    /** CSS-классы строки */
    getRowClassNames?: (item: I, index: number) => string[];
    /** Условие для блокирования колонок */
    isRowDisabled?: (item: I, index: number) => boolean;
    /** Обработчик клика по строке. С его добавлением появляется ховер на строке и `cursor: pointer` */
    onRowClick?: (item: I, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void;
    /** Сообщение при отсутствии данных во всей таблице. По умолчанию: "Нет данных" */
    emptyMessage?: string;
    /** CSS-класс таблицы. */
    className?: string;
    /** boolean флаг добавляет горизонтальные отступы для крайних ячееек */
    edgePadding?: boolean;
}

interface TableDefaultProps {
    edgePadding: boolean;
}

const b = block('table');

export class Table<I extends TableDataItem = Record<string, string>> extends React.Component<
    TableProps<I>,
    TableState
> {
    static defaultProps: TableDefaultProps = {
        edgePadding: true,
    };

    // Static methods may be used by HOCs
    static getRowId<I extends TableDataItem>(props: TableProps<I>, item: I, rowIndex?: number) {
        const {data, getRowId} = props;
        const index = rowIndex ?? data.indexOf(item);

        if (typeof getRowId === 'function') {
            return getRowId(item, index);
        }

        if (getRowId && getRowId in item) {
            return String(item[getRowId]);
        }

        return String(index);
    }

    static getHeadCellContent<I extends TableDataItem>(
        column: TableColumnConfig<I>,
    ): React.ReactNode {
        const {id, name} = column;

        let content;
        if (typeof name === 'function') {
            content = name();
        } else if (typeof name === 'string') {
            content = name;
        } else {
            content = id;
        }

        return <span className={b('th-content')}>{content}</span>;
    }

    static getBodyCellContent<I extends TableDataItem>(
        column: TableColumnConfig<I>,
        item: I,
        rowIndex: number,
    ): React.ReactNode {
        const {id, template, placeholder} = column;

        let placeholderValue;
        if (typeof placeholder === 'function') {
            placeholderValue = placeholder(item, rowIndex);
        } else {
            placeholderValue = placeholder ?? DASH;
        }

        let value;
        if (typeof template === 'function') {
            value = template(item, rowIndex);
        } else if (typeof template === 'string') {
            value = _get(item, template);
        } else if (_has(item, id)) {
            value = _get(item, id);
        }
        if ([undefined, null, ''].includes(value as any) && placeholderValue) {
            return placeholderValue;
        }

        return value;
    }

    static getDerivedStateFromProps<I extends TableDataItem>(
        props: Readonly<TableProps<I>>,
        state: Readonly<TableState>,
    ): Partial<typeof state> | null {
        if (props.columns.length === state.columnHeaderRefs.length) {
            return null;
        }

        return {
            columnHeaderRefs: Array.from(props.columns, () => React.createRef()),
        };
    }

    state: TableState = {
        activeScrollElement: 'scrollContainer',
        columnsStyles: Array.from(this.props.columns, () => ({})),
        columnHeaderRefs: Array.from(this.props.columns, () => React.createRef()),
    };

    private tableRef = React.createRef<HTMLTableElement>();
    private scrollContainerRef = React.createRef<HTMLDivElement>();
    private horizontalScrollBarRef = React.createRef<HTMLDivElement>();
    private horizontalScrollBarInnerRef = React.createRef<HTMLDivElement>();

    private tableResizeObserver: ResizeObserver | undefined;
    private columnsResizeObserver: ResizeObserver | undefined;

    componentDidMount() {
        if (this.props.stickyHorizontalScroll) {
            this.tableResizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
                const {contentRect} = entries[0];

                // синхронизируем ширину скролл-бара с шириной таблицы
                this.horizontalScrollBarInnerRef.current?.style.setProperty(
                    'width',
                    `${contentRect.width}px`,
                );
            });

            if (this.tableRef.current) {
                this.tableResizeObserver.observe(this.tableRef.current);
            }

            if (this.scrollContainerRef.current) {
                this.scrollContainerRef.current.addEventListener(
                    'scroll',
                    this.handleScrollContainerScroll,
                );
                this.scrollContainerRef.current.addEventListener(
                    'mouseenter',
                    this.handleScrollContainerMouseenter,
                );
            }

            if (this.horizontalScrollBarRef.current) {
                this.horizontalScrollBarRef.current.addEventListener(
                    'scroll',
                    this.handleHorizontalScrollBarScroll,
                );
                this.horizontalScrollBarRef.current.addEventListener(
                    'mouseenter',
                    this.handleHorizontalScrollBarMouseenter,
                );
            }
        }

        this.columnsResizeObserver = new ResizeObserver(() => {
            this.updateColumnStyles();
        });

        if (this.tableRef.current) {
            this.columnsResizeObserver.observe(this.tableRef.current);
        }
    }

    componentDidUpdate(prevProps: TableProps<I>) {
        if (this.props.columns !== prevProps.columns) {
            this.updateColumnStyles();
        }
    }

    componentWillUnmount() {
        if (this.props.stickyHorizontalScroll) {
            if (this.tableResizeObserver) {
                this.tableResizeObserver.disconnect();
            }

            if (this.scrollContainerRef.current) {
                this.scrollContainerRef.current.removeEventListener(
                    'scroll',
                    this.handleScrollContainerScroll,
                );
                this.scrollContainerRef.current.removeEventListener(
                    'mouseenter',
                    this.handleScrollContainerMouseenter,
                );
            }

            if (this.horizontalScrollBarRef.current) {
                this.horizontalScrollBarRef.current.removeEventListener(
                    'scroll',
                    this.handleHorizontalScrollBarScroll,
                );
                this.horizontalScrollBarRef.current.removeEventListener(
                    'mouseenter',
                    this.handleHorizontalScrollBarMouseenter,
                );
            }
        }

        if (this.columnsResizeObserver) {
            this.columnsResizeObserver.disconnect();
        }
    }

    render() {
        const {columns, stickyHorizontalScroll, className} = this.props;
        const withPrimary = columns.some(({primary}) => primary);

        return (
            <div
                className={b(
                    {
                        'with-primary': withPrimary,
                        'with-sticky-scroll': stickyHorizontalScroll,
                    },
                    className,
                )}
            >
                {stickyHorizontalScroll ? (
                    <React.Fragment>
                        <div ref={this.scrollContainerRef} className={b('scroll-container')}>
                            {this.renderTable()}
                        </div>
                        {this.renderHorizontalScrollBar()}
                    </React.Fragment>
                ) : (
                    this.renderTable()
                )}
            </div>
        );
    }

    private renderHead() {
        const {columns, edgePadding} = this.props;
        const {columnsStyles} = this.state;

        return (
            <thead className={b('head')}>
                <tr className={b('row')}>
                    {columns.map((column, index) => {
                        const {id, align, primary, sticky, className} = column;
                        const content = Table.getHeadCellContent(column);

                        return (
                            <th
                                key={id}
                                ref={this.state.columnHeaderRefs[index]}
                                style={columnsStyles[index]}
                                className={b(
                                    'cell',
                                    {
                                        align,
                                        primary,
                                        sticky,
                                        ['edge-padding']: edgePadding,
                                    },
                                    className,
                                )}
                            >
                                {content}
                            </th>
                        );
                    })}
                </tr>
            </thead>
        );
    }

    private renderBody() {
        const {data} = this.props;

        return (
            <tbody className={b('body')}>
                {data.length > 0 ? data.map(this.renderRow) : this.renderEmptyRow()}
            </tbody>
        );
    }

    private renderTable() {
        return (
            <table ref={this.tableRef} className={b('table')}>
                {this.renderHead()}
                {this.renderBody()}
            </table>
        );
    }

    private renderRow = (item: I, rowIndex: number) => {
        const {columns, isRowDisabled, onRowClick, getRowClassNames, verticalAlign, edgePadding} =
            this.props;
        const {columnsStyles} = this.state;

        const disabled = isRowDisabled ? isRowDisabled(item, rowIndex) : false;
        const interactive = Boolean(!disabled && onRowClick);
        const additionalClassNames = getRowClassNames ? getRowClassNames(item, rowIndex) : [];

        return (
            <tr
                key={Table.getRowId(this.props, item, rowIndex)}
                onClick={
                    !disabled && onRowClick ? onRowClick.bind(null, item, rowIndex) : undefined
                }
                className={b(
                    'row',
                    {disabled, interactive, 'vertical-align': verticalAlign},
                    additionalClassNames.join(' '),
                )}
            >
                {columns.map((column, colIndex) => {
                    const {id, align, primary, className, sticky} = column;
                    const content = Table.getBodyCellContent(column, item, rowIndex);

                    return (
                        <td
                            key={id}
                            style={columnsStyles[colIndex]}
                            className={b(
                                'cell',
                                {
                                    align,
                                    primary,
                                    sticky,
                                    ['edge-padding']: edgePadding,
                                },
                                className,
                            )}
                        >
                            {content}
                        </td>
                    );
                })}
            </tr>
        );
    };

    private renderEmptyRow() {
        const {columns, emptyMessage} = this.props;

        return (
            <tr className={b('row', {empty: true})}>
                <td className={b('cell')} colSpan={columns.length}>
                    {emptyMessage ? emptyMessage : i18n('label_empty')}
                </td>
            </tr>
        );
    }

    private renderHorizontalScrollBar() {
        const {stickyHorizontalScroll, stickyHorizontalScrollBreakpoint = 0} = this.props;
        return (
            <div
                ref={this.horizontalScrollBarRef}
                className={b('horizontal-scroll-bar', {
                    'sticky-horizontal-scroll': stickyHorizontalScroll,
                })}
                style={{bottom: `${stickyHorizontalScrollBreakpoint}px`}}
            >
                <div
                    ref={this.horizontalScrollBarInnerRef}
                    className={b('horizontal-scroll-bar-inner')}
                />
            </div>
        );
    }

    private updateColumnStyles() {
        this.setState((prevState) => {
            const columnsWidth = prevState.columnHeaderRefs.map((ref) =>
                ref.current === null ? undefined : ref.current.getBoundingClientRect().width,
            );

            const columnsStyles = this.props.columns.map((_, index) =>
                this.getColumnStyles(index, columnsWidth),
            );

            return {columnsStyles};
        });
    }

    private getColumnStyles(index: number, columnsWidth: (number | undefined)[]) {
        const {columns} = this.props;

        const column = columns[index];
        const style: React.CSSProperties = {};
        if (typeof column.width === 'string') {
            return {maxWidth: 0, width: column.width};
        }
        if (typeof column.width !== 'undefined') {
            style.width = column.width;
        }
        if (!column.sticky) {
            return style;
        }

        const filteredColumns =
            column.sticky === 'left' ? columnsWidth.slice(0, index) : columnsWidth.slice(index + 1);
        style[column.sticky] = filteredColumns.reduce<number>((left, width) => {
            return _isNumber(width) ? left + width : left;
        }, 0);

        return style;
    }

    private handleScrollContainerMouseenter = () => {
        this.setState({activeScrollElement: 'scrollContainer'});
    };

    private handleScrollContainerScroll = () => {
        if (
            this.state.activeScrollElement === 'scrollContainer' &&
            this.horizontalScrollBarRef.current &&
            this.scrollContainerRef.current
        ) {
            this.horizontalScrollBarRef.current.scrollLeft =
                this.scrollContainerRef.current.scrollLeft;
        }
    };

    private handleHorizontalScrollBarMouseenter = () => {
        this.setState({activeScrollElement: 'scrollBar'});
    };

    private handleHorizontalScrollBarScroll = () => {
        if (
            this.state.activeScrollElement === 'scrollBar' &&
            this.horizontalScrollBarRef.current &&
            this.scrollContainerRef.current
        ) {
            this.scrollContainerRef.current.scrollLeft =
                this.horizontalScrollBarRef.current.scrollLeft;
        }
    };
}
