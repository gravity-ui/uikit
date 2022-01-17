/* eslint-disable quotes */
import React from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';

import {Card, CardView, CardTheme} from '../../../components/Card/Card';

import './CardShowcase.scss';

const selectionCardView: CardView[] = ['outlined', 'clear'];
const cardTheme: CardTheme[] = ['normal', 'info', 'positive', 'warning', 'danger'];

export function CardShowcase() {
    return (
        <div>
            {/* Selection card */}
            <div className="panel-showcase-stories">
                <div className="panel-showcase-stories__title">Selection</div>
                <div className="panel-showcase-stories__desc">
                    Radio-cards. Use when only one element needed.
                </div>
                <div className="panel-showcase-stories__cards">
                    {selectionCardView.map((view) => {
                        return (
                            <div key={view}>
                                <ReactCopyToClipboard text={getSelectionCard(view)}>
                                    <div>
                                        <Card
                                            className="card-showcase-stories"
                                            view={view}
                                            type="selection"
                                            onClick={() => {}}
                                        >
                                            {' '}
                                        </Card>
                                    </div>
                                </ReactCopyToClipboard>
                                <div className="card-showcase-stories__desc">
                                    view {view}
                                    <br />
                                    (default)
                                </div>
                            </div>
                        );
                    })}
                    <div>
                        <ReactCopyToClipboard text={getSelectionCard('outlined')}>
                            <div>
                                <Card
                                    className="card-showcase-stories"
                                    type="selection"
                                    onClick={() => {}}
                                    selected
                                >
                                    {' '}
                                </Card>
                            </div>
                        </ReactCopyToClipboard>
                        <div className="card-showcase-stories__desc">selected</div>
                    </div>
                </div>
            </div>
            {/* Conatiner card */}
            <div className="panel-showcase-stories">
                <div className="panel-showcase-stories__title">Container</div>
                <div className="panel-showcase-stories__desc">
                    Cards for content grouping.
                    <br />
                    Can contain anything: tables, buttons, etc.
                </div>
                <div className="panel-showcase-stories__head">Outlined view</div>
                <div className="panel-showcase-stories__cards">
                    {cardTheme.map((theme) => {
                        return (
                            <div key={theme}>
                                <ReactCopyToClipboard text={getContainerCard('outlined', theme)}>
                                    <div>
                                        <Card
                                            className="card-showcase-stories"
                                            view="outlined"
                                            theme={theme}
                                        >
                                            {' '}
                                        </Card>
                                    </div>
                                </ReactCopyToClipboard>
                                <div className="card-showcase-stories__desc">theme {theme}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="panel-showcase-stories__head">Filled view</div>
                <div className="panel-showcase-stories__cards">
                    {cardTheme.map((theme) => {
                        return (
                            <div key={theme}>
                                <ReactCopyToClipboard text={getContainerCard('filled', theme)}>
                                    <div>
                                        <Card
                                            className="card-showcase-stories"
                                            view="filled"
                                            theme={theme}
                                        >
                                            {' '}
                                        </Card>
                                    </div>
                                </ReactCopyToClipboard>
                                <div className="card-showcase-stories__desc">theme {theme}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="panel-showcase-stories__head">Raised view</div>
                <div className="panel-showcase-stories__cards">
                    <div>
                        <ReactCopyToClipboard text={getContainerRaisedCard()}>
                            <div>
                                <Card className="card-showcase-stories" view="raised">
                                    {' '}
                                </Card>
                            </div>
                        </ReactCopyToClipboard>
                    </div>
                </div>
            </div>
            {/* Action card */}
            <div className="panel-showcase-stories">
                <div className="panel-showcase-stories__title">Action</div>
                <div className="panel-showcase-stories__desc">Action cards</div>
                <div className="panel-showcase-stories__cards">
                    <div>
                        <ReactCopyToClipboard text={getActionCard()}>
                            <div>
                                <Card
                                    className="card-showcase-stories"
                                    type="action"
                                    onClick={() => {}}
                                >
                                    {' '}
                                </Card>
                            </div>
                        </ReactCopyToClipboard>
                        <div className="card-showcase-stories__desc">type action</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getSelectionCard(view: CardView) {
    return (
        `<Card\rtype="selection" view="${view}" onClick={() => {}}\r` +
        `className="" selected={} disabled={}\r> </Card>`
    );
}

function getContainerCard(view: CardView, theme: CardTheme) {
    return `<Card\rtype="container" theme="${theme}" view="${view}" className=""\r> </Card>`;
}

function getContainerRaisedCard() {
    return `<Card\rtype="container" view="raised" className=""\r> </Card>`;
}

function getActionCard() {
    return `<Card\rtype="action" onClick={() => {}}\rclassName="" disabled={}\r> </Card>`;
}
