import * as React from 'react';

import {Modal} from '../../Modal';
import type {SheetOpenChangeReason, SheetProps} from '../Sheet';
import {Sheet} from '../Sheet';

import {QASheet} from './constants';

export interface TestSheetProps extends Partial<Omit<SheetProps, 'open'>> {
    /** Keeps the sheet open when it asks to close */
    rejectDismissal?: boolean;
}

export const TestSheet = ({
    children,
    onOpenChange,
    rejectDismissal = false,
    ...props
}: TestSheetProps) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <button onClick={() => setOpen(true)}>Show modal</button>
            <Sheet
                {...props}
                open={open}
                onOpenChange={(nextOpen, event, reason) => {
                    onOpenChange?.(nextOpen, event, reason);

                    if (!rejectDismissal) {
                        setOpen(nextOpen);
                    }
                }}
                qa={QASheet.content}
            >
                {children ?? (
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
                )}
            </Sheet>
        </div>
    );
};

export interface StackedSheetsProps {
    /** Renders the child sheet next to the parent one instead of inside it */
    sibling?: boolean;
    /** `disableModal` of the parent sheet */
    disableModal?: boolean;
    onOpenChange?: (sheet: 'parent' | 'child', reason?: SheetOpenChangeReason) => void;
}

export function StackedSheets({sibling = false, disableModal, onOpenChange}: StackedSheetsProps) {
    const [parentOpen, setParentOpen] = React.useState(false);
    const [childOpen, setChildOpen] = React.useState(false);

    const childSheet = (
        <Sheet
            open={childOpen}
            title="Child"
            onOpenChange={(open, _event, reason) => {
                onOpenChange?.('child', reason);
                setChildOpen(open);
            }}
        >
            <button>Child action</button>
        </Sheet>
    );

    return (
        <React.Fragment>
            <button onClick={() => setParentOpen(true)}>Open parent</button>
            <button>Background action</button>
            <Sheet
                open={parentOpen}
                title="Parent"
                disableModal={disableModal}
                onOpenChange={(open, _event, reason) => {
                    onOpenChange?.('parent', reason);
                    setParentOpen(open);
                }}
            >
                <button>First action</button>
                <button onClick={() => setChildOpen(true)}>Open child</button>
                <button>Last action</button>
                {!sibling && childSheet}
            </Sheet>
            {sibling && childSheet}
        </React.Fragment>
    );
}

export interface SheetInModalProps {
    children?: React.ReactNode;
    onModalOpenChange?: (reason?: string) => void;
    onSheetOpenChange?: (reason?: SheetOpenChangeReason) => void;
}

export function SheetInModal({children, onModalOpenChange, onSheetOpenChange}: SheetInModalProps) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [sheetOpen, setSheetOpen] = React.useState(false);

    return (
        <React.Fragment>
            <button onClick={() => setModalOpen(true)}>Open modal</button>
            <Modal
                open={modalOpen}
                aria-label="Modal"
                onOpenChange={(open, _event, reason) => {
                    onModalOpenChange?.(reason);
                    setModalOpen(open);
                }}
            >
                <button onClick={() => setSheetOpen(true)}>Open sheet</button>
                <Sheet
                    open={sheetOpen}
                    title="Inside modal"
                    onOpenChange={(open, _event, reason) => {
                        onSheetOpenChange?.(reason);
                        setSheetOpen(open);
                    }}
                >
                    <button>First sheet action</button>
                    <button>Last sheet action</button>
                    {children}
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}
