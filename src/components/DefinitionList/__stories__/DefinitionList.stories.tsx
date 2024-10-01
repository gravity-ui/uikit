import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Label} from '../../Label';
import {Link} from '../../Link';
import {User} from '../../User';
import {DefinitionList} from '../DefinitionList';
import type {DefinitionListItem, DefinitionListProps} from '../types';

const items: DefinitionListItem[] = [
    {name: <Link href="https://cloud.yandex.ru/docs">String value</Link>, content: 'value'},
    {
        name: (
            <User
                name="Charles Darwin"
                size="xl"
                description="Adventurer"
                avatar={{
                    text: 'Charles Darwin',
                    theme: 'brand',
                    title: 'Charles Darwin avatar',
                }}
            />
        ),
        content: 'value',
        note: 'This is avatar',
    },
    {name: 'Number value', content: 2},
    {name: 'Node value', content: <strong>value</strong>},
    {name: 'Empty value'},
    {name: 'String value with copy', content: 'value', copyText: 'value'},
    {name: 'Number value with copy', content: 2, copyText: 'two'},
    {name: 'Node value with copy', content: <strong>value</strong>, copyText: 'value'},
    {name: 'Empty value with copy', copyText: 'nothing to copy'},
    {name: 'String value with custom title', content: 'value', contentTitle: "value's title"},
    {name: 'Number value with custom title', content: 2, contentTitle: "value's title"},
    {
        name: 'Node value with custom title',
        content: <strong>value</strong>,
        contentTitle: "value's title",
    },
    {name: 'Empty value with custom title', contentTitle: "value's title"},
    {
        name: 'String long value',
        content:
            'The HTML <dl> element represents a description list. The element encloses a list of groups of terms (specified using the <dt> element) and descriptions (provided by <dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs)',
    },
    {
        name: 'String long value with copy',
        content:
            'The HTML <dl> element represents a description list. The element encloses a list of groups of terms (specified using the <dt> element) and descriptions (provided by <dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs)',
        copyText:
            'The HTML <dl> element represents a description list. The element encloses a list of groups of terms (specified using the <dt> element) and descriptions (provided by <dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs)',
    },
    {
        name: 'Number long value',
        // eslint-disable-next-line no-loss-of-precision
        content: 12345678901234567890123456789012345678901234567890123456789012345678901234567890,
    },
    {
        name: 'Node long value',
        content: (
            <span>
                The{' '}
                <strong>
                    HTML <code>&lt;dl&gt;</code>{' '}
                </strong>
                element represents a description list. The element encloses a list of groups of
                terms (specified using the{' '}
                <a
                    href="/en-US/docs/Web/HTML/Element/dt"
                    title="The HTML <dt> element specifies a term in a description or definition list, and as such must be used inside a <dl> element."
                >
                    <code>&lt;dt&gt;</code>
                </a>{' '}
                element) and descriptions (provided by{' '}
                <a
                    href="/en-US/docs/Web/HTML/Element/dd"
                    title="The HTML <dd> element provides the description, definition, or value for the preceding term (<dt>) in a description list (<dl>)."
                >
                    <code>&lt;dd&gt;</code>
                </a>{' '}
                elements). Common uses for this element are to implement a glossary or to display
                metadata (a list of key-value pairs).
            </span>
        ),
    },
    {
        name: 'String long value without whitespace',
        content:
            'https://example.com/long-long/like/beyond/the/farthest/lands/long/path/to/handle?and=some&list=of&query=parameters&that=is&overcomplicated=maybe&with=some&token=inside&not=really&readable=but&sometimes=useful',
    },
    {
        name: 'String long looooooooooooooong looooooooooooooong looooooooooooooong looooooooooooooong value without multiline and with copy icon',
        multilineName: true,
        note: 'This is multiline value',
        content:
            'https://example.com/long-long/like/beyond/the/farthest/lands/long/path/to/handle?and=some&list=of&query=parameters&that=is&overcomplicated=maybe&with=some&token=inside&not=really&readable=but&sometimes=useful',
        copyText:
            'https://example.com/long-long/like/beyond/the/farthest/lands/long/path/to/handle?and=some&list=of&query=parameters&that=is&overcomplicated=maybe&with=some&token=inside&not=really&readable=but&sometimes=useful',
    },
    {
        name: 'String value with tooltip',
        content: 'value',
        note: 'This is simple string value',
    },
    {
        name: 'String value with very very very looooooooooooooong key',
        content: 'value',
    },
    {
        name: 'String value with very very very looooooooooooooong key and tooltip',
        content: 'value',
        note: 'This is simple string value',
    },
    {
        name: 'Avatar with tooltip',
        content: (
            <User
                name="Charles Darwin"
                size="xl"
                description="Adventurer"
                avatar={{text: 'Charles Darwin', theme: 'brand', title: 'Charles Darwin avatar'}}
            />
        ),
        copyText:
            'The HTML <dl> element represents a description list. The element encloses a list of groups of terms (specified using the <dt> element) and descriptions (provided by <dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs)',
        note: 'This is avatar',
    },
    {
        name: 'Label',
        content: <Label>label</Label>,
    },
];

export default {
    title: 'Components/Data Display/DefinitionList',
    component: DefinitionList,
    args: {
        items,
        responsive: false,
    },
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                    {
                        id: 'definition-list', // todo: https://github.com/gravity-ui/components/issues/207
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<DefinitionListProps> = (args) => <DefinitionList {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {contentMaxWidth: 480};

const TemplateResponsive: StoryFn<DefinitionListProps> = (args) => <DefinitionList {...args} />;
export const ResponsiveList = TemplateResponsive.bind({});
ResponsiveList.args = {
    responsive: true,
};

const TemplateVertical: StoryFn<DefinitionListProps> = (args) => {
    return <DefinitionList {...args} />;
};
export const VerticalList = TemplateVertical.bind({});
VerticalList.args = {
    direction: 'vertical',
};
