import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Text, TextProps} from '../Text';

export default {
    title: 'Components/Text',
    component: Text,
} as Meta;

const DefaultText: Story<TextProps> = (args) => <Text {...args} />;

export const Default = DefaultText.bind({});

const EllipsisDefault = DefaultText.bind({});

export const Ellipsis = EllipsisDefault.bind({});

Ellipsis.args = {
    as: 'div',
    ellipsis: true,
    style: {
        width: 200,
    },
    content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates asperiores accusamus est, ab rerum harum hic delectus fuga veniam! Hic, atque, quia sunt consectetur eius corrupti, expedita sapiente exercitationem aperiam quibusdam libero ipsa veritatis quisquam! Debitis eos unde, blanditiis ipsam adipisci, soluta incidunt architecto quidem, repellat commodi tempore! Enim assumenda nam esse laudantium sequi quaerat maiores, voluptatum quibusdam temporibus nulla perspiciatis! Corrupti error aliquid iure asperiores voluptate. Nisi temporibus nesciunt quasi animi, accusamus officia debitis voluptatum ratione ullam delectus, adipisci, repellendus vitae in amet sit magni iste impedit? Exercitationem rerum impedit sed earum iusto modi et officia aspernatur quibusdam? Fugit.',
};
