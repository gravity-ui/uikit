import React from 'react';
import {Dialog} from '../../../components/Dialog/Dialog';
import {Button} from '../../../components/Button';
import {Select} from '../../../components/Select';
import {TextInput} from '../../TextInput';

const darthVader = String.raw`
                       .-.
                      |_:_|
                     /(_Y_)\
.                   ( \/M\/ )
 '.               _.'-/'-'\-'._
   ':           _/.--'[[[[]'--.\_
     ':        /_'  : |::"| :  '.\
       ':     //   ./ |oUU| \.'  :\
         ':  _:'..' \_|___|_/ :   :|
           ':.  .'  |_[___]_|  :.':\
            [::\ |  :  | |  :   ; : \
             '-'   \/'.| |.' \  .;.' |
             |\_    \  '-'   :       |
             |  \    \ .:    :   |   |
             |   \    | '.   :    \  |
             /       \   :. .;       |
            /     |   |  :__/     :  \\
           |  |   |    \:   | \   |   ||
          /    \  : :  |:   /  |__|   /|
          |     : : :_/_|  /'._\  '--|_\
          /___.-/_|-'   \  \
                         '-'
`;

function OtherDialog() {
    const [open, setOpen] = React.useState(false);
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const switchVisibility = () => {
        setOpen((prevOpen) => !prevOpen);
        if (open) {
            setErrorVisible(false);
        }
    };

    const handleApply = () => {
        setLoading(true);
        setTimeout(() => {
            setErrorVisible(true);
            setLoading(false);
        }, 1000);
    };

    const selectRef = React.useRef<HTMLButtonElement>(null);

    return (
        <div>
            <Button view="outlined" size="l" onClick={switchVisibility}>
                dialog with custom buttons renderer
            </Button>
            <Dialog
                open={open}
                onClose={switchVisibility}
                className="my-custom-class-for-dialog"
                hasCloseButton
                keepMounted
                onEnterKeyDown={handleApply}
                onOpenEnd={() => {
                    selectRef?.current?.focus();
                }}
            >
                <Dialog.Body>
                    <pre>{darthVader}</pre>
                    <TextInput />
                    <Select filterable ref={selectRef}>
                        <Select.Option value="dark">Dark side</Select.Option>
                        <Select.Option value="some">Something in the middle</Select.Option>
                        <Select.Option value="light">Light side</Select.Option>
                    </Select>
                </Dialog.Body>
                <Dialog.Footer
                    preset="default"
                    onClickButtonCancel={switchVisibility}
                    onClickButtonApply={handleApply}
                    textButtonApply="attack"
                    propsButtonApply={{className: 'my-custom-apply-btn-class'}}
                    textButtonCancel="fend off attack"
                    propsButtonCancel={{className: 'my-custom-cancel-btn-class'}}
                    loading={loading}
                    errorText="Ooops! You lose..."
                    showError={errorVisible}
                    renderButtons={(buttonApply, buttonCancel) => (
                        <>
                            {buttonCancel}
                            <div style={{marginLeft: 10}}>
                                <Button view="flat" size="l" width="max" onClick={switchVisibility}>
                                    use the force
                                </Button>
                            </div>
                            {buttonApply}
                        </>
                    )}
                />
            </Dialog>
        </div>
    );
}

export function DialogShowcase() {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const switchVisibility = () => {
        setOpen((prevOpen) => !prevOpen);
        if (open) {
            setErrorVisible(false);
        }
    };

    const handleApply = () => {
        setLoading(true);
        setTimeout(() => {
            setErrorVisible(true);
            setLoading(false);
        }, 1000);
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                flexDirection: 'column',
            }}
        >
            <div style={{marginBottom: 10}}>
                <Button ref={buttonRef} view="outlined" size="l" onClick={switchVisibility}>
                    show Dialog
                </Button>
            </div>
            <Dialog
                open={open}
                onClose={switchVisibility}
                className="my-custom-class-for-dialog"
                hasCloseButton
                onEnterKeyDown={handleApply}
            >
                <Dialog.Header
                    caption="Episode VII THE FORCE AWAKENS"
                    insertBefore={<span>🔥</span>}
                    insertAfter={<span>🔥</span>}
                />
                <Dialog.Body>
                    <React.Fragment>
                        <p>
                            Luke Skywalker has vanished. In his absence, the sinister FIRST ORDER
                            has risen from the ashes of the Empire and will not rest until
                            Skywalker, the last Jedi, has been destroyed.
                        </p>
                        <p>
                            With the support of the REPUBLIC, General Leia Organa leads a brave
                            RESISTANCE. She is desperate to find her brother Luke and gain his help
                            in restoring peace and justice to the galaxy.
                        </p>
                        <p>
                            Leia has sent her most daring pilot on a secret mission to Jakku, where
                            an old ally has discovered a clue to Luke’s whereabouts….
                        </p>
                        <pre>{darthVader}</pre>
                    </React.Fragment>
                </Dialog.Body>
                <Dialog.Footer
                    preset="default"
                    onClickButtonCancel={switchVisibility}
                    onClickButtonApply={handleApply}
                    textButtonApply="attack"
                    propsButtonApply={{
                        className: 'my-custom-apply-btn-class',
                        extraProps: {autoFocus: true},
                    }}
                    textButtonCancel="fend off attack"
                    propsButtonCancel={{className: 'my-custom-cancel-btn-class'}}
                    loading={loading}
                    errorText="Ooops! You lose..."
                    showError={errorVisible}
                >
                    <b>StarWars</b>
                </Dialog.Footer>
            </Dialog>
            <div>
                <OtherDialog />
            </div>
        </div>
    );
}
