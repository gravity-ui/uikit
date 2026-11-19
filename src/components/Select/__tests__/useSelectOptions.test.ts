import * as React from 'react';

import {renderHook} from '../../../../test-utils/utils';
import {getSelectFilteredOptions, useSelectOptions} from '../hooks-public';

describe('Select useSelectOptions hook', function () {
    it('should properly manage result options', () => {
        const {result: r1} = renderHook(() => {
            return useSelectOptions({options: [{value: '1'}, {value: '2'}]});
        });
        expect(r1.current.map((o) => 'value' in o && o.value)).toEqual(['1', '2']);
        const {result: r2} = renderHook(() => {
            return useSelectOptions({options: r1.current});
        });
        expect(r2.current === r1.current).toBeTruthy();
    });
    it('should properly manage filter & filterable properties', () => {
        const {result: r1} = renderHook(() => {
            return useSelectOptions({
                options: [{value: '1'}, {value: '2'}],
                filterable: false,
                filter: '1',
            });
        });
        const filteredOptions1 = getSelectFilteredOptions(r1.current);
        expect(filteredOptions1.map((o) => 'value' in o && o.value)).toEqual(['1', '2']);
        const {result: r2} = renderHook(() => {
            return useSelectOptions({
                options: [{value: '1'}, {value: '2'}],
                filterable: true,
                filter: '1',
            });
        });
        const filteredOptions2 = getSelectFilteredOptions(r2.current);
        expect(filteredOptions2.map((o) => 'value' in o && o.value)).toEqual(['1']);
    });
    it('should filter by the text of getOptionText', () => {
        // The default text of an option is its content, and a node has none — outside the component
        // the filter has to be given the same getter the Select itself is given
        const options = [
            {
                value: '1',
                content: React.createElement('span', null, 'Alpha'),
                data: {name: 'Alpha'},
            },
            {value: '2', content: React.createElement('span', null, 'Beta'), data: {name: 'Beta'}},
        ];
        const {result} = renderHook(() => {
            return useSelectOptions({
                options,
                filterable: true,
                filter: 'bet',
                getOptionText: (option) => option.data?.name ?? option.value,
            });
        });

        const filtered = getSelectFilteredOptions(result.current);
        expect(filtered.map((o) => 'value' in o && o.value)).toEqual(['2']);
    });

    it('getSelectFilteredOptions should emit an error in case of using unprepared options', () => {
        expect(() => getSelectFilteredOptions([{value: '1'}])).toThrow();
    });
});
