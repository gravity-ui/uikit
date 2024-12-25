import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {render, screen} from '../../../../../test-utils/utils';
import {Button} from '../../../Button';
import {Sheet} from '../../../Sheet';
import {TextInput} from '../TextInput';

const TextInputWithButtonAndSheet = () => {
    const [open, setOpen] = React.useState(false);
    const startContent = (
        <React.Fragment>
            <Button onClick={() => setOpen(true)}>Open</Button>
            <Sheet visible={open}>Sheet content</Sheet>
        </React.Fragment>
    );
    return <TextInput startContent={startContent} />;
};

describe('TextInput additional content', () => {
    test('TextInput should not be focused', async () => {
        render(<TextInputWithButtonAndSheet />);
        const user = userEvent.setup();
        const button = await screen.findByText('Open');
        await user.click(button);
        const sheetContent = await screen.findByText('Sheet content');
        await user.click(sheetContent);
        const input = screen.getByRole('textbox');
        expect(input).not.toHaveFocus();
    });
});
