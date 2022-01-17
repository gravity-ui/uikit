import React from 'react';
import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';

import {Card, CardView, CardTheme} from '../../../components/Card/Card';

import './CardShowcase.scss';

const containerViews: CardView[] = ['outlined', 'filled'];
const themes: CardTheme[] = ['normal', 'info', 'positive', 'warning', 'danger'];

export function CardShowcase() {
    return (
        <Showcase title="Card" className="cards-showcase-stories">
            <ShowcaseItem title="type">
                <Card view="outlined" type="selection" className="card-showcase-stories">
                    <div className="card-content-showcase-stories">selection</div>
                </Card>
                <Card
                    view="outlined"
                    type="action"
                    className="card-showcase-stories"
                    onClick={() => alert(':wave: hey')}
                >
                    <div className="card-content-showcase-stories">action with onClick</div>
                </Card>
                <Card view="outlined" type="container" className="card-showcase-stories">
                    <div className="card-content-showcase-stories">container</div>
                </Card>
            </ShowcaseItem>
            <ShowcaseItem title="view">
                <Card view="outlined" type="selection" className="card-showcase-stories">
                    <div className="card-content-showcase-stories">
                        type: selection
                        <br />
                        view: outlined
                    </div>
                </Card>
                <Card view="clear" type="selection" className="card-showcase-stories">
                    <div className="card-content-showcase-stories">
                        type: selection
                        <br />
                        view: clear
                    </div>
                </Card>
                <Card view="outlined" type="container" className="card-showcase-stories">
                    <div className="card-content-showcase-stories">
                        type: container
                        <br />
                        view: outlined
                    </div>
                </Card>
                <Card view="filled" type="container" className="card-showcase-stories">
                    <div className="card-content-showcase-stories">
                        type: container
                        <br />
                        view: filled
                    </div>
                </Card>
                <Card view="raised" type="container" className="card-showcase-stories">
                    <div className="card-content-showcase-stories">
                        type: container
                        <br />
                        view: raised
                    </div>
                </Card>
            </ShowcaseItem>
            <ShowcaseItem title="theme">
                {containerViews.map((view) =>
                    themes.map((theme) => (
                        <Card
                            key={theme}
                            view={view}
                            type="container"
                            className="card-showcase-stories"
                            theme={theme}
                        >
                            <div className="card-content-showcase-stories">
                                type: container
                                <br />
                                view: {view}
                                <br />
                                theme: {theme}
                            </div>
                        </Card>
                    )),
                )}
            </ShowcaseItem>
            <ShowcaseItem title="selected">
                <Card selected={true} type="selection" className="card-showcase-stories">
                    <div className="card-content-showcase-stories">
                        type: selection
                        <br />
                        selected: true
                    </div>
                </Card>
                <Card selected={false} type="selection" className="card-showcase-stories">
                    <div className="card-content-showcase-stories">
                        type: selection
                        <br />
                        selected: false
                    </div>
                </Card>
            </ShowcaseItem>
            <ShowcaseItem title="disabled">
                <Card
                    disabled={true}
                    type="selection"
                    className="card-showcase-stories"
                    onClick={() => alert(':wave: hey')}
                >
                    <div className="card-content-showcase-stories">
                        type: selection
                        <br />
                        disabled: true
                    </div>
                </Card>
                <Card
                    disabled={false}
                    type="selection"
                    className="card-showcase-stories"
                    onClick={() => alert(':wave: hey')}
                >
                    <div className="card-content-showcase-stories">
                        type: selection
                        <br />
                        disabled: false
                    </div>
                </Card>
                <Card
                    disabled={true}
                    type="action"
                    className="card-showcase-stories"
                    onClick={() => alert(':wave: hey')}
                >
                    <div className="card-content-showcase-stories">
                        type: action
                        <br />
                        disabled: true
                    </div>
                </Card>
                <Card
                    disabled={false}
                    type="action"
                    className="card-showcase-stories"
                    onClick={() => alert(':wave: hey')}
                >
                    <div className="card-content-showcase-stories">
                        type: action
                        <br />
                        disabled: false
                    </div>
                </Card>
            </ShowcaseItem>
        </Showcase>
    );
}
