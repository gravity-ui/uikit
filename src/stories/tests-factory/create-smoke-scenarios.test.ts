import {createSmokeScenarios} from './create-smoke-scenarios';

test('regular', () => {
    const smokeScenarios = createSmokeScenarios(
        {
            theme: 'theme-1',
            label: 'label-1',
        },
        {
            theme: ['theme-2', 'theme-3'],
            label: ['label-2', 'label-3'],
        },
    );

    expect(smokeScenarios).toEqual([
        [
            '[default]',
            {
                label: 'label-1',
                theme: 'theme-1',
            },
        ],
        [
            '[theme: theme-2]',
            {
                label: 'label-1',
                theme: 'theme-2',
            },
        ],
        [
            '[theme: theme-3]',
            {
                label: 'label-1',
                theme: 'theme-3',
            },
        ],
        [
            '[label: label-2]',
            {
                label: 'label-2',
                theme: 'theme-1',
            },
        ],
        [
            '[label: label-3]',
            {
                label: 'label-3',
                theme: 'theme-1',
            },
        ],
    ]);
});

test('with scenario name', () => {
    const smokeScenarios = createSmokeScenarios(
        {
            theme: 'theme-1',
            label: 'label-1',
        },
        {
            theme: [
                ['name-theme-2', 'theme-2'],
                ['name-theme-3', 'theme-3'],
            ],
            label: [
                ['name-label-2', 'label-2'],
                ['name-label-3', 'label-3'],
            ],
        },
    );

    expect(smokeScenarios).toEqual([
        [
            '[default]',
            {
                label: 'label-1',
                theme: 'theme-1',
            },
        ],
        [
            '[theme: name-theme-2]',
            {
                label: 'label-1',
                theme: 'theme-2',
            },
        ],
        [
            '[theme: name-theme-3]',
            {
                label: 'label-1',
                theme: 'theme-3',
            },
        ],
        [
            '[label: name-label-2]',
            {
                label: 'label-2',
                theme: 'theme-1',
            },
        ],
        [
            '[label: name-label-3]',
            {
                label: 'label-3',
                theme: 'theme-1',
            },
        ],
    ]);
});
