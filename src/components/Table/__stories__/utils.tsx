import {TableColumnConfig, Table} from '../Table';
import {withTableSelection} from '..';
import {withTableActions, withTableCopy, withTableSettings, withTableSorting} from '../hoc';

export const data = [
    {
        name: 'Nomlanga Compton',
        city: 'Erli',
        phone: '+7 (923) 737-89-72',
        count: 82,
        date: '2019-03-15',
    },
    {
        name: 'Paul Hatfield',
        city: 'Campitello di Fassa',
        phone: '+7 (900) 333-82-02',
        count: 51,
        date: '2019-11-23',
    },
    {
        name: 'Phelan Daniel',
        city: 'Meugliano',
        phone: '+7 (925) 549-50-23',
        count: 10,
        date: '2019-05-14',
    },
    {
        name: 'Hiram Mayer',
        city: '',
        phone: '+7 (950) 372-56-84',
        count: 54,
        date: '2019-03-29',
    },
    {
        name: 'Madeline Puckett',
        phone: '+7 (908) 582-05-91',
        count: 75,
        date: '2019-02-01',
    },
];

type DataItem = typeof data;

export const columns: TableColumnConfig<DataItem>[] = [
    {
        id: 'name',
        name: 'Name',
    },
    {
        id: 'city',
        name: 'City',
    },
    {
        id: 'phone',
        name: 'Phone',
    },
    {
        id: 'count',
        name: 'Count',
        align: 'right',
    },
    {
        id: 'date',
        name: 'Date created',
    },
];

export const TableWithAction = withTableActions(Table);
export const TableWithCopy = withTableCopy(Table);
export const TableWithSelection = withTableSelection(Table);
export const TableWithSettings = withTableSettings(Table);
export const TableWithSorting = withTableSorting(Table);
