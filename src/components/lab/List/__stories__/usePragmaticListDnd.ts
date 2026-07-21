/**
 * Референсный dnd-адаптер §8 поверх @atlaskit/pragmatic-drag-and-drop —
 * «полная» форма контракта: и props (ref-регистрация строк), и состояние.
 *
 * Модель либы: регистрация DOM-элементов (`draggable`/`dropTargetForElements`)
 * + глобальный `monitorForElements`; props она не отдаёт вовсе, нативный
 * атрибут `draggable="true"` ставит на элементе сама. Грань before/after
 * считает closest-edge из hitbox-аддона.
 *
 * Drag — только за ручку: `dragHandle` либы. Ручка приходит вторым per-id
 * ref'ом (`getHandleRef`) — метод живёт на объекте адаптера, контракту листа
 * не мешает (лишние поля `dnd`-пропа ядро игнорирует); строка
 * перерегистрируется, когда оба узла известны. Без ручки drag стартовал бы
 * за любое место строки.
 *
 * Обязательства адаптера из §8 здесь видны буквально:
 * - per-id ref-callbacks стабильны (кеши в rowRefsRef/handleRefsRef) — иначе
 *   композиция ядра пересоздавала бы форк и дёргала перерегистрацию либы
 *   на каждый рендер;
 * - dropTarget дедуплицируется до setState — dragover сыпет событиями
 *   на каждый пиксель.
 */
import * as React from 'react';

import {combine} from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
    draggable,
    dropTargetForElements,
    monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
    attachClosestEdge,
    extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

import type {ListDndAdapter, ListDropTarget} from '../types';

export interface UsePragmaticListDndOptions {
    onDrop: (fromId: string, toId: string, position: 'before' | 'after') => void;
}

export interface PragmaticListDnd extends ListDndAdapter {
    /** Ref ручки строки: drag стартует только с неё (`dragHandle` либы) */
    getHandleRef: (id: string) => React.RefCallback<HTMLElement>;
}

const ITEM_ID_KEY = 'listStoryItemId';

function getItemId(data: Record<string | symbol, unknown>): string | undefined {
    const id = data[ITEM_ID_KEY];
    return typeof id === 'string' ? id : undefined;
}

export function usePragmaticListDnd({onDrop}: UsePragmaticListDndOptions): PragmaticListDnd {
    const [draggingId, setDraggingId] = React.useState<string | null>(null);
    const [dropTarget, setDropTarget] = React.useState<ListDropTarget | null>(null);

    const onDropRef = React.useRef(onDrop);
    onDropRef.current = onDrop;

    const nodesRef = React.useRef(
        new Map<string, {element: HTMLElement | null; handle: HTMLElement | null}>(),
    );
    const rowRefsRef = React.useRef(new Map<string, React.RefCallback<HTMLElement>>());
    const handleRefsRef = React.useRef(new Map<string, React.RefCallback<HTMLElement>>());
    const cleanupsRef = React.useRef(new Map<string, () => void>());

    // (Пере)регистрация строки: вызывается на каждое изменение её узлов —
    // ручка (потомок) монтируется раньше строки, так что к моменту
    // регистрации она уже известна
    const register = React.useCallback((id: string) => {
        cleanupsRef.current.get(id)?.();
        cleanupsRef.current.delete(id);
        const nodes = nodesRef.current.get(id);
        const element = nodes?.element;
        if (!element) {
            return;
        }
        cleanupsRef.current.set(
            id,
            combine(
                draggable({
                    element,
                    dragHandle: nodes?.handle ?? undefined,
                    getInitialData: () => ({[ITEM_ID_KEY]: id}),
                }),
                dropTargetForElements({
                    element,
                    getData: ({input}) =>
                        attachClosestEdge(
                            {[ITEM_ID_KEY]: id},
                            {element, input, allowedEdges: ['top', 'bottom']},
                        ),
                }),
            ),
        );
    }, []);

    const getItemRef = React.useCallback(
        (id: string): React.RefCallback<HTMLElement> => {
            let ref = rowRefsRef.current.get(id);
            if (!ref) {
                ref = (element) => {
                    const nodes = nodesRef.current.get(id) ?? {element: null, handle: null};
                    nodes.element = element;
                    nodesRef.current.set(id, nodes);
                    register(id);
                };
                rowRefsRef.current.set(id, ref);
            }
            return ref;
        },
        [register],
    );

    const getHandleRef = React.useCallback(
        (id: string): React.RefCallback<HTMLElement> => {
            let ref = handleRefsRef.current.get(id);
            if (!ref) {
                ref = (element) => {
                    const nodes = nodesRef.current.get(id) ?? {element: null, handle: null};
                    nodes.handle = element;
                    nodesRef.current.set(id, nodes);
                    register(id);
                };
                handleRefsRef.current.set(id, ref);
            }
            return ref;
        },
        [register],
    );

    React.useEffect(
        () =>
            monitorForElements({
                canMonitor: ({source}) => getItemId(source.data) !== undefined,
                onDragStart: ({source}) => {
                    setDraggingId(getItemId(source.data) ?? null);
                },
                onDrag: ({location, source}) => {
                    const target = location.current.dropTargets[0];
                    const targetId = target ? getItemId(target.data) : undefined;
                    const edge = target ? extractClosestEdge(target.data) : null;
                    const next: ListDropTarget | null =
                        targetId !== undefined &&
                        targetId !== getItemId(source.data) &&
                        (edge === 'top' || edge === 'bottom')
                            ? {id: targetId, position: edge === 'top' ? 'before' : 'after'}
                            : null;
                    setDropTarget((prev) =>
                        prev?.id === next?.id && prev?.position === next?.position ? prev : next,
                    );
                },
                onDrop: ({location, source}) => {
                    const fromId = getItemId(source.data);
                    const target = location.current.dropTargets[0];
                    const toId = target ? getItemId(target.data) : undefined;
                    const edge = target ? extractClosestEdge(target.data) : null;
                    if (
                        fromId !== undefined &&
                        toId !== undefined &&
                        fromId !== toId &&
                        (edge === 'top' || edge === 'bottom')
                    ) {
                        onDropRef.current(fromId, toId, edge === 'top' ? 'before' : 'after');
                    }
                    setDraggingId(null);
                    setDropTarget(null);
                },
            }),
        [],
    );

    // Декларативный контракт: каждое изменение состояния — новый объект
    // адаптера; ядро мемоизирует строки по ctx-срезу, поэтому это дёшево
    return React.useMemo<PragmaticListDnd>(
        () => ({
            getItemDndProps: (id) => ({ref: getItemRef(id)}),
            getHandleRef,
            draggingId,
            dropTarget,
        }),
        [draggingId, dropTarget, getItemRef, getHandleRef],
    );
}
