import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Switch} from '../Switch';

export const SwitchShowcase = () => {
    return (
        <Showcase>
            <ShowcaseItem title="default">
                <p>
                    <Switch />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="sizes">
                <p>
                    s: <Switch size="s" className="row" />
                    <span style={{margin: '8px'}} />
                    m: <Switch size="m" className="row" />
                    <span style={{margin: '8px'}} />
                    l: <Switch size="l" className="row" />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="disabled">
                <p>
                    <Switch defaultChecked disabled content="Disabled checked" />
                    <span style={{margin: '8px'}} />
                    <Switch disabled content="Disabled" />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="with label">
                <p>
                    <Switch content="Label s" size="s" className="row" id={'with-title-1'} />
                    <span style={{margin: '8px'}} />
                    <Switch content="Label m" className="row" id={'with-title-1'} />
                    <span style={{margin: '8px'}} />
                    <Switch content="Label l" size="l" className="row" id={'with-title-2'} />
                </p>
            </ShowcaseItem>
            <ShowcaseItem title="controlled">
                <p>
                    <Switch content="Controlled checked" checked className="row" />
                    <span style={{margin: '8px'}} />
                    <Switch
                        content="Controlled unchecked"
                        checked={false}
                        size="l"
                        className="row"
                    />
                </p>
            </ShowcaseItem>
        </Showcase>
    );
};
