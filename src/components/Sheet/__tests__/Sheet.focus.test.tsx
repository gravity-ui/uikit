import * as React from 'react';

import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen, waitFor} from '../../../../test-utils/utils';
import {Lang, configure} from '../../../utils/configure';
import {Modal} from '../../Modal';
import {Popup} from '../../Popup';
import {Select} from '../../Select';
import type {History, Location} from '../../mobile';
import {MobileProvider, Platform} from '../../mobile';
import {getLayersCount} from '../../utils/layer-manager';
import type {SheetProps} from '../Sheet';
import {Sheet} from '../Sheet';

type User = ReturnType<typeof userEvent.setup>;

const SELECT_OPTIONS = [
    {value: 'bug', content: 'Bug'},
    {value: 'task', content: 'Task'},
];

function FocusSheet({
    children,
    onOpenChange,
    rejectDismissal = false,
    ...props
}: Partial<SheetProps> & {rejectDismissal?: boolean}) {
    const [visible, setVisible] = React.useState(false);

    return (
        <React.Fragment>
            <button onClick={() => setVisible(true)}>Open</button>
            <Sheet
                visible={visible}
                title="Example"
                onOpenChange={(open, event, reason) => {
                    onOpenChange?.(open, event, reason);

                    if (!rejectDismissal) {
                        setVisible(open);
                    }
                }}
                {...props}
            >
                {children ?? (
                    <React.Fragment>
                        <button>First</button>
                        <button>Last</button>
                    </React.Fragment>
                )}
            </Sheet>
        </React.Fragment>
    );
}

function StackedSheets({
    sibling = false,
    onOpenChange,
}: {
    sibling?: boolean;
    onOpenChange: (name: string, reason?: string) => void;
}) {
    const [parentVisible, setParentVisible] = React.useState(false);
    const [childVisible, setChildVisible] = React.useState(false);

    const childSheet = (
        <Sheet
            visible={childVisible}
            title="Child"
            onOpenChange={(open, _event, reason) => {
                onOpenChange('child', reason);
                setChildVisible(open);
            }}
        >
            <button>Child action</button>
        </Sheet>
    );

    return (
        <React.Fragment>
            <button onClick={() => setParentVisible(true)}>Open parent</button>
            <Sheet
                visible={parentVisible}
                title="Parent"
                onOpenChange={(open, _event, reason) => {
                    onOpenChange('parent', reason);
                    setParentVisible(open);
                }}
            >
                <button onClick={() => setChildVisible(true)}>Open child</button>
                {!sibling && childSheet}
            </Sheet>
            {sibling && childSheet}
        </React.Fragment>
    );
}

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

function SheetInModal({
    children,
    onModalOpenChange,
    onSheetOpenChange,
}: {
    children?: React.ReactNode;
    onModalOpenChange: (reason?: string) => void;
    onSheetOpenChange: (reason?: string) => void;
}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [sheetVisible, setSheetVisible] = React.useState(false);

    return (
        <React.Fragment>
            <button onClick={() => setModalOpen(true)}>Open modal</button>
            <Modal
                open={modalOpen}
                onOpenChange={(open, _event, reason) => {
                    onModalOpenChange(reason);
                    setModalOpen(open);
                }}
            >
                <button onClick={() => setSheetVisible(true)}>Open sheet</button>
                <Sheet
                    visible={sheetVisible}
                    title="Inside modal"
                    onOpenChange={(open, _event, reason) => {
                        onSheetOpenChange(reason);
                        setSheetVisible(open);
                    }}
                >
                    <button>Sheet action</button>
                    {children}
                </Sheet>
            </Modal>
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

describe('Sheet focus management', () => {
    describe('initial focus', () => {
        test('focuses the sheet itself, so a text field does not open the on-screen keyboard', async () => {
            const user = userEvent.setup();
            render(
                <FocusSheet>
                    <input aria-label="Name" />
                </FocusSheet>,
            );

            await click(user, 'Open');

            await expectSheetFocused('Example');
            expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
            expect(screen.queryByRole('button', {name: 'Open'})).not.toBeInTheDocument();
        });

        test('supports a custom initial focus index', async () => {
            const user = userEvent.setup();
            render(<FocusSheet initialFocus={1} />);

            await click(user, 'Open');

            await expectFocused('Last');
        });

        test('supports a custom initial focus element', async () => {
            const initialFocus = React.createRef<HTMLButtonElement>();
            const user = userEvent.setup();
            render(
                <FocusSheet initialFocus={initialFocus}>
                    <button>First</button>
                    <button ref={initialFocus}>Preferred</button>
                </FocusSheet>,
            );

            await click(user, 'Open');

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
                    <FocusSheet returnFocus={returnFocus} />
                </React.Fragment>,
            );

            await click(user, 'Open');
            await expectSheetFocused('Example');
            await user.keyboard('{Escape}');

            await waitFor(() => expect(returnFocus.current).toHaveFocus());
        });

        test('does not restore focus when returnFocus is disabled', async () => {
            const user = userEvent.setup();
            render(<FocusSheet returnFocus={false} />);
            const opener = screen.getByRole('button', {name: 'Open'});

            await click(user, 'Open');
            await expectSheetFocused('Example');
            await user.keyboard('{Escape}');

            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
            expect(opener).not.toHaveFocus();
        });
    });

    describe('accessible dismissal', () => {
        test('closes a legacy sheet through the hidden dismiss control', async () => {
            const onClose = jest.fn();
            render(
                <Sheet visible onClose={onClose}>
                    Content
                </Sheet>,
            );

            await waitFor(() =>
                expect(screen.getAllByRole('button', {name: 'Close'})).toHaveLength(2),
            );
            fireEvent.click(screen.getAllByRole('button', {name: 'Close'})[0]);

            await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        test('requests dismissal with the dismiss reason and closes when the owner accepts it', async () => {
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            render(<FocusSheet onOpenChange={onOpenChange} />);
            const opener = screen.getByRole('button', {name: 'Open'});

            await click(user, 'Open');
            await expectSheetFocused('Example');
            fireEvent.click(screen.getAllByRole('button', {name: 'Close'})[1]);

            expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(MouseEvent), 'dismiss');
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
            await waitFor(() => expect(opener).toHaveFocus());
        });

        test('keeps a controlled sheet open when its owner rejects accessible dismissal', async () => {
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            render(<FocusSheet onOpenChange={onOpenChange} rejectDismissal />);

            await click(user, 'Open');
            await expectSheetFocused('Example');
            fireEvent.click(screen.getAllByRole('button', {name: 'Close'})[0]);

            expect(onOpenChange).toHaveBeenCalledWith(false, expect.any(MouseEvent), 'dismiss');
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            expect(screen.getByRole('dialog')).toHaveFocus();
            expect(getLayersCount()).toBe(1);
        });

        test('localizes the dismiss controls', async () => {
            configure({lang: Lang.Ru});

            try {
                render(<Sheet visible>Content</Sheet>);

                await waitFor(() =>
                    expect(screen.getAllByRole('button', {name: 'Закрыть'})).toHaveLength(2),
                );
            } finally {
                configure({lang: Lang.En});
            }
        });
    });

    describe('modal={false}', () => {
        test('does not move focus, hide the background, add dismiss controls or handle Escape', async () => {
            const user = userEvent.setup();
            render(<FocusSheet modal={false} />);
            const opener = screen.getByRole('button', {name: 'Open'});

            await click(user, 'Open');
            await user.keyboard('{Escape}');

            expect(opener).toHaveFocus();
            expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-modal');
            expect(screen.getByRole('button', {name: 'Open'})).toBeVisible();
            expect(screen.queryByRole('button', {name: 'Close'})).not.toBeInTheDocument();
            expect(getLayersCount()).toBe(0);
        });

        test('does not trap Tab', async () => {
            const user = userEvent.setup();
            render(<FocusSheet modal={false} />);

            await click(user, 'Open');
            await user.tab();
            await expectFocused('First');
            await user.tab();
            await expectFocused('Last');
            await user.tab();

            expect(document.body).toHaveFocus();
        });
    });

    describe.each([
        {name: 'nested', sibling: false},
        {name: 'sibling', sibling: true},
    ])('$name sheets', ({sibling}) => {
        async function openBoth(user: User) {
            await click(user, 'Open parent');
            await expectSheetFocused('Parent');
            await click(user, 'Open child');
            await expectSheetFocused('Child');
        }

        test('dismiss only the topmost sheet and return focus to its opener', async () => {
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            render(<StackedSheets sibling={sibling} onOpenChange={onOpenChange} />);

            await openBoth(user);
            expect(screen.queryByRole('dialog', {name: 'Parent'})).not.toBeInTheDocument();

            await user.keyboard('{Escape}');

            await waitFor(() =>
                expect(screen.queryByRole('dialog', {name: 'Child'})).not.toBeInTheDocument(),
            );
            await expectFocused('Open child');
            expect(onOpenChange.mock.calls).toEqual([['child', 'escape-key']]);
            expect(screen.getByRole('dialog', {name: 'Parent'})).toBeVisible();

            await user.keyboard('{Escape}');

            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
            await expectFocused('Open parent');
            expect(onOpenChange.mock.calls).toEqual([
                ['child', 'escape-key'],
                ['parent', 'escape-key'],
            ]);
        });

        test('send Escape pressed during the exit of the topmost sheet to the next one', async () => {
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            render(<StackedSheets sibling={sibling} onOpenChange={onOpenChange} />);
            await openBoth(user);

            await user.keyboard('{Escape}{Escape}');

            expect(onOpenChange.mock.calls).toEqual([
                ['child', 'escape-key'],
                ['parent', 'escape-key'],
            ]);
            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        });
    });

    describe('inside a Modal', () => {
        async function openModalAndSheet(user: User) {
            await click(user, 'Open modal');
            // The modal takes focus after its own transition; opening the sheet earlier would lose it
            await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());
            await click(user, 'Open sheet');
            await expectSheetFocused('Inside modal');
        }

        test('dismisses only the sheet on Escape and leaves the modal to the next Escape', async () => {
            const onModalOpenChange = jest.fn();
            const onSheetOpenChange = jest.fn();
            const user = userEvent.setup();
            render(
                <SheetInModal
                    onModalOpenChange={onModalOpenChange}
                    onSheetOpenChange={onSheetOpenChange}
                />,
            );
            await openModalAndSheet(user);
            expect(screen.queryByRole('button', {name: 'Open sheet'})).not.toBeInTheDocument();

            await user.keyboard('{Escape}');

            await waitFor(() =>
                expect(
                    screen.queryByRole('dialog', {name: 'Inside modal'}),
                ).not.toBeInTheDocument(),
            );
            await expectFocused('Open sheet');
            expect(onSheetOpenChange.mock.calls).toEqual([['escape-key']]);
            expect(onModalOpenChange).not.toHaveBeenCalled();

            await user.keyboard('{Escape}');

            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
            await expectFocused('Open modal');
            expect(onModalOpenChange.mock.calls).toEqual([['escape-key']]);
            expect(onSheetOpenChange).toHaveBeenCalledTimes(1);
        });

        test('dismisses only the sheet when Escape reaches the document from outside of it', async () => {
            const onModalOpenChange = jest.fn();
            const onSheetOpenChange = jest.fn();
            const user = userEvent.setup();
            render(
                <SheetInModal
                    onModalOpenChange={onModalOpenChange}
                    onSheetOpenChange={onSheetOpenChange}
                />,
            );
            await openModalAndSheet(user);

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
            const onModalOpenChange = jest.fn();
            const onSheetOpenChange = jest.fn();
            const user = userEvent.setup();
            render(
                <SheetInModal
                    onModalOpenChange={onModalOpenChange}
                    onSheetOpenChange={onSheetOpenChange}
                />,
            );
            await openModalAndSheet(user);

            await user.keyboard('{Escape}{Escape}');

            expect(onSheetOpenChange.mock.calls).toEqual([['escape-key']]);
            expect(onModalOpenChange.mock.calls).toEqual([['escape-key']]);
            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        });

        test('closes a popup with focus inside before the sheet and the modal', async () => {
            const onModalOpenChange = jest.fn();
            const onSheetOpenChange = jest.fn();
            const onPopupOpenChange = jest.fn();
            const user = userEvent.setup();
            render(
                <SheetInModal
                    onModalOpenChange={onModalOpenChange}
                    onSheetOpenChange={onSheetOpenChange}
                >
                    <PopupInSheet onOpenChange={onPopupOpenChange} />
                </SheetInModal>,
            );
            await openModalAndSheet(user);
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
            const onModalOpenChange = jest.fn();
            const onSheetOpenChange = jest.fn();
            const onPopupOpenChange = jest.fn();
            const user = userEvent.setup();
            render(
                <SheetInModal
                    onModalOpenChange={onModalOpenChange}
                    onSheetOpenChange={onSheetOpenChange}
                >
                    <PopupInSheet onOpenChange={onPopupOpenChange} />
                </SheetInModal>,
            );
            await openModalAndSheet(user);
            await click(user, 'Open popup');
            await expectFocused('Open popup');

            await user.keyboard('{Escape}');

            // A Popup with an external anchor does not get Escape inside a Modal, with or without a sheet
            expect(onSheetOpenChange).not.toHaveBeenCalled();
            expect(onModalOpenChange).not.toHaveBeenCalled();
            expect(screen.getByRole('dialog', {name: 'Inside modal'})).toBeInTheDocument();
            expect(screen.getByRole('button', {name: 'Popup action'})).toBeInTheDocument();
        });

        test('closes a mobile Select sheet on Escape without closing the modal around it', async () => {
            const onOpenChange = jest.fn();
            const user = userEvent.setup();
            render(
                <MobileProvider mobile>
                    <Modal open onOpenChange={onOpenChange}>
                        <Select options={SELECT_OPTIONS} />
                    </Modal>
                </MobileProvider>,
            );
            await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus());
            const control = screen.getByRole('combobox');

            await user.click(control);
            // The sheet hides the control and focuses its list, which takes over the combobox role
            await waitFor(() => expect(screen.getByRole('combobox')).toHaveFocus());
            await user.keyboard('{Escape}');

            await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
            await waitFor(() => expect(control).toHaveFocus());
            expect(onOpenChange).not.toHaveBeenCalled();
            expect(screen.getByRole('dialog')).toBeVisible();
        });

        test('keeps the modal open when the sheet is dismissed with the hidden control', async () => {
            const onModalOpenChange = jest.fn();
            const onSheetOpenChange = jest.fn();
            const user = userEvent.setup();
            render(
                <SheetInModal
                    onModalOpenChange={onModalOpenChange}
                    onSheetOpenChange={onSheetOpenChange}
                />,
            );
            await openModalAndSheet(user);

            fireEvent.click(screen.getAllByRole('button', {name: 'Close'})[0]);

            await expectFocused('Open sheet');
            expect(onSheetOpenChange.mock.calls).toEqual([['dismiss']]);
            expect(onModalOpenChange).not.toHaveBeenCalled();
            expect(screen.getByRole('dialog')).toBeVisible();
        });
    });

    describe('mobile Select', () => {
        test('selects an option with the keyboard and returns focus to the control', async () => {
            const user = userEvent.setup();
            render(
                <MobileProvider mobile>
                    <Select options={SELECT_OPTIONS} />
                </MobileProvider>,
            );
            const control = screen.getByRole('combobox');

            await user.click(control);
            // The sheet hides the control and focuses its list, which takes over the combobox role
            const list = await screen.findByRole('combobox');
            await waitFor(() => expect(list).toHaveFocus());
            expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');

            await user.keyboard('{ArrowDown}');

            expect(list).toHaveAttribute(
                'aria-activedescendant',
                screen.getByRole('option', {name: 'Task'}).id,
            );

            await user.keyboard('{Enter}');

            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
            expect(control).toHaveTextContent('Task');
            await waitFor(() => expect(control).toHaveFocus());
        });
    });

    test.each([Platform.IOS, Platform.ANDROID])(
        'restores the platform history when dismissed on %s',
        async (platform) => {
            const location: Location = {pathname: '/', search: '', hash: ''};
            const updateLocation = (next: Partial<Location>) => {
                Object.assign(location, next, {
                    hash: next.hash ? `#${next.hash.replace(/^#/, '')}` : '',
                });
            };
            const history: History = {
                action: '',
                replace: jest.fn(updateLocation),
                push: jest.fn(updateLocation),
                goBack: jest.fn(),
            };
            const user = userEvent.setup();
            render(
                <MobileProvider
                    mobile
                    platform={platform}
                    useHistory={() => history}
                    useLocation={() => location}
                >
                    <Sheet visible id="example">
                        Content
                    </Sheet>
                </MobileProvider>,
            );

            await user.keyboard('{Escape}');

            await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
            if (platform === Platform.IOS) {
                expect(location.hash).toBe('');
            } else {
                expect(history.goBack).toHaveBeenCalledTimes(1);
            }
        },
    );
});
