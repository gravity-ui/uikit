export const USERNAME_PREFIXES = [
    'user',
    'admin',
    'guest',
    'dev',
    'test',
    'demo',
    'new',
    'temp',
    'pro',
    'super',
    'alpha',
    'beta',
    'gamma',
    'omega',
    'chief',
    'senior',
    'junior',
    'master',
    'expert',
];

export const USERNAME_SUFFIXES = [
    '123',
    '456',
    '789',
    '2024',
    '2025',
    'x',
    'pro',
    'dev',
    'test',
    'new',
    '1',
    '2',
    '3',
    '99',
    '007',
    'one',
    'two',
    'max',
    'top',
    'best',
];

export const TOKEN_SOURCE_OPTIONS = [
    {value: 'random', content: 'Random Strings'},
    {value: 'usernames', content: 'Usernames'},
    {value: 'ids', content: 'Unique IDs'},
    {value: 'mixed', content: 'Mixed Types'},
    {value: 'custom', content: 'Custom Tokens'},
];

export const DEFAULT_CUSTOM_TOKENS = 'user_123\nadmin_456\ntest_789\ngamma_pro\nbeta_dev';

export const VIEWS = ['light', 'medium', 'heavy'] as const;
export const STATES = ['view', 'colors'] as const;
