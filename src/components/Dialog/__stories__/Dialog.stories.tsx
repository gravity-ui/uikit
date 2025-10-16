import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {useUniqId} from '../../../hooks';
import {Button} from '../../Button';
import {Flex} from '../../layout';
import {Dialog} from '../Dialog';
import type {DialogProps} from '../Dialog';

import {DialogShowcase} from './DialogShowcase';

export default {
    title: 'Components/Overlays/Dialog',
    component: Dialog,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        showError: {
            type: 'boolean',
        },
    },
} as Meta<DialogProps>;

const largeTextLines = Array.from({length: 30}, () => faker.lorem.sentences());

function DialogComponent({
    buttonText,
    content,
    showError,
    ...args
}: DialogProps & {buttonText: string; content: React.ReactNode; showError: boolean}) {
    const titleId = useUniqId();
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <Button onClick={() => setOpen(true)}>{buttonText}</Button>

            <Dialog
                {...args}
                open={open}
                onClose={() => setOpen(false)}
                onEnterKeyDown={() => {
                    alert('onEnterKeyDown');
                }}
                aria-labelledby={titleId}
            >
                <Dialog.Header caption="Header" id={titleId} />
                <Dialog.Body>
                    <div
                        style={{
                            background: 'var(--g-color-base-generic)',
                            border: '1px var(--g-color-line-generic) dashed',
                            borderRadius: 5,
                            padding: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 60,
                        }}
                    >
                        {content}
                    </div>
                </Dialog.Body>
                <Dialog.Footer
                    onClickButtonCancel={() => setOpen(false)}
                    onClickButtonApply={() => alert('onApply')}
                    textButtonApply="Apply"
                    textButtonCancel="Cancel"
                    showError={showError}
                    errorText="Error text"
                />
            </Dialog>
        </React.Fragment>
    );
}

export const Default: StoryFn<DialogProps & {showError: boolean}> = (args) => {
    return (
        <Flex gap={5} direction="column" wrap>
            <DialogComponent buttonText="Show small dialog" content="Content" {...args} />
            <DialogComponent
                buttonText="Show large dialog"
                content={largeTextLines.map((text, index) => (
                    <div key={index} style={{padding: 10}}>
                        {text}
                    </div>
                ))}
                {...args}
            />
        </Flex>
    );
};

const ShowcaseTemplate: StoryFn = () => <DialogShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
