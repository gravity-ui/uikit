import {render, screen} from '../../../../test-utils/utils';
import {Dialog} from '../Dialog';

test('should label dialog with header text', () => {
    const dialogTitleId = 'app-confirmation-dialog-title';
    render(
        <Dialog onClose={() => {}} open={true} aria-labelledby={dialogTitleId}>
            <Dialog.Header caption="Confirm action" id={dialogTitleId} />
        </Dialog>,
    );

    expect(screen.getByRole('dialog', {name: 'Confirm action'})).toBeInTheDocument();
});
