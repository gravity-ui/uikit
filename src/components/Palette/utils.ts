import type {PaletteOption} from './Palette';

export function getPaletteRows(options: PaletteOption[], columns: number): PaletteOption[][] {
    if (columns <= 0) {
        throw new Error('Palette.getPaletteRows: number of columns must greater than 0');
    }

    const rows: PaletteOption[][] = [];
    let row: PaletteOption[] = [];

    let column = 0;
    for (const option of options) {
        row.push(option);
        column += 1;
        if (column >= columns) {
            rows.push(row);
            row = [];
            column = 0;
        }
    }

    if (row.length > 0) {
        rows.push(row);
    }

    return rows;
}
