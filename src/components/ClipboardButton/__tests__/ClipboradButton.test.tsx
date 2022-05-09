import React from 'react';
import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import {ClipboardButton} from '../ClipboardButton';

describe('ClipboardButton', () => {
    test('copy text on click', async () => {
        const onCopy = jest.fn();
        const user = userEvent.setup();
        const documentExecCommand = document.execCommand;
        document.execCommand = jest.fn().mockReturnValue(true);

        render(<ClipboardButton text="Text to copy" onCopy={onCopy} />);
        await user.click(screen.getByRole('button'));

        expect(onCopy).toHaveBeenCalledWith('Text to copy', true);

        document.execCommand = documentExecCommand;
    });

    test.each(['[Enter]', ' '])('copy text on "%s" key', async (key) => {
        const onCopy = jest.fn();
        const user = userEvent.setup();
        const documentExecCommand = document.execCommand;
        document.execCommand = jest.fn().mockReturnValue(true);

        render(<ClipboardButton text="Text to copy" onCopy={onCopy} />);
        const button = screen.getByRole('button');
        button.focus();
        await user.keyboard(key);

        expect(onCopy).toHaveBeenCalledWith('Text to copy', true);

        document.execCommand = documentExecCommand;
    });
});
