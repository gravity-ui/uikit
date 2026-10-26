import userEvent from '@testing-library/user-event';

import {ColorPicker} from '../../..';
import {render, screen} from '../../../../test-utils/utils';

describe('ColorPicker', () => {
    test('should call onOpenChange on closing with correct params', async () => {
        const onOpenChange = jest.fn();

        render(
            <div data-qa="outside">
                <ColorPicker compact defaultOpen onOpenChange={onOpenChange} />
            </div>,
        );

        const user = userEvent.setup();

        const out = screen.getByTestId('outside');
        await user.click(out);

        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
    });
});
