import * as React from 'react';

import {Select} from '..';
import type {SelectProps} from '..';
import {Button} from '../../Button';
import {Text} from '../../Text';
import {Flex} from '../../layout';

type City = {id: number; name: string};

const MOSCOW: City = {id: 1, name: 'Moscow'};
const PARIS: City = {id: 2, name: 'Paris'};
const getCityKey = (city: City) => String(city.id);

const LETTERS = [
    {value: 'a', content: 'A'},
    {value: 'b', content: 'B'},
];

const stringify = (value: unknown) =>
    JSON.stringify(value, (_key, item) => (item === undefined ? 'undefined' : item));

const renderEmptyAware: SelectProps<any, unknown>['renderSelectedOption'] = (option) => (
    <span>«{option.content ?? stringify(option.value)}»</span>
);

type Case = {title: string; initial: unknown[]; props: SelectProps<any, any>};

const CASES: Case[] = [
    {
        title: "'' with the option «Not selected»",
        initial: [''],
        props: {options: [{value: '', content: 'Not selected'}, ...LETTERS]},
    },
    {title: "'' without an option", initial: [''], props: {options: LETTERS}},
    {title: 'null without an option', initial: [null], props: {options: LETTERS}},
    {title: 'undefined without an option', initial: [undefined], props: {options: LETTERS}},
    {
        title: '0 and false as options',
        initial: [0],
        props: {
            options: [
                {value: 0, content: 'Zero'},
                {value: false, content: 'False'},
                {value: 1, content: 'One'},
            ],
        },
    },
    {
        title: "['', 'a'] in multiple, the counter",
        initial: ['', 'a'],
        props: {options: LETTERS, multiple: true, hasCounter: true},
    },
    {
        title: "1 and '1' in one options (a duplicate warning)",
        initial: [1],
        props: {
            options: [
                {value: 1, content: 'Number'},
                {value: '1', content: 'String'},
            ],
        },
    },
    {
        title: 'objects with getValueKey, the value is a structural copy',
        initial: [{...PARIS}],
        props: {
            options: [
                {value: MOSCOW, content: MOSCOW.name},
                {value: PARIS, content: PARIS.name},
            ],
            getValueKey: getCityKey,
        },
    },
    {
        title: 'an object without getValueKey (a warning)',
        initial: [],
        props: {
            options: [
                {value: MOSCOW, content: MOSCOW.name},
                {value: PARIS, content: PARIS.name},
            ],
        },
    },
    {title: 'a value with no option (still loading)', initial: ['c'], props: {options: LETTERS}},
    {
        title: "renderSelectedOption on '' and null without an option",
        initial: ['', null, 'a'],
        props: {options: LETTERS, multiple: true, renderSelectedOption: renderEmptyAware},
    },
];

function ProblemCase({title, initial, props, hasClear}: Case & {hasClear: boolean}) {
    const [value, setValue] = React.useState(initial);

    return (
        <Flex direction="column" gap={1}>
            <Text variant="subheader-1">{title}</Text>
            <Flex gap={2} alignItems="center">
                <Select
                    {...props}
                    width={260}
                    placeholder="Placeholder"
                    hasClear={hasClear}
                    value={value}
                    onUpdate={setValue}
                />
                <Button onClick={() => setValue(initial)}>Reset</Button>
                <Text variant="code-1">{stringify(value)}</Text>
            </Flex>
        </Flex>
    );
}

function ProblemForm({initial, props}: Case) {
    const [submitted, setSubmitted] = React.useState<string>();

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(stringify(new FormData(event.currentTarget).getAll('value')));
            }}
        >
            <Flex gap={2} alignItems="center">
                <Select {...props} name="value" width={260} defaultValue={initial} />
                <Button type="submit">Submit</Button>
                <Button type="reset">Reset</Button>
                <Text variant="code-1">FormData: {submitted ?? '—'}</Text>
            </Flex>
        </form>
    );
}

export function ProblemValuesShowcase() {
    return (
        <Flex direction="column" gap={6}>
            {[false, true].map((hasClear) => (
                <Flex key={String(hasClear)} direction="column" gap={3}>
                    <Text variant="header-1">{hasClear ? 'With hasClear' : 'Plain'}</Text>
                    {CASES.map((item) => (
                        <ProblemCase key={item.title} {...item} hasClear={hasClear} />
                    ))}
                </Flex>
            ))}
            <Flex direction="column" gap={3}>
                <Text variant="header-1">In a form</Text>
                {CASES.map((item) => (
                    <Flex key={item.title} direction="column" gap={1}>
                        <Text variant="subheader-1">{item.title}</Text>
                        <ProblemForm {...item} />
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
}
