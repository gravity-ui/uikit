import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Flex} from '../../layout';
import type {TextProps} from '../index';
import {Text, colorText, text} from '../index';

export default {
    title: 'Components/Data Display/Text',
    component: Text,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                ],
            },
        },
    },
} as Meta;

const DefaultText: StoryFn<TextProps> = (args) => <Text {...args} />;

export const Default = DefaultText.bind({});

Default.args = {
    variant: 'display-1',
    children: 'display-1 text',
    title: 'Lorem ipsum',
};

export const UsingTextUtilities = () => (
    <div className={text({variant: 'body-2'}, colorText({color: 'secondary'}))}>
        some custom or existing element with text utilities
    </div>
);

const EllipsisDefault: StoryFn<TextProps> = (args) => (
    <Flex gap={5} direction="column">
        <Flex gap={5} width={200} direction="column">
            <Text variant="header-1">With fixed container size (ellipsis=true)</Text>
            <Text {...args} ellipsis />
        </Flex>
        <Flex gap={5} width={200} direction="column">
            <Text variant="header-1">
                With text utility and fixed container size (ellipsis=true)
            </Text>
            <span className={text({ellipsis: true})}>{args.children}</span>
        </Flex>
        <Flex gap={5} direction="column">
            <Text variant="header-1">
                With text utility (ellipsisLines=true, style: WebkitLineClamp: 3)
            </Text>
            <span style={{WebkitLineClamp: 3}} className={text({ellipsisLines: true})}>
                {args.children}
            </span>
        </Flex>
        <Flex gap={5} direction="column">
            <Text variant="header-1">With line clamp property (ellipsisLines={3})</Text>
            <Text {...args} ellipsisLines={3} />
        </Flex>
    </Flex>
);

export const Ellipsis = EllipsisDefault.bind({});

Ellipsis.args = {
    children:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam! Debitis eos unde, blanditiis ipsam adipisci, soluta incidunt architecto quidem, repellat commodi tempore! Enim assumenda nam esse laudantium sequi quaerat maiores, voluptatum quibusdam temporibus nulla perspiciatis! Corrupti error aliquid iure asperiores voluptate. Nisi temporibus nesciunt quasi animi, accusamus officia debitis voluptatum ratione ullam delectus, adipisci, repellendus vitae in amet sit magni iste impedit? Exercitationem rerum impedit sed earum iusto modi et officia aspernatur quibusdam? Fugit.',
};

const WordBreakDefault: StoryFn<TextProps> = (args) => (
    <div
        style={{
            width: 200,
            height: 200,
            border: '2px solid black',
        }}
    >
        <Text {...args} />
    </div>
);

export const WordBreak = WordBreakDefault.bind({});

WordBreak.args = {
    as: 'div',
    children:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam! Debitis eos unde, blanditiis ipsam adipisci, soluta incidunt architecto quidem, repellat commodi tempore! Enim assumenda nam esse laudantium sequi quaerat maiores, voluptatum quibusdam temporibus nulla perspiciatis! Corrupti error aliquid iure asperiores voluptate. Nisi temporibus nesciunt quasi animi, accusamus officia debitis voluptatum ratione ullam delectus, adipisci, repellendus vitae in amet sit magni iste impedit? Exercitationem rerum impedit sed earum iusto modi et officia aspernatur quibusdam? Fugit.',
    wordBreak: 'break-all',
};
