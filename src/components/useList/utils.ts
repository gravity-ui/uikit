import type {KnownItemStructure} from './types';

export const isKnownStructureGuard = (item: unknown): item is KnownItemStructure => {
    return item !== null && typeof item === 'object' && 'title' in item;
};
