import figma from '@figma/code-connect';
import {ChevronRight} from '@gravity-ui/icons';

import {BreadcrumbsItem} from 'src/components/Breadcrumbs/BreadcrumbsItem';

import {Breadcrumbs} from '../components/Breadcrumbs/Breadcrumbs';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=83220%3A846232';

figma.connect(Breadcrumbs, figmaUrl, {
    props: {
        children: figma.children('↳ Page*'),
        separator: figma.enum('Separator', {
            Slash: 'slash',
            Hyphen: 'hyphen',
            Shevron: <ChevronRight />,
        }),
    },
    example: (props) => (
        <Breadcrumbs separator={props.separator}>
            <BreadcrumbsItem>Page</BreadcrumbsItem>
            {props.children}
        </Breadcrumbs>
    ),
});
