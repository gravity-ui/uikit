import userEvent from '@testing-library/user-event';

import {act, render, screen} from '../../../../test-utils/utils';
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

    test('copy function text on click', async () => {
        const onCopy = jest.fn();
        const user = userEvent.setup();
        const text = 'Dynamic text';
        const getText = jest.fn().mockReturnValue(text);

        render(<ClipboardButton text={getText} onCopy={onCopy} />);
        await user.click(screen.getByRole('button'));

        expect(getText).toHaveBeenCalled();
        expect(onCopy).toHaveBeenCalledWith(text, true);
    });

    test.each(['[Enter]', ' '])('copy text on "%s" key', async (key) => {
        const onCopy = jest.fn();
        const user = userEvent.setup();
        const documentExecCommand = document.execCommand;
        document.execCommand = jest.fn().mockReturnValue(true);

        render(<ClipboardButton text="Text to copy" onCopy={onCopy} />);
        const button = screen.getByRole('button');
        act(() => button.focus());
        await user.keyboard(key);

        expect(onCopy).toHaveBeenCalledWith('Text to copy', true);

        document.execCommand = documentExecCommand;
    });

    test('show given children', () => {
        const childrenText = 'Copy';

        render(
            <ClipboardButton text="">
                <span>{childrenText}</span>
            </ClipboardButton>,
        );
        const text = screen.getByText(childrenText);

        expect(text).toBeVisible();
    });
});
