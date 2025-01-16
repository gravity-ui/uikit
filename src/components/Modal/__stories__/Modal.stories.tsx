import * as React from 'react';

import {faker} from '@faker-js/faker/locale/en';
import type {Meta, StoryFn} from '@storybook/react';
import range from 'lodash/range';

import {Button} from '../../Button';
import {Popup} from '../../Popup';
import {Modal} from '../Modal';
import type {ModalProps} from '../Modal';

export default {
    title: 'Components/Overlays/Modal',
    component: Modal,
} as Meta;

export const Default: StoryFn<ModalProps> = (props) => {
    const [openSmall, setOpenSmall] = React.useState(false);
    const [openLarge, setOpenLarge] = React.useState(false);
    const [openWithPopups, setOpenWithPopups] = React.useState(false);
    const [openWithModal, setOpenWithModal] = React.useState(false);

    const [textLines] = React.useState(() => range(50).map(() => faker.lorem.sentences()));

    return (
        <React.Fragment>
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
            <ModalWithPopups {...props} open={openWithPopups} onOpenChange={setOpenWithPopups} />
            <ModalWithModal {...props} open={openWithModal} onOpenChange={setOpenWithModal} />
            <div
                style={{
                    width: '100%',
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button onClick={() => setOpenSmall(true)}>Show small modal</Button>
            </div>
            <div
                style={{
                    width: '100%',
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button onClick={() => setOpenLarge(true)}>Show large modal</Button>
            </div>
            <div
                style={{
                    width: '100%',
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button onClick={() => setOpenWithPopups(true)}>Show modal with popups</Button>
            </div>
            <div
                style={{
                    width: '100%',
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button onClick={() => setOpenWithModal(true)}>Show modal with modal</Button>
            </div>
        </React.Fragment>
    );
};

function ModalWithPopups(props: ModalProps) {
    const [topPopupOpen, setTopPopupOpen] = React.useState(false);
    const [bottomPopupOpen, setBottomPopupOpen] = React.useState(false);

    const handleTogglePopups = React.useCallback(() => {
        setTopPopupOpen(!topPopupOpen);
        setBottomPopupOpen(!bottomPopupOpen);
    }, [topPopupOpen, bottomPopupOpen]);

    const [popupAnchor, setPopupAnchor] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        if (!props.open) {
            setTopPopupOpen(false);
            setBottomPopupOpen(false);
        }
    }, [props.open]);

    return (
        <Modal {...props}>
            <div style={{padding: 100}}>
                <Button ref={setPopupAnchor} onClick={handleTogglePopups}>
                    Toggle popups
                </Button>
                <Popup
                    open={topPopupOpen}
                    onOpenChange={setTopPopupOpen}
                    placement="top"
                    anchorElement={popupAnchor}
                >
                    <div style={{padding: 10}}>Top popup</div>
                </Popup>
                <Popup
                    open={bottomPopupOpen}
                    onOpenChange={setBottomPopupOpen}
                    placement="bottom"
                    anchorElement={popupAnchor}
                >
                    <div style={{padding: 10}}>Bottom popup</div>
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
