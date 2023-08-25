import {act, fireEvent, renderHook} from '@testing-library/react';

import {useViewportSize} from '..';

test('Check useViewportSize correct work', () => {
    const view = renderHook(() => useViewportSize());

    act(() => {
        window.innerHeight = 500;
        window.innerWidth = 500;
    });

    fireEvent(window, new Event('resize'));

    expect(view.result.current).toEqual({height: 500, width: 500});

    act(() => {
        window.innerHeight = 1200;
        window.innerWidth = 1200;
    });

    fireEvent(window, new Event('resize'));

    expect(view.result.current).toEqual({height: 1200, width: 1200});
});
