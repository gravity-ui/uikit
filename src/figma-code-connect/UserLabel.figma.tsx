import figma from '@figma/code-connect';

import {UserLabel} from '../components/UserLabel/UserLabel';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=75542%3A710';

figma.connect(UserLabel, figmaUrl, {
    props: {
        type: figma.enum('Type', {
            Person: 'person',
            Email: 'email',
            Empty: 'empty',
        }),
        size: figma.enum('Size', {
            '3XS': '3xs',
            '2XS': '2xs',
            XS: 'xs',
            S: 's',
            M: 'm',
            L: 'l',
            XL: 'xl',
        }),
        text: figma.string('↳ Content text'),
        description: figma.boolean('Secondary content', {
            true: figma.string('↳ Secondarty content text'),
            false: undefined,
        }),
        view: figma.enum('Theme', {
            Clear: 'clear',
            Outlined: 'outlined',
        }),
        avatar: figma.children('Avatar'),
    },
    example: (props) => (
        <UserLabel
            type={props.type}
            size={props.size}
            text={props.text}
            view={props.view}
            avatar={props.avatar}
            description={props.description}
        />
    ),
});
