import figma from '@figma/code-connect';

import {ActionsPanel} from '../components/ActionsPanel/ActionsPanel';

const figmaUrl =
    'https://www.figma.com/design/LwOcKoxx9fpdYlUjqQhzzBb4/YC-Gravity-UI?node-id=58416%3A833';

figma.connect(ActionsPanel, figmaUrl, {
    props: {
        titleText: figma.string('Title text'),
    },
    example: (props: any) => (
        <ActionsPanel
            renderNote={() => props.titleText}
            actions={[
                {
                    id: 'action',
                    dropdown: {
                        item: {text: 'Action', action: () => {}},
                    },
                    button: {
                        props: {children: 'Action'},
                    },
                },
            ]}
        />
    ),
});
