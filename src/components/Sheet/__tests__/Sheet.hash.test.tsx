import * as React from 'react';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import type {History, Location} from '../../mobile';
import {MobileProvider, Platform} from '../../mobile';
import {Sheet} from '../Sheet';

function normalizeHash(hash: string) {
    if (!hash) {
        return '';
    }

    return hash.startsWith('#') ? hash : `#${hash}`;
}

interface HashedSheetsProps {
    onHashChange: (hash: string) => void;
}

function HashedSheets({onHashChange}: HashedSheetsProps) {
    const [location, setLocation] = React.useState<Location>({
        pathname: '/',
        search: '',
        hash: '',
    });
    const actionRef = React.useRef<History['action']>('');

    const [sheetAVisible, setSheetAVisible] = React.useState(false);
    const [sheetBVisible, setSheetBVisible] = React.useState(false);

    onHashChange(location.hash);

    const history = React.useMemo<History>(
        () => ({
            get action() {
                return actionRef.current;
            },
            replace(nextLocation) {
                actionRef.current = 'REPLACE';
                setLocation((prev) => ({
                    ...prev,
                    ...nextLocation,
                    hash: normalizeHash(nextLocation.hash ?? ''),
                }));
            },
            push(nextLocation) {
                actionRef.current = 'PUSH';
                setLocation((prev) => ({
                    ...prev,
                    ...nextLocation,
                    hash: normalizeHash(nextLocation.hash ?? ''),
                }));
            },
            goBack() {
                actionRef.current = 'POP';
            },
        }),
        [],
    );

    return (
        <MobileProvider
            mobile
            platform={Platform.IOS}
            useHistory={() => history}
            useLocation={() => location}
        >
            <button onClick={() => setSheetAVisible(true)}>Open A</button>
            <button onClick={() => setSheetBVisible(true)}>Open B</button>
            <button onClick={() => setSheetAVisible(false)}>Close A</button>
            <button onClick={() => setSheetBVisible(false)}>Close B</button>
            <Sheet id="sheetA" visible={sheetAVisible} onClose={() => setSheetAVisible(false)}>
                Content A
            </Sheet>
            <Sheet id="sheetB" visible={sheetBVisible} onClose={() => setSheetBVisible(false)}>
                Content B
            </Sheet>
        </MobileProvider>
    );
}

describe('Sheet hash', () => {
    test('restores hashes correctly when multiple sheets are closed', () => {
        let currentHash = '';
        const onHashChange = (hash: string) => {
            currentHash = hash;
        };

        render(<HashedSheets onHashChange={onHashChange} />);

        // Open Sheet A — its hash is set.
        fireEvent.click(screen.getByText('Open A'));
        expect(currentHash).toBe('#sheetA');

        // Open Sheet B on top of Sheet A — the previous hash is remembered.
        fireEvent.click(screen.getByText('Open B'));
        expect(currentHash).toBe('#sheetB');

        // Open Sheet B again — the previous hash is remembered.
        fireEvent.click(screen.getByText('Open B'));
        expect(currentHash).toBe('#sheetB');

        // Close Sheet B — the previous hash (Sheet A) is restored.
        fireEvent.click(screen.getByText('Close B'));
        expect(currentHash).toBe('#sheetA');

        // Close Sheet A — the hash is cleared.
        fireEvent.click(screen.getByText('Close A'));
        expect(currentHash).toBe('');
    });
});
