import React from 'react';
import {block} from '../../utils/cn';

import {Button, ButtonProps, ButtonView} from '../../Button';
import {Popup} from '../../Popup';

import './DialogFooter.scss';

const b = block('dialog-footer');

type ButtonPreset = 'default' | 'success' | 'danger';

interface DialogFooterOwnProps {
    onClickButtonApply?: (event: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => void;
    onClickButtonCancel?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    textButtonCancel?: string;
    textButtonApply?: string;
    propsButtonCancel?: Partial<ButtonProps>;
    propsButtonApply?: Partial<ButtonProps>;
    loading?: boolean;
    children?: React.ReactNode;
    errorText?: string;
    renderButtons?: (
        buttonApply: React.ReactNode,
        buttonCancel: React.ReactNode,
    ) => React.ReactNode;
}

interface DialogFooterDefaultProps {
    preset: ButtonPreset;
    showError: boolean;
    /**
     * @deprecated use on onEnterKeyDown on Dialog component
     */
    listenKeyEnter: boolean;
}

export type DialogFooterProps = DialogFooterOwnProps & Partial<DialogFooterDefaultProps>;
type DialogFooterInnerProps = DialogFooterOwnProps & DialogFooterDefaultProps;

function getButtonView(preset: ButtonPreset): ButtonView {
    switch (preset) {
        case 'default':
            return 'action';
        case 'success':
            return 'action';
        case 'danger':
            return 'action';
        default:
            return 'action';
    }
}

export class DialogFooter extends React.Component<DialogFooterInnerProps> {
    static defaultProps: DialogFooterDefaultProps = {
        preset: 'default',
        showError: false,
        listenKeyEnter: false,
    };

    private errorTooltipRef = React.createRef<HTMLButtonElement>();

    componentDidMount() {
        if (this.props.listenKeyEnter) {
            this.attachKeyDownListeners();
        }
    }

    componentDidUpdate(prevProps: DialogFooterInnerProps) {
        if (!this.props.listenKeyEnter && prevProps.listenKeyEnter) {
            this.detachKeyDownListeners();
        }
        if (this.props.listenKeyEnter && !prevProps.listenKeyEnter) {
            this.attachKeyDownListeners();
        }
    }

    componentWillUnmount() {
        this.detachKeyDownListeners();
    }

    render() {
        const {
            onClickButtonCancel,
            onClickButtonApply,
            loading,
            textButtonCancel,
            textButtonApply,
            propsButtonCancel,
            propsButtonApply,
            preset,
            children,
            errorText,
            showError,
            renderButtons,
        } = this.props;

        const buttonCancel = (
            <div className={b('button', {action: 'cancel'})}>
                <Button
                    view={textButtonApply ? 'flat' : 'normal'}
                    size="l"
                    width="max"
                    onClick={onClickButtonCancel}
                    disabled={loading}
                    {...propsButtonCancel}
                >
                    {textButtonCancel}
                </Button>
            </div>
        );

        const buttonApply = (
            <div className={b('button', {action: 'apply'})}>
                <Button
                    ref={this.errorTooltipRef}
                    type="submit"
                    view={getButtonView(preset)}
                    size="l"
                    width="max"
                    onClick={onClickButtonApply}
                    loading={loading}
                    className={b('button-apply', {preset})}
                    {...propsButtonApply}
                >
                    {textButtonApply}
                </Button>
                {errorText && (
                    <Popup
                        open={showError}
                        anchorRef={this.errorTooltipRef}
                        placement={['bottom', 'top']}
                        disableLayer
                        hasArrow
                    >
                        <div className={b('error')}>{errorText}</div>
                    </Popup>
                )}
            </div>
        );

        return (
            <div className={b()}>
                <div className={b('children')}>{children}</div>
                <div className={b('bts-wrapper')}>
                    {renderButtons ? (
                        renderButtons(buttonApply, buttonCancel)
                    ) : (
                        <>
                            {textButtonApply && buttonApply}
                            {textButtonCancel && buttonCancel}
                        </>
                    )}
                </div>
            </div>
        );
    }

    private attachKeyDownListeners() {
        setTimeout(() => {
            window.addEventListener('keydown', this.handleKeyDown);
        }, 0);
    }

    private detachKeyDownListeners() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (this.props.onClickButtonApply) {
                this.props.onClickButtonApply(event);
            }
        }
    };
}
