import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {act, fireEvent, render, screen, waitFor} from '../../../../test-utils/utils';
import {Lang, configure} from '../../../utils/configure';
import {Drawer} from '../../Drawer';
import {Modal} from '../../Modal';
import {Popup} from '../../Popup';
import {getLayersCount} from '../../utils/layer-manager';
import {Sheet} from '../Sheet';

import {SheetInModal, StackedSheets, TestSheet} from './helpers';

type User = ReturnType<typeof userEvent.setup>;

function PopupInSheet({onOpenChange}: {onOpenChange: (reason?: string) => void}) {
    const [open, setOpen] = React.useState(false);
    const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);

    return (
        <React.Fragment>
            <button ref={setAnchor} onClick={() => setOpen(true)}>
                Open popup
            </button>
            <Popup
                open={open}
                anchorElement={anchor}
                onOpenChange={(nextOpen, _event, reason) => {
                    onOpenChange(reason);
                    setOpen(nextOpen);
                }}
            >
                <button>Popup action</button>
            </Popup>
        </React.Fragment>
    );
}

async function click(user: User, name: string) {
    await user.click(screen.getByRole('button', {name}));
}

function expectFocused(name: string) {
    return waitFor(() => expect(screen.getByRole('button', {name})).toHaveFocus());
}

function expectSheetFocused(name: string) {
    return waitFor(() => expect(screen.getByRole('dialog', {name})).toHaveFocus());
}

async function openSheet(user: User) {
    await click(user, 'Show modal');
    await expectSheetFocused('Example');
}

async function setupSheetInModal(children?: React.ReactNode) {
    const onModalOpenChange = jest.fn();
    const onSheetOpenChange = jest.fn();
    const user = userEvent.setup();
    render(
        <SheetInModal onModalOpenChange={onModalOpenChange} onSheetOpenChange={onSheetOpenChange}>
            {children}
        </SheetInModal>,
    );

    await click(user, 'Open modal');
    await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());
    await click(user, 'Open sheet');
    await expectSheetFocused('Inside modal');

    return {user, onModalOpenChange, onSheetOpenChange};
}

describe('Sheet focus management', () => {
    describe('initial focus', () => {
        test('focuses the sheet itself, so a text field does not open the on-screen keyboard', async () => {
            const user = userEvent.setup();
            render(
                <TestSheet title="Example">
                    <input aria-label="Name" />
                </TestSheet>,
            );

            await openSheet(user);

            expect(screen.queryByRole('button', {name: 'Show modal'})).not.toBeInTheDocument();
        });

        test('supports a custom initial focus index', async () => {
            const user = userEvent.setup();
            render(
                <TestSheet initialFocus={1}>
                    <button>First</button>
                    <button>Last</button>
                </TestSheet>,
            );

            await click(user, 'Show modal');

            await expectFocused('Last');
        });

        test('supports a custom initial focus element', async () => {
            const initialFocus = React.createRef<HTMLButtonElement>();
            const user = userEvent.setup();
            render(
                <TestSheet initialFocus={initialFocus}>
                    <button>First</button>
                    <button ref={initialFocus}>Preferred</button>
                </TestSheet>,
            );

            await click(user, 'Show modal');

            await expectFocused('Preferred');
        });
    });

    describe('focus restoration', () => {
        test('can return focus to a custom element', async () => {
            const returnFocus = React.createRef<HTMLButtonElement>();
            const user = userEvent.setup();
            render(
                <React.Fragment>
                    <button ref={returnFocus}>Return here</button>
                    <TestSheet title="Example" returnFocus={returnFocus} />
                </React.Fragment>,
            );

            await openSheet(user);
            await user.keyboard('{Escape}');

            await waitFor(() => expect(returnFocus.current).toHaveFocus());
        });

        test('does not restore focus when returnFocus is disabled', async () => {
            const user = userEvent.setup();
            render(<TestSheet title="Example" returnFocus={false} />);
            const opener = screen.getByRole('button', {name: 'Show modal'});

            await openSheet(user);
            await user.keyboard('{Escape}');

            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
            expect(opener).not.toHaveFocus();
        });
    });

    describe('accessible dismissal', () => {
        test('closes an uncontrolled sheet through the hidden dismiss control', async () => {
            const onTransitionOutComplete = jest.fn();
            render(
                <Sheet defaultOpen onTransitionOutComplete={onTransitionOutComplete}>
                    Content
                </Sheet>,
            );

            fireEvent.click((await screen.findAllByRole('button', {name: 'Close'}))[0]);

            await waitFor(() => expect(onTransitionOutComplete).toHaveBeenCalledTimes(1));
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        test('requests dismissal without a reason and closes when the owner accepts it', async () => {
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            render(<TestSheet title="Example" onOpenChange={onOpenChange} />);

            await openSheet(user);
            fireEvent.click(screen.getAllByRole('button', {name: 'Close'})[0]);

            expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(MouseEvent), undefined);
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        });

        test('keeps a controlled sheet open when its owner rejects accessible dismissal', async () => {
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            render(<TestSheet title="Example" onOpenChange={onOpenChange} rejectDismissal />);

            await openSheet(user);
            fireEvent.click(screen.getAllByRole('button', {name: 'Close'})[0]);

            expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(MouseEvent), undefined);
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            expect(screen.getByRole('dialog')).toHaveFocus();
            expect(getLayersCount()).toBe(1);
        });

        test('localizes the dismiss controls', async () => {
            configure({lang: Lang.Ru});

            try {
                render(<Sheet defaultOpen>Content</Sheet>);

                await screen.findAllByRole('button', {name: 'Закрыть'});
            } finally {
                configure({lang: Lang.En});
            }
        });

        test('does not add the dismiss controls with disableVisuallyHiddenDismiss', async () => {
            render(
                <Sheet defaultOpen title="Example" disableVisuallyHiddenDismiss>
                    Content
                </Sheet>,
            );

            await expectSheetFocused('Example');
            expect(screen.queryByRole('button', {name: 'Close'})).not.toBeInTheDocument();
        });
    });

    describe('disableModal', () => {
        test('does not move focus, hide the background or add dismiss controls', async () => {
            const user = userEvent.setup();
            render(<TestSheet title="Example" disableModal />);

            await click(user, 'Show modal');

            expect(screen.getByRole('dialog', {name: 'Example'})).toBeInTheDocument();
            // The opener keeps the focus and stays in the accessibility tree
            expect(screen.getByRole('button', {name: 'Show modal'})).toHaveFocus();
            expect(screen.queryByRole('button', {name: 'Close'})).not.toBeInTheDocument();
        });

        test('focuses the initial focus target when one is passed', async () => {
            const user = userEvent.setup();
            render(
                <TestSheet disableModal initialFocus={0}>
                    <button>First</button>
                </TestSheet>,
            );

            await click(user, 'Show modal');

            await expectFocused('First');
        });

        test('takes part in the layers and closes on Escape', async () => {
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            render(<TestSheet title="Example" disableModal onOpenChange={onOpenChange} />);

            await click(user, 'Show modal');
            expect(getLayersCount()).toBe(1);
            await user.keyboard('{Escape}');

            expect(onOpenChange).toHaveBeenCalledWith(
                false,
                expect.any(KeyboardEvent),
                'escape-key',
            );
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        });

        test('takes Escape before a modal sheet below it', () => {
            const lowerOnOpenChange = jest.fn();
            const upperOnOpenChange = jest.fn();
            render(
                <React.Fragment>
                    <Sheet open onOpenChange={lowerOnOpenChange}>
                        Lower content
                    </Sheet>
                    <Sheet open disableModal onOpenChange={upperOnOpenChange}>
                        Upper content
                    </Sheet>
                </React.Fragment>,
            );

            fireEvent.keyDown(document, {key: 'Escape', code: 'Escape'});

            expect(upperOnOpenChange).toHaveBeenCalledWith(
                false,
                expect.any(KeyboardEvent),
                'escape-key',
            );
            expect(lowerOnOpenChange).not.toHaveBeenCalled();
        });
    });

    describe.each([
        {name: 'nested', sibling: false},
        {name: 'sibling', sibling: true},
    ])('$name sheets', ({sibling}) => {
        test('hide the lower sheet and send Escape pressed during the exit of the topmost one to the next', async () => {
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            render(<StackedSheets sibling={sibling} onOpenChange={onOpenChange} />);
            await click(user, 'Open parent');
            await expectSheetFocused('Parent');
            await click(user, 'Open child');
            await expectSheetFocused('Child');

            expect(screen.queryByRole('dialog', {name: 'Parent'})).not.toBeInTheDocument();

            await user.keyboard('{Escape}{Escape}');

            expect(onOpenChange.mock.calls).toEqual([
                ['child', 'escape-key'],
                ['parent', 'escape-key'],
            ]);
            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        });
    });

    test.each([
        {name: 'Modal', Overlay: Modal},
        {name: 'Drawer', Overlay: Drawer},
    ])(
        'keeps the focus and the accessibility tree when opened along with a $name',
        async ({name, Overlay}) => {
            const onTransitionInComplete = jest.fn();
            render(
                <Overlay open aria-label={name} onTransitionInComplete={onTransitionInComplete}>
                    <Sheet open title="Inside">
                        <button>Sheet action</button>
                    </Sheet>
                </Overlay>,
            );

            await waitFor(() => expect(onTransitionInComplete).toHaveBeenCalled());
            // The overlay may start managing the focus at the end of its own transition
            await act(() => new Promise((resolve) => setTimeout(resolve, 50)));

            expect(screen.getByRole('dialog', {name: 'Inside'})).toHaveFocus();
            expect(screen.queryByRole('dialog', {name})).not.toBeInTheDocument();
        },
    );

    describe('inside a Modal', () => {
        test('dismisses only the sheet when Escape reaches the document from outside of it', async () => {
            const {onModalOpenChange, onSheetOpenChange} = await setupSheetInModal();

            fireEvent.keyDown(document, {key: 'Escape', code: 'Escape'});

            expect(onSheetOpenChange.mock.calls).toEqual([['escape-key']]);
            expect(onModalOpenChange).not.toHaveBeenCalled();
            await waitFor(() =>
                expect(
                    screen.queryByRole('dialog', {name: 'Inside modal'}),
                ).not.toBeInTheDocument(),
            );
            expect(screen.getByRole('dialog')).toBeVisible();
        });

        test('sends Escape pressed during the exit of the sheet to the modal', async () => {
            const {user, onModalOpenChange, onSheetOpenChange} = await setupSheetInModal();

            await user.keyboard('{Escape}{Escape}');

            expect(onSheetOpenChange.mock.calls).toEqual([['escape-key']]);
            expect(onModalOpenChange.mock.calls).toEqual([['escape-key']]);
            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        });

        test('closes a popup with focus inside before the sheet and the modal', async () => {
            const onPopupOpenChange = jest.fn();
            const {user, onModalOpenChange, onSheetOpenChange} = await setupSheetInModal(
                <PopupInSheet onOpenChange={onPopupOpenChange} />,
            );
            await click(user, 'Open popup');
            await click(user, 'Popup action');
            await expectFocused('Popup action');

            await user.keyboard('{Escape}');

            await waitFor(() =>
                expect(
                    screen.queryByRole('button', {name: 'Popup action'}),
                ).not.toBeInTheDocument(),
            );
            expect(onPopupOpenChange.mock.calls).toEqual([['escape-key']]);
            expect(onSheetOpenChange).not.toHaveBeenCalled();
            expect(onModalOpenChange).not.toHaveBeenCalled();

            fireEvent.keyDown(document, {key: 'Escape', code: 'Escape'});

            await waitFor(() =>
                expect(
                    screen.queryByRole('dialog', {name: 'Inside modal'}),
                ).not.toBeInTheDocument(),
            );
            expect(onSheetOpenChange.mock.calls).toEqual([['escape-key']]);
            expect(onModalOpenChange).not.toHaveBeenCalled();
        });

        test('does not close over a popup opened from it', async () => {
            const onPopupOpenChange = jest.fn();
            const {user, onModalOpenChange, onSheetOpenChange} = await setupSheetInModal(
                <PopupInSheet onOpenChange={onPopupOpenChange} />,
            );
            await click(user, 'Open popup');
            await expectFocused('Open popup');

            await user.keyboard('{Escape}');

            // A Popup with an external anchor does not get Escape inside a Modal, with or without a sheet
            expect(onSheetOpenChange).not.toHaveBeenCalled();
            expect(onModalOpenChange).not.toHaveBeenCalled();
            expect(screen.getByRole('dialog', {name: 'Inside modal'})).toBeInTheDocument();
            expect(screen.getByRole('button', {name: 'Popup action'})).toBeInTheDocument();
        });
    });
});
