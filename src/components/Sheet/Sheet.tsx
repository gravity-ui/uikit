import React from 'react';
import ReactDOM from 'react-dom';
import {SheetContentContainer} from './SheetContent';
import {sheetBlock} from './constants';

import './Sheet.scss';

export interface SheetProps {
    children?: React.ReactNode;
    onClose?: () => void;
    /** Show/hide sheet */
    visible: boolean;
    /** ID of the sheet, used as hash in URL. It's important to specify different `id` values if there can be more than one sheet on the page */
    id?: string;
    /** Title of the sheet window */
    title?: string;
    /** Class name for the sheet window */
    className?: string;
    /** Class name for the sheet content */
    contentClassName?: string;
    /** Class name for the swipe area */
    swipeAreaClassName?: string;
    /** Enable the behavior in which you can close the sheet window with a swipe down if the content is scrolled to its top (`contentNode.scrollTop === 0`) or has no scroll at all */
    allowHideOnContentScroll?: boolean;
    /** Hide top bar with resize handle */
    hideTopBar?: boolean;
    qa?: string;
}

interface SheetState {
    visible: boolean;
}

export class Sheet extends React.Component<SheetProps, SheetState> {
    private static bodyScrollLocksCount = 0;
    private static bodyInitialOverflow: string | undefined = undefined;

    static lockBodyScroll() {
        if (++Sheet.bodyScrollLocksCount === 1) {
            Sheet.bodyInitialOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }
    }

    static restoreBodyScroll() {
        if (Sheet.bodyScrollLocksCount === 0) {
            return;
        }

        if (--Sheet.bodyScrollLocksCount === 0) {
            document.body.style.overflow = Sheet.bodyInitialOverflow || '';
            Sheet.bodyInitialOverflow = undefined;
        }
    }

    bodyScrollLocked = false;

    state: SheetState = {
        visible: false,
    };

    componentDidMount() {
        if (this.props.visible) {
            this.showSheet();
        }
    }

    componentDidUpdate(prevProps: SheetProps) {
        if (!prevProps.visible && this.props.visible) {
            this.showSheet();
        }
    }

    componentWillUnmount() {
        this.restoreBodyScroll();
    }

    render() {
        if (!this.state.visible) {
            return null;
        }

        return ReactDOM.createPortal(this.renderSheet(), document.body);
    }

    restoreBodyScroll() {
        if (!this.bodyScrollLocked) {
            return;
        }

        Sheet.restoreBodyScroll();
        this.bodyScrollLocked = false;
    }

    lockBodyScroll() {
        Sheet.lockBodyScroll();
        this.bodyScrollLocked = true;
    }

    private renderSheet() {
        const {
            id,
            children,
            className,
            contentClassName,
            swipeAreaClassName,
            title,
            visible,
            allowHideOnContentScroll,
            hideTopBar,
            qa,
        } = this.props;

        return (
            <div data-qa={qa} className={sheetBlock(null, className)}>
                <SheetContentContainer
                    id={id}
                    content={children}
                    contentClassName={contentClassName}
                    swipeAreaClassName={swipeAreaClassName}
                    title={title}
                    visible={visible}
                    allowHideOnContentScroll={allowHideOnContentScroll}
                    hideTopBar={hideTopBar}
                    hideSheet={this.hideSheet}
                />
            </div>
        );
    }

    private showSheet = () => {
        this.lockBodyScroll();
        this.setState({visible: true});
    };

    private hideSheet = () => {
        this.restoreBodyScroll();

        if (this.props.onClose) {
            this.props.onClose();
        }

        this.setState({visible: false});
    };
}
