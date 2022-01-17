import React from 'react';
import {block} from '../../utils/cn';
import {Icon} from '../../Icon';
import {Toaster} from '..';
import {Button} from '../../Button';
import {Checkbox} from '../../Checkbox';
import {SuccessToast} from '../../icons/SuccessToast';

import './ToasterShowcase.scss';

const b = block('toaster-story');

const CONTENT = <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, atque!</p>;

const ACTIONS = [
    {
        label: 'Action 1',
        onClick: () => console.log('from actions 1'),
    },
    {
        label: 'Action 2',
        onClick: () => console.log('from actions 2'),
    },
];

interface ToasterDemoState {
    createSameName: boolean;
    showCloseIcon: boolean;
    setTimeout: boolean;
    timeout: number;
    allowAutoHiding: boolean;
    setContent: boolean;
    setActions: boolean;
    lastToastName: string;
}
interface ToasterDemoProps {}

export class ToasterDemo extends React.PureComponent<ToasterDemoProps, ToasterDemoState> {
    toaster: Toaster;
    constructor(props: ToasterDemoProps) {
        super(props);

        this.toaster = new Toaster();

        this.state = {
            createSameName: false,
            showCloseIcon: true,
            setTimeout: false,
            timeout: 3000,
            allowAutoHiding: true,
            setContent: false,
            setActions: false,
            lastToastName: '',
        };
    }

    getToastName(type: string) {
        const {createSameName} = this.state;

        if (createSameName) {
            return type;
        }

        return `${type}${Math.floor(Math.random() * 100000)}`;
    }

    createErrorToast = () => {
        const {showCloseIcon, setTimeout, timeout, allowAutoHiding, setContent, setActions} =
            this.state;

        const name = this.getToastName('error');

        this.toaster.createToast({
            name,
            type: 'error',
            title: 'Оплата не прошла проверку',
            isClosable: showCloseIcon,
            timeout: setTimeout ? Number(timeout) : undefined,
            allowAutoHiding: allowAutoHiding,
            actions: setActions ? ACTIONS : undefined,
            content: setContent ? CONTENT : null,
        });

        this.setState({lastToastName: name});
    };

    createSuccessToast = () => {
        const {showCloseIcon, setTimeout, timeout, allowAutoHiding, setContent, setActions} =
            this.state;

        const name = this.getToastName('success');

        this.toaster.createToast({
            name,
            type: 'success',
            title: 'Оплата успешно произведена',
            isClosable: showCloseIcon,
            timeout: setTimeout ? Number(timeout) : undefined,
            allowAutoHiding: allowAutoHiding,
            actions: setActions ? ACTIONS : undefined,
            content: setContent ? CONTENT : null,
        });

        this.setState({lastToastName: name});
    };

    createDefaultToast = () => {
        const {showCloseIcon, setTimeout, timeout, allowAutoHiding, setContent, setActions} =
            this.state;

        const name = this.getToastName('default');

        this.toaster.createToast({
            name,
            title: 'Оплата скорее всего прошла',
            isClosable: showCloseIcon,
            timeout: setTimeout ? Number(timeout) : undefined,
            allowAutoHiding: allowAutoHiding,
            actions: setActions ? ACTIONS : undefined,
            content: setContent ? CONTENT : null,
        });

        this.setState({lastToastName: name});
    };

    createCustomToast = () => {
        const {showCloseIcon, setTimeout, timeout, allowAutoHiding, setActions} = this.state;

        const name = this.getToastName('default');

        const content = (
            <div style={{display: 'flex'}}>
                <div style={{maxWidth: '86px', maxHeight: '86px', marginRight: '16px'}}>
                    <Icon size={86} data={SuccessToast} />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minWidth: '320px',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '280px',
                            marginBottom: '8px',
                            fontWeight: 500,
                            fontSize: '17px',
                            lineHeight: '24px',
                        }}
                    >
                        Следите за алертами в мобильном приложении Облака
                    </div>
                    <div style={{color: 'rgba(0, 0, 0, 0.7)'}}>
                        Попробуйте просматривать алерты в приложении.
                    </div>
                    <div style={{color: 'rgba(0, 0, 0, 0.7)'}}>
                        Вы можете настроить для них пуши, чтобы не пропустить срабатывание.
                    </div>
                    <div style={{marginTop: '16px', color: 'rgba(0, 0, 0, 0.3)'}}>
                        Наведите камеру на QR-код
                    </div>
                </div>
            </div>
        );

        this.toaster.createToast({
            name,
            isClosable: showCloseIcon,
            timeout: setTimeout ? Number(timeout) : undefined,
            allowAutoHiding: allowAutoHiding,
            actions: setActions ? ACTIONS : undefined,
            content: content,
            className: b('mobile-promotion'),
        });

        this.setState({lastToastName: name});
    };

    overrideLastToast = () => {
        const {lastToastName} = this.state;

        this.toaster.overrideToast(lastToastName, {
            title: 'А тут вообще не про оплату',
            actions: [
                {
                    label: 'Action 1',
                    onClick: () => console.log('from actions 1'),
                },
            ],
            content: (
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, neque.</p>
            ),
        });
    };

    removeAllToasts = () => {
        this.toaster._toasts = [];
        this.toaster._render();
    };

    render() {
        const {
            createSameName,
            showCloseIcon,
            setTimeout,
            allowAutoHiding,
            setContent,
            setActions,
            lastToastName,
        } = this.state;

        const btnStyle = {marginLeft: 20};
        const timeoutContainerStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 250,
        };
        const checkboxesContainerStyle = {margin: 20};

        const namesCheckbox = (
            <Checkbox
                size="l"
                onUpdate={() => this.setState({createSameName: !createSameName})}
                checked={createSameName}
                content="Same names"
            />
        );

        const closeIconCheckbox = (
            <Checkbox
                size="l"
                onUpdate={() => this.setState({showCloseIcon: !showCloseIcon})}
                checked={showCloseIcon}
                content="Show close icon"
            />
        );

        const timeoutCheckbox = (
            <Checkbox
                size="l"
                onUpdate={() => this.setState({setTimeout: !setTimeout})}
                checked={setTimeout}
                content="Set custom timeout"
            />
        );

        const autoHidingCheckbox = (
            <Checkbox
                size="l"
                onUpdate={() => this.setState({allowAutoHiding: !allowAutoHiding})}
                checked={allowAutoHiding}
                content="Allow auto hiding"
            />
        );

        const contentCheckbox = (
            <Checkbox
                size="l"
                onUpdate={() => this.setState({setContent: !setContent})}
                checked={setContent}
                content="Add content"
            />
        );

        const actionsCheckbox = (
            <Checkbox
                size="l"
                onUpdate={() => this.setState({setActions: !setActions})}
                checked={setActions}
                content="Add action"
            />
        );

        const errorToastBtn = (
            <Button size="l" onClick={this.createErrorToast} style={btnStyle}>
                Create error toast
            </Button>
        );

        const successToastBtn = (
            <Button size="l" onClick={this.createSuccessToast} style={btnStyle}>
                Create success toast
            </Button>
        );

        const defaultToastBtn = (
            <Button size="l" onClick={this.createDefaultToast} style={btnStyle}>
                Create default toast
            </Button>
        );

        const customToastBtn = (
            <Button size="l" onClick={this.createCustomToast} style={btnStyle}>
                Create custom toast
            </Button>
        );

        const overrideToastBtn = (
            <Button
                size="l"
                onClick={this.overrideLastToast}
                disabled={!lastToastName}
                style={btnStyle}
            >
                Override last toast
            </Button>
        );

        const clearBtn = (
            <Button view="outlined" size="l" onClick={this.removeAllToasts} style={btnStyle}>
                Remove all toasts
            </Button>
        );

        return (
            <div>
                <div style={checkboxesContainerStyle}>
                    <p>{namesCheckbox}</p>
                    <p>{closeIconCheckbox}</p>
                    <p style={timeoutContainerStyle}>{timeoutCheckbox}</p>
                    <p>{autoHidingCheckbox}</p>
                    <p>{contentCheckbox}</p>
                    <p>{actionsCheckbox}</p>
                </div>
                <p>{errorToastBtn}</p>
                <p>{successToastBtn}</p>
                <p>{defaultToastBtn}</p>
                <p>{customToastBtn}</p>
                <p>{overrideToastBtn}</p>
                <p>{clearBtn}</p>
            </div>
        );
    }
}
