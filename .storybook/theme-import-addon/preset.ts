import {fileURLToPath} from 'node:url';

export function managerEntries(entry: string[] = []) {
    return [...entry, fileURLToPath(import.meta.resolve('./register.tsx'))];
}
