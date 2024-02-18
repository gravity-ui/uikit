import {renderHook} from '../../../../test-utils/utils';
import {useSelectOptions} from '../hooks-public';

// getFilteredOptions test

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
    it('should properly manage filter & filterable & filterOption properties', () => {
        const {result} = renderHook(() => {
            return useSelectOptions({
                options: [{value: '1'}, {value: '2'}],
                filterable: true,
                filter: '1',
            });
        });
        expect(result.current.map((o) => 'value' in o && o.value)).toEqual(['1', '2']);
    });
});
