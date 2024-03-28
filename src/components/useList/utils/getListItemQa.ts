import type {ListItemId} from '../types';

export const getListItemQa = (qa: string, id: ListItemId): string => `${qa}-${id}`;
