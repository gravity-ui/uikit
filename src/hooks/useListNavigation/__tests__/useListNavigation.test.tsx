import {act, renderHook} from '../../../../test-utils/utils';
import {useListNavigation} from '../useListNavigation';

type Item = {disabled?: boolean};

const items: Item[] = [{disabled: true}, {}, {}, {}, {}];
const skip = (item: Item) => Boolean(item.disabled);

describe('useListNavigation', () => {
    test.each<[string[], number]>([
        [['Home'], 1],
        [['End', 'Home'], 1],
        [['End'], 4],
        [['ArrowUp'], 4],
        [['PageUp'], 3],
    ])('should select the expected item after %j (index %i)', (keys, expected) => {
        const anchorRef = {current: document.createElement('div')};
        const {result} = renderHook(() => useListNavigation({items, skip, anchorRef, pageSize: 2}));

        for (const key of keys) {
            act(() => {
                anchorRef.current.dispatchEvent(new KeyboardEvent('keydown', {key}));
            });
        }

        expect(result.current.activeItemIndex).toBe(expected);
    });
});
