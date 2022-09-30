import React from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';
import {CopyToClipboardBaseProps, CopyToClipboardContent, CopyToClipboardStatus} from './types';

interface CopyToClipboardGeneralProps extends CopyToClipboardBaseProps {
    children: CopyToClipboardContent;
}

interface CopyToClipboardDefaultProps {
    timeout: number;
}

interface CopyToClipboardInnerProps
    extends CopyToClipboardGeneralProps,
        CopyToClipboardDefaultProps {}

export interface CopyToClipboardProps
    extends CopyToClipboardGeneralProps,
        Partial<CopyToClipboardDefaultProps> {}

interface CopyToClipboardState {
    status: CopyToClipboardStatus;
}

export class CopyToClipboard extends React.Component<
    CopyToClipboardInnerProps,
    CopyToClipboardState
> {
    static INITIAL_STATUS = CopyToClipboardStatus.Pending;

    state: CopyToClipboardState = {
        status: CopyToClipboard.INITIAL_STATUS,
    };

    private timerId?: number;

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render() {
        const {children, text} = this.props;
        const {status} = this.state;
        const content = children(status);

        if (!React.isValidElement(content)) {
            throw new Error('Content must be a valid react element');
        }

        return (
            <ReactCopyToClipboard text={String(text)} onCopy={this.handleCopy}>
                {content}
            </ReactCopyToClipboard>
        );
    }

    private handleCopy = (text: string, result: boolean) => {
        const {timeout, onCopy} = this.props;

        this.setState({
            status: result ? CopyToClipboardStatus.Success : CopyToClipboardStatus.Error,
        });

        clearTimeout(this.timerId);
        this.timerId = window.setTimeout(() => {
            this.setState({status: CopyToClipboard.INITIAL_STATUS});
            this.timerId = undefined;
        }, timeout);

        onCopy?.(text, result);
    };
}
