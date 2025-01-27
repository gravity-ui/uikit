import * as React from 'react';

import {act, fireEvent, render, screen, within} from '../../../../test-utils/utils';
import {Modal} from '../../../components/Modal/Modal';
import {ToasterProvider} from '../Provider/ToasterProvider';
import {ToasterComponent} from '../ToasterComponent/ToasterComponent';
import {fireAnimationEndEvent} from '../__mocks__/fireAnimationEndEvent';
import {getToast} from '../__mocks__/getToast';
import {tick} from '../__mocks__/tick';
import {Toaster} from '../index';

let toasterInstance: Toaster;

function setup() {
    render(
        <ToasterProvider toaster={toasterInstance}>
            <ToasterComponent />
        </ToasterProvider>,
    );

    if (!toasterInstance) {
        throw new Error('Failed to setup test');
    }
}

const toastTimeout = 1000;
const toastProps = {
    name: 'test',
    title: 'Test Toast',
};

beforeEach(() => {
    jest.useFakeTimers();

    toasterInstance = new Toaster();
});
afterEach(() => {
    jest.useRealTimers();

    toasterInstance.destroy();
});

describe('api.add', () => {
    // We test that after adding toast the next add will remove
    // previous toast from DOM and add it again
    it('should override already added toast', async function () {
        setup();

        act(() => {
            toasterInstance.add(toastProps);
        });

        let toast = getToast();

        expect(toast).toBeInTheDocument();

        jest.advanceTimersByTime(1);

        act(() => {
            toasterInstance.add(toastProps);
        });
        fireAnimationEndEvent(toast, 'toast-hide-end');

        expect(toast).not.toBeInTheDocument();

        toast = await screen.findByText('Test Toast');

        expect(toast).toBeInTheDocument();
    });
});

describe('api.remove', () => {
    it('should remove toast', function () {
        setup();

        act(() => {
            toasterInstance.add({
                ...toastProps,
                autoHiding: toastTimeout,
            });
        });

        const toast = getToast();
        expect(toast).toBeInTheDocument();

        act(() => {
            toasterInstance.remove(toastProps.name);
        });
        tick(toast, 0);

        // Immediately removed
        expect(toast).not.toBeInTheDocument();
    });
});

it('should remove toast after timeout', function () {
    setup();

    act(() => {
        toasterInstance.add({
            ...toastProps,
            autoHiding: toastTimeout,
        });
    });

    const toast = getToast();
    expect(toast).toBeInTheDocument();

    tick(toast, toastTimeout / 2);

    expect(toast).toBeInTheDocument();

    act(() => {
        jest.advanceTimersByTime(toastTimeout / 2);
    });

    expect(toast).toBeInTheDocument();

    fireAnimationEndEvent(toast, 'toast-hide-end');

    expect(toast).not.toBeInTheDocument();
});

it('should preserve toast on hover', function () {
    setup();

    act(() => {
        toasterInstance.add({
            ...toastProps,
            autoHiding: toastTimeout,
        });
    });

    const toast = getToast();

    fireEvent.mouseOver(toast);

    // Pretend that timeout long gone
    tick(toast, toastTimeout * 2);

    // But toast was not removed because we hover it
    expect(toast).toBeInTheDocument();

    fireEvent.mouseLeave(toast);
    tick(toast, 0);

    // After "unhovering" toast remain intact
    expect(toast).toBeInTheDocument();

    tick(toast, toastTimeout / 2);

    // After some time toast is still here, because timeout is not gone yet
    expect(toast).toBeInTheDocument();

    tick(toast, toastTimeout / 2);

    // Time is over, toast should be removed
    expect(toast).not.toBeInTheDocument();
});

describe('api.update', () => {
    it('should update toast', function () {
        setup();

        act(() => {
            toasterInstance.add({
                ...toastProps,
                autoHiding: toastTimeout,
            });
        });

        const toast = getToast();

        expect(screen.queryByText('Test Content of the toast')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Toast Button'})).not.toBeInTheDocument();

        act(() => {
            toasterInstance.update(toastProps.name, {
                content: 'Test Content of the toast',
                actions: [
                    {
                        label: 'Toast Button',
                        onClick() {},
                    },
                ],
            });
        });

        expect(screen.getByText('Test Content of the toast')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Toast Button'})).toBeInTheDocument();
        expect(toast).toBeInTheDocument();
    });

    it('should bypass update of unexisted toasts', function () {
        setup();

        act(() => {
            toasterInstance.add({
                ...toastProps,
                autoHiding: toastTimeout,
            });
        });

        const toast = getToast();

        act(() => {
            toasterInstance.update(`unexisted ${toastProps.name}`, {
                content: 'Test Content of the toast',
                actions: [
                    {
                        label: 'Toast Button',
                        onClick() {},
                    },
                ],
            });
        });

        expect(toast).toBeInTheDocument();
    });
});

describe('api.removeAll', () => {
    it('should remove all toasts', function () {
        setup();

        act(() => {
            toasterInstance.add(toastProps);
            toasterInstance.add({
                ...toastProps,
                name: `${toastProps.name}2`,
                title: `${toastProps.title}2`,
            });
        });

        const toast1 = screen.getByRole('heading', {name: 'Test Toast'});
        const toast2 = screen.getByRole('heading', {name: 'Test Toast2'});

        expect(toast1).toBeInTheDocument();
        expect(toast2).toBeInTheDocument();

        act(() => {
            toasterInstance.removeAll();
        });

        [toast1, toast2].forEach((toast) => fireAnimationEndEvent(toast, 'toast-hide-end'));

        expect(screen.queryByRole('heading', {name: 'Test Toast'})).not.toBeInTheDocument();
        expect(screen.queryByRole('heading', {name: 'Test Toast2'})).not.toBeInTheDocument();
    });
});

describe('api.has', () => {
    it('should return false when toast is not added', () => {
        setup();
        expect(toasterInstance.has('unexisted toasts')).toBe(false);
    });

    it('should return false when toast is removed by code', () => {
        setup();

        act(() => {
            toasterInstance.add({
                ...toastProps,
                autoHiding: toastTimeout,
            });
        });

        expect(toasterInstance.has(toastProps.name)).toBe(true);

        act(() => {
            toasterInstance.remove(toastProps.name);
        });

        expect(toasterInstance.has(toastProps.name)).toBe(false);
    });

    it('should return false when toast is removed by timer', () => {
        setup();

        act(() => {
            toasterInstance.add({
                ...toastProps,
                autoHiding: toastTimeout,
            });
        });

        expect(toasterInstance.has(toastProps.name)).toBe(true);

        act(() => {
            jest.advanceTimersByTime(toastTimeout);
        });
        expect(toasterInstance.has(toastProps.name)).toBe(false);
    });
});

describe('modal remains open after toaster close', () => {
    const MODAL_CONTENT = 'qwerty-modal';

    const ModalAPI = ({onMount}: {onMount: (openModalFun: () => void) => any}) => {
        const [open, setOpenFlag] = React.useState(true);
        const closeModal = () => setOpenFlag(false);

        React.useEffect(() => {
            onMount(() => setOpenFlag(true));
        }, []);

        return (
            <Modal open={open} onOutsideClick={closeModal}>
                {MODAL_CONTENT}
            </Modal>
        );
    };

    function setup() {
        let openModal: undefined | (() => void);

        render(
            <ToasterProvider toaster={toasterInstance}>
                <ModalAPI
                    onMount={(_openModal) => {
                        openModal = _openModal;
                    }}
                />
                <ToasterComponent />
            </ToasterProvider>,
        );

        if (!toasterInstance || !openModal) {
            throw new Error('Failed to setup test');
        }

        return {openModal};
    }

    it('Toaster was opened after Modal', async () => {
        const {openModal} = setup();

        act(openModal);

        const modal = await screen.findByText(MODAL_CONTENT);
        expect(modal).toBeInTheDocument();

        act(() => {
            toasterInstance.add({...toastProps, isClosable: true});
        });

        const toast = getToast();
        expect(toast).toBeInTheDocument();

        fireEvent.click(toast);

        expect(modal).toBeInTheDocument();

        const closeToastButton = await within(toast).findByRole('button');
        if (!closeToastButton) {
            throw new Error('Toast Close Button expected to be in document.');
        }

        fireEvent.click(closeToastButton);
        tick(toast, 0);

        expect(toast).not.toBeInTheDocument();
        expect(modal).toBeInTheDocument();
    });

    it('Toaster was opened before Modal', async () => {
        const {openModal} = setup();

        act(() => {
            toasterInstance.add({...toastProps, isClosable: true});
        });

        const toast = getToast();
        expect(toast).toBeInTheDocument();

        act(openModal);

        const modal = await screen.findByText(MODAL_CONTENT);
        expect(modal).toBeInTheDocument();

        fireEvent.click(toast);

        expect(modal).toBeInTheDocument();

        const closeToastButton = await within(toast).findByRole('button');
        if (!closeToastButton) {
            throw new Error('Toast Close Button expected to be in document.');
        }

        fireEvent.click(closeToastButton);
        tick(toast, 0);

        expect(toast).not.toBeInTheDocument();
        expect(modal).toBeInTheDocument();
    });

    it('Toaster calls onClose callback when close icon is clicked', async () => {
        setup();

        const mockOnCloseFn = jest.fn();

        act(() => {
            toasterInstance.add({...toastProps, isClosable: true, onClose: mockOnCloseFn});
        });

        const toast = getToast();

        const closeToastButton = await within(toast).findByRole('button');

        fireEvent.click(closeToastButton);
        tick(toast, 0);

        expect(mockOnCloseFn).toHaveBeenCalled();
    });
});
