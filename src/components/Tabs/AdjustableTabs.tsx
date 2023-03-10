import React from 'react';
import difference from 'lodash/difference';
import throttle from 'lodash/throttle';
import ResizeObserver from 'resize-observer-polyfill';

import i18n from './i18n';
import {TabsItemProps} from './Tabs';
import {TabsItem} from './TabsItem';
import {Icon} from '../Icon';
import {ChevronDownIcon} from '../icons';
import {Select, SelectProps} from '../Select';
import {block} from '../utils/cn';

import './Tabs.scss';

const SMALL_CONTAINER_WIDTH_NAME = 'small';
const LARGE_CONTAINER_WIDTH_NAME = 'large';
const READY_STATE_COMPLETE = 'complete';
const OUT_OF_SCREEN_POSITION = -99999;

const b = block('tabs');
const TAB_CLASS_NAME = b('tab');

type RenderControlProps = Parameters<NonNullable<SelectProps['renderControl']>>[0];
type OpenChangeProps = Parameters<NonNullable<SelectProps['onOpenChange']>>[0];
const getSortObjectKeysByValuesFunc =
    (objectToSort: Record<string, any>) => (a: string, b: string) => {
        if (objectToSort[a] > objectToSort[b]) {
            return 1;
        }
        if (objectToSort[a] < objectToSort[b]) {
            return -1;
        }
        return 0;
    };

/*
    ОБЩИЕ ПРИНЦИПЫ РАБОТЫ КОМПОНЕНТА:
    - Если все табы не помещаются в ширину контейнера, непоместившиеся скрываются и появляется свитчер с текстом
        "Ещё N", где N - количество непоместившихся табов, по клику появляется выпадающий список в котором можно
        выбрать один из непоместившихся табов при этом выбранный таб "встанет" на место последнего видимого.

    - Имеются две тесно связанные фичи:
        1 - конфигурируемая максимально допустимая ширина таба (текст таба скрывается за "…" если не помещается -
            будем в дальнейшем называть такие табы "переполненными")
        2 - использование всей ширины контейнера - подстройка ширины переполненных табов, чтобы заполнить всю ширину
            контейнера (на практике это выражется в том, что при выборе через свитчер максимально широкого из
            непоместившихся табов, отрендеренные табы + свитчер займут всю ширину контейнера).
        Поэтому, при расчёте лэйаута, логически выделяются: этап подготовки (в дальнейшем "снятие замеров") - вычисление
        ширины табов с учётом активного брейкпоинта (максимальной ширины на данном брейкпоинте), вычисление реальной
        ширины табов (без ограничения максимальной ширины), вычисление ширины свитчера, величины отступа между табами и
        прочее) и две основные фазы:) 1) нахождение индекса первого непоместившегося таба и 2) подстройка ширины
        переполненных табов под ширину контейнера (в дальнейшем фазы 1 и 2)
 */
interface AdjustableTabsProps {
    items: TabsItemProps[];
    activeTab?: string;
    breakpointsConfig: Record<string, number>;
    onSelectTab?: (tabId: string, event?: React.MouseEvent) => void;
    wrapTo?: (item: TabsItemProps, node: React.ReactNode, index: number) => React.ReactNode;
    className?: string;
}

interface AdjustableTabsState {
    dimensionsWereCollected: boolean;
    firstHiddenTabIndex: number;
    firstHiddenTabIndexBeforeRecollection: number | null;
    tabChosenFromSelectId: string | null;
    currentContainerWidthName: string | null | undefined;
    // flag for opened/closed status of select
    isSelectOpened: boolean;
}

class AdjustableTabs extends React.Component<AdjustableTabsProps, AdjustableTabsState> {
    static defaultProps = {
        // дефолтные значения конфигурации брейкпоинтов - объект где ключ - ширина элемента контейнера,  значение -
        // максимальная ширина таба в процентах от ширины контейнера, (так, для дефолтных значений, при ширине
        // контейнера от 401px до 500px максимальная ширина таба составит 33%, при ширине от 501px до 700px 30% и т.д.)
        // при ширине контейнера минимального из значений определённых в ключах объекта (в дефолтном случае 400)
        // вместо табов рендерится селект занимающий всю ширину контейнера.
        breakpointsConfig: {
            '400': 33,
            '500': 30,
            '700': 27,
            '800': 26,
            '900': 25,
            '1000': 24,
            '1100': 23,
            '1200': 22,
            '1300': 21,
            '1400': 20,
        },
    };

    private breakpoints: number[];
    private tabMaxWidthInPercentsForScreenSize: Record<string, number>;
    private throttledHandleResize: () => void;
    private resizeObserver?: ResizeObserver;
    private tabItemPaddingRight = 0;
    private switcherWidth = 0;

    // для удобства вычислений потребуется три объекта, у которых ключи - индексы табов, а значения - ширина табов,
    // при этом отдельно рассматривается реальная ширина табов (как если бы не было ограничений на max width)
    // и текущая ширина табов (с учётом ограничений по max width и подстройки ширины):

    // - реальная ширина табов, запишутся значения для всех табов
    private tabsRealWidth: Record<string, number> = {};

    // - то же, но запишутся только значения для переполненных табов (иметь такой объект только со значениями
    // переполненных табов необходимо для вычислений подстройки ширины переполненных табов)
    private overflownTabsRealWidth: Record<string, number> = {};

    // - текущая ширина табов, опять же, только для переполненных табов
    private overflownTabsCurrentWidth: Record<string, number> = {};

    // помимо этого, в массиве будем хранить текущую ширину всех табов, массив здесь удобен для вычисления
    // ширины N видимых табов, например, с первого по пятый.
    private tabsWidth: number[] = [];

    // флаг указывающий, что первоначальное снятие необходимых для дальнейших рассчётов размеров уже произошло
    private dimensionsWereInitiallyCollected = true;

    private selectSwitcherNode = React.createRef<HTMLDivElement>();
    private tabsRootNode = React.createRef<HTMLDivElement>();
    private tabsListNode = React.createRef<HTMLDivElement>();

    get activeTab() {
        const {activeTab, items} = this.props;
        if (activeTab) {
            return activeTab;
        } else {
            const [firstTab] = items;
            return firstTab.id;
        }
    }

    constructor(props: AdjustableTabsProps) {
        super(props);

        this.state = {
            // флаг указывающий на то, произошёл ли этап "снятия замеров"
            dimensionsWereCollected: false,
            // индекс первого скрытого таба
            firstHiddenTabIndex: this.props.items.length,
            // в определённом случае есть необходимость знать предыдущее значение индекса первого скрытого таба
            firstHiddenTabIndexBeforeRecollection: null,
            // так как после того, как посредством свитчера выбран один из непоместившихся табов и выбранный таб "встал"
            // на место последнего видимого, список видимых (в данный момент отрендеренных табов) будет НЕ в
            // последовательном порядке (например, будут отрендерены 1-й, 2-й и 5-й (выбранный через свитчер) табы,
            // а 3-й и 4-й будут скрыты), поэтому нам нужно хранить ID выбранного через свитчер таба
            tabChosenFromSelectId: null,
            // "имя" текущей ширины контейнера - для определения активного брейкоинта, зависит от значения в свойстве
            // "breakpointsConfig" (например, если, breakpointsConfig={ '400': 33, '1200': 22 }, при ширине контейнера
            // <= 400 currentContainerWidthName будет "small", при > 1200 - "large", а при ширине контейнера между 400 и
            // 1200 - "400-1200")
            currentContainerWidthName: null,
            isSelectOpened: false,
        };

        this.breakpoints = Object.keys(props.breakpointsConfig)
            .map(Number)
            .sort((a, b) => a - b);

        // сохраняем объект, где ключи - "имя" текущей ширины контейнера, значения - максимальная ширина таба для
        // соответствующей ширины контейнера (в процентах от ширины контейнера)
        this.tabMaxWidthInPercentsForScreenSize = this.breakpoints.reduce(
            (accum: Record<string, number>, currentBreakpointWidth, index, breakpointsArray) => {
                const nextBreakpointWidth = breakpointsArray[index + 1];

                let breakpointName = `${currentBreakpointWidth}-${nextBreakpointWidth}`;

                if (!nextBreakpointWidth) {
                    breakpointName = LARGE_CONTAINER_WIDTH_NAME;
                }

                accum[breakpointName] = props.breakpointsConfig[currentBreakpointWidth] || 100;

                return accum;
            },
            {},
        );

        this.handleResize = this.handleResize.bind(this);
        this.throttledHandleResize = throttle(this.handleResize, 350);
    }

    componentDidMount() {
        this.setState({currentContainerWidthName: this.getCurrentContainerWidthName()});

        if (this.tabsRootNode.current!.clientWidth > this.breakpoints[0]) {
            if ((document as any).fonts) {
                (document as any).fonts.ready.then(this.initialCollectDimensions);
            } else if ((document as any).readyState === READY_STATE_COMPLETE) {
                setTimeout(this.initialCollectDimensions, 0);
            } else {
                window.addEventListener('load', this.initialCollectDimensions);
            }
        } else {
            this.subscribeForResize();
        }
    }

    subscribeForResize = () => {
        this.resizeObserver = new ResizeObserver(this.throttledHandleResize);

        this.resizeObserver.observe(this.tabsRootNode.current!);
    };

    componentDidUpdate(prevProps: AdjustableTabsProps) {
        if (!this.dimensionsWereInitiallyCollected) {
            return;
        }

        if (this.wasItemsListUpdated(this.props.items, prevProps.items)) {
            this.setState(
                {
                    dimensionsWereCollected: false,
                    firstHiddenTabIndex: this.props.items.length,
                    firstHiddenTabIndexBeforeRecollection: null,
                },
                () => {
                    if (this.state.currentContainerWidthName !== SMALL_CONTAINER_WIDTH_NAME) {
                        this.collectDimensions();
                    }
                },
            );
        }
    }

    componentWillUnmount() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        window.removeEventListener('load', this.collectDimensions);
    }

    initialCollectDimensions = () => {
        // так как мы ожидаем прогрузки шрифтов для замера размеров табов и подписки на ресайз контейнера, возможен
        // случай, что к моменту загрузки шрифтов, компонент уже unmounted, поэтому, нужно проверять, что ref у корневой
        // ноды существует
        if (this.tabsRootNode.current) {
            this.dimensionsWereInitiallyCollected = true;
            this.recollectDimensions();
            this.subscribeForResize();
        }
    };

    /*
        Этап "снятия замеров". Разово высчитывается ширина табов и некоторые сопутствующие размеры/отступы
     */
    collectDimensions = () => {
        const tabsListNode = this.tabsListNode.current!;
        const tabs = tabsListNode.children;

        this.tabsWidth = [];

        const tabElement = tabsListNode.firstElementChild;

        if (tabElement) {
            const paddingRightValue = window
                .getComputedStyle(tabElement)
                .getPropertyValue('padding-right');

            // сохраняем значение правого padding-a (расстояние между табами которое может быть различным в зависимости
            // от значения css переменной --dl-tabs-space-between)
            this.tabItemPaddingRight = paddingRightValue ? parseInt(paddingRightValue, 10) : 0;
        }

        this.overflownTabsRealWidth = {};
        this.tabsRealWidth = {};

        // обходя в цикле все табы записываем текущую ширину каждого таба в массив this.tabsWidth
        // "наполняем" объекты this.tabsRealWidth и this.overflownTabsRealWidth
        for (let i = 0; i < tabs.length; i++) {
            const {width} = tabs[i].getBoundingClientRect();

            const tabTextNode = tabs[i].querySelector(`.${TAB_CLASS_NAME}`)!;

            if (tabTextNode.scrollWidth > tabTextNode.clientWidth) {
                // если весь текст не поместился и появилось "…"
                const widthCorrector = i === tabs.length - 1 ? 0 : this.tabItemPaddingRight;
                this.overflownTabsRealWidth[i] = tabTextNode.scrollWidth + widthCorrector;
                this.tabsRealWidth[i] = this.overflownTabsRealWidth[i];
            } else {
                this.tabsRealWidth[i] = width;
            }

            this.tabsWidth[i] = width;
        }

        this.switcherWidth = this.selectSwitcherNode.current!.getBoundingClientRect().width; // ширина элемента-свитчера

        this.setState({dimensionsWereCollected: true});

        this.recalculateTabs();
    };

    getCurrentContainerWidthName = () => {
        for (let index = 0; index < this.breakpoints.length; index++) {
            const breakpointWidth = this.breakpoints[index];
            const prevBreakpointWidth = this.breakpoints[index - 1];
            const nextBreakpointWidth = this.breakpoints[index + 1];

            const containerWidth = this.tabsRootNode.current!.clientWidth;
            const containerWidthLowerOrEqualThanBreakpointWidth = containerWidth <= breakpointWidth;
            const containerWidthBiggerThanBreakpointWidth = containerWidth > breakpointWidth;
            const containerWidthBiggerThanPrevBreakpointWidth = containerWidth < breakpointWidth;

            if (containerWidthLowerOrEqualThanBreakpointWidth && !prevBreakpointWidth) {
                return SMALL_CONTAINER_WIDTH_NAME;
            } else if (containerWidthBiggerThanBreakpointWidth && !nextBreakpointWidth) {
                return LARGE_CONTAINER_WIDTH_NAME;
            } else if (
                containerWidthBiggerThanPrevBreakpointWidth &&
                containerWidthLowerOrEqualThanBreakpointWidth
            ) {
                return `${prevBreakpointWidth}-${breakpointWidth}`;
            }
        }

        return;
    };

    /*
        Перерасчёт лэйаута - фазы 1 и 2
     */
    recalculateTabs = () => {
        // фаза 1 - вычисление индекса первого скрытого таба
        const activeTabId = this.activeTab;
        const {
            tabChosenFromSelectId,
            firstHiddenTabIndexBeforeRecollection: prevFirstHiddenTabIndex,
        } = this.state;
        // activeTabId - это ID активного таба, tabChosenFromSelectId - ID таба выбранного через свитчер,
        // таб выбранный через свитчер сразу после выбора становится активным (в этом случае, эти значения совпадают)
        // но если после юзер переключится (кликнул) на соседний таб, они снова будут отличаться

        const {items} = this.props;
        const {width: tabsRootNodeWidth} = this.tabsRootNode.current!.getBoundingClientRect();

        const activeTabIndex = items.findIndex((item) => item.id === activeTabId);
        const tabChosenFromSelectIndex = items.findIndex(
            (item) => item.id === tabChosenFromSelectId,
        );

        let renderedTabsSumWidth = 0;

        // firstHiddenTabIndexForSequentialCase - индекс первого скрытого таба для случая, когда табы расположены в
        // порядковой последовательности и без учёта максимальной ширины скрытого таба (необходим только для
        // промежуточных вычислений)
        // firstHiddenTabIndex - индекс первого скрытого таба в конкретной ситуации (с учётом шириный таба выбранного
        // через свитчер и максимальной ширины среди непоместившихся табов (будет храниться в стейте)

        // сначала, при обходе в цикле всех табов запоминается firstHiddenTabIndexForSequentialCase и максимальная
        // ширина среди скрытых табов, после этого в обратном цикле, начиная со значения таба с индексом
        // firstHiddenTabIndexForSequentialCase - 1 определяется сколько табов необходимо "переместить" в
        // непоместившееся, чтобы даже при выборе через свитчер таба с максимальной шириной, его ширина + ширина видимых
        // табов не превысила бы ширину контейнера
        let firstHiddenTabIndexForSequentialCase = null;
        let firstHiddenTabIndex = items.length;
        // если обойдя все значения ширин табов, мы так и не превысим ширину контейнера, в firstHiddenTabIndex
        // запишется значение равное количеству табов, таком образом будут отрендерены все табы

        let maxHiddenTabWidth = 0;
        let emptySpace = 0;

        // в цикле будут обходиться и суммироваться все значения ширины табов пока суммарная величина + значение
        // ширины свитчера не превысит ширину контейнера
        for (let i = 0; i < this.tabsWidth.length; i++) {
            renderedTabsSumWidth = renderedTabsSumWidth + this.tabsWidth[i];
            const switcherWidthCorrection = i >= items.length - 1 ? 0 : this.switcherWidth;
            const isOverflown = renderedTabsSumWidth + switcherWidthCorrection > tabsRootNodeWidth;

            if (firstHiddenTabIndexForSequentialCase === null && isOverflown) {
                firstHiddenTabIndexForSequentialCase = i;
                // emptySpace - "пустое" пространство в пикселях - разница между шириной контейнера и шириной
                // отрендеренных табов и свитчера
                emptySpace =
                    tabsRootNodeWidth -
                    (renderedTabsSumWidth - this.tabsWidth[i] + this.switcherWidth);
            }

            if (firstHiddenTabIndexForSequentialCase !== null) {
                const currentTabWidth =
                    this.tabsWidth[i] + (i === items.length - 1 ? this.tabItemPaddingRight : 0);

                maxHiddenTabWidth = Math.max(maxHiddenTabWidth, currentTabWidth);
            }
        }

        if (maxHiddenTabWidth) {
            let rightSpace = maxHiddenTabWidth - emptySpace;

            for (let j = firstHiddenTabIndexForSequentialCase! - 1; j >= 0; j--) {
                rightSpace = rightSpace - this.tabsWidth[j];

                if (rightSpace < 0) {
                    firstHiddenTabIndex = j + (tabChosenFromSelectIndex > j ? 0 : 1);

                    break;
                }
            }
        }

        const activeTabWasNotChosenBySelect =
            tabChosenFromSelectId && tabChosenFromSelectId !== activeTabId;
        const newFirstHiddenTabIndexLowerThanPrevious =
            firstHiddenTabIndex < prevFirstHiddenTabIndex!;

        // имеются два узких кейса, которые возникают при ресайзе и требуют изменения значения tabChosenFromSelectId и
        // перерасчёта лёйаута:
        // 1) ранее выбрав один из скрытых табов через свитчер пользователь переключился кликом на другой таб и уменьшил
        // экран таким образом, что выбранный ранее через свитчер таб перестал помещаться, в этом случае обнуляем
        // значение tabChosenFromSelectId и запускаем перерасчёт
        if (activeTabWasNotChosenBySelect && newFirstHiddenTabIndexLowerThanPrevious) {
            this.setState({tabChosenFromSelectId: null}, this.recalculateTabs);
            return false;
        }

        // 2) активный таб выбран не через свитчер, размер экрана уменьшен таким образом, что при стандартной порядковой
        // последовательности активный таб не должен быть отрендерен, но так как он активный - его нельзя просто так
        // скрыть, поэтому записываем его ID в tabChosenFromSelectId и запускаем перерасчёт
        if (
            this.state.tabChosenFromSelectId !== activeTabId &&
            activeTabIndex >= firstHiddenTabIndex
        ) {
            this.setState({tabChosenFromSelectId: activeTabId}, this.recalculateTabs);
            return false;
        }

        this.setState({firstHiddenTabIndex});

        // фаза 1 завершена, вызываем метод подстройки ширины переполненных табов, чтобы заполнить всю ширину контейнера
        this.setUpOverflownTabs(firstHiddenTabIndex, activeTabIndex, tabsRootNodeWidth);

        return;
    };

    setUpOverflownTabs(
        firstHiddenTabIndex: number,
        _activeTabIndex: number,
        tabsRootNodeWidth: number,
    ) {
        const {tabChosenFromSelectId} = this.state;
        const {items} = this.props;
        const tabChosenFromSelectIndex = items.findIndex(
            (item) => item.id === tabChosenFromSelectId,
        );
        const allTabsWillBeVisible = firstHiddenTabIndex === items.length;
        const withTabChosenFromSelect = tabChosenFromSelectIndex >= firstHiddenTabIndex;
        // firstTabParticipatedInShiftingIndex - индекс первого таба который участвует в смене выбранного таба при
        // использовании свитчера (другими словами может оказаться в выпадающем списке при текущей ширине контейнера)
        // - это либо последний видимый таб (если выбор через свитчер еще ни произошёл) либо первый из скрытых
        // (в обратном случае)
        const firstTabParticipatedInShiftingIndex =
            firstHiddenTabIndex - (withTabChosenFromSelect ? 0 : 1);

        const alwaysVisibleTabsWidth = this.tabsWidth
            .slice(
                0,
                firstHiddenTabIndex - (allTabsWillBeVisible || withTabChosenFromSelect ? 0 : 1),
            )
            .reduce((sum, val) => sum + val, 0);

        // индекс самого широкого (реальная ширина) таба, из тех, что участвуют в смене выбранного таба
        let widestTabParticipatedInShiftingIndex: number | null = null;
        let widestHiddenTabRealWidth = 0;

        for (let i = firstTabParticipatedInShiftingIndex; i < items.length; i++) {
            const currentHiddenTabWidth = this.tabsRealWidth[i];
            widestHiddenTabRealWidth = Math.max(currentHiddenTabWidth, widestHiddenTabRealWidth);

            if (widestHiddenTabRealWidth === currentHiddenTabWidth) {
                widestTabParticipatedInShiftingIndex = i;
            }
        }

        const switcherAndMaxHiddenTabWidth = allTabsWillBeVisible
            ? 0
            : this.tabsWidth[widestTabParticipatedInShiftingIndex!] + this.switcherWidth;

        const overflownTabsKeys = Object.keys(this.overflownTabsRealWidth);

        // необходимо иметь отдельно массив индексов переполненных табов которые в настоящий момент
        // видимы (overflownAndVisibleTabsKeys) и отдельно массив индексов переполненных табов в настоящий момент не
        // видимых (overflownAndHiddenTabsKeys)
        const overflownAndVisibleTabsKeys = overflownTabsKeys.filter(
            (tabIndex) =>
                Number(tabIndex) < firstTabParticipatedInShiftingIndex ||
                Number(tabIndex) === widestTabParticipatedInShiftingIndex,
        );

        const isLastTabChosenFromSelectAndOverflown =
            tabChosenFromSelectIndex === items.length - 1 &&
            overflownAndVisibleTabsKeys.indexOf(String(tabChosenFromSelectIndex)) >= 0;

        // главная идея подстройки ширины переполненных табов, для заполнения всей ширины контейнера - высчитать,
        // какое "пустое" пространство останется, если пользователь выбрал таб с максимальной шириной через свитчер и
        // разделить это пространство среди переполненных табов - т.е. увеличить их ширину, чтобы занять всю ширину
        // контейнера
        let emptySpace = tabsRootNodeWidth - alwaysVisibleTabsWidth - switcherAndMaxHiddenTabWidth;

        if (isLastTabChosenFromSelectAndOverflown) {
            emptySpace = emptySpace - this.tabItemPaddingRight;
        }

        const overflownAndHiddenTabsKeys = difference(
            overflownTabsKeys,
            overflownAndVisibleTabsKeys,
        );

        const overflownAndVisibleTabsIndexesSortedByWidth = overflownAndVisibleTabsKeys
            .sort(getSortObjectKeysByValuesFunc(this.overflownTabsRealWidth))
            .map(Number);

        // additionPixelsToFitEmptySpace - значение сколько пикселей будет прибавлено к ширине переполненных табов
        let additionPixelsToFitEmptySpace = emptySpace / overflownAndVisibleTabsKeys.length;
        let numberOfTabsToShareEmptySpace = overflownAndVisibleTabsKeys.length;

        this.overflownTabsCurrentWidth = {};

        overflownAndVisibleTabsIndexesSortedByWidth.forEach((overflownTabIndex) => {
            const realTabWidth = this.overflownTabsRealWidth[overflownTabIndex];
            const tabWidthWithAdditional =
                this.tabsWidth[overflownTabIndex] + additionPixelsToFitEmptySpace;

            if (realTabWidth < tabWidthWithAdditional) {
                // может случиться, что значение "текущая ширина переполненного таба + additionPixelsToFitEmptySpace"
                // окажется больше реальной ширины таба, в таком случае текущая ширина становится равной реальной, а
                // это значит, что мы использовали не всё пиксели из того значения что мы собрались разделить среди
                // переполненных табов и тогда мы передаём эти пиксели (diff) для оставшихся табов, т.е. тех, чью ширину
                // к данной итерации  ещё не увеличили (если они есть)
                numberOfTabsToShareEmptySpace--;
                const diff = tabWidthWithAdditional - realTabWidth;
                additionPixelsToFitEmptySpace =
                    additionPixelsToFitEmptySpace + diff / numberOfTabsToShareEmptySpace;
                this.tabsWidth[overflownTabIndex] = realTabWidth;
            } else {
                this.tabsWidth[overflownTabIndex] = tabWidthWithAdditional;
            }

            this.overflownTabsCurrentWidth[overflownTabIndex] = this.tabsWidth[overflownTabIndex];
        });

        overflownAndHiddenTabsKeys.map(Number).forEach((overflownTabIndex) => {
            const realTabWidth = this.overflownTabsRealWidth[overflownTabIndex];
            const tabWidthWithAdditional =
                this.tabsWidth[overflownTabIndex] + additionPixelsToFitEmptySpace;

            if (realTabWidth < tabWidthWithAdditional) {
                this.tabsWidth[overflownTabIndex] = realTabWidth;
            } else {
                this.tabsWidth[overflownTabIndex] = tabWidthWithAdditional;
            }

            this.overflownTabsCurrentWidth[overflownTabIndex] = this.tabsWidth[overflownTabIndex];
        });
    }

    recollectDimensions = () => {
        this.setState(
            (state) => ({
                dimensionsWereCollected: false,
                firstHiddenTabIndex: this.props.items.length,
                firstHiddenTabIndexBeforeRecollection: state.firstHiddenTabIndex,
            }),
            this.collectDimensions,
        );
    };

    selectTab(tabId: string, event?: React.MouseEvent) {
        if (this.props.onSelectTab) {
            this.props.onSelectTab(tabId, event);
        }
    }

    /*
        Проверка вызывающаяся в методе componentDidUpdate и проверяющая что табы "пришедшие" с новыми props имеют тот же
        порядок и тайтл что и предыдущие. В случае, если это не так будет вызван метод collectDimensions, чтобы
        запомнить снять новые замеры и запустить последующие фазы пересчёта лэйаута
     */
    wasItemsListUpdated = (currentItems: TabsItemProps[], prevItems: TabsItemProps[]) => {
        if (currentItems.length !== prevItems.length) {
            return true;
        }

        for (let i = 0; i < currentItems.length; i++) {
            const currentItem = currentItems[i];
            const prevItem = prevItems[i];
            const currentItemTitle = currentItem.title || currentItem.id;
            const prevItemTitle = prevItem.title || prevItem.id;

            if (currentItemTitle !== prevItemTitle) {
                return true;
            }
        }

        return false;
    };

    handleResize = () => {
        if (this.state.isSelectOpened) {
            // https://github.com/gravity-ui/uikit/issues/553
            this.selectSwitcherNode.current?.click();
        }

        const newContainerWidthName = this.getCurrentContainerWidthName();

        if (this.state.currentContainerWidthName !== newContainerWidthName) {
            this.setState({currentContainerWidthName: newContainerWidthName}, () => {
                if (newContainerWidthName !== SMALL_CONTAINER_WIDTH_NAME) {
                    this.recollectDimensions();
                }
            });
        } else if (newContainerWidthName !== SMALL_CONTAINER_WIDTH_NAME) {
            this.recollectDimensions();
        }
    };

    handleOpenSelectChange = (isSelectOpened: OpenChangeProps) => {
        this.setState({isSelectOpened});
    };

    onChooseTabFromSelect = (tabChosenFromSelectIds: string[]) => {
        const tabChosenFromSelectId = tabChosenFromSelectIds?.[0];
        this.selectTab(tabChosenFromSelectId);

        this.setState({tabChosenFromSelectId});
        this.recollectDimensions();
    };

    onTabClick = (tabId: string, event?: React.MouseEvent<Element, MouseEvent>) => {
        if (tabId === this.activeTab) {
            return;
        }

        this.selectTab(tabId, event);
    };

    /*
        Высчитывается какое значение свойста left необходимо задать абсолютно спозиционированному свитчеру при
        текущем наборе отрендеренных табов
     */
    calcSelectSwitcherLeftPosition = () => {
        const {tabChosenFromSelectId, firstHiddenTabIndex} = this.state;
        const {items} = this.props;
        let tabChosenFromSelectIndex = null;

        if (tabChosenFromSelectId) {
            tabChosenFromSelectIndex = this.props.items.findIndex(
                (item) => item.id === tabChosenFromSelectId,
            );
        }

        let widthCorrection =
            tabChosenFromSelectId && tabChosenFromSelectIndex! > firstHiddenTabIndex
                ? this.tabsWidth[tabChosenFromSelectIndex!]
                : 0;

        // если выбран самый последний таб, необходимо учесть значение правого маржина, так как в положении, когда
        // все табы помещаюся в ширину контейнера и свитчера нет, последнему табу не нужен правый маржин, но если
        // не все табы помещаются и справа от этого таба есть свитчер, то маржин нужен, чтобы свитчер не был вплотную
        if (tabChosenFromSelectIndex === items.length - 1) {
            widthCorrection = widthCorrection + this.tabItemPaddingRight;
        }

        return this.tabsWidth && firstHiddenTabIndex < items.length
            ? this.tabsWidth
                  .slice(0, firstHiddenTabIndex)
                  .reduce((sum, val) => sum + val, widthCorrection)
            : OUT_OF_SCREEN_POSITION;
    };

    renderSwitcherForMoreSelect = (switcherProps: RenderControlProps) => {
        const {firstHiddenTabIndex, tabChosenFromSelectId} = this.state;
        const {items} = this.props;
        const tabChosenFromSelectIndex = items.findIndex(
            (item) => item.id === tabChosenFromSelectId,
        );
        const itemsNum =
            items.length -
            firstHiddenTabIndex -
            (tabChosenFromSelectIndex > firstHiddenTabIndex ? 1 : 0);
        const hint = i18n('label_more', {count: itemsNum});

        return this.renderSwitcher({...switcherProps, text: hint, index: firstHiddenTabIndex});
    };

    renderSwitcherForTabsAsSelect = (switcherProps: RenderControlProps) => {
        const {items} = this.props;
        const activeTab = items.find((item) => item.id === this.activeTab);
        const activeTabIndex = items.findIndex((item) => item.id === this.activeTab);
        const hint = activeTab ? activeTab.title || activeTab.id : items[0].title || items[0].id;

        return this.renderSwitcher({
            ...switcherProps,
            text: hint as string,
            active: Boolean(activeTab),
            index: activeTabIndex!,
        });
    };

    renderSwitcher = (
        switcherProps: RenderControlProps & {
            text: string;
            active?: boolean;
            index: number;
        },
    ) => {
        const {wrapTo} = this.props;
        const {text, active = false, onClick, ref, index} = switcherProps;

        const title = (
            <div className={b('switcher-tab-content')}>
                <span className={b('switcher-tab-text')}>{text}</span>
                <span className={b('switcher-tab-icon')}>
                    <Icon data={ChevronDownIcon} className={b('chevron-icon')} />
                </span>
            </div>
        );

        const switcherTabProps = {title, hint: text, id: 'switcher-tab'};
        const tabItemNode = (
            <TabsItem
                {...switcherTabProps}
                className={b('tab', {active})}
                active={Boolean(active)}
                onClick={() => {}}
            />
        );

        return (
            <div
                key="switcher"
                className={b('tab-container', {'switcher-tab': true})}
                onClick={onClick}
                ref={ref as React.LegacyRef<HTMLDivElement>} // https://github.com/gravity-ui/uikit/issues/552
            >
                {wrapTo ? wrapTo(switcherTabProps, tabItemNode, index) : tabItemNode}
            </div>
        );
    };

    renderTabs = () => {
        const {items} = this.props;
        const {firstHiddenTabIndex, tabChosenFromSelectId} = this.state;
        let tabChosenFromSelectIndex: number | null = null;

        if (tabChosenFromSelectId) {
            tabChosenFromSelectIndex = this.props.items.findIndex(
                (item) => item.id === tabChosenFromSelectId,
            );
        }

        const needToAddTabChosenFromSelect =
            tabChosenFromSelectId && tabChosenFromSelectIndex! > firstHiddenTabIndex;

        return items
            .slice(0, firstHiddenTabIndex)
            .concat(needToAddTabChosenFromSelect ? items[tabChosenFromSelectIndex!] : [])
            .map((item, index) =>
                this.renderTabItem(
                    item,
                    index < firstHiddenTabIndex ? index : tabChosenFromSelectIndex!,
                ),
            );
    };

    renderTabItem = (item: TabsItemProps, tabIndex: number) => {
        const {items, wrapTo} = this.props;
        const activeTabID = this.activeTab;
        const {dimensionsWereCollected, currentContainerWidthName} = this.state;

        const needSetMaxWidth =
            dimensionsWereCollected && tabIndex in this.overflownTabsCurrentWidth;
        const isLastTab = item.id === items[items.length - 1].id && tabIndex === items.length - 1;
        const noOverflow =
            needSetMaxWidth &&
            this.overflownTabsRealWidth[tabIndex] === this.overflownTabsCurrentWidth[tabIndex];

        const maxWidth = dimensionsWereCollected
            ? this.overflownTabsCurrentWidth[tabIndex]
            : `${this.tabMaxWidthInPercentsForScreenSize[currentContainerWidthName!]}%`;

        const tabNode = (
            <TabsItem
                {...item}
                className={b('tab', {active: item.id === activeTabID})}
                active={item.id === activeTabID}
                onClick={this.onTabClick}
            />
        );

        return (
            <div
                key={item.id}
                style={{maxWidth: items.length > 1 ? maxWidth : '100%'}}
                className={b('tab-container', {'last-tab': isLastTab, 'no-overflow': noOverflow})}
            >
                {wrapTo ? wrapTo(item, tabNode, tabIndex) : tabNode}
            </div>
        );
    };

    renderSelect() {
        const activeTabID = this.activeTab;
        const {firstHiddenTabIndex, tabChosenFromSelectId} = this.state;
        const {items} = this.props;

        const itemsForSelect = items
            .slice(firstHiddenTabIndex, items.length)
            .filter((item) => {
                return item.id !== activeTabID && item.id !== tabChosenFromSelectId;
            })
            .map((item) => ({
                value: item.id,
                content: item.title || item.id,
                key: item.id,
                disabled: item.disabled,
            }));

        return (
            <Select
                onUpdate={this.onChooseTabFromSelect}
                options={itemsForSelect}
                value={[]}
                filterable={false}
                renderControl={this.renderSwitcherForMoreSelect}
                onOpenChange={this.handleOpenSelectChange}
            />
        );
    }

    handleTabsAsSelectUpdate = (tabIds: string[]) => {
        const tabId = tabIds?.[0];
        this.selectTab(tabId);
        this.setState({tabChosenFromSelectId: tabId});
    };

    renderTabsAsSelect() {
        const activeTabID = this.activeTab;
        const {items} = this.props;

        const itemsForSelect = items.map((item) => ({
            value: item.id,
            content: item.title || item.id,
            key: item.id,
            disabled: item.disabled,
        }));

        return (
            <Select
                className={b('tabs-as-select-control')}
                onUpdate={this.handleTabsAsSelectUpdate}
                options={itemsForSelect}
                value={activeTabID === undefined ? [] : [activeTabID]}
                filterable={false}
                renderControl={this.renderSwitcherForTabsAsSelect}
                onOpenChange={this.handleOpenSelectChange}
            />
        );
    }

    render() {
        const {wrapTo, items, className} = this.props;
        const isDefaultRender = !wrapTo;

        return (
            <div
                ref={this.tabsRootNode}
                className={b(
                    {
                        visible: this.state.dimensionsWereCollected,
                        'is-default-render': isDefaultRender,
                    },
                    className,
                )}
            >
                {this.state.currentContainerWidthName === SMALL_CONTAINER_WIDTH_NAME &&
                items.length > 1 ? (
                    this.renderTabsAsSelect()
                ) : (
                    <React.Fragment>
                        <div ref={this.tabsListNode} className={b('tabs-list')}>
                            {this.renderTabs()}
                        </div>
                        <div
                            ref={this.selectSwitcherNode}
                            className={b('select-switcher')}
                            style={{left: this.calcSelectSwitcherLeftPosition()}}
                        >
                            {this.renderSelect()}
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default AdjustableTabs;
