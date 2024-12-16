import React from 'react';

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

    const btnRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        if (!props.open) {
            setTopPopupOpen(false);
            setBottomPopupOpen(false);
        }
    }, [props.open]);

    return (
        <Modal {...props}>
            <div style={{padding: 100}}>
                <Button ref={btnRef} onClick={handleTogglePopups}>
                    Toggle popups
                </Button>
                <Popup
                    open={topPopupOpen}
                    onOpenChange={setTopPopupOpen}
                    placement="top"
                    anchorElement={btnRef.current}
                >
                    <div style={{padding: 10}}>Top popup</div>
                </Popup>
                <Popup
                    open={bottomPopupOpen}
                    onOpenChange={setBottomPopupOpen}
                    placement="bottom"
                    anchorElement={btnRef.current}
                >
                    <div style={{padding: 10}}>Bottom popup</div>
                </Popup>
            </div>
        </Modal>
    );
}
