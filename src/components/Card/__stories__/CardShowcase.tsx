/* eslint-disable quotes */
import React from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';

import {Card, CardView, CardTheme} from '../../../components/Card/Card';

import './index.scss';

const selectionCardView: CardView[] = ['outlined', 'clear'];
const containerCardTheme: CardTheme[] = ['normal', 'info', 'positive', 'warning', 'danger'];

export function CardShowcase() {
    return (
        <div>
            {/* Selection card */}
            <div className="panel">
                <div className="panel__title">Selection</div>
                <div className="panel__desc">Radio-cards. Use when only one element needed.</div>
                <div className="panel__cards">
                    {selectionCardView.map((view) => {
                        return (
                            <div key={view}>
                                <ReactCopyToClipboard text={getSelectionCard(view)}>
                                    <div>
                                        <Card
                                            className="card"
                                            view={view}
                                            type="selection"
                                            onClick={() => {}}
                                        >
                                            {' '}
                                        </Card>
                                    </div>
                                </ReactCopyToClipboard>
                                <div className="card-desc">
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
                                <Card className="card" type="selection" onClick={() => {}} selected>
                                    {' '}
                                </Card>
                            </div>
                        </ReactCopyToClipboard>
                        <div className="card-desc">selected</div>
                    </div>
                </div>
            </div>
            {/* Conatiner card */}
            <div className="panel">
                <div className="panel__title">Container</div>
                <div className="panel__desc">
                    Cards for content grouping.
                    <br />
                    Can contain anything: tables, buttons, etc.
                </div>
                <div className="panel__head">Outlined view</div>
                <div className="panel__cards">
                    {containerCardTheme.map((theme) => {
                        return (
                            <div key={theme}>
                                <ReactCopyToClipboard text={getContainerCard('outlined', theme)}>
                                    <div>
                                        <Card className="card" view="outlined" theme={theme}>
                                            {' '}
                                        </Card>
                                    </div>
                                </ReactCopyToClipboard>
                                <div className="card-desc">theme {theme}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="panel__head">Filled view</div>
                <div className="panel__cards">
                    {containerCardTheme.map((theme) => {
                        return (
                            <div key={theme}>
                                <ReactCopyToClipboard text={getContainerCard('filled', theme)}>
                                    <div>
                                        <Card className="card" view="filled" theme={theme}>
                                            {' '}
                                        </Card>
                                    </div>
                                </ReactCopyToClipboard>
                                <div className="card-desc">theme {theme}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="panel__head">Raised view</div>
                <div className="panel__cards">
                    <div>
                        <ReactCopyToClipboard text={getContainerRaisedCard()}>
                            <div>
                                <Card className="card" view="raised">
                                    {' '}
                                </Card>
                            </div>
                        </ReactCopyToClipboard>
                        <div className="card-desc">Legacy</div>
                    </div>
                </div>
            </div>
            {/* Action card */}
            <div className="panel">
                <div className="panel__title">Action</div>
                <div className="panel__desc">Action cards</div>
                <div className="panel__cards">
                    <div>
                        <ReactCopyToClipboard text={getActionCard()}>
                            <div>
                                <Card className="card" type="action" onClick={() => {}}>
                                    {' '}
                                </Card>
                            </div>
                        </ReactCopyToClipboard>
                        <div className="card-desc">type action</div>
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
