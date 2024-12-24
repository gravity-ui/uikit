import {useCallback, useEffect, useState} from 'react';

import {QUICK_SEARCH_TIMEOUT} from '../constants';
import {getNextQuickSearch} from '../utils';

type UseQuickSearchProps = {
    onChange: (search: string) => void;
    open?: boolean;
    disabled?: boolean;
};

export const useQuickSearch = (props: UseQuickSearchProps) => {
    const {onChange, open, disabled} = props;
    const [search, setSearch] = useState('');
    const [timer, setTimer] = useState<number | undefined>();

    const handleTimer = useCallback(
        (nextSearch: string) => {
            clearTimeout(timer);

            if (nextSearch) {
                const nextTimer = window.setTimeout(() => setSearch(''), QUICK_SEARCH_TIMEOUT);
                setTimer(nextTimer);
            }
        },
        [timer],
    );

    const handleSearch = useCallback(
        (e: KeyboardEvent) => {
            e.stopPropagation();

            const nextSearch = getNextQuickSearch(e.key, search);

            if (search !== nextSearch) {
                handleTimer(nextSearch);
                setSearch(nextSearch);
            }
        },
        [handleTimer, search],
    );

    useEffect(() => {
        if (open && !disabled) {
            document.addEventListener('keydown', handleSearch);
        } else if (!open && !disabled) {
            setSearch('');
        }

        return () => {
            if (open && !disabled) {
                document.removeEventListener('keydown', handleSearch);
            }
        };
    }, [handleSearch, open, disabled]);

    useEffect(() => {
        if (!open) {
            clearTimeout(timer);
        }

        return () => clearTimeout(timer);
    }, [open, timer]);

    useEffect(() => {
        onChange(search);
    }, [onChange, search]);
};
