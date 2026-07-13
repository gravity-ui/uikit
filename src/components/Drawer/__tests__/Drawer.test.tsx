import {render, screen} from '../../../../test-utils/utils';
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
});
