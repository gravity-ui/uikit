import {withTableSelection} from '..';
import {Table} from '../Table';
import type {TableColumnConfig} from '../Table';
import {withTableActions, withTableCopy, withTableSettings, withTableSorting} from '../hoc';

export interface DataItem {
    name: string;
    location?: {region: string; city?: string};
    phone: string;
    count: number;
    date: string;
    disabled?: boolean;
}

export const data: DataItem[] = [
    {
        name: 'Nomlanga Compton',
        location: {region: 'Liguria', city: 'Erli'},
        phone: '+7 (923) 737-89-72',
        count: 82,
        date: '2019-03-15',
    },
    {
        name: 'Paul Hatfield',
        location: {region: 'Trentino-Alto Adige/Südtirol', city: 'Campitello di Fassa'},
        phone: '+7 (900) 333-82-02',
        count: 51,
        date: '2019-11-23',
    },
    {
        name: 'Phelan Daniel',
        location: {region: 'Piedmont', city: 'Meugliano'},
        phone: '+7 (925) 549-50-23',
        count: 10,
        date: '2019-05-14',
    },
    {
        name: 'Hiram Mayer',
        phone: '+7 (950) 372-56-84',
        location: {region: 'Calabria'},
        count: 54,
        date: '2019-03-29',
    },
    {
        name: 'Madeline Puckett',
        phone: '+7 (908) 582-05-91',
        count: 75,
        date: '2019-02-01',
        disabled: true,
    },
];

export const columns: TableColumnConfig<DataItem>[] = [
    {
        id: 'name',
        name: 'Name',
        template(item, i) {
            if (i % 2 === 0) {
                return item.name;
            }
            const [name, surname] = item.name.split(' ');
            return (
                <div>
                    {name}
                    <br />
                    {surname}
                </div>
            );
        },
    },
    {id: 'location.region', name: 'Region'},
    {id: 'location.city', name: 'City'},
    {id: 'phone', name: 'Phone'},
    {id: 'count', name: 'Count', align: 'end'},
    {id: 'date', name: 'Date created', meta: {displayName: 'Foo'}},
];

export const TableWithAction = withTableActions<DataItem>(Table);
export const TableWithCopy = withTableCopy<DataItem>(Table);
export const TableWithSelection = withTableSelection<DataItem>(Table);
export const TableWithSettings = withTableSettings<DataItem>(Table);
export const TableWithFilterableSettings = withTableSettings<DataItem>({
    filterable: true,
    width: 200,
})(Table);
export const TableWithSettingsFactory = withTableSettings<DataItem>({sortable: false})(Table);
export const TableWithSorting = withTableSorting<DataItem>(Table);
