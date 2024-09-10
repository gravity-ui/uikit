import React from 'react';

import type {KeysetData} from '@gravity-ui/i18n';

import {render, screen} from '../../../test-utils/utils';
import {Dialog} from '../Dialog';
import {Pagination} from '../Pagination';

import {Lang, configure} from './configure';
import {registerCustomKeysets} from './registerCustomKeysets';

test('should render components with custom keysets', () => {
    registerCustomKeysets(
        'rs',
        createTestCustomKeyset({
            Dialog: {
                close: 'Затвори дијалог',
            },
            Pagination: {
                button_previous: 'Претходно',
                button_next: 'Следеће',
                button_first: 'Прво',
                label_select_size: 'Изаберите величину странице',
                'label_input-placeholder': 'Стр.',
                'label_page-of': 'из',
            },
        }),
    );
    registerCustomKeysets(
        'it',
        createTestCustomKeyset({
            Dialog: {
                close: 'Chiudere il dialogo',
            },
            Pagination: {
                button_previous: 'Precedente',
                button_next: 'Avanti',
                button_first: 'Primo',
                label_select_size: 'Seleziona la dimensione della pagina',
                'label_input-placeholder': 'Pagina n.',
                'label_page-of': 'di',
            },
        }),
    );

    configure({lang: 'rs'});
    render(<TestComponents />);
    expect(screen.getByRole('button', {name: 'Затвори дијалог'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Претходно'})).toBeInTheDocument();

    configure({lang: 'it'});
    render(<TestComponents />);
    expect(screen.getByRole('button', {name: 'Chiudere il dialogo'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Precedente'})).toBeInTheDocument();
});

test('should render components with bundled keysets after custom keysets registration', () => {
    registerCustomKeysets(
        'rs',
        createTestCustomKeyset({
            Dialog: {
                close: 'Затвори дијалог',
            },
            Pagination: {
                button_previous: 'Претходно',
                button_next: 'Следеће',
                button_first: 'Прво',
                label_select_size: 'Изаберите величину странице',
                'label_input-placeholder': 'Стр.',
                'label_page-of': 'из',
            },
        }),
    );

    configure({lang: Lang.En});
    render(<TestComponents />);
    expect(screen.getByRole('button', {name: 'Close dialog'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Previous'})).toBeInTheDocument();
});

test('should override bundled keysets', () => {
    registerCustomKeysets(
        Lang.En,
        createTestCustomKeyset({
            Dialog: {
                close: '[Overriden] Close dialog',
            },
            Pagination: {
                button_previous: '[Overriden] Previous',
                button_next: '[Overriden] Next',
                button_first: '[Overriden] First',
                label_select_size: '[Overriden] Select page size',
                'label_input-placeholder': '[Overriden] Page #',
                'label_page-of': '[Overriden] of',
            },
        }),
    );

    configure({lang: Lang.En});
    render(<TestComponents />);
    expect(screen.getByRole('button', {name: '[Overriden] Close dialog'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: '[Overriden] Previous'})).toBeInTheDocument();
});

test('should throw an error if a component keyset is not provided', () => {
    const keysetData = createTestCustomKeyset({});
    delete keysetData.Table;

    expect(() => registerCustomKeysets('rs', keysetData)).toThrow();
});

test('should throw an error if a component key is not provided', () => {
    const keysetData = createTestCustomKeyset({});
    Object.assign(keysetData, {
        Table: {
            label_empty: 'empty',
            // The values are omitted on purpose
            // 'label-actions': pluggedValue,
            // 'label-row-select': pluggedValue,
        },
    });

    expect(() => registerCustomKeysets('rs', keysetData)).toThrow();
});

test('should throw an error if extra components are provided', () => {
    const keysetData = createTestCustomKeyset({
        NonexistentComponent1: {
            label_cancel: 'cancel',
            label_submit: 'submit',
        },
        NonexistentComponent2: {
            label_load: 'load',
            label_preload: 'preload',
        },
    });
    expect(() => registerCustomKeysets('it', keysetData)).toThrow();
});

test('should throw an error if extra keys are provided', () => {
    const keysetData = createTestCustomKeyset({
        Alert: {
            label_close: 'cancel',
            nonexistent_key: 'nonexistent',
            nonexistent_key2: 'nonexistent2',
        },
    });
    expect(() => registerCustomKeysets('it', keysetData)).toThrow();
});

function TestComponents(): React.ReactElement {
    return (
        <React.Fragment>
            <Dialog onClose={() => {}} open={true}>
                <Dialog.Header />
            </Dialog>
            <Pagination page={1} pageSize={1} onUpdate={() => {}} />
        </React.Fragment>
    );
}

// Custom keyset registration needs keysets for every component, or the validation will fail.
// We don't want to provide it everywhere, otherwise the tests will be too verbose, that's where this function comes in.
function createTestCustomKeyset(dataToOverride: KeysetData): KeysetData {
    const pluggedValue = '[PLUG]';
    const fullTestKeyset = {
        Alert: {
            label_close: pluggedValue,
        },
        AvatarStack: {
            more: [pluggedValue, pluggedValue, pluggedValue],
        },
        Breadcrumbs: {
            label_more: pluggedValue,
        },
        ClipboardButton: {
            startCopy: pluggedValue,
            endCopy: pluggedValue,
        },
        Dialog: {
            close: pluggedValue,
        },
        Pagination: {
            button_previous: pluggedValue,
            button_next: pluggedValue,
            button_first: pluggedValue,
            label_select_size: pluggedValue,
            'label_input-placeholder': pluggedValue,
            'label_page-of': pluggedValue,
        },
        PinInput: {
            'label_one-of': pluggedValue,
        },
        Select: {
            label_clear: pluggedValue,
            'label_show-error-info': pluggedValue,
        },
        Table: {
            label_empty: pluggedValue,
            'label-actions': pluggedValue,
            'label-row-select': pluggedValue,
        },
        TableColumnSetup: {
            button_switcher: pluggedValue,
        },
        TableColumnSetupInner: {
            button_apply: pluggedValue,
            button_reset: pluggedValue,
            button_switcher: pluggedValue,
        },
        Toaster: {
            'label_close-button': pluggedValue,
        },
        withTableSettings: {
            label_settings: pluggedValue,
        },
        'g-clear-button': {
            'label_clear-button': pluggedValue,
        },
        'g-user-label': {
            'label_remove-button': pluggedValue,
        },
    };

    return Object.assign(fullTestKeyset, dataToOverride);
}
