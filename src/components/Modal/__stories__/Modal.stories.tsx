import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {Button} from '../../Button';
import {Loader} from '../../Loader';
import {Popup} from '../../Popup';
import {Toaster, ToasterComponent, ToasterProvider, useToaster} from '../../Toaster';
import {Flex} from '../../layout';
import {Modal} from '../Modal';
import type {ModalProps} from '../Modal';

export default {
    title: 'Components/Overlays/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
} as Meta;

const toaster = new Toaster();

export const Default: StoryFn<ModalProps> = (props) => {
    const [openSmall, setOpenSmall] = React.useState(false);
    const [openLarge, setOpenLarge] = React.useState(false);
    const [openWithToast, setOpenWithToast] = React.useState(false);
    const [openWithPopup, setOpenWithPopup] = React.useState(false);
    const [openWithModal, setOpenWithModal] = React.useState(false);
    const [openWithDynamicContent, setOpenWithDynamicContent] = React.useState(false);

    const [textLines] = React.useState(() =>
        Array.from({length: 50}, () => faker.lorem.sentences()),
    );

    return (
        <Flex gap={5} direction="column" wrap>
            <Modal {...props} open={openSmall} onOpenChange={setOpenSmall}>
                <div style={{padding: 10}}>Modal content</div>
            </Modal>
            <Modal {...props} open={openLarge} onOpenChange={setOpenLarge}>
                {textLines.map((text, index) => (
                    <div key={index} style={{padding: 10}}>
                        {text}
                    </div>
                ))}
            </Modal>
            <ToasterProvider toaster={toaster}>
                <ModalWithToast {...props} open={openWithToast} onOpenChange={setOpenWithToast} />
                <ToasterComponent />
            </ToasterProvider>
            <ModalWithPopup {...props} open={openWithPopup} onOpenChange={setOpenWithPopup} />
            <ModalWithModal {...props} open={openWithModal} onOpenChange={setOpenWithModal} />
            <ModalWithDynamicContent
                {...props}
                open={openWithDynamicContent}
                onOpenChange={setOpenWithDynamicContent}
            />

            <Button onClick={() => setOpenSmall(true)}>Show small modal</Button>
            <Button onClick={() => setOpenLarge(true)}>Show large modal</Button>
            <Button onClick={() => setOpenWithToast(true)}>Show modal with toast</Button>
            <Button onClick={() => setOpenWithPopup(true)}>Show modal with popup</Button>
            <Button onClick={() => setOpenWithModal(true)}>Show modal with modal</Button>
            <Button onClick={() => setOpenWithDynamicContent(true)}>
                Show modal with dynamic content
            </Button>
        </Flex>
    );
};

function ModalWithToast(props: ModalProps) {
    const toaster = useToaster();

    return (
        <Modal {...props}>
            <div style={{padding: 100}}>
                <Button
                    onClick={() => {
                        toaster.add({
                            name: `modal-toast-${Date.now()}`,
                            theme: 'normal',
                            title: faker.lorem.words(3),
                            content: faker.lorem.sentences(2),
                        });
                    }}
                >
                    Create toast
                </Button>
            </div>
        </Modal>
    );
}

function ModalWithPopup(props: ModalProps) {
    const [popupOpen, setPopupOpen] = React.useState(false);
    const [popupAnchor, setPopupAnchor] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        if (!props.open) {
            setPopupOpen(false);
        }
    }, [props.open]);

    return (
        <Modal {...props}>
            <div style={{padding: 100}}>
                <Button ref={setPopupAnchor} onClick={() => setPopupOpen((prevOpen) => !prevOpen)}>
                    Open popup
                </Button>
                <Popup
                    open={popupOpen}
                    onOpenChange={setPopupOpen}
                    placement="top"
                    anchorElement={popupAnchor}
                >
                    <div style={{padding: 10}}>Popup content</div>
                </Popup>
            </div>
        </Modal>
    );
}

function ModalWithModal(props: ModalProps) {
    const [innerModalOpen, setInnerModalOpen] = React.useState(false);

    return (
        <Modal {...props}>
            <div style={{padding: 100}}>
                <Button onClick={() => setInnerModalOpen(true)}>Open modal</Button>
                <Modal open={innerModalOpen} onOpenChange={setInnerModalOpen}>
                    <div style={{padding: 10}}>Modal content</div>
                </Modal>
            </div>
        </Modal>
    );
}

function ModalWithDynamicContent(props: ModalProps) {
    const [isFirstDynamicPartOpen, setIsFirstDynamicPartOpen] = React.useState(false);
    const [isSecondDynamicPartOpen, setIsSecondDynamicPartOpen] = React.useState(false);

    React.useEffect(() => {
        const timers: number[] = [];
        if (props.open) {
            timers[0] = window.setTimeout(() => {
                setIsFirstDynamicPartOpen(true);
            }, 2000);
            timers[1] = window.setTimeout(() => {
                setIsSecondDynamicPartOpen(true);
            }, 4000);
        }
        return () => {
            timers.forEach((t) => {
                window.clearTimeout(t);
            });
        };
    }, [props.open]);

    return (
        <Modal
            {...props}
            onTransitionOutComplete={() => {
                setIsFirstDynamicPartOpen(false);
                setIsSecondDynamicPartOpen(false);
            }}
        >
            <div style={{padding: 40, width: '200px'}}>
                <div style={{marginBottom: '24px'}}>This is a dynamic modal content</div>
                {isFirstDynamicPartOpen && (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                        <div>Content loaded</div>
                        <div>This is the description</div>
                        <div>More content to come</div>
                    </div>
                )}
                {(!isFirstDynamicPartOpen || !isSecondDynamicPartOpen) && (
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '24px'}}>
                        <Loader />
                    </div>
                )}
                {isSecondDynamicPartOpen && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            marginTop: '24px',
                        }}
                    >
                        <div>Second part loaded</div>
                        <div>This is the description part 1</div>
                        <div>This is the description part 2</div>
                        <div>This is the description part 3</div>
                        <div>No more content to load</div>
                    </div>
                )}
            </div>
        </Modal>
    );
}
