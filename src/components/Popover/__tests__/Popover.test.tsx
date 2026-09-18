import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {Button} from '../../Button';
import {Select} from '../../Select';
import {Popover} from '../Popover';

describe('Popover', () => {
    test.each([
        ['click', 'click' as const],
        ['all', undefined],
    ])(
        'does not treat a click in a nested popup as an outside press for the %s trigger',
        async (_triggerName, trigger) => {
            const events: string[] = [];
            const onUpdate = jest.fn(() => events.push('update'));
            const onOpenChange = jest.fn((open: boolean, _event?: Event, reason?: string) => {
                if (!open && reason === 'outside-press') {
                    events.push('outside-press');
                }
            });
            const user = userEvent.setup();

            render(
                <React.Fragment>
                    <Popover
                        trigger={trigger}
                        content={
                            <Select
                                onUpdate={onUpdate}
                                options={[{value: 'option', content: 'Option'}]}
                            />
                        }
                        onOpenChange={onOpenChange}
                    >
                        <Button>Open</Button>
                    </Popover>
                    <Button>Outside</Button>
                </React.Fragment>,
            );

            await user.click(screen.getByRole('button', {name: 'Open'}));
            const select = await screen.findByRole('combobox');

            await user.click(select);
            await user.click(await screen.findByText('Option'));

            expect(onUpdate).toHaveBeenCalledWith(['option']);
            expect(events).toEqual(['update']);
            expect(select).toBeInTheDocument();

            await user.click(screen.getByRole('button', {name: 'Outside'}));

            expect(events).toEqual(['update', 'outside-press']);
            expect(onOpenChange).toHaveBeenLastCalledWith(
                false,
                expect.any(Event),
                'outside-press',
            );
        },
    );
});
