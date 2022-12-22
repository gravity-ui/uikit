import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Text, TextProps, text, colorText} from '../.';

export default {
    title: 'Components/Text',
    component: Text,
} as Meta;

const DefaultText: Story<TextProps> = (args) => <Text {...args} />;

export const Default = DefaultText.bind({});

Default.args = {
    variant: 'display-1',
    children: 'display-1 text',
};

export const UsingTextUtilities = () => (
    <div className={text({variant: 'body-2'}, colorText({color: 'secondary'}))}>
        some custom or existing element with text utilities
    </div>
);

const EllipsisDefault: Story<TextProps> = (args) => <Text {...args} />;

export const Ellipsis = EllipsisDefault.bind({});

Ellipsis.args = {
    as: 'div',
    ellipsis: true,
    style: {
        width: 200,
    },
    children:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam! Debitis eos unde, blanditiis ipsam adipisci, soluta incidunt architecto quidem, repellat commodi tempore! Enim assumenda nam esse laudantium sequi quaerat maiores, voluptatum quibusdam temporibus nulla perspiciatis! Corrupti error aliquid iure asperiores voluptate. Nisi temporibus nesciunt quasi animi, accusamus officia debitis voluptatum ratione ullam delectus, adipisci, repellendus vitae in amet sit magni iste impedit? Exercitationem rerum impedit sed earum iusto modi et officia aspernatur quibusdam? Fugit.',
};

const WordBreakDefault: Story<TextProps> = (args) => (
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
