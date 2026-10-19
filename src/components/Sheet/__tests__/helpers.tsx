import * as React from 'react';

import {Modal} from '../../Modal';
import type {SheetProps} from '../Sheet';
import {Sheet} from '../Sheet';

import {QASheet} from './constants';

export const TestSheet = (props: Partial<Omit<SheetProps, 'open' | 'onOpenChange'>>) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <button onClick={() => setOpen(true)}>Show modal</button>
            <Sheet {...props} open={open} onOpenChange={setOpen} qa={QASheet.content}>
                <div
                    style={{
                        minHeight: 100,
                        border: '1px solid tomato',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    Sheet content
                </div>
            </Sheet>
        </div>
    );
};

export function FocusTestSheet({
    modal = true,
    sibling = false,
}: {
    modal?: boolean;
    sibling?: boolean;
}) {
    const [visible, setVisible] = React.useState(false);
    const [nestedVisible, setNestedVisible] = React.useState(false);

    const nestedSheet = (
        <Sheet open={nestedVisible} title="Nested" onOpenChange={setNestedVisible}>
            <button>Nested action</button>
        </Sheet>
    );

    return (
        <React.Fragment>
            <button onClick={() => setVisible(true)}>Open sheet</button>
            <button>Background action</button>
            <Sheet open={visible} title="Parent" modal={modal} onOpenChange={setVisible}>
                <button>First action</button>
                <button onClick={() => setNestedVisible(true)}>Open nested sheet</button>
                <button>Last action</button>
                {!sibling && nestedSheet}
            </Sheet>
            {sibling && nestedSheet}
        </React.Fragment>
    );
}

export function FocusTestSheetInModal() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [sheetVisible, setSheetVisible] = React.useState(false);

    return (
        <React.Fragment>
            <button onClick={() => setModalOpen(true)}>Open modal</button>
            <Modal open={modalOpen} onOpenChange={setModalOpen} aria-label="Modal">
                <button onClick={() => setSheetVisible(true)}>Open sheet in modal</button>
                <Sheet open={sheetVisible} title="Inside modal" onOpenChange={setSheetVisible}>
                    <button>First sheet action</button>
                    <button>Last sheet action</button>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}
