'use client';

import * as React from 'react';

import {warnOnce} from '../../utils/warn';

import {composeItemProps} from './composeItemProps';
import type {ListFocusOwnerConnection} from './focusOwnerChannel';
import {LIST_FOCUS_OWNER_CHANNEL} from './focusOwnerChannel';
import type {ListFocusOwner, ListFocusOwnerInputProps} from './types';

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
 * владельцем не смонтирован, попап закрыт. Канал рассчитан на mount/unmount-
 * модель попапа — список, оставленный смонтированным и спрятанный стилями,
 * каналу неотличим от открытого: стрелки продолжат двигать активность в
 * невидимом попапе, а `aria-expanded` останется `true` (keepMounted не
 * поддержан). Для не-попап паттернов (постоянно видимый фильтруемый список)
 * `role`/`aria-expanded` переопределяются через overrides `getInputProps` —
 * по контракту композиции последнее значение побеждает.
 *
 * Один владелец — один список: на два одновременно смонтированных списка
 * нужно два объекта.
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
    // Синхронный след подключённого списка (state отстаёт на коммит) —
    // только для dev-предупреждения о двух списках на одном владельце
    const connectedListIdRef = React.useRef<string | undefined>(undefined);

    // Идентичность владельца стабильна: она входит в зависимости эффекта
    // публикации на стороне ядра
    const [owner] = React.useState<ListFocusOwner>(() => ({
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
        [LIST_FOCUS_OWNER_CHANNEL]: {
            connect({listId, activeDomId, onKeyDown}) {
                if (
                    process.env.NODE_ENV !== 'production' &&
                    connectedListIdRef.current !== undefined &&
                    connectedListIdRef.current !== listId
                ) {
                    warnOnce(
                        '[List] Two mounted lists share one `useListFocusOwner()` object. The channel connects a single list at a time — the last connected list wins, and the other one silently loses the keyboard and aria wiring. Create a separate owner per list.',
                    );
                }
                connectedListIdRef.current = listId;
                keyDownRef.current = onKeyDown;
                setState((prev) =>
                    prev.listId === listId && prev.activeDomId === activeDomId
                        ? prev
                        : {listId, activeDomId},
                );
            },
            disconnect() {
                connectedListIdRef.current = undefined;
                keyDownRef.current = null;
                setState((prev) => (prev === DISCONNECTED ? prev : DISCONNECTED));
            },
        },
    }));

    return owner;
}
