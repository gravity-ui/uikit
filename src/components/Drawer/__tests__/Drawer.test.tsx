import {render, screen} from '../../../../test-utils/utils';
import {block} from '../../utils/cn';
import {Drawer} from '../components/Drawer';
import {DrawerItem} from '../components/DrawerItem';

const b = block('custom-drawer');
const qa = 'drawer';
const itemQa = 'drawer-item';

const PLACEHOLDER_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

describe('Drawer', () => {
    test('should pass classname', () => {
        render(
            <Drawer qa={qa} className={b()}>
                <DrawerItem id="item" qa={itemQa} visible>
                    {PLACEHOLDER_TEXT}
                </DrawerItem>
            </Drawer>,
        );

        expect(screen.getByTestId(qa)).toHaveClass('g-custom-drawer');
    });
    test('should keep component mounted if keepMounted is passed', () => {
        render(
            <Drawer qa={qa} className={b()} keepMounted>
                <DrawerItem id="item" qa={itemQa} visible={false}>
                    {PLACEHOLDER_TEXT}
                </DrawerItem>
            </Drawer>,
        );

        expect(screen.getByTestId(qa)).toHaveClass('g-custom-drawer');
    });
});
