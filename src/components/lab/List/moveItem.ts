import {warnOnce} from '../../utils/warn';

function defaultGetId(item: unknown): string | undefined {
    if (typeof item === 'string') {
        return item;
    }
    return (item as {id?: string} | null | undefined)?.id;
}

/**
 * Утилита реордера для dnd-слоя (§8 плана): чистая функция над данными —
 * переносит айтем `fromId` к грани `position` айтема `toId`. Работает по
 * верхнему уровню `items` (плоский список; перенос между секциями и деревья —
 * вне скоупа, появятся с `moveTreeNode`/TreeList).
 *
 * No-op (айтем не найден, `fromId === toId`, позиция не меняется) возвращает
 * ИСХОДНЫЙ массив по ссылке: `setItems(moveItem(...))` в этом случае не
 * вызывает лишнего рендера. Обратная сторона — результат нельзя мутировать
 * на месте (он может БЫТЬ входным массивом); обращайтесь с ним как с
 * иммутабельным, ровно как с самим состоянием.
 *
 * При дублирующихся id переносится ПЕРВОЕ совпадение (ядро листа на дубли
 * ругается dev-warning'ом — §9; утилита их не проверяет, чтобы не сканировать
 * массив второй раз).
 */
export function moveItem<T>(
    items: readonly T[],
    fromId: string,
    toId: string,
    position: 'before' | 'after',
    getId?: (item: T) => string,
): T[] {
    const resolveId = (item: T) => (getId ? getId(item) : defaultGetId(item));

    const fromIndex = items.findIndex((item) => resolveId(item) === fromId);
    const toIndex = items.findIndex((item) => resolveId(item) === toId);
    if (fromIndex === -1 || toIndex === -1) {
        warnOnce(
            '[List] moveItem: `fromId` or `toId` was not found among the top-level items — the list is returned unchanged.',
        );
        return items as T[];
    }
    if (fromIndex === toIndex) {
        return items as T[];
    }

    // Индекс цели в массиве без переносимого айтема
    const targetIndex = toIndex - (fromIndex < toIndex ? 1 : 0);
    const insertIndex = targetIndex + (position === 'after' ? 1 : 0);
    if (insertIndex === fromIndex) {
        return items as T[];
    }

    const result = items.filter((_, index) => index !== fromIndex);
    result.splice(insertIndex, 0, items[fromIndex]);
    return result;
}
