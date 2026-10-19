import {fireEvent, render, screen, waitFor} from '../../../../test-utils/utils';
import {Dialog} from '../Dialog';

test('should label dialog with header text', () => {
    const dialogTitleId = 'app-confirmation-dialog-title';
    render(
        <Dialog open={true} aria-labelledby={dialogTitleId}>
            <Dialog.Header caption="Confirm action" id={dialogTitleId} />
        </Dialog>,
    );

    expect(screen.getByRole('dialog', {name: 'Confirm action'})).toBeInTheDocument();
});

test('reports dismissals and close button clicks through onOpenChange', async () => {
    const onOpenChange = jest.fn();

    render(
        <Dialog open onOpenChange={onOpenChange}>
            <Dialog.Body>Content</Dialog.Body>
        </Dialog>,
    );

    fireEvent.keyDown(document, {key: 'Escape'});
    await waitFor(() =>
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(KeyboardEvent), 'escape-key'),
    );
    expect(onOpenChange).toHaveBeenCalledTimes(1);

    const overlay = document.querySelector('.g-modal');
    if (!overlay) throw new Error('Modal overlay not found');
    fireEvent.pointerDown(overlay);
    await waitFor(() =>
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(Event), 'outside-press'),
    );
    expect(onOpenChange).toHaveBeenCalledTimes(2);

    fireEvent.click(screen.getByRole('button', {name: 'Close dialog'}));
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(MouseEvent), 'click');
    expect(onOpenChange).toHaveBeenCalledTimes(3);
});
