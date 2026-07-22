'use client';

import * as React from 'react';

import {composeItemProps} from './composeItemProps';
import type {ListFocusOwner, ListFocusOwnerConnection, ListFocusOwnerInputProps} from './types';

interface OwnerState {
    listId?: string;
    activeDomId?: string;
}

const DISCONNECTED: OwnerState = {};

/**
 * Канал внешнего владельца DOM-фокуса списка (ось B, §15 плана).
 *
 * Клавиатурная машина списка (шаг «а») одна и та же в обеих стратегиях —
 * меняется только шаг «б»: в `activedescendant` ядро не двигает DOM-фокус, а
 * выставляет владельцу `aria-activedescendant` и доскролливает к активной
 * строке. Владелец фокуса (инпут комбобокса) живёт СНАРУЖИ корня списка,
 * поэтому связка едет к нему не через `getItemProps`, а через этот канал:
 * хук отдаёт `getInputProps()` инпуту, а сам объект — списку пропом
 * `focusOwner`.
 *
 * ```tsx
 * const focusOwner = useListFocusOwner();
 * <TextInput controlProps={focusOwner.getInputProps({'aria-label': 'Filter'})} />
 * {open ? <List focusOwner={focusOwner} items={filtered} /> : null}
 * ```
 *
 * `aria-expanded` считается по факту подключения списка: пока `<List>` с этим
 * владельцем не смонтирован, попап закрыт. Список, оставленный смонтированным
 * и спрятанный стилями, каналу неотличим от открытого.
 */
export function useListFocusOwner(): ListFocusOwner {
    const [state, setState] = React.useState<OwnerState>(DISCONNECTED);
    // getInputProps читает связку в рендере владельца, а обновляет её ядро
    // из своего layout-эффекта — ref держит значение, актуальное и до
    // ре-рендера владельца
    const stateRef = React.useRef(state);
    stateRef.current = state;
    // Обработчик пересоздаётся ядром каждый рендер: если бы он лежал в
    // state, публикация зацикливалась бы на собственном ре-рендере
    const keyDownRef = React.useRef<ListFocusOwnerConnection['onKeyDown'] | null>(null);

    // Идентичность владельца стабильна: она входит в зависимости эффекта
    // публикации на стороне ядра
    const [owner] = React.useState<ListFocusOwner>(() => ({
        connect({listId, activeDomId, onKeyDown}) {
            keyDownRef.current = onKeyDown;
            setState((prev) =>
                prev.listId === listId && prev.activeDomId === activeDomId
                    ? prev
                    : {listId, activeDomId},
            );
        },
        disconnect() {
            keyDownRef.current = null;
            setState((prev) => (prev === DISCONNECTED ? prev : DISCONNECTED));
        },
        getInputProps(overrides) {
            const {listId, activeDomId} = stateRef.current;
            const baseProps = {
                role: 'combobox',
                'aria-expanded': listId !== undefined,
                'aria-controls': listId,
                'aria-activedescendant': activeDomId,
                onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
                    keyDownRef.current?.(event);
                },
            };
            return composeItemProps(baseProps, overrides) as ListFocusOwnerInputProps;
        },
    }));

    return owner;
}
