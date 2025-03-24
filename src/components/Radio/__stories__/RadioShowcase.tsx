import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Radio} from '../Radio';

export function RadioShowcase() {
    return (
        <Showcase>
            <ShowcaseItem title="Size">
                <div style={{marginBlock: '1em'}}>
                    <Radio size="m" content="size m" value="value 1" />
                    <span style={{margin: '16px'}} />
                    <Radio size="m" content="size m" value="value 2" />
                </div>
                <div style={{marginBlock: '1em'}}>
                    <Radio size="l" content="size l" value="value 1" />
                    <span style={{margin: '16px'}} />
                    <Radio size="l" content="size l" value="value 2" />
                </div>
                <div style={{marginBlock: '1em'}}>
                    <Radio size="xl" content="size xl" value="value 1" />
                    <span style={{margin: '8px'}} />
                    <Radio size="xl" content="size xl" value="value 2" />
                </div>
            </ShowcaseItem>
            <ShowcaseItem title="Disabled">
                <div style={{marginBlock: '1em'}}>
                    <Radio
                        size="m"
                        content="Unchecked"
                        defaultChecked={false}
                        value="value 1"
                        disabled
                    />
                </div>
                <div style={{marginBlock: '1em'}}>
                    <Radio
                        size="m"
                        content="Checked"
                        defaultChecked={true}
                        value="value 2"
                        disabled
                    />
                </div>
            </ShowcaseItem>
            <ShowcaseItem title="Uncontrolled">
                <div style={{marginBlock: '1em'}}>
                    <Radio size="m" content="checked" defaultChecked={true} value="value 1" />
                </div>
                <div style={{marginBlock: '1em'}}>
                    <Radio size="m" content="unchecked" value="value 2" />
                </div>
            </ShowcaseItem>

            <ShowcaseItem title="Controlled">
                <div style={{marginBlock: '1em'}}>
                    <Radio size="m" content="checked" checked={true} value="value 1" />
                </div>
                <div style={{marginBlock: '1em'}}>
                    <Radio size="m" content="unchecked" checked={false} value="value 2" />
                </div>
            </ShowcaseItem>
        </Showcase>
    );
}
