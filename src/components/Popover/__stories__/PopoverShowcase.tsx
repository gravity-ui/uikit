import React from 'react';
import _ from 'lodash';

import {block} from '../../utils/cn';
import {Button} from '../../Button';
import {Popover, PopoverProps, PopoverBehavior} from '../Popover';
import {Loader} from '../../Loader';

import './PopoverShowcase.scss';

const MockTitle = 'Lorem ipsum dolor sit amet, at scelerisque';
const MockHtmlContent =
    '<b>Lorem ipsum</b> dolor sit <a href="https://yandex.ru" target="_blank">amet</a>, at scelerisque suspendisse';

const b = block('popover-demo');

export function getPopoverProps() {
    const autoclosable = true;
    const hoverEnabled = false;
    const behavior = PopoverBehavior.Delayed;
    const titleEnabled = true;
    const linksEnabled = true;
    const actionButtonEnabled = true;
    const cancelButtonEnabled = true;
    const htmlContentEnabled = true;
    const renderArbitraryContent = false;
    const contentClassEnabled = true;
    const theme = 'info';

    const props: PopoverProps = {
        autoclosable,
        title: titleEnabled ? MockTitle : undefined,
        tooltipActionButton: actionButtonEnabled
            ? {
                  text: 'Action',
                  onClick: () => alert('Action button onClick'),
              }
            : undefined,
        tooltipCancelButton: cancelButtonEnabled
            ? {
                  text: 'Cancel',
                  onClick: () => alert('Cancel button onClick'),
              }
            : undefined,
        className: 'demo-icon-tooltip',
        openOnHover: false,
        behavior,
        theme,
    };

    if (htmlContentEnabled) {
        props.htmlContent = MockHtmlContent;
    }

    if (linksEnabled) {
        props.links = [
            {
                text: 'Lorem ipsum href',
                href: 'https://yandex.ru',
            },
            {
                text: 'Lorem ipsum onClick',
                onClick: () => alert('Link onClick'),
            },
        ];
    }

    if (hoverEnabled) {
        props.openOnHover = true;
    }

    if (renderArbitraryContent) {
        props.content = <Loader size="s" />;

        if (contentClassEnabled) {
            props.contentClassName = b('content-class');
        }
    }

    return props;
}

export class PopoverShowcase extends React.Component {
    state: {refTooltipVisible: boolean} = {
        refTooltipVisible: false,
    };

    private popoverRef = React.createRef<Popover>();
    private popoverAnchor = React.createRef<HTMLDivElement>();

    render() {
        const props = {...getPopoverProps()};

        return (
            <div className={b('content')}>
                <div>
                    <Popover {...props}>
                        <div className={b('example-content')}>
                            <h3 className={b('example-content-text')}>
                                Tooltip on {props.openOnHover ? 'hover' : 'click'}
                            </h3>
                        </div>
                    </Popover>
                </div>

                <div
                    style={{
                        marginTop: 20,
                    }}
                >
                    <Button onClick={this.toggleRefTooltip} className={b('control')}>
                        Click me
                    </Button>
                </div>

                <div
                    style={{
                        marginTop: 20,
                    }}
                    ref={this.popoverAnchor}
                >
                    <div className={b('example-content')}>
                        <h2 className={b('example-content-title')}>
                            Here comes tooltip bound to ref
                        </h2>
                        <h3 className={b('example-content-text')}>
                            Click the button &laquo;Click me&raquo; above, to open it.
                        </h3>
                    </div>
                </div>

                <Popover
                    ref={this.popoverRef}
                    anchorRef={this.popoverAnchor}
                    content={<Loader size="s" />}
                />
            </div>
        );
    }

    toggleRefTooltip = () => {
        const {refTooltipVisible} = this.state;
        const instance = _.get(this.popoverRef, 'current');

        if (instance) {
            if (refTooltipVisible) {
                this.setState({refTooltipVisible: false}, () => {
                    instance.closeTooltip();
                });
            } else {
                this.setState({refTooltipVisible: true}, () => {
                    instance.openTooltip();
                });
            }
        }
    };
}
