'use client';

import * as React from 'react';

import {block} from '../../utils/cn';
import {ListItemView} from '../ListItemView/ListItemView';

import {ListSectionHeader} from './SectionHeader';
import type {ListItemContext, ListItemHelpers, ListProps} from './types';
import {useList} from './useList';

import './List.scss';

const b = block('list-v2');

function ListComponent<T>(props: ListProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
    const {size = 'm', className, style, qa, renderItem} = props;
    const list = useList(props);

    const defaultRenderItem = (ctx: ListItemContext<T>, helpers: ListItemHelpers) =>
        ctx.kind === 'section' ? (
            <ListSectionHeader {...helpers.getItemProps()} size={size}>
                {ctx.content}
            </ListSectionHeader>
        ) : (
            <ListItemView {...helpers.getItemProps()} {...helpers.getItemViewProps()}>
                {ctx.content}
            </ListItemView>
        );

    const renderRow = renderItem ?? defaultRenderItem;

    return (
        <div
            {...list.getContainerProps({
                ref: ref ?? undefined,
                className: b({size}, className),
                style,
            })}
            data-qa={qa}
        >
            {list.visibleIds.map((id) => {
                const ctx = list.getItemContext(id);
                const helpers: ListItemHelpers = {
                    getItemProps: (overrides) => list.getItemProps(id, overrides),
                    getItemViewProps: () => ({
                        size,
                        active: ctx.state.active,
                        disabled: ctx.state.disabled,
                    }),
                };
                return <React.Fragment key={id}>{renderRow(ctx, helpers)}</React.Fragment>;
            })}
        </div>
    );
}

/**
 * Навигируемый listbox: массив строк — ноль конфигурации, объекты — один
 * геттер. Слои выделения/виртуализации/dnd подключаются отдельно и не
 * протекают в ядро.
 */
export const List = Object.assign(
    React.forwardRef(ListComponent) as unknown as (<T>(
        props: ListProps<T> & {ref?: React.Ref<HTMLDivElement>},
    ) => React.ReactElement) & {displayName?: string},
    {
        ItemView: ListItemView,
        SectionHeader: ListSectionHeader,
    },
);

List.displayName = 'List';
