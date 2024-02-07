import {GROUPED_ID_SEPARATOR} from '../constants';
import type {ListItemId} from '../types';

export const getGroupItemId = (index: string | number, parentId?: string): ListItemId =>
    parentId ? `${parentId}${GROUPED_ID_SEPARATOR}${index}` : `${index}`;

export const parseGroupItemId = (id: ListItemId): string[] => id.split(GROUPED_ID_SEPARATOR);
