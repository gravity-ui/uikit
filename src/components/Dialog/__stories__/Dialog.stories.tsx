import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {useUniqId} from '../../../hooks';
import {Button} from '../../Button';
import {Flex} from '../../layout';
import {Dialog} from '../Dialog';
import type {DialogProps} from '../Dialog';

import {DialogShowcase} from './DialogShowcase';
import {DynamicHeightStory} from './DynamicHeightStory';

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
} as Meta;

type Story = StoryObj<typeof Dialog>;

const largeTextLines = Array.from({length: 30}, () => faker.lorem.sentences());

interface DialogComponentProps {
    buttonText: string;
    content: React.ReactNode;
    showError?: boolean;
    withHeader?: boolean;
    withFooter?: boolean;
    withEmptyBody?: boolean;
}

function DialogComponent({
    buttonText,
    content,
    showError = false,
    withHeader = true,
    withFooter = true,
    withEmptyBody = false,
    ...args
}: DialogProps & DialogComponentProps) {
    const headerId = useUniqId();
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
                aria-labelledby={withHeader ? headerId : undefined}
            >
                {withHeader && <Dialog.Header caption="Header" id={headerId} />}
                <Dialog.Body>
                    {withEmptyBody ? null : (
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
                                minWidth: 280,
                                minHeight: 60,
                            }}
                        >
                            {content}
                        </div>
                    )}
                </Dialog.Body>
                {withFooter && (
                    <Dialog.Footer
                        onClickButtonCancel={() => setOpen(false)}
                        onClickButtonApply={() => alert('onApply')}
                        textButtonApply="Apply"
                        textButtonCancel="Cancel"
                        showError={showError}
                        errorText="Error text"
                    />
                )}
            </Dialog>
        </React.Fragment>
    );
}

export const Default: Story = {
    render: (args) => {
        return (
            <Flex gap={5} direction="column" wrap>
                <DialogComponent buttonText="Normal" content="Content" {...args} />
                <DialogComponent
                    buttonText="Large content"
                    content={largeTextLines.map((text, index) => (
                        <div key={index} style={{padding: 10}}>
                            {text}
                        </div>
                    ))}
                    {...args}
                />
                <DialogComponent
                    buttonText="Without Header"
                    withHeader={false}
                    content="Content"
                    hasCloseButton={false}
                    {...args}
                />
                <DialogComponent
                    buttonText="Without Footer"
                    withFooter={false}
                    content="Content"
                    {...args}
                />
                <DialogComponent
                    buttonText="With Empty Body"
                    withEmptyBody={true}
                    content="Content"
                    {...args}
                />
            </Flex>
        );
    },
};

export const DynamicHeight: Story = {
    render: (args) => <DynamicHeightStory {...args} />,
};

export const Showcase: Story = {
    render: () => <DialogShowcase />,
};
