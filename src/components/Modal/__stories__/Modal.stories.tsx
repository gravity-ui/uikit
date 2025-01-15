import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn} from '@storybook/react';
import range from 'lodash/range';

import {Button} from '../../Button';
import {Popup} from '../../Popup';
import {ToasterComponent, ToasterProvider, useToaster} from '../../Toaster';
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

export const Default: StoryFn<ModalProps> = (props) => {
    const [openSmall, setOpenSmall] = React.useState(false);
    const [openLarge, setOpenLarge] = React.useState(false);
    const [openWithToast, setOpenWithToast] = React.useState(false);
    const [openWithPopup, setOpenWithPopup] = React.useState(false);
    const [openWithModal, setOpenWithModal] = React.useState(false);

    const [textLines] = React.useState(() => range(50).map(() => faker.lorem.sentences()));

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
            <ToasterProvider>
                <ModalWithToast {...props} open={openWithToast} onOpenChange={setOpenWithToast} />
                <ToasterComponent />
            </ToasterProvider>
            <ModalWithPopup {...props} open={openWithPopup} onOpenChange={setOpenWithPopup} />
            <ModalWithModal {...props} open={openWithModal} onOpenChange={setOpenWithModal} />

            <Button onClick={() => setOpenSmall(true)}>Show small modal</Button>
            <Button onClick={() => setOpenLarge(true)}>Show large modal</Button>
            <Button onClick={() => setOpenWithToast(true)}>Show modal with toast</Button>
            <Button onClick={() => setOpenWithPopup(true)}>Show modal with popup</Button>
            <Button onClick={() => setOpenWithModal(true)}>Show modal with modal</Button>
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
