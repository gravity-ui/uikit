import React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

    test('should pass arbitraty className', () => {
        const arbitratyClassName = 'arbitratyClassName';
        render(<Popup open qa={qaId} wrapperClassName={arbitratyClassName}></Popup>);
        const popup = screen.getByTestId(qaId);
        // eslint-disable-next-line testing-library/no-node-access
        expect(popup.parentElement as HTMLDivElement).toHaveClass(arbitratyClassName);
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
});
