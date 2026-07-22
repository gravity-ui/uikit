import type * as React from 'react';

/**
 * Module-private ключ канала между `<List>` и `useListFocusOwner()` (ось B,
 * §15 плана). Символ не экспортируется из пакета: в публичном типе
 * `ListFocusOwner` наружу торчит только `getInputProps`, а внутренний
 * протокол connect/disconnect доступен одному лишь ядру
 */
export const LIST_FOCUS_OWNER_CHANNEL: unique symbol = Symbol('gravity-ui/list-focus-owner');

/**
 * Связка, которую ядро публикует внешнему владельцу фокуса.
 *  Каналом владеет `useListFocusOwner`, ядро только публикует в него
 */
export interface ListFocusOwnerConnection {
    /** DOM id корня списка — цель `aria-controls` владельца */
    listId: string;
    /** DOM id активной строки — значение `aria-activedescendant` владельца */
    activeDomId?: string;
    /** Клавиатурная машина списка (шаг «а»): владелец отдаёт ей свой onKeyDown */
    onKeyDown(event: React.KeyboardEvent): void;
}

/**
 * Канал ядра: публикация связки и отключение при размонтировании
 * @internal
 */
export interface ListFocusOwnerChannel {
    connect(connection: ListFocusOwnerConnection): void;
    /** Список размонтирован — попап закрыт */
    disconnect(): void;
}
