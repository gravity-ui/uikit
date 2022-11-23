import React from 'react';
import {KeyCode} from '../../constants';
import {getNextQuickSearch} from '../utils';
import {LIST_CLASSNAME, QUICK_SEARCH_TIMEOUT} from '../constants';

type UseQuickSearchProps = {
    onActiveItemSelect: () => void;
    onSearchChange: (search: string) => void;
    open: boolean;
};

export const useQuickSearch = (props: UseQuickSearchProps) => {
    const {onActiveItemSelect, onSearchChange, open} = props;
    const [search, setSearch] = React.useState('');
    const [timer, setTimer] = React.useState<number | undefined>();

    const handleTimer = React.useCallback(
        (nextSearch: string) => {
            clearTimeout(timer);

            if (nextSearch) {
                const nextTimer = window.setTimeout(() => setSearch(''), QUICK_SEARCH_TIMEOUT);
                setTimer(nextTimer);
            }
        },
        [timer],
    );

    const handleSearch = React.useCallback(
        (e: KeyboardEvent) => {
            e.stopPropagation();

            if (
                e.key === KeyCode.SPACEBAR &&
                document.activeElement?.classList.contains(LIST_CLASSNAME)
            ) {
                onActiveItemSelect();

                return;
            }

            const nextSearch = getNextQuickSearch(e.key, search);

            if (search !== nextSearch) {
                handleTimer(nextSearch);
                setSearch(nextSearch);
            }
        },
        [onActiveItemSelect, handleTimer, search],
    );

    React.useEffect(() => {
        if (open) {
            document.addEventListener('keydown', handleSearch);
        } else {
            setSearch('');
        }

        return () => {
            if (open) {
                document.removeEventListener('keydown', handleSearch);
            }
        };
    }, [handleSearch, open]);

    React.useEffect(() => {
        if (!open) {
            clearTimeout(timer);
        }

        return () => clearTimeout(timer);
    }, [open, timer]);

    React.useEffect(() => {
        onSearchChange(search);
    }, [onSearchChange, search]);
};
