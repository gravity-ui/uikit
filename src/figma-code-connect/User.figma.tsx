import figma from '@figma/code-connect';

import {User} from '../components/User/User';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=51015%3A45880';

figma.connect(User, figmaUrl, {
    props: {
        size: figma.enum('Size', {
            '3XS': '3xs',
            '2XS': '2xs',
            XS: 'xs',
            S: 's',
            M: 'm',
            L: 'l',
            XL: 'xl',
        }),
        name: figma.string('↳ Content text'),
        description: figma.boolean('Secondary content', {
            true: figma.string('↳ Secondary content text'),
            false: undefined,
        }),
        avatar: figma.children('Avatar'),
    },
    example: (props) => (
        <User
            size={props.size}
            name={props.name}
            description={props.description}
            avatar={props.avatar}
        />
    ),
});
