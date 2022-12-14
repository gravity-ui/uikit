import React from 'react';
import {render} from '@testing-library/react';

import {Tooltip} from '../Tooltip';

test('should preserve ref on anchor element', () => {
    const ref = jest.fn();
    render(
        <Tooltip content="text">
            <button ref={ref} />
        </Tooltip>,
    );

    expect(ref).toHaveBeenCalledTimes(1);
});
