import type {PaletteOption} from './Palette';

export function getPaletteRows(options: PaletteOption[], columns: number): PaletteOption[][] {
    const rows: PaletteOption[][] = [];
    let row: PaletteOption[] = [];

    let column = 0;
    for (const option of options) {
        row.push(option);
        column += 1;
        if (column === columns) {
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
