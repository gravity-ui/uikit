import {GROUPED_ID_SEPARATOR} from '../constants';
import type {GroupedId} from '../types';

export const getGroupedId = (index: string | number, parentId?: string): GroupedId =>
    parentId ? `${parentId}${GROUPED_ID_SEPARATOR}${index}` : `${index}`;

export const parseGroupedId = (parentId: GroupedId): string[] =>
    parentId.split(GROUPED_ID_SEPARATOR);
