import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {Portal} from '../../Portal';
import {block} from '../../utils/cn';
import {Drawer} from '../components/Drawer';

const b = block('custom-drawer');
const qa = 'drawer';

const PLACEHOLDER_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

describe('Drawer', () => {
    test('should pass classname', () => {
        render(
            <Drawer qa={qa} className={b()} open>
                <div>{PLACEHOLDER_TEXT}</div>
            </Drawer>,
        );

        const drawer = screen.getByTestId(qa);
        expect(drawer).toBeInTheDocument();
        expect(drawer).toHaveClass('g-custom-drawer');
    });
    test('should keep component mounted if keepMounted is passed', () => {
        render(
            <Drawer qa={qa} className={b()} keepMounted>
                <div>{PLACEHOLDER_TEXT}</div>
            </Drawer>,
        );

        expect(screen.getByTestId(qa)).toBeInTheDocument();
    });

    test('should close on outside click without veil and let the click through', async () => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();
        const onOutsideClick = jest.fn();

        render(
            <div>
                <button onClick={onOutsideClick}>Outside action</button>
                <Drawer open hideVeil disableTransition onOpenChange={onOpenChange}>
                    <div>{PLACEHOLDER_TEXT}</div>
                </Drawer>
            </div>,
        );

        await user.click(screen.getByText('Outside action'));

        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press');
        expect(onOutsideClick).toHaveBeenCalledTimes(1);
    });

    test('should not close on outside click without veil when it is disabled', async () => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();
        const onOutsideClick = jest.fn();

        render(
            <div>
                <button onClick={onOutsideClick}>Outside action</button>
                <Drawer
                    open
                    hideVeil
                    disableOutsideClick
                    disableTransition
                    onOpenChange={onOpenChange}
                >
                    <div>{PLACEHOLDER_TEXT}</div>
                </Drawer>
            </div>,
        );

        await user.click(screen.getByText('Outside action'));

        expect(onOpenChange).not.toHaveBeenCalled();
        expect(onOutsideClick).toHaveBeenCalledTimes(1);
    });

    test('should not close on click inside a portal rendered from the drawer', async () => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        render(
            <Drawer open hideVeil disableTransition onOpenChange={onOpenChange}>
                <Portal container={document.body}>
                    <button>Portal action</button>
                </Portal>
            </Drawer>,
        );

        await user.click(screen.getByText('Portal action'));

        expect(onOpenChange).not.toHaveBeenCalled();
    });
});
