import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Label} from '../../Label';
import {Link} from '../../Link';
import {User} from '../../User';
import {DefinitionList} from '../DefinitionList';
import type {DefinitionListItemProps} from '../types';

const items: DefinitionListItemProps[] = [
    {
        name: <Link href="https://cloud.yandex.ru/docs">String value</Link>,
        children: 'value',
        note: 'link',
    },
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
        children: 'value',
    },
    {name: 'Number value', children: 2, note: 'This is value'},
    {name: 'Node value', children: <strong>value</strong>},
    {name: 'Empty value'},
    {name: 'String value with copy', children: 'value', copyText: 'value'},
    {name: 'Number value with copy', children: 2, copyText: 'two'},
    {name: 'Node value with copy', children: <strong>value</strong>, copyText: 'value'},
    {name: 'Empty value with copy', copyText: 'nothing to copy'},
    {name: 'String value with custom title', children: 'value'},
    {name: 'Number value with custom title', children: 2},
    {
        name: 'Node value with custom title',
        children: <strong>value</strong>,
    },
    {name: 'Empty value with custom title'},
    {
        name: 'String long value',
        children:
            'The HTML <dl> element represents a description list. The element encloses a list of groups of terms (specified using the <dt> element) and descriptions (provided by <dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs)',
    },
    {
        name: 'String long value with copy',
        children:
            'The HTML <dl> element represents a description list. The element encloses a list of groups of terms (specified using the <dt> element) and descriptions (provided by <dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs)',
        copyText:
            'The HTML <dl> element represents a description list. The element encloses a list of groups of terms (specified using the <dt> element) and descriptions (provided by <dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs)',
    },
    {
        name: 'Number long value',
        // eslint-disable-next-line no-loss-of-precision
        children: 12345678901234567890123456789012345678901234567890123456789012345678901234567890,
    },
    {
        name: 'Node long value',
        children: (
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
        children:
            'https://example.com/long-long/like/beyond/the/farthest/lands/long/path/to/handle?and=some&list=of&query=parameters&that=is&overcomplicated=maybe&with=some&token=inside&not=really&readable=but&sometimes=useful',
    },
    {
        name: 'String long looooooooooooooong looooooooooooooong looooooooooooooong looooooooooooooong value without multiline and with copy icon',
        note: 'This is multiline value',
        children:
            'https://example.com/long-long/like/beyond/the/farthest/lands/long/path/to/handle?and=some&list=of&query=parameters&that=is&overcomplicated=maybe&with=some&token=inside&not=really&readable=but&sometimes=useful',
        copyText:
            'https://example.com/long-long/like/beyond/the/farthest/lands/long/path/to/handle?and=some&list=of&query=parameters&that=is&overcomplicated=maybe&with=some&token=inside&not=really&readable=but&sometimes=useful',
    },
    {
        name: 'String value with tooltip',
        children: 'value',
        note: 'This is simple string value',
    },
    {
        name: 'String value with very very very looooooooooooooong key',
        children: 'value',
    },
    {
        name: 'String value with very very very looooooooooooooong key and tooltip',
        children: 'value',
        note: 'This is simple string value',
    },
    {
        name: 'Avatar with tooltip',
        children: (
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
        children: <Label>label</Label>,
        qa: 'label',
    },
];
const definitionListItems = items.map(({children, ...rest}, index) => (
    <DefinitionList.Item key={index} {...rest}>
        {children}
    </DefinitionList.Item>
));

export default {
    title: 'Components/Data Display/DefinitionList',
    component: DefinitionList,
    args: {
        responsive: false,
        children: definitionListItems,
    },
    parameters: {
        a11y: {
            context: '#storybook-root',
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

type Story = StoryObj<typeof DefinitionList>;

export const Default: Story = {args: {contentMaxWidth: 480}};

export const ResponsiveList: Story = {args: {responsive: true}};

export const VerticalList: Story = {args: {direction: 'vertical'}};
