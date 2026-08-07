import * as React from 'react';

import userEvent from '@testing-library/user-event';

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

    const renderDrawer = (modal?: boolean, onPageActionClick?: () => void) => (
        <React.Fragment>
            <button type="button" onClick={onPageActionClick}>
                Page action
            </button>
            <Drawer open hideVeil={modal === false} modal={modal}>
                <div>{PLACEHOLDER_TEXT}</div>
            </Drawer>
        </React.Fragment>
    );

    test('should allow interacting with surrounding content when modal is false', async () => {
        const handlePageActionClick = jest.fn();

        render(renderDrawer(false, handlePageActionClick));

        const pageAction = screen.getByRole('button', {name: 'Page action'});
        const user = userEvent.setup();

        await user.click(pageAction);

        expect(handlePageActionClick).toHaveBeenCalledTimes(1);
    });

    test('should hide surrounding content from assistive technologies by default', () => {
        render(renderDrawer());

        expect(screen.queryByRole('button', {name: 'Page action'})).not.toBeInTheDocument();
    });
});
