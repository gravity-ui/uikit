import React from 'react';
import {Dialog} from '../../../components/Dialog/Dialog';
import {Button} from '../../../components/Button';

/* eslint-disable no-useless-escape */
const darthVader = `
                       .-.
                      |_:_|
                     /(_Y_)\\
.                   ( \\/M\\/ )
 '.               _.'-/'-'\\-'._
   ':           _/.--'[[[[]'--.\\_
     ':        /_'  : |::"| :  '.\\
       ':     //   ./ |oUU| \\.'  :\\
         ':  _:'..' \\_|___|_/ :   :|
           ':.  .'  |_[___]_|  :.':\\
            [::\\ |  :  | |  :   ; : \\
             '-'   \\/'.| |.' \\  .;.' |
             |\\_    \\  '-'   :       |
             |  \\    \\ .:    :   |   |
             |   \\    | '.   :    \\  |
             /       \\   :. .;       |
            /     |   |  :__/     :  \\\\
           |  |   |    \\:   | \\   |   ||
          /    \\  : :  |:   /  |__|   /|
          |     : : :_/_|  /'._\\  '--|_\\
          /___.-/_|-'   \\  \\
                         '-'
`;
/* eslint-enable no-useless-escape */

const OtherDialog = () => {
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
        <div>
            <Button view="outlined" size="l" onClick={switchVisibility}>
                dialog with custom buttons renderer
            </Button>
            <Dialog
                open={open}
                onClose={switchVisibility}
                className="my-custom-class-for-dialog"
                hasCloseButton
            >
                <Dialog.Body>
                    <pre>{darthVader}</pre>
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
                    listenKeyEnter
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
};

export class DialogShowcase extends React.Component {
    state = {
        open: false,
        showError: false,
        progress: false,
    };

    timeout: NodeJS.Timeout | undefined;

    onClose = () => this.setState({open: false, showError: false});

    onClickButtonApply = () => {
        if (this.timeout) {
            clearInterval(this.timeout);
        }
        this.setState({progress: true, showError: false});
        this.timeout = setTimeout(() => {
            this.setState({progress: false, showError: true});
        }, 2000);
    };

    render() {
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
                    <Button view="outlined" size="l" onClick={() => this.setState({open: true})}>
                        show Dialog
                    </Button>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.onClose}
                    className="my-custom-class-for-dialog"
                    hasCloseButton
                >
                    <Dialog.Header
                        caption="Episode VII THE FORCE AWAKENS"
                        insertBefore={<span>🔥</span>}
                        insertAfter={<span>🔥</span>}
                    />
                    <Dialog.Body>
                        <React.Fragment>
                            <p>
                                Luke Skywalker has vanished. In his absence, the sinister FIRST
                                ORDER has risen from the ashes of the Empire and will not rest until
                                Skywalker, the last Jedi, has been destroyed.
                            </p>
                            <p>
                                With the support of the REPUBLIC, General Leia Organa leads a brave
                                RESISTANCE. She is desperate to find her brother Luke and gain his
                                help in restoring peace and justice to the galaxy.
                            </p>
                            <p>
                                Leia has sent her most daring pilot on a secret mission to Jakku,
                                where an old ally has discovered a clue to Luke’s whereabouts….
                            </p>
                            <pre>{darthVader}</pre>
                        </React.Fragment>
                    </Dialog.Body>
                    <Dialog.Footer
                        preset="default"
                        onClickButtonCancel={this.onClose}
                        onClickButtonApply={this.onClickButtonApply}
                        textButtonApply="attack"
                        propsButtonApply={{className: 'my-custom-apply-btn-class'}}
                        textButtonCancel="fend off attack"
                        propsButtonCancel={{className: 'my-custom-cancel-btn-class'}}
                        loading={this.state.progress}
                        errorText="Ooops! You lose..."
                        showError={this.state.showError}
                        listenKeyEnter
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
}
