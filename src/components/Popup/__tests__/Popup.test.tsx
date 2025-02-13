import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../test-utils/utils';
import {Button} from '../../Button/Button';
import {Popup} from '../Popup';

const qaId = 'popup-component';
const sampleText = 'Some text';

describe('Popup', () => {
    test('should render popup by default', () => {
        render(<Popup open>{sampleText}</Popup>);
        const popup = screen.getByText(sampleText);
        expect(popup).toBeVisible();
    });

    test('should pass arbitraty className to wrapper', () => {
        const arbitratyClassName = 'arbitratyClassName';
        render(<Popup open qa={qaId} className={arbitratyClassName}></Popup>);
        const popup = screen.getByTestId(qaId);
        expect(popup).toHaveClass(arbitratyClassName);
    });

    test('should open on click', async () => {
        const btnText = 'Click me';
        function Test() {
            const [open, setOpen] = React.useState(false);
            return (
                <React.Fragment>
                    <Button onClick={() => setOpen((prev) => !prev)}>{btnText}</Button>
                    <Popup open={open}>{sampleText}</Popup>
                </React.Fragment>
            );
        }

        render(<Test />);
        const btn = screen.getByRole('button');
        await userEvent.click(btn);
        const popup = await screen.findByText(sampleText);
        expect(popup).toBeVisible();
    });

    test('should not set aria-modal and role by default', async () => {
        render(<Popup open qa={qaId} />);
        const popup = screen.getByTestId(qaId);
        expect(popup).not.toHaveAttribute('aria-modal');
        expect(popup).not.toHaveAttribute('role');
    });

    test('should set aria-modal to true and role to dialog  if modal is true', async () => {
        render(<Popup open modal />);
        const popup = screen.getByRole('dialog');
        expect(popup).toHaveAttribute('aria-modal', 'true');
    });

    test('should use role from props if modal is true', async () => {
        render(<Popup open modal role="alertdialog" />);
        const popup = screen.getByRole('alertdialog');
        expect(popup).toHaveAttribute('aria-modal', 'true');
    });

    test('should not set aria-modal from props if modal is true', async () => {
        render(<Popup open qa={qaId} modal={false} />);
        const popup = screen.getByTestId(qaId);
        expect(popup).not.toHaveAttribute('aria-modal');
        expect(popup).not.toHaveAttribute('role');
    });

    test('should remove aria-modal if popup is closed', async () => {
        render(<Popup keepMounted modal />);
        const popup = screen.getByRole('dialog');
        expect(popup).not.toHaveAttribute('aria-modal');
    });
});
